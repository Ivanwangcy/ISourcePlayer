/**
 * Created by Ivan on 2015/1/26.
 */
(function($, window){

    var ImageViewer = function(container, image, options){
        var self = this;//保存自身, 用于回调函数
        this.baseContainer = container.length > 0 ? container[0] : container; //保留原文档对象
        this.container = $(container); // 把容器转换成 JQuery 对象
        this.image = image;
        this.browserPrefixes = ["webkit","moz","o","ms","khtml"];
        this.prefix = "";
        this.supportsFullScreen = false;
        this.imageOffset = {width: 0, height: 0};
        this.ratio = 1; // 图片与窗口的比例
        this.isGif = false;
        this.scaleWidth = 0;
        this.scaleHeight = 0;
        this.slider = null;
        this.scaleOutput = null;
        this.imageCanvas = null;
        this.gifViewer = null;
        this.canvasContext = null;

        //默认选项
        this.defaultOptions = {
            scale: 1.00,
            maxScale: 3.0,
            minScale: 0.2,
            step: 0.01
        };

        this.options = $.extend({},this.defaultOptions,options);

        if(image.width == 0 || image.height == 0){
            image.onload = function(e){
                self.initialize();//回调函数不能使用 this
            }
        }else{
            this.initialize();
        }
        return this;
    };

    ImageViewer.prototype = {
        initialize: function() {

            //创建图片查看器,容器内容
            this.createViewerElement();
            //初始化 jQuery 对象,与原生 Dom 对象 canvas, context
            this.initObjects();



            this.scaleWidth = this.image.width * this.options.scale;
            this.scaleHeight = this.image.height * this.options.scale;

            //操作函数
            this.checkFullScreen();
            this.addEventHandlers();
            this.drawScale();

        },
        createViewerElement:function(){
            this.container.outerWidth(window.innerWidth - 60)
                .outerHeight(window.innerHeight - 60)
                .empty();
            var regExp = new RegExp(".*\.gif","gi");
            if(regExp.test(this.image.src)){
                this.isGif = true;
                this.container.append("<div class='gif-container' id='gif-container'><img id='gifViewer' src='" + this.image.src + "'/></div>");
                this.gifViewer = $("#gifViewer");
            }else{
                this.container.append('<canvas id="imageViewerCanvas"></canvas>')
            }
            this.container.append('<div class="image-control">' +
                '<input id="slider" type="range"/>' +
                '<label id="scaleOutput"></label>' +
                '<a id="base" title="原始大小" />' +
                '<a id="fit" title="适应大小"/>' +
                '<a id="full" title="全屏显示"/></div>');

        },
        initObjects:function(){
            //初始化滑动条属性
            var canvasWidth = this.container.width();
            var canvasHeight = this.container.height();
            var imageWidth = this.image.width;
            var imageHeight = this.image.height;
            this.ratio = canvasWidth/imageWidth < canvasHeight/imageHeight
                ? canvasWidth/imageWidth
                : canvasHeight/imageHeight;
            var max = this.ratio;
            if(!this.isGif){
                max = this.options.maxScale;
            }
            this.slider = $("#slider").attr(
                {value:this.options.scale,
                    min:this.options.minScale,
                    max:max,
                    step:this.options.step
                });
            //初始化其它对象
            this.scaleOutput = $("#scaleOutput").text(parseFloat(this.options.scale).toFixed(2) + "倍").hide();
            //非 JQuery 对象, html 5 canvas 组件JQuery无法使用
            if(!this.isGif){//如果不是gif 使用canvas绘制图像
                this.imageCanvas = document.getElementById("imageViewerCanvas");
                this.canvasContext = this.imageCanvas.getContext("2d");
                this.imageCanvas.width = this.container.width();
                this.imageCanvas.height = this.container.height();
            }

        },
        addEventHandlers: function() {
            var self = this;
            //原始大小事件
            $("#base").click(function(){
                //原始尺寸
                self.imageOffset = {width:0,height:0};//还原图像位置
//                if(self.isGif){
//                    self.drawGif(self.image.width, self.image.height);
//                }else{
                self.slider.val(1.00).change();
//                }

            });
            //适应窗口事件
            $("#fit").click(function(){
                //fit 拉伸至容器的宽高 或者 高度
                self.imageOffset = {width:0,height:0};//还原图像位置
                self.slider.val(self.ratio).change();//改变图像大小, 最大宽或高与父容器相同
            });
            //全屏事件
            $("#full").click(function(){
                if(!self.supportsFullScreen) return;
                //全屏查看
                if(self.isFullScreen()){
                    self.cancelFullScreen();
                }else
                {
                    self.requestFullScreen(self.baseContainer);
                }
            });

            //滑动条 change 事件
            this.slider.on("change", function(e) {
                self.options.scale = parseFloat(e.target.value).toFixed(2);
                self.scaleOutput.text(self.options.scale + "倍");
                if(self.isGif){
                    self.drawGif(self.image.width * self.options.scale, self.image.height * self.options.scale);
                }else{
                    self.drawScale();
                }
            });

            //监听窗口resize事件
            $(window).resize( function(){
                self.container.outerWidth(window.innerWidth - 60)
                    .outerHeight(window.innerHeight - 60);
                self.initObjects();
                if(!self.isGif){
                    self.imageCanvas.width = self.container.width();
                    self.imageCanvas.height = self.container.height();
                    self.drawScale();
                }else{
                    self.drawGif(self.image.width * self.ratio, self.image.height * self.ratio);
                }
            });
            //监听鼠标事件, 拖动图片功能
            this.mouseEventHandler(self);
        },
        mouseEventHandler:function(self){
            //监听鼠标按下与鼠标移动事件, 根据坐标移动图片,实现拖动图片功能
            var mouseStarted = {x: 0, y: 0};
            $(this.imageCanvas).mousedown(function(event){
                event.stopPropagation();
                mouseStarted = {x: event.pageX, y: event.pageY};
            }).mousemove(function(event){
                event.stopPropagation();
                if(event.which){
                    var width = event.pageX - mouseStarted.x + self.imageOffset.width;
                    var height = event.pageY - mouseStarted.y + self.imageOffset.height;
                    self.imageOffset = {
                        width : width,
                        height: height
                    };
                    mouseStarted = {x: event.pageX, y: event.pageY};
                    self.drawScale();
                }
            });
        },
        windowToCanvas:function(x, y){
//            var box = this.imageCanvas.getBoundingClientRect();
//            return{
//              x: x - box.left,
//              y: y - box.top
//            };
        },
        checkFullScreen:function(){
            if(document.cancelFullScreen){
                this.supportsFullScreen = true;
            }else{
                for(var i = 0;i< this.browserPrefixes.length;i++){
                    if(document[this.browserPrefixes[i] + "CancelFullScreen"]){
                        this.prefix = this.browserPrefixes[i];
                        this.supportsFullScreen = true;
                        break;
                    }
                }
            }
        },
        requestFullScreen: function(el) { //调用全屏功能

            return (this.prefix === "")?
                el.requestFullScreen() :
                el[this.prefix + 'RequestFullScreen']();
        },
        cancelFullScreen: function(){ // 取消全屏
            return (this.prefix === "")?
                document.cancelFullScreen() :
                document[this.prefix + 'CancelFullScreen']();
        },
        isFullScreen:function(){//当前是否为全屏
            switch (this.prefix){
                case "" :
                    return document.fullScreen; break;
                case "webkit":
                    return document.webkitIsFullScreen;break;
                default :
                    return document[this.prefix + "FullScreen"];
            }
        },
        /**
         * 比例缩放图片:
         * GIF图片采用<img>标签, 改变其图片大小
         * 其它图片使用 Canvas 绘制
         * */
        drawScale: function(){ //根据缩放比例,画出图像

            if(!this.isGif){
                var width = this.container.width();
                var height = this.container.height();
                this.scaleWidth = this.image.width * this.options.scale;
                this.scaleHeight = this.image.height * this.options.scale;
                this.clear();
                this.canvasContext.drawImage(this.image,0,0,
                    this.image.width,this.image.height,
                        -this.scaleWidth/2 + width/2 + this.imageOffset.width,
                        -this.scaleHeight/2 + height/2 + this.imageOffset.height,
                    this.scaleWidth, this.scaleHeight);
            }else{
                this.drawGif(this.gifViewer.width(),this.gifViewer.height());
            }


        },
        drawGif: function(width,height){
//            console.info(this.gifViewer.parent().width(),this.gifViewer.parent().height());
            var parentWidth = this.gifViewer.parent().width();
            var parentHeight = this.gifViewer.parent().height();
            this.gifViewer.css({
                left: -width/2 + parentWidth/2,
                top: -height/2 + parentHeight/2,
                maxWidth:parentWidth,
                maxHeight:parentHeight,
                width: width,
                height: height
            });
        },
        clear: function(){ //清空画布
            this.canvasContext.clearRect(0, 0,
                this.imageCanvas.width,
                this.imageCanvas.height);//清除内容
        }

    };

    $.fn.imageViewer = function(image,options){
        image || (image = new Image());
        options || (options = {});

        return new ImageViewer(this,image,options);
    };


})(jQuery,window);
