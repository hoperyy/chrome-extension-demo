

(function () {
    var util = window.ChromePluginDemoUtil;
    var jqueryId = 'chrome-plugin-demo-jquery';

    if (!document.getElementById(jqueryId)) {
        util.addJs('jquery.js', jqueryId);
    }
})();
