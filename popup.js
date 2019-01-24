window.chromePluginDemoJquery(function () {
    var STATE_ON_TEXT = 'on';
    var STATE_OFF_TEXT = 'off';
    var $ = window.chromePluginDemoJquery;

    var watchSwitch = function (selector, getSentData) {
        $(selector).click(function (e) {
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
                chrome.tabs.sendMessage(tabs[0].id, getSentData(currentState), function (response) { });
            });
        });
    };

    watchSwitch('.J_Demo', function (currentState) {
        return {
            action: currentState === 'off' ? 'demo-run' : 'demo-destroy'
        };
    });
});
