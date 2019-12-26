"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _goldenLayout = _interopRequireDefault(require("../golden-layout"));

var _class = _interopRequireDefault(require("@coffeekraken/notification-webcomponent/js/class"));

var _SSocketDom = _interopRequireDefault(require("@coffeekraken/sugar/js/class/SSocketDom"));

var _SUrl = _interopRequireDefault(require("@coffeekraken/sugar/js/class/SUrl"));

var _aes = _interopRequireDefault(require("@coffeekraken/sugar/js/crypt/aes"));

var _innerHtml = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/innerHtml"));

var _strToHtml = _interopRequireDefault(require("@coffeekraken/sugar/js/string/strToHtml"));

var _style = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/style"));

var _lettersInReveal = _interopRequireDefault(require("@coffeekraken/text-intro/js/lettersInReveal"));

var _whenInViewport = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/whenInViewport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CodePlayground {
  constructor() {
    // init socket
    this._socketDom = this._initSocket(); // listen for compilation errors

    this._listenCompilationErrors();

    const _url = new _SUrl.default();

    this._socketDom.init().then(() => {
      // register some events
      this._registerSocketEvents(); // if we don't have any app specified, emit an error


      if (_url.pathname === '/encrypt-url') {
        this._socketDom.emit('encryptUrl');

        return;
      } else if (_url.pathname) {
        const appUrl = _aes.default.decrypt(_url.pathname.slice(1));

        if (appUrl.indexOf('github.com') > -1) {
          this._socketDom.emit('githubApp', appUrl);
        } else {
          this._socketDom.emit('noAppSpecified');

          return;
        }
      }
    }); // listen for some events


    document.addEventListener('encryptUrl', e => {
      const $input = document.querySelector(e.detail.target);
      const url = $input.value;

      const crypted = _aes.default.encrypt(url);

      document.querySelector('#encrypt-url-result').innerHTML = crypted;
    });
  }
  /**
   * Init socket
   */


  _initSocket() {
    this._socketDom = new _SSocketDom.default('http://localhost:3000', {});
    return this._socketDom;
  }
  /**
   * Register some socket events
   */


  _registerSocketEvents() {
    // loading event
    this._socketDom.registerEvent('loading', (data, settings) => {
      document.querySelector('.loading__meta').innerHTML = data;
    });

    this._socketDom.registerEvent('editors', (data, settings) => {
      const $content = document.getElementById('content');
      $content.innerHTML = `<div>${data}</div>`;
      const $nodes = $content.firstChild;
      const content = (0, _goldenLayout.default)($nodes);
    });

    this._socketDom.registerEvent('topLinks', (data, settings) => {
      (0, _innerHtml.default)(document.getElementById('top-links'), data, {
        animIn: 'fadeRight'
      });
    });

    this._socketDom.registerEvent('packageJson', (data, settings) => {
      document.getElementById('title').innerHTML = data.name;
      (0, _lettersInReveal.default)(0);
    });
  }
  /**
   * Listen for compilation errors
   */


  _listenCompilationErrors() {
    // listen for compilation error
    document.body.addEventListener('compileError', e => {
      _class.default.notify({
        type: 'error',
        title: 'Woups...',
        body: e.detail.error,
        timeout: 20000
      });
    });
  }

}

var _default = CodePlayground;
exports.default = _default;
module.exports = exports.default;