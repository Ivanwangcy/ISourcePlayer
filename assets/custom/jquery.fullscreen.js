/**
 * Created by Ivan on 2015/1/28.
 * jquery.fullscreen.js
 */
(function($){
    $.fn.toggleFullScreen = function(){
        var supportsFullScreen = false;
        var fullScreenEventName = "";
        var browserPrefixes = ["webkit","moz","o","ms","khtml"];
        var prefix = "";
        var screen = this[0];

        if(document.cancelFullScreen){
            supportsFullScreen = true;
        }else{
            for(var i = 0;i< browserPrefixes.length;i++){
                if(document[browserPrefixes[i] + "CancelFullScreen"]){
                    prefix = browserPrefixes[i];
                    supportsFullScreen = true;
                    break;
                }
            }
        }
//        if(supportsFullScreen){ //支持全屏
//            fullScreenEventName = prefix + "fullscreenchange";
//        }

        var cancelFullScreen = function(){ // 取消全屏
            (prefix === "")?
                document.cancelFullScreen() :
                document[prefix + 'CancelFullScreen']();
        };

        var isFullScreen = function(){//当前是否为全屏
            switch (prefix){
                case "" :
                    return document.fullScreen; break;
                case "webkit":
                    return document.webkitIsFullScreen;break;
                default :
                    return document[prefix + "FullScreen"];
            }
        };

        var requestFullScreen = function(){ //全屏查看
            (prefix === "")?
                screen.requestFullScreen() :
                screen[prefix + 'RequestFullScreen']();
        };

        if(isFullScreen()){
            cancelFullScreen();

        }else{
            requestFullScreen();

        }
        return $(this);
    }
})(jQuery);