

// content script 无法获取页面的 window 等对象，但可以共享 DOM
import $ from 'jquery';

const LS_STATE_ON = 'on';
const LS_STATE_OFF = 'off';

const localStorageStateName = 'chrome-plugin-local-storage';

// 储备方法
// var insetedJsId = 'chrome-plugin-demo-inserted-js';
// var insertedCssId = 'chrome-plugin-demo-inserted-css';
// if (!document.getElementById(insertedCssId)) {
//     util.addCss('content-scripts/demo/inserted.css', insertedCssId);
// }
// if (!document.getElementById(insetedJsId)) {
//     util.addJs('content-scripts/demo/inserted.js', insetedJsId);
// }

// util.removeDomById(insertedCssId);
// util.removeDomById(insetedJsId);

// 监听 popup 发来的信息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (!request) {
        return;
    }

    if (request.action === 'chrome-plugin-get-state') {
        sendResponse({ state: window.localStorage.getItem(localStorageStateName) });
    } else if (request.action === 'chrome-plugin-set-state') {
        // 同步到 localStorage
        window.localStorage.setItem(localStorageStateName, request.targetState);
        sendResponse({ msg: 'success' });

        if (request.targetState === LS_STATE_ON) {

        }

        if (request.targetState === LS_STATE_OFF) {
            
        }
    }
});

const currentState = window.localStorage.getItem(localStorageStateName);

if (currentState == 'on') {
    // $('body').css('background', 'green');
    const $button = $('#su');
    const $input = $('#kw');

    if ($input.length) {
        $button.on('click', function () {
            const val = $input.val();
            if (val.indexOf(' -baijiahao') === -1) {
                $input.val(val + ' -baijiahao');
            }
        });
    }
}
