// , "jquery.alpha", "jquery.beta"
define(["jquery", "jquery.alpha", "jquery.beta"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        $('body').alpha().beta();
    });
    // $(document).ready(function() {
    //   $(".js-example-basic-single").select2();
    // });
});
