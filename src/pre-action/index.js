import util from '../../common/util';

const jqueryId = `jquery-${Date.now()}`;

if (!document.getElementById(jqueryId)) {
    util.addJs('jquery.js', jqueryId);
}
