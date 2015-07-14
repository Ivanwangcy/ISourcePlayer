var hrefstr = window.location.href;
var player = undefined;
	var currentPath = 'http://content.bitsontherun.com/videos/3XnJSIm4-52qL9xLP.mp4';
	var teachingActivityDetailsId = 0;
	var resourceInfoId = 0;
	var tomcatBaseURL = "http://localhost/";
	var paramStr = hrefstr.split("?");

	if(paramStr.length > 0)	{
		// var currentBaseURL = paramStr[0].split("ISAudioPlayer")[0];
		var currentBaseURL = location.protocol + "//" + location.host + "/";
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

			if(tomcatParamsArr.length >= 3){
				teachingActivityDetailsId = tomcatParamsArr[2];
			}
		}
	}


  /**
   * 与服务器端交互功能, 存取视频播放时长, 加载上次播放时长
   * */
  /**
   * 服务器方法
   * */
 // setInterval(updateResActComProAction,60000);

  if(teachingActivityDetailsId){
  //  getLastViewLocationInfo();
  	saveResourceBrowserScanNumber();
    updateResActComProAction();
    setInterval(updateResActComProAction,60000);
  }
  setInterval(saveResourceBrowserDuration,60000);


  /**
   * 保存视频资源观看时长
   * */
  function saveResourceBrowserDuration(){
      var requestVars = {teachingActivityDetailsId:teachingActivityDetailsId};
      requestVars.resourceInfoId = resourceInfoId;
      if(player){
        requestVars.lastViewLocation = Math.round(player.currentTime) ? Math.round(player.currentTime) : 0;
      }
      var url = tomcatBaseURL + "/saveResourceBrowserDuration.action";
      sendServer(requestVars,url,loaderSuccessfulHandler);
  }

	function saveResourceBrowserScanNumber(){
      var requestVars = {teachingActivityDetailsId:teachingActivityDetailsId};
      requestVars.resourceInfoId = resourceInfoId;
      var url = tomcatBaseURL + "/saveResourceBrowserScanNumber.action";
      sendServer(requestVars,url,loaderSuccessfulHandler);
  }
  /**
   * 更新教学活动视频资源观看时长
   * */
  function updateResActComProAction(){
      var requestVars = {teachingActivityDetailsId:teachingActivityDetailsId,
          };
          if(player){
            requestVars.lastViewLocation = Math.round(player.currentTime) ? Math.round(player.currentTime) : 0;
          }
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
	  $.ajax({
	     type: "POST",
	     url: url,
	     cache: false,
	     dataType: 'jsonp',
	     data: requestVars,
	     success: callback
	  });
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
  function loaderSuccessfulHandler(data){
    console.info(data);
  }
