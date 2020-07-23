import __deepMerge from '@coffeekraken/sugar/js/object/deepMerge';
import '../scss/_bare.scss';
import {
  define,
  SWebComponent,
  SLitHtmlWebComponent
} from '@coffeekraken/sugar/js/webcomponent/register';

export default class SIframeWebComponent extends SLitHtmlWebComponent(
  HTMLIFrameElement
) {
  static props = {
    frameborder: {
      physical: true,
      default: 0
    },
    scrolling: {
      physical: true,
      default: 'yes'
    },
    autoResize: {
      default: false,
      watch: true
    },
    loading: {
      default: true,
      watch: true,
      physical: true
    }
  };

  static template = (props, component, settings, lit) => {
    return lit.html`
      ${component}
      <div class="${component.className('loading')}">
        <div class="${component.className('loading__loader')}"></div>
      </div>
    `;
  };

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(__deepMerge({}, settings));

    this.on('ready', () => {
      // check auto-resize
      if (this.prop('autoResize')) {
        console.log('REs');
        this._initAutoResize();
      }
      // listen for load event
      this.addEventListener('load', () => {
        this.prop('loading', false);
      });
    });
  }

  /**
   * @name        _initAutoResize
   * @type        Function
   * @private
   *
   * Initialize the auto resize behavior
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  _initAutoResize() {
    // listen for window resize
    let resizeTimeout;
    window.addEventListener('resize', (e) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this._applyResize();
      }, 100);
    });
    // listen for loaded event
    this.addEventListener('load', () => {
      this._applyResize();
    });
    // apply first resize
    this._applyResize();
  }

  /**
   * @name        _applyResize
   * @type        Function
   * @private
   *
   * Apply the resize behavior
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _applyResize() {
    if (!this.prop('autoResize')) return;
    this.style.height =
      this.contentWindow.document.documentElement.scrollHeight + 'px';
  }
}

define('SIframe', SIframeWebComponent, {});
