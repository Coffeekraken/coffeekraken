"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SAction2 = _interopRequireDefault(require("../SAction"));

var _browser = _interopRequireDefault(require("../../is/browser"));

var _toQueryString = _interopRequireDefault(require("../../object/toQueryString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @name              SUrlAction
 * @namespace         js.action.browser
 * @type              Class
 *
 * This class represent an URL action that let you change the user page
 * with multiple settings like if you want the url to be opened in a popup,
 * after a timeout, etc...
 *
 * @TODO        Better documentation
 *
 * @param       {Object}        descriptorObj       The action descriptor object
 * - target (_self) {String}: Specify how you want to go to the url. Can be ```_self```, ```_blank``` or ```_popup```
 * - url (null) {String}: Specify the url where you want to send the user
 * - name (null) {String}: Specify the name of the new window. Same as the ```window.open``` name parameter
 * - specs ({}) {Object}: Specify the window specs that you want if your target is ```_blank``` or ```_popup```. Accept all the parameters that the ```window.open``` specs parameter accept in object format
 * - timeout (0) {Number}: Specify a timeout between the time you call the ```run``` method, and the time the user is actually redirected
 * @param       {Object}        [settings={}]       An object of settings to configure your action. See the ```SAction``` class documentation for more info
 *
 * @example       js
 * import SUrlAction from '@coffeekraken/sugar/js/action/browser/SUrlAction';
 * const myAction = new SUrlAction({
 *    url: 'https://google.com',
 *    target: '_popup'
 * });
 * myAction.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let SUrlAction = /*#__PURE__*/function (_SAction) {
  _inherits(SUrlAction, _SAction);

  var _super = _createSuper(SUrlAction);

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SUrlAction(descriptorObj, settings = {}) {
    _classCallCheck(this, SUrlAction);

    return _super.call(this, descriptorObj, settings);
  }
  /**
   * @name            run
   * @type            Function
   * @override
   *
   * Process to the action execution.
   *
   * @return      {SPromise}      An SPromise instance on which you can subscribe for this particular run execution process events
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SUrlAction, [{
    key: "run",
    value: function run() {
      const promise = _get(_getPrototypeOf(SUrlAction.prototype), "run", this).call(this);

      if (!(0, _browser.default)()) throw new Error(`SUrlAction: This action is meant to be used in a browser environment which seems to not be the case...`);
      setTimeout(() => {
        // switch on the target
        switch (this._descriptorObj.target) {
          case '_blank':
          case '_popup':
            const specs = this._descriptorObj.specs || {};
            let specsString = (0, _toQueryString.default)(specs).slice(1).split('&').join(',');
            window.open(this._descriptorObj.url, this._descriptorObj.name || '_blank', specsString || this._descriptorObj.target === '_popup' ? 'width=1000,height=1000' : '', this._descriptorObj.replace || false);
            break;

          case '_self':
          default:
            document.location = this._descriptorObj.url;
            break;
        } // complete


        promise.complete();
      }, this._descriptorObj.timeout || 0);
      return promise;
    }
  }]);

  return SUrlAction;
}(_SAction2.default);

exports.default = SUrlAction;
module.exports = exports.default;