/**
 * @author 刘远洋
 * @class 工具类
 */
import $ from '../jquery';

export default {
  addCss: function (href, id) {
    $('<link href="' + chrome.extension.getURL(href) + '" id="' + id + '" rel="stylesheet" type="text/css" />').appendTo('head');
  },
  addJs: function (src, id) {
    $('<script src="' + chrome.extension.getURL(src) + '" id="' + id + '"></script>').appendTo('body');
  },
  removeDomById: function (id) {
    $(document).find('#' + id).remove();
  },
  isSupportLocalStorage: function () {
    try {
      window.localStorage.setItem('ChromePluginDemo_testLs', '1');
      window.localStorage.getItem('ChromePluginDemo_testLs');
      window.localStorage.removeItem('ChromePluginDemo_testLs');
      return true;
    }
    catch (err) {
      return false;
    }
  }
};
