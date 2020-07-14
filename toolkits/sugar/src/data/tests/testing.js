"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SWebComponent = _interopRequireDefault(require("@coffeekraken/sugar/js/core/SWebComponent"));

var _getTransitionProperties = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/getTransitionProperties"));

var _scrollTop = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/scrollTop"));

var _hotkey = _interopRequireDefault(require("@coffeekraken/sugar/js/keyboard/hotkey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 		DrawerWebcomponent
 * @namespace       drawer-webcomponent
 * @type      Class
 * @extends 	SWebComponent
 *
 * Simple webcomponent to create fully customizable drawers.
 * Features:
 * 1. Fully customizable
 * 2. Support all sides (top, right, bottom and left)
 * 3. Support 3 animation types (push, slide and reveal)
 *
 * @example 	scss
 * \@use 'node_modules/@coffeekraken/drawer-webcomponent/index' as drawer-webcomponent;
 * \@include drawer-webcomponent.classes(
 * 	$name : menu,
 * 	$side : right
 * );
 * \@include drawer-webcomponent.element(drawer) {
 * 	background-color: black;
 * 	padding: 20px;
 * }
 * \@include drawer-webcomponent.element(overlay) {
 * 	background-color: rgba(0,0,0,.5);
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
class DrawerWebcomponent extends _SWebComponent.default {
  /**
   * Default props
   * @definition 		SWebComponent.defaultProps
   * @protected
    * @static
   */
  static get defaultProps() {
    return {
      /**
       * Specify the name of the drawer to be able to access it later through the API
       * @prop
       * @type 		{String}
       */
      name: null,

      /**
       * Close the drawer when click on a link inside it
       * @prop
       * @type 		{Boolean}
       */
      closeOnLinksClick: false,

      /**
       * Specify is the `escape` key is activated and close the drawer if is opened
       * @prop
       * @type    {Boolean}
       */
      escapeKey: true,

      /**
       * Specify if need to check the hash to automatically open the drawer if match with the name
       * @prop
       * @type 		{Boolean}
       */
      handleHash: true,

      /**
       * Prevent the content from scrolling when the drawer is opened.
       * This will override your transitions on the content so be aware of that...
       * @prop
       * @type 	{Boolean}
       */
      preventContentScroll: false
    };
  }
  /**
   * Return an array of required props to init the component
   * @definition      SWebComponent.requiredProps
   * @protected
   * @static
   * @return 		{Array}
   */


  static get requiredProps() {
    return ['name'];
  }
  /**
   * Physical props
   * @definition 		SWebComponent.physicalProps
   * @protected
    * @static
   */


  static get physicalProps() {
    return ['name'];
  }
  /**
   * Css
   * @protected
    * @static
   */


  static defaultCss(componentName, componentNameDash) {
    return `
			${componentNameDash} {
				display : block;
			}
      input[${componentNameDash}-toggle] {
        position: fixed;
        top:0; left: 0;
        opacity: 0;
        pointer-events: none;
      }
		`;
  }
  /**
   * Mount component
   * @definition 		SWebComponent.componentMount
   * @protected
   */


  componentMount() {
    super.componentMount();
    this.contentElm = document.querySelector(`[${this.componentNameDash}-content]`); // try to find the drawer background

    this.bkgElm = document.querySelector(`[${this.componentNameDash}-bkg][for="${this.props.name}"]`);

    if (!this.bkgElm) {
      this.bkgElm = document.createElement('div');
      this.mutate(() => {
        this.bkgElm.setAttribute(`${this.componentNameDash}-bkg`, true);
        this.bkgElm.setAttribute('for', this.props.name); // insert in the page

        this.parentElement.insertBefore(this.bkgElm, this.parentElement.firstChild);
      });
    } // try to find the drawer overlay


    this.overlayElm = document.querySelector(`label[is="${this.componentNameDash}-overlay"][for="${this.props.name}"]`);

    if (!this.overlayElm) {
      this.overlayElm = document.createElement('label');
      this.overlayElm.setAttribute('for', this.props.name);
      this.overlayElm.setAttribute(`${this.componentNameDash}-overlay`, true);
      this.mutate(() => {
        // insert in the page
        this.parentElement.insertBefore(this.overlayElm, this.parentElement.firstChild);
      });
    } // try to find the toggle


    this.toggleElm = document.querySelector(`input[is="${this.componentNameDash}-toggle"][name="${this.props.name}"]`);

    if (!this.toggleElm) {
      this.toggleElm = document.createElement('input');
      this.toggleElm.setAttribute('name', this.props.name);
      this.toggleElm.setAttribute('id', this.props.name);
      this.toggleElm.setAttribute('type', 'checkbox');
      this.toggleElm.setAttribute(`${this.componentNameDash}-toggle`, true);
      this.mutate(() => {
        // insert into page
        this.parentElement.insertBefore(this.toggleElm, this.parentElement.firstChild);
      });
    }

    this._scrollTop = 0; // listen for change on the toggle

    this.toggleElm.addEventListener('change', e => {
      let name = e.target.name;
      this.mutate(() => {
        if (e.target.checked) {
          this.open();
          document.body.classList.add(`${this.componentNameDash}-${this.props.name}`);

          if (this.props.preventContentScroll) {
            this._scrollTop = (0, _scrollTop.default)();
            this.contentElm.style.transition = 'none';
            this.mutate(() => {
              this.contentElm.style.transform = `translateY(-${this._scrollTop}px)`;
              this.ownerDocument.body.style.position = 'fixed';
              this.ownerDocument.body.style.overflow = 'hidden';
              setTimeout(() => {
                this.contentElm.style.transition = '';
              });
            });
          }
        } else {
          this.close();
          document.body.classList.remove(`${this.componentNameDash}-${this.props.name}`);

          if (this.props.preventContentScroll) {
            this.contentElm.style.transition = 'none';
            this.mutate(() => {
              this.contentElm.style.transform = '';
              this.ownerDocument.body.style.position = '';
              this.ownerDocument.body.style.overflow = '';
              window.scrollTo(0, this._scrollTop);
              setTimeout(() => {
                this.contentElm.style.transition = '';
              });
            });
          }
        }
      });
    });

    if (this.props.handleHash) {
      window.addEventListener('hashchange', e => {
        if (document.location.hash.substr(1) === this.props.name && !this.isOpen()) {
          this.open();
        } else if (this.isOpen() && document.location.hash.substr(1) !== this.props.name) {
          this.close();
        }
      });
    }

    document.body.addEventListener('click', e => {
      if (e.target.hasAttribute(`${this.componentNameDash}-open`)) {
        if (e.target.getAttribute(`${this.componentNameDash}-open`) === this.props.name || e.target.getAttribute('href').substr(1) === this.props.name) {
          this.open();
        }
      }
    }); // listen for click on links into the drawer to close it

    this.addEventListener('click', e => {
      if (e.target.hasAttribute(`${this.componentNameDash}-close`)) {
        this.close();
        return;
      }

      if (this.props.closeOnLinksClick) {
        if (e.target.tagName.toLowerCase() === 'a') {
          // close the drawer
          this.close();
        }
      }
    }); // handle esc hotkey

    if (this.props.escapeKey) {
      (0, _hotkey.default)('esc', e => {
        if (this.isOpen()) {
          this.close();
        }
      });
    } // if handle hach


    if (this.props.handleHash) {
      if (document.location.hash) {
        let hash = document.location.hash.substr(1);

        if (hash == this.props.name) {
          this.open();
        }
      }
    }
  }
  /**
    * @name        open
    * @namespace     drawer-webcomponent
    * @type      Function
    *
   * Open the drawer
    *
    * @author 		Olivier Bossel <olivier.bossel@gmail.com>
   */


  open() {
    if (this.props.handleHash) {
      document.location.hash = `#${this.props.name}`;
    } // check the toggle


    this.mutate(() => {
      this.toggleElm.checked = true;
      this.toggleElm.setAttribute('checked', true);
      document.body.classList.add(`${this.componentNameDash}-${this.props.name}`);
    });
    return this;
  }
  /**
    * @name      close
    * @namespace     drawer-webcomponent
    * @type      Function
    *
   * Close the drawer
    *
    * @author 		Olivier Bossel <olivier.bossel@gmail.com>
   */


  close() {
    // uncheck the toggle
    this.mutate(() => {
      this.toggleElm.checked = false;
      this.toggleElm.removeAttribute('checked');
    }); // clear the hash

    if (this.props.handleHash) {
      document.location.hash = '';
    }

    const transition = (0, _getTransitionProperties.default)(this);
    setTimeout(() => {
      this.mutate(() => {
        document.body.classList.remove(`${this.componentNameDash}-${this.props.name}`);
      });
    }, transition.totalDuration);
    return this;
  }
  /**
    * @name        isOpen
    * @namespace     drawer-webcomponent
    * @type        Function
    *
   * Check if is opened
    *
   * @return 		{Boolean} 		true if opened, false if not
    *
    * @author 		Olivier Bossel <olivier.bossel@gmail.com>
   */


  isOpen() {
    return this.toggleElm.checked;
  }

}

exports.default = DrawerWebcomponent;
module.exports = exports.default;