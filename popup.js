/**
 * FeHelper弹出（下拉）页面
 * @author liuyuanyang
 */
$(function () {

    function Popup() {
        this.getDeveloper.init();
        this.visualCompare.init();
    }

    $.extend(Popup.prototype, {
        visualCompare: {
            init: function () {
                this.STATE_ON_TEXT = 'on';
                this.STATE_OFF_TEXT = 'off';
                this.STATE_UNDEFINED = 'localStorage unavailable';

                this.addEvent();

                var _this = this;

                // 从 localStorage 获取状态
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: 'visual-compare-get-state'
                    }, function (response) {
                        var $target = jQuery('.J_VisualCompare');

                        if (!response) {
                            $target.find('.J_State').text('not available');
                            return;
                        }

                        var state = response.state;

                        if (!state || state == 'off') {
                            $target.find('.J_State').text(_this.STATE_OFF_TEXT);
                        }

                        if (state == 'on') {
                            $target.find('.J_State').text(_this.STATE_ON_TEXT);
                        }

                        if (state == 'undefined') {
                            $target.find('.J_State').text(_this.STATE_UNDEFINED);
                        }

                    });
                });

            },

            addEvent: function () {
                var _this = this;

                // 菜单点击以后执行的动作
                jQuery('.J_VisualCompare').click(function (e) {
                    var $target = $(this);
                    var $state = $target.find('.J_State');
                    var currentState = $state.text();

                    if (currentState !== 'on' && currentState !== 'off') {
                        return;
                    }

                    if (currentState == 'off') {
                        $state.text(_this.STATE_ON_TEXT);
                    }

                    if (currentState == 'on') {
                        $state.text(_this.STATE_OFF_TEXT);
                    }

                    // 同步到 localstorage
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            action: 'visual-compare-set-state',
                            targetState: currentState === 'on' ? 'off' : 'on'
                        }, function (response) {
                            console.log('设置 localstorage 结果: ', response.msg);
                        });
                    });
                    // window.close();
                });
            },
        },

        getDeveloper: {
            init: function () {
                this.addEvent();
                var _this = this;
            },

            addEvent: function () {
                var _this = this;

                // 菜单点击以后执行的动作
                jQuery('.J_GetDeveloper').click(function (e) {
                    // 通知页面 js 获取开发者信息
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            action: 'get-developer-run'
                        }, function (response) {

                        });
                    });
                });
            },
        }
    });

    new Popup();
});
