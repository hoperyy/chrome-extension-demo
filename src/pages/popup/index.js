
// 每次打开插件均会执行
import $ from 'jquery';
import './index.less';

var LS_STATE_ON = 'on';
var LS_STATE_OFF = 'off';

var ACTIVE_CLASS = 'active';

$('.J_Demo').click(function (e) {
    var $target = $(this);
    var $state = $target.find('.J_State');
    var currentState = $state.text();
    var isActive = $state.hasClass('active');

    // if (currentState !== STATE_ON_TEXT && currentState !== STATE_OFF_TEXT) {
    //     return;
    // }

    if (isActive) {
        $state.removeClass(ACTIVE_CLASS);
    } else {
        $state.addClass(ACTIVE_CLASS);
    }

    // 同步到 localstorage
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        var shouldOpen = !isActive;

        chrome.tabs.sendMessage(tabs[0].id, {
            action: shouldOpen ? 'chrome-plugin-add-inserted' : 'chrome-plugin-remove-inserted'
        }, function (response) { });


        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'chrome-plugin-set-state',
            targetState: shouldOpen ? 'on' : 'off'
        }, function (response) { });
    });
});

// 向 content script 发送消息，localStorage 获取状态
// 初始化 on/off 状态
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
        action: 'chrome-plugin-get-state'
    }, function (response) {
        var $target = $('.J_Demo');

        if (!response) {
            return;
        }

        var state = response.state;
        var $state = $target.find('.J_State');

        if (state == LS_STATE_OFF) {
            $state.removeClass('active');
        } else if (state == LS_STATE_ON) {
            $state.addClass('active');
        }
    });
});
