// , "jquery.alpha", "jquery.beta"
define(["jquery", "select2"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    // $(function() {
    //     $('body').alpha().beta();
    // });
    $(document).ready(function() {
      $(".js-example-basic-single").select2();
    });
});
