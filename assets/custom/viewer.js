/**
 * Created by Ivan on 2015/1/23.
 */
(function(window){

    // Declare variable
    var canvas = document.getElementById("canvas"), // 获取 canvas 对象
    
    offScreenCanvas = document.createElement("canvas"), // 创建离屏 canvas
    context = canvas.getContext("2d"),  // 绘图环境上下文
    offScreenContext = offScreenCanvas.getContext("2d"),// 离屏canvas 绘图环境(不可见)
    image = new Image(), // 创建图片对象
    loaded = false, // 图片是否加载完成
    scale = 1.00; // 缩放比例

    //Initialization ...
    canvas.width = window.innerWidth - 55;
    canvas.height = window.innerHeight - 70;
    offScreenCanvas.width = canvas.width;
    offScreenCanvas.height = canvas.height;
    context.fillStyle = "cornflowerblue"; //浅蓝色
    context.strokeStyle = "yellow";
    context.shadowColor = "rgba(50, 50, 50, 1.0)";
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;
    image.src = "assets/media/少女时代.jpg"; // 图片加载路径
    //窗口大小改变
    window.addEventListener("resize",function(){
        canvas.width = window.innerWidth - 55;
        canvas.height = window.innerHeight - 70;
        if(loaded){
            context.drawImage(image,0,0,canvas.width,canvas.height);
            offScreenContext.drawImage(image,0,0,canvas.width,canvas.height);
        }
    });
    //图片加载事件
    image.onload = function(e) {
//        alert(image.width + " ：" + image.height);
        drawScaledImage();
//        context.drawImage(image,0,0,canvas.width,canvas.height);//画出图片, 图片大小为画布大小
//        context.drawImage(image,0,0,image.width,image.height,
//                -image.width/2 + canvas.width/2,-image.height/2+canvas.height/2);
//        offScreenCanvas.width = image.width;
//        offScreenCanvas.height = image.height;
//        offScreenContext.drawImage(image,0,0,image.width,image.height);

        loaded = true;
    };

    //滑动条 change 事件
    $("#slider").on("change", function(e) {
        scale = e.target.value;
        drawScaledImage();
        $("#scaleOutput").text(parseFloat(scale).toFixed(2));
    });



    ///////////////////////////
    canvas.getBoundingClientRect();// 获取canvas边界
    ///////////////////////////




    //绘制图片函数
    function drawScaledImage(){
        var width = canvas.width;
        var height = canvas.height;
        var scaleWidth = image.width * scale;
        var scaleHeight = image.height * scale;

        context.clearRect(0, 0, canvas.width, canvas.height);//清除内容
        //从图片中截取画面
//        context.drawImage(image,-scaleWidth/2 + width/2,-scaleHeight/2 + height/2 ,scaleWidth, scaleHeight);
        //从离屏 canvas 中截取画面
//        context.drawImage(offScreenCanvas,0,0,
//                offScreenCanvas.width,offScreenCanvas.height,
//                -scaleWidth/2 + width/2,-scaleHeight/2 + height/2 ,
//                scaleWidth, scaleHeight);
        context.drawImage(image,0,0,
            image.width,image.height,
                -scaleWidth/2 + width/2,-scaleHeight/2 + height/2 ,
                scaleWidth, scaleHeight);

    }


})(window);

//((function(){})());