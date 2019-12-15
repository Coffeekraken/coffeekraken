"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SWebComponent = _interopRequireDefault(require("@coffeekraken/sugar/js/core/SWebComponent"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IconWebcomponent extends _SWebComponent.default {
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps() {
    return {
      /**
       * Specify the icon to display. If the icon file is `my-icon.svg`,
       * the icon parameter will be just `my-icon`.
       * @prop
       * @type    {String}
       */
      icon: null,

      /**
       * Specify the driver to use. It can be:
       * - `fonticon` : Use a font icon set
       * - `img` : Use an img tag to load the svg icon
       * - `svg` : Inline the svg directly in the page
       * - 'fontawesome` : Using fontawesome icons.
       * - `material` : Using google material icons.
       * @prop
       * @type    {String}
       */
      driver: 'svg',

      /**
       * Specify the path to the icons folder relative to the document root of your project
       * @prop
       * @type    {String}
       */
      iconsPath: '/dist/icons',

      /**
       * Specify the icon prefix to use when using the `fonticon` driver
       * @prop
       * @type    {String}
       */
      iconsPrefix: 'icon-',

      /**
       * Specify a title for the icon that will be also used as alt of the image when using img driver
       * @prop
       * @type    {String}
       */
      title: null,

      /**
       * Specify the fontawesome icons css url to use
       * @prop
       * @type    {String}
       */
      fontawesomeCssUrl: 'https://use.fontawesome.com/releases/v5.7.1/css/all.css',

      /**
       * Specify the fontawesome icons css integrity checksum
       * @prop
       * @type    {String}
       */
      fontawesomeCssIntegrity: 'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr',

      /**
       * Specify the fondation icons css url to use
       * @prop
       * @type    {String}
       */
      fondationCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css'
    };
  }
  /**
   * Css
   * @protected
   */


  static defaultCss(componentName, componentNameDash) {
    return `
      ${componentNameDash} {
        display : inline-block;
        font-size: 1em;
        vertical-align: middle;
        text-align: center;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
      }
      ${componentNameDash} img,
      ${componentNameDash} svg {
        width: auto; height: 1em;
      }
    `;
  }
  /**
   * Mount component
   * @definition    SWebComponent.componentMount
   * @protected
   */


  componentMount() {
    super.componentMount(); // load library depending on driver

    this._injectLibraryDependingOnDriver(); // generate icon html


    this._generateIconHtmlDependingOnDriver().then(html => {
      // inject the html
      this._injectIcon(html);
    }); // apply default attributes on icon


    this._applyDefaultAttributes();
  }
  /**
   * Apply default attributes on the component like aria-hidden, etc...
   */


  _applyDefaultAttributes() {
    // aria hidden
    this.setAttribute('aria-hidden', true);
  }
  /**
   * Generate the icon html depending on the driver
   */


  _generateIconHtmlDependingOnDriver() {
    switch (this.props.driver) {
      case 'fonticon':
        return Promise.resolve(`<i class="${this.props.iconsPrefix}${this.props.icon}" aria-hidden></i>`);

      case 'img':
        return Promise.resolve(`<img src="${this.props.iconsPath}/${this.props.icon}.svg" alt="${this.props.title}">`);

      case 'fontawesome':
        return Promise.resolve(`<i class="${this.props.icon}" aria-hidden></i>`);

      case 'material':
        return Promise.resolve(`<i class="material-icons" aria-hidden>${this.props.icon}</i>`);

      case 'foundation':
        return Promise.resolve(`<i class="fi-${this.props.icon}" aria-hidden></i>`);

      case 'svg':
      default:
        return Promise.resolve(this._loadSvgIcon());
    }
  }
  /**
   * Inject library depending on the driver
   */


  _injectLibraryDependingOnDriver() {
    switch (this.props.driver) {
      case 'fontawesome':
        {
          const fontawesomeElm = document.querySelector('link#s-fontawesome');
          if (fontawesomeElm) return;
          const linkFontawesomeElm = document.createElement('link');
          linkFontawesomeElm.setAttribute('id', 'fontawesome');
          linkFontawesomeElm.setAttribute('rel', 'stylesheet');
          linkFontawesomeElm.setAttribute('href', this.props.fontawesomeCssUrl);
          linkFontawesomeElm.setAttribute('integrity', this.props.fontawesomeCssIntegrity);
          linkFontawesomeElm.setAttribute('crossorigin', 'anonymous');
          document.head.appendChild(linkFontawesomeElm);
          break;
        }

      case 'material':
        {
          const materialElm = document.querySelector('link#s-material');
          if (materialElm) return;
          const linkMaterialElm = document.createElement('link');
          linkMaterialElm.setAttribute('id', 'material');
          linkMaterialElm.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');
          linkMaterialElm.setAttribute('rel', 'stylesheet');
          document.head.appendChild(linkMaterialElm);
          break;
        }

      case 'foundation':
        {
          const foundationElm = document.querySelector('link#s-foundation');
          if (foundationElm) return;
          const foundationLinkElm = document.createElement('link');
          foundationLinkElm.setAttribute('id', 'foundation');
          foundationLinkElm.setAttribute('href', this.props.fondationCssUrl);
          foundationLinkElm.setAttribute('rel', 'stylesheet');
          document.head.appendChild(foundationLinkElm);
          break;
        }

      default:
        // do nothing by default
        break;
    }
  }
  /**
   * Load the svg icon
   */


  _loadSvgIcon() {
    return new Promise(resolve => {
      _axios.default.get(`${this.props.iconsPath}/${this.props.icon}.svg`).then(response => {
        const domParser = new DOMParser();
        const docElm = domParser.parseFromString(response.data, 'text/html');
        const svgElm = docElm.querySelector('svg');
        svgElm.setAttribute('aria-hidden', true);
        resolve(svgElm.outerHTML);
      });
    });
  }
  /**
   * Inject icon
   * @param    {String}    iconHtml    The html of the icon to inject
   */


  _injectIcon(iconHtml) {
    // replace the html
    this.innerHTML = iconHtml;
  }
  /**
   * Component will receive prop
   * @definition    SWebComponent.componentWillReceiveProp
   * @protected
   */


  componentWillReceiveProp(name, newVal, oldVal) {
    super.componentWillReceiveProp(name, newVal, oldVal);

    switch (name) {
      case 'icon':
        {
          // inject the new icon
          this._generateIconHtmlDependingOnDriver().then(html => {
            this._injectIcon(html);
          });

          break;
        }

      case 'driver':
        {
          // inject library depending on driver
          this._injectLibraryDependingOnDriver();

          break;
        }

      case 'title':
        {
          if (this.props.driver === 'img') {
            this.querySelector('img').setAttribute('alt', newVal);
          }

          break;
        }

      default:
        // do nothing by default
        break;
    }
  }

}

exports.default = IconWebcomponent;
module.exports = exports.default;