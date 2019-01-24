
// 每次打开插件均会执行
window.chromePluginDemoJquery(function () {
    var STATE_ON_TEXT = 'on';
    var STATE_OFF_TEXT = 'off';
    var $ = window.chromePluginDemoJquery;

    $('.J_Demo').click(function (e) {
        var $target = $(this);
        var $state = $target.find('.J_State');
        var currentState = $state.text();

        if (currentState !== 'on' && currentState !== 'off') {
            return;
        }

        if (currentState == 'off') {
            $state.text(STATE_ON_TEXT);
        }

        if (currentState == 'on') {
            $state.text(STATE_OFF_TEXT);
        }

        // 同步到 localstorage
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var shouldOpen = currentState === 'off';
            chrome.tabs.sendMessage(tabs[0].id, { 
                action: shouldOpen ? 'chrome-plugin-demo-add-inserted' : 'chrome-plugin-demo-remove-inserted' 
            }, function (response) { });
            chrome.tabs.sendMessage(tabs[0].id, { 
                action: 'chrome-plugin-demo-set-state',
                targetState: shouldOpen ? 'on' : 'off'
            }, function (response) { });
        });
    });

    // 向 content script 发送消息，localStorage 获取状态
    // 初始化 on/off 状态
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'chrome-plugin-demo-get-state'
        }, function (response) {
            var $target = $('.J_Demo');

            if (!response) {
                $target.find('.J_State').text('unavailable');
                return;
            }

            var state = response.state;
            var $state = $target.find('.J_State');

            if (state == 'off') {
                $state.text(STATE_OFF_TEXT);
            } else if (state == 'on') {
                $state.text(STATE_ON_TEXT);
            } else if (state == 'undefined') {
                $state.text(_this.STATE_UNDEFINED);
            } else {
                $state.text(STATE_OFF_TEXT);
            }
        });
    });
});
