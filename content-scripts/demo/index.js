

// content script 无法获取页面的 window 等对象，但可以共享 DOM
(function() {
    var util = window.ChromePluginDemoUtil;

    var $ = window.chromePluginDemoJquery;

    var insetedJsId = 'chrome-plugin-demo-inserted-js';
    var insertedCssId = 'chrome-plugin-demo-inserted-css';

    var localStorageStateName = 'chrome-plugin-demo-local-storage';

    // 监听 popup 发来的信息
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (!request) {
            return;
        }
        
        if (request.action === 'chrome-plugin-demo-add-inserted') {
            if (!document.getElementById(insertedCssId)) {
                util.addCss('content-scripts/demo/inserted.css', insertedCssId);
            }
            if (!document.getElementById(insetedJsId)) {
                util.addJs('content-scripts/demo/inserted.js', insetedJsId);
            }
        } else if (request.action === 'chrome-plugin-demo-remove-inserted') {
            util.removeDomById(insertedCssId);
            util.removeDomById(insetedJsId);
        }

        if (request.action === 'chrome-plugin-demo-get-state') {
            sendResponse({
                state: window.localStorage.getItem(localStorageStateName)
            });
        } else if (request.action === 'chrome-plugin-demo-set-state') {
            // 同步到 localStorage
            window.localStorage.setItem(localStorageStateName, request.targetState);
            sendResponse({
                msg: 'success'
            });

            if (request.targetState === 'on') {

            }

            if (request.targetState === 'off') {
                instance && (instance.destory());
            }
        }
    });

    if ($) {
        var currentState = window.localStorage.getItem(localStorageStateName);

        if (currentState == 'on') {
            $('body').css('background', 'green');
        }
    }
})();
