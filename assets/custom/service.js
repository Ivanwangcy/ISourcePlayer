/**
 * Created by Ivan on 2015/4/2.
 */
$(document).ready(function(){
    var hrefstr = window.location.href;
    var currentPath = 'http://content.bitsontherun.com/videos/3XnJSIm4-52qL9xLP.mp4';
    var teachingActivityDetailsId = 0;
    var resourceInfoId = 0;
    var tomcatBaseURL = "http://localhost/";
    var paramStr = hrefstr.split("?");

    if(paramStr && paramStr.length > 0)
    {
        var currentBaseURL = paramStr[0].split("ISVideoPlayer")[0];
        var videoParam = paramStr[1].split("=");

        /**获取视频资源的URL参数值*/
        params = base64decode(videoParam[1]);
        //var paraArr = paramsStr[1].split("&");
        /** 分号 前面是 资源类型 ，后面是视频地址URL */
        var tomcatParamsArr = params.split(";");

        if(tomcatParamsArr.length > 0){
            var resourceInfo = tomcatParamsArr[0];
            var fileType = "";
            if(resourceInfo.indexOf("@") > 0){
                resourceInfoId = resourceInfo.split("@")[0];
                //alert(resourceInfoId);
                //fileType = resourceInfo.split("@")[1];
            }else{
                //fileType = tomcatParamsArr[0];
            }

            var tomcatFilePath = tomcatParamsArr[1];
            var ICourseFilesSplit = tomcatFilePath.split("/ICourseFiles/");
            tomcatBaseURL = ICourseFilesSplit[0]+"/";
            currentPath = currentBaseURL + "ICourseFiles/" + ICourseFilesSplit[1];

            if(tomcatParamsArr.length == 3)
            {
                teachingActivityDetailsId = tomcatParamsArr[2];
            }
        }
    }
    //最简单的加载方式
//   $('#player').mediaelementplayer();


    /**
     * 与服务器端交互功能, 存取视频播放时长, 加载上次播放时长
     * */
    /**
     * 服务器方法
     * */
    setInterval(updateResActComProAction,1000);


    /**
     * 保存视频资源观看时长
     * */
    function saveResourceBrowserDuration()
    {
        var requestVars = {};
        requestVars.resourceInfoId = resourceinfoid;
        requestVars.lastViewLocation = Math.round(player.currentTime());
        var url = tomcatBaseURL + "/saveResourceBrowserDuration.action";
        sendServer(requestVars,url,loaderSuccessfulHandler);
    }

    /**
     * 更新教学活动视频资源观看时长
     * */
    function updateResActComProAction()
    {
        var requestVars = {teachingActivityDetailsId:teachingActivityDetailsId,
            lastViewLocation:Math.round(player.currentTime())
        };
//        requestVars.teachingActivityDetailsId = teachingActivityDetailsId;
        //	 requestVars.lastViewLocation = player.getCurrentCaptions();
//        requestVars.lastViewLocation = Math.round(player.currentTime());
        var url = tomcatBaseURL + "/updateResActComProAction.action";
        sendServer(requestVars,url,loaderSuccessfulHandler);
    }

    /**
     * 服务器方法
     *
     * */
    function getLastViewLocationInfo(){
        var requestVars = {teachingActivityDetailsId:teachingActivityDetailsId};
//      requestVars.teachingActivityDetailsId = teachingActivityDetailsId;
        var url = tomcatBaseURL + "/getLastViewLocationInfo.action";
        sendServer(requestVars,url,lastTimeLocation_resultHandler);

    }

    /**
     *  请求服务器端
     * */
    function sendServer(requestVars,url,callback){
        $.post(url,requestVars,callback);
    }

    /**
     * 读取时长后, 设置当前开始播放时间
     * */
    function lastTimeLocation_resultHandler(data){
        player.setCurrentTime(data);
    }

    /**
     *
     * 定时请求服务器端
     *
     */
    function loaderSuccessfulHandler(){
        setInterval(updateResActComProAction,1000);
    }
});