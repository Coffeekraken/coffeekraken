function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import __deepMerge from '../../../web_modules/@coffeekraken/sugar/js/object/deepMerge.js';
import __SRequest from '../../../web_modules/@coffeekraken/sugar/js/http/SRequest.js';
import __hotkey from '../../../web_modules/@coffeekraken/sugar/js/keyboard/hotkey.js';
import __SLitHtmlWebComponent from '../../../web_modules/@coffeekraken/sugar/js/webcomponent/SLitHtmlWebComponent.js';
import __SFiltrableInputWebComponent from '../../../web_modules/@coffeekraken/s-filtrable-input.js';

__SFiltrableInputWebComponent.define({
  name: 'SSugarUiInputNavigation'
});
/**
 * @name                SSugarUiWebComponent
 * @namespace           sugar-ui.js.webcomponents
 * @type                Webcomponent
 *
 * Represent the search based navigation in the sugar ui
 *
 * @prop        {String}            [docMapApiUrl='docMap']             Specify the docMap api url to reach
 *
 * @example             html
 * <input is="s-sugar-ui-search-navigation" />
 *
 * @since               2.0.0
 * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


let SSugarUiWebComponent = /*#__PURE__*/function (_SLitHtmlWebComponen) {
  _inherits(SSugarUiWebComponent, _SLitHtmlWebComponen);

  var _super = _createSuper(SSugarUiWebComponent);

  /**
   * @name            props
   * @type            Object
   * @static
   *
   * Store all the properties definitions
   *
   * @since           2.0.0
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SSugarUiWebComponent(settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SSugarUiWebComponent);

    _this = _super.call(this, __deepMerge({}, settings));
    _this._navigationStack = [_this._main];

    _this.on('ready', e => {
      _this.$nav.setSettings({
        props: {
          closeOnSelect: false,
          closeOnEscape: false
        },
        template: {
          item: function (itemObj, settings, lit) {
            switch (itemObj.type) {
              case 'main':
                return lit.html`
                    <i class="icon-${itemObj.icon}"></i> ${this.highlightFilter(itemObj.title)}
                `;
                break;

              case 'api':
                return lit.html`
                  <div class="seach-navigation__item-api">
                    ${itemObj.icon ? lit.html`
                      <i class="icon-${itemObj.icon}"></i> 
                    ` : ''}
                    <p class="${this.selector('list-item-title')}"><span class="${this.selector('list-item-extension')}" extension="${itemObj.extension}">${itemObj.extension}</span> ${this.highlightFilter(itemObj.title)}</p>
                    <p class="${this.selector('list-item-description')}">${this.highlightFilter(itemObj.description)}</p>
                  </div>
                `;
                break;

              default:
                return settings.template.item;
                break;
            }
          }
        }
      });

      _this._main();

      _this._initShortcuts();
    });

    return _this;
  }

  _createClass(SSugarUiWebComponent, [{
    key: "_initShortcuts",
    value: function _initShortcuts() {
      __hotkey('ctrl+p').on('press', e => {
        // put focus in the field
        this.$nav.focus();
      });

      __hotkey('escape').on('press', e => {
        if (this._navigationStack.length <= 1) {
          this.$nav.escape();
          return;
        } // pop in the stack


        this._navigationStack.pop(); // load the resulting navigation


        this._navigationStack[this._navigationStack.length - 1].call(this);
      });
    }
  }, {
    key: "_main",
    value: function _main() {
      const items = [{
        title: 'Get Started',
        icon: 'start',
        type: 'main'
      }, {
        title: 'Sugar Toolkit',
        icon: 'toolkit',
        type: 'main',
        onSelect: this._sugarToolkit.bind(this)
      }, {
        title: 'Webcomponents',
        icon: 'component',
        type: 'main',
        onSelect: this._webcomponents.bind(this)
      }, {
        title: 'API References',
        icon: 'api',
        type: 'main',
        onSelect: this._apiReferences.bind(this)
      }, {
        title: 'Community',
        icon: 'community',
        type: 'main',
        onSelect: this._community.bind(this)
      }];
      this.$nav.props.items = items;
    }
  }, {
    key: "_sugarToolkit",
    value: async function _sugarToolkit() {
      this._navigationStack.push(this._sugarToolkit);

      const items = [{
        title: 'What is Sugar?',
        icon: 'what',
        type: 'main',
        href: '/sugar/what-is-sugar'
      }, {
        title: 'Get Started',
        icon: 'start',
        type: 'main',
        href: '/sugar/get-started'
      }, {
        title: 'API References',
        icon: 'api',
        type: 'main',
        href: '/sugar/api-references'
      }];
      this.$nav.props.items = items;
    }
  }, {
    key: "_webcomponents",
    value: async function _webcomponents() {
      this._navigationStack.push(this._webcomponents);

      const items = [{
        title: 'What are Webcomponents?',
        icon: 'what',
        type: 'main',
        href: '/webcomponents/what-are-webcomponents'
      }, {
        title: 'Build your own',
        icon: 'build',
        type: 'main',
        href: '/webcomponents/build-your-own'
      }, {
        title: 'API References',
        icon: 'api',
        type: 'main',
        href: '/webcomponents/api-references'
      }];
      this.$nav.props.items = items;
    }
  }, {
    key: "_apiReferences",
    value: async function _apiReferences() {
      this._navigationStack.push(this._apiReferences); // cache


      if (this._apiReferencesItems) {
        this.$nav.props.items = this._apiReferencesItems;
        return;
      } // put the input in loading mode


      this.$nav.props.loading = true;
      const request = new __SRequest({
        url: this.props.docMapApiUrl,
        method: 'GET'
      });
      const json = await request.send(); // add the items in the navigation

      let items = Object.keys(json.data).map(key => {
        const itemObj = json.data[key];
        return {
          title: key,
          description: itemObj.description,
          type: 'api',
          extension: itemObj.extension
        };
      });
      this._apiReferencesItems = items;
      this.$nav.props.loading = false;
      this.$nav.props.items = items;
    }
  }, {
    key: "_community",
    value: async function _community() {
      this._navigationStack.push(this._community);

      const items = [{
        title: 'Github',
        type: 'main',
        href: 'https://github.com/coffeekraken'
      }, {
        title: 'Facebook',
        type: 'main',
        href: 'https://facebook.com/coffeekraken'
      }];
      this.$nav.props.items = items;
    }
  }]);

  return SSugarUiWebComponent;
}(__SLitHtmlWebComponent());

_defineProperty(SSugarUiWebComponent, "componentName", 'SSugarUi');

_defineProperty(SSugarUiWebComponent, "props", {
  docMapApiUrl: {
    type: 'String',
    description: 'Specify the docMap api url to reach in order to get the docMap JSON',
    default: 'docMap'
  }
});

_defineProperty(SSugarUiWebComponent, "template", function (props, settings, lit) {
  return lit.html`
      <div class="${this.selector('main')}">
        <a class="${this.selector('logo')}" href="https://coffeekraken.io" target="_blank">
          <i class="${this.selector('coffeekraken-logo')}"></i>
        </a>
        <div class="${this.selector('nav')}">
          <input type="text" is="s-sugar-ui-input-navigation" class="${this.selector('nav-input')}" placeholder="Search and navigation" id="nav" no-item-text="MOBILE" />
        </div>
        <div class="${this.selector('utils')}">
          <a href="https://github.com/coffeekraken" target="_blank">
            <i class="icon-github"></i>
          </a>
        </div>
      </div>`;
});

export { SSugarUiWebComponent as default };