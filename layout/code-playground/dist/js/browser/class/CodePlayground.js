"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _class = _interopRequireDefault(require("@coffeekraken/notification-webcomponent/js/class"));

var _SSocketDom = _interopRequireDefault(require("../../../../../../util/sugar/dist/js/class/SSocketDom"));

var _SUrl = _interopRequireDefault(require("../../../../../../util/sugar/dist/js/class/SUrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CodePlayground {
  constructor() {
    // init socket
    this._socketDom = this._initSocket(); // listen for compilation errors

    this._listenCompilationErrors();

    const _url = new _SUrl.default(); // get the encrypted app string


    const _appString = _url.query.app;
    console.log(_url);

    this._socketDom.init().then(() => {
      // if we don't have any app specified, emit an error
      if (!_appString) {
        this._socketDom.emit('noAppSpecified');

        return;
      }
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