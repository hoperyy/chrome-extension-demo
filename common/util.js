/**
 * @author 刘远洋
 * @class 工具类
 */

var ChromeExtention_WeidianPowerUtil = {
    addCss: function(href, id) {
        $('<link href="' + chrome.extension.getURL(href) + '" id="' + id + '" rel="stylesheet" type="text/css" />').appendTo('head');
    },
    addJs: function (src, id) {
      $('<script src="' + chrome.extension.getURL(src) + '" id="' + id + '"></script>').appendTo('body');
    },
    removeDomById: function(id) {
      $(document).find('#' + id).remove();
    },
    isSupportLocalStorage: function() {
      try {
        window.localStorage.setItem('ChromeExtention_FeHelper_testLs', '1');
        window.localStorage.getItem('ChromeExtention_FeHelper_testLs');
        window.localStorage.removeItem('ChromeExtention_FeHelper_testLs');
        return true;
      }
      catch (err) {
        return false;
      }
    }
};
