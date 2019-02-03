

// content script 无法获取页面的 window 等对象，但可以共享 DOM
import $ from 'jquery';
import config from '../../common/config';

const localStorageStateName = `${config.pluginName}-local-storage`;

// 监听 popup 发来的信息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (!request) {
        return;
    }

    if (request.action === `${config.pluginName}-get-state`) {
        sendResponse({ state: window.localStorage.getItem(localStorageStateName) });
    }
    
    if (request.action === `${config.pluginName}-set-state`) {
        // 同步到 localStorage
        window.localStorage.setItem(localStorageStateName, request.targetState);
        sendResponse({ msg: 'success' });
    }
});

const currentState = window.localStorage.getItem(localStorageStateName);

if (currentState == 'on') {
    // $('body').css('background', 'green');
    const $button = $('#su');
    const $input = $('#kw');

    if ($input.length) {
        // 创建一个浮层
        $button.on('click', () => {
            const val = $input.val();
            if (val && val.indexOf(' -baijiahao') === -1) {
                $input.val(val + ' -baijiahao');
            }
        });
    }
}
