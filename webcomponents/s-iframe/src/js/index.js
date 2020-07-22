import __deepMerge from '@coffeekraken/sugar/js/object/deepMerge';
import '../scss/_bare.scss';
import {
  define,
  SWebComponent
} from '@coffeekraken/sugar/js/webcomponent/register';

export default class SIframeWebComponent extends SWebComponent(
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
      default: false
    }
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
        this._initAutoResize();
      }
    });

    // setTimeout(() => {
    //   this.contentWindow.document.body.innerHTML = this.innerHTML;
    // });
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
    this.style.height =
      this.contentWindow.document.documentElement.scrollHeight + 'px';
  }
}

define('SIframe', SIframeWebComponent, {});
