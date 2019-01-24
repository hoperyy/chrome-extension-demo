

(function() {
    var util = window.ChromePluginDemoUtil;

    var insetedJsId = 'chrome-plugin-demo-inserted-js';
    var insertedCssId = 'chrome-plugin-demo-inserted-css';
    var layerWrapperId = 'chrome-plugin-demo-result-layer-wrapper';

    // 监听插件发来的信息
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request && request.action === 'demo-run') {
            // content script 无法获取页面的 window 等对象，但可以共享 DOM
            if (!document.getElementById(insertedCssId)) {
                util.addCss('content-scripts/demo/inserted.css', insertedCssId);
            }
            if (!document.getElementById(insetedJsId)) {
                util.addJs('content-scripts/demo/inserted.js', insetedJsId);
            }
        } else if (request && request.action === 'demo-destroy') {
            // content script 无法获取页面的 window 等对象，但可以共享 DOM
            util.removeDomById(insertedCssId);
            util.removeDomById(insetedJsId);
            util.removeDomById(layerWrapperId);
        }
    });
})();
