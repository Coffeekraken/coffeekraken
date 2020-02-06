(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4,7],{

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* SmtpJS.com - v3.0.0 */
var Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () {
      var e = a.responseText;
      null != t && t(e);
    }, a.send(n);
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest("GET", e);
    t.onload = function () {
      var e = t.responseText;
      null != n && n(e);
    }, t.send();
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest();
    return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest()).open(e, n) : t = null, t;
  }
};
exports.default = Email;

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _smtp = _interopRequireDefault(__webpack_require__(89));

var _html2canvas = _interopRequireDefault(__webpack_require__(92));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                                  mail
 * @namespace                             sugar.js.log.transports
 * @type                                  Function
 *
 * Take care of sending frontend logs by email using the credentials and smtp server informations set in the config
 *
 * @param                 {String}                      message                       The message to log
 * @param                 {String}                      [type="info"]                 The log type. Can be "error", "warn", "info", "verbose", "debug", "silly"
 * @return                {Promise}                                                   A promise that will be resolved once the log process if finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (message, type = 'info', settings = {}) => {
  return new Promise(async (resolve, reject) => {
    const canvas = await (0, _html2canvas.default)(document.body);
    const imageData = canvas.toDataURL('image/jpeg');
    let contributorsArray = null;
    let contributors = settings.contributors || (await window[window._sAppName || 'SApp'].meta('contributors'));

    if (contributors) {
      contributorsArray = [];
      contributors.forEach(cont => {
        contributorsArray.push(`<a href="mailto:${cont.email}">${cont.name}</a>`);
      });
    }

    let list = '';
    let version = settings.version || (await window[window._sAppName || 'SApp'].meta('version'));

    if (version) {
      list += `<li><strong>Version:</strong> ${version}</li>`;
    }

    let homepage = settings.homepage || (await window[window._sAppName || 'SApp'].meta('homepage'));

    if (homepage) {
      list += `<li><strong>Homepage:</strong> <a href="${homepage}">${homepage}</a></li>`;
    }

    let license = settings.license || (await window[window._sAppName || 'SApp'].meta('license'));

    if (license) {
      list += `<li><strong>License:</strong> ${license}</li>`;
    }

    let keywords = settings.keywords || (await window[window._sAppName || 'SApp'].meta('keywords'));

    if (keywords) {
      list += `<li><strong>Keywords:</strong> ${keywords.join(',')}</li>`;
    }

    let author = settings.author || (await window[window._sAppName || 'SApp'].meta('author'));

    if (author) {
      list += `<li><strong>Author:</strong> ${author}</li>`;
    }

    if (contributorsArray) {
      list += `<li><strong>Contributors:</strong> ${contributorsArray.join(', ')}</li>`;
    }

    let mailConfig = await window[window._sAppName || 'SApp'].config('log.frontend.transports.mail');
    const appMeta = await window[window._sAppName || 'SApp'].meta();
    let key,
        keys = Object.keys(mailConfig);
    let n = keys.length;
    var newobj = {};

    while (n--) {
      key = keys[n];
      mailConfig[key.charAt(0).toUpperCase() + key.slice(1)] = mailConfig[key];
      delete mailConfig[key];
    }

    try {
      const _set = {
        From: `${type}@${settings.domain || appMeta.domain}`,
        Subject: `${type}@${settings.domain || appMeta.domain}`,
        Body: `
          ${message}
          <br/><br/>
          ${list}
        `,
        Attachments: [{
          name: `${window._sAppName || 'SApp'}.${type}.jpg`,
          data: imageData
        }],
        ...mailConfig,
        ...settings
      };

      _smtp.default.send(_set).then(message => {
        resolve(message);
      }).catch(error => {
        reject(error);
      });
    } catch (e) {
      console.error(e);
    }
  });
};

exports.default = _default;

/***/ })

}]);