(function(factory) {
  if(typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory); // AMD
  }else if (typeof exports === 'object') {
    factory(require('jquery')); // CommonJS
  }else {
    // 全局对象  Browser globals
    factory(jQuery);
  }
})(function($) {

  // 插件实现代码 code
  var SelectMenu = function (element, options) {
    var defaults = {viewType: "menu"};
    this.settings = $.extend({}, defaults, options);
    // $(element).find("option").hide();optgroup
    
    });
  }

  // 添加到 jQuery 中
  $.fn.selectMenu = function (options) {
    options = options || {};
    $.each(this, function (index, element) {
        console.log(element);
        var instance = new SelectMenu(element, options);
    });

    return $(this);
  };
});
