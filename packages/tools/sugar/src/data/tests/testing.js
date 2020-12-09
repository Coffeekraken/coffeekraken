"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var _SWebComponent = _interopRequireDefault(require("@coffeekraken/sugar/js/core/SWebComponent"));
var _getTransitionProperties = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/getTransitionProperties"));
var _scrollTop = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/scrollTop"));
var _hotkey = _interopRequireDefault(require("@coffeekraken/sugar/js/keyboard/hotkey"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com>
 */
var DrawerWebcomponent = /** @class */ (function (_super) {
    __extends(DrawerWebcomponent, _super);
    function DrawerWebcomponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DrawerWebcomponent, "defaultProps", {
        /**
         * Default props
         * @definition 		SWebComponent.defaultProps
         * @protected
          * @static
         */
        get: function () {
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
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrawerWebcomponent, "requiredProps", {
        /**
         * Return an array of required props to init the component
         * @definition      SWebComponent.requiredProps
         * @protected
         * @static
         * @return 		{Array}
         */
        get: function () {
            return ['name'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrawerWebcomponent, "physicalProps", {
        /**
         * Physical props
         * @definition 		SWebComponent.physicalProps
         * @protected
          * @static
         */
        get: function () {
            return ['name'];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Css
     * @protected
      * @static
     */
    DrawerWebcomponent.defaultCss = function (componentName, componentNameDash) {
        return "\n\t\t\t" + componentNameDash + " {\n\t\t\t\tdisplay : block;\n\t\t\t}\n      input[" + componentNameDash + "-toggle] {\n        position: fixed;\n        top:0; left: 0;\n        opacity: 0;\n        pointer-events: none;\n      }\n\t\t";
    };
    /**
     * Mount component
     * @definition 		SWebComponent.componentMount
     * @protected
     */
    DrawerWebcomponent.prototype.componentMount = function () {
        var _this = this;
        _super.prototype.componentMount.call(this);
        this.contentElm = document.querySelector("[" + this.componentNameDash + "-content]"); // try to find the drawer background
        this.bkgElm = document.querySelector("[" + this.componentNameDash + "-bkg][for=\"" + this.props.name + "\"]");
        if (!this.bkgElm) {
            this.bkgElm = document.createElement('div');
            this.mutate(function () {
                _this.bkgElm.setAttribute(_this.componentNameDash + "-bkg", true);
                _this.bkgElm.setAttribute('for', _this.props.name); // insert in the page
                _this.parentElement.insertBefore(_this.bkgElm, _this.parentElement.firstChild);
            });
        } // try to find the drawer overlay
        this.overlayElm = document.querySelector("label[is=\"" + this.componentNameDash + "-overlay\"][for=\"" + this.props.name + "\"]");
        if (!this.overlayElm) {
            this.overlayElm = document.createElement('label');
            this.overlayElm.setAttribute('for', this.props.name);
            this.overlayElm.setAttribute(this.componentNameDash + "-overlay", true);
            this.mutate(function () {
                // insert in the page
                _this.parentElement.insertBefore(_this.overlayElm, _this.parentElement.firstChild);
            });
        } // try to find the toggle
        this.toggleElm = document.querySelector("input[is=\"" + this.componentNameDash + "-toggle\"][name=\"" + this.props.name + "\"]");
        if (!this.toggleElm) {
            this.toggleElm = document.createElement('input');
            this.toggleElm.setAttribute('name', this.props.name);
            this.toggleElm.setAttribute('id', this.props.name);
            this.toggleElm.setAttribute('type', 'checkbox');
            this.toggleElm.setAttribute(this.componentNameDash + "-toggle", true);
            this.mutate(function () {
                // insert into page
                _this.parentElement.insertBefore(_this.toggleElm, _this.parentElement.firstChild);
            });
        }
        this._scrollTop = 0; // listen for change on the toggle
        this.toggleElm.addEventListener('change', function (e) {
            var name = e.target.name;
            _this.mutate(function () {
                if (e.target.checked) {
                    _this.open();
                    document.body.classList.add(_this.componentNameDash + "-" + _this.props.name);
                    if (_this.props.preventContentScroll) {
                        _this._scrollTop = (0, _scrollTop["default"])();
                        _this.contentElm.style.transition = 'none';
                        _this.mutate(function () {
                            _this.contentElm.style.transform = "translateY(-" + _this._scrollTop + "px)";
                            _this.ownerDocument.body.style.position = 'fixed';
                            _this.ownerDocument.body.style.overflow = 'hidden';
                            setTimeout(function () {
                                _this.contentElm.style.transition = '';
                            });
                        });
                    }
                }
                else {
                    _this.close();
                    document.body.classList.remove(_this.componentNameDash + "-" + _this.props.name);
                    if (_this.props.preventContentScroll) {
                        _this.contentElm.style.transition = 'none';
                        _this.mutate(function () {
                            _this.contentElm.style.transform = '';
                            _this.ownerDocument.body.style.position = '';
                            _this.ownerDocument.body.style.overflow = '';
                            window.scrollTo(0, _this._scrollTop);
                            setTimeout(function () {
                                _this.contentElm.style.transition = '';
                            });
                        });
                    }
                }
            });
        });
        if (this.props.handleHash) {
            window.addEventListener('hashchange', function (e) {
                if (document.location.hash.substr(1) === _this.props.name && !_this.isOpen()) {
                    _this.open();
                }
                else if (_this.isOpen() && document.location.hash.substr(1) !== _this.props.name) {
                    _this.close();
                }
            });
        }
        document.body.addEventListener('click', function (e) {
            if (e.target.hasAttribute(_this.componentNameDash + "-open")) {
                if (e.target.getAttribute(_this.componentNameDash + "-open") === _this.props.name || e.target.getAttribute('href').substr(1) === _this.props.name) {
                    _this.open();
                }
            }
        }); // listen for click on links into the drawer to close it
        this.addEventListener('click', function (e) {
            if (e.target.hasAttribute(_this.componentNameDash + "-close")) {
                _this.close();
                return;
            }
            if (_this.props.closeOnLinksClick) {
                if (e.target.tagName.toLowerCase() === 'a') {
                    // close the drawer
                    _this.close();
                }
            }
        }); // handle esc hotkey
        if (this.props.escapeKey) {
            (0, _hotkey["default"])('esc', function (e) {
                if (_this.isOpen()) {
                    _this.close();
                }
            });
        } // if handle hach
        if (this.props.handleHash) {
            if (document.location.hash) {
                var hash = document.location.hash.substr(1);
                if (hash == this.props.name) {
                    this.open();
                }
            }
        }
    };
    /**
      * @name        open
      * @namespace     drawer-webcomponent
      * @type      Function
      *
     * Open the drawer
      *
      * @author         Olivier Bossel <olivier.bossel@gmail.com>
     */
    DrawerWebcomponent.prototype.open = function () {
        var _this = this;
        if (this.props.handleHash) {
            document.location.hash = "#" + this.props.name;
        } // check the toggle
        this.mutate(function () {
            _this.toggleElm.checked = true;
            _this.toggleElm.setAttribute('checked', true);
            document.body.classList.add(_this.componentNameDash + "-" + _this.props.name);
        });
        return this;
    };
    /**
      * @name      close
      * @namespace     drawer-webcomponent
      * @type      Function
      *
     * Close the drawer
      *
      * @author         Olivier Bossel <olivier.bossel@gmail.com>
     */
    DrawerWebcomponent.prototype.close = function () {
        var _this = this;
        // uncheck the toggle
        this.mutate(function () {
            _this.toggleElm.checked = false;
            _this.toggleElm.removeAttribute('checked');
        }); // clear the hash
        if (this.props.handleHash) {
            document.location.hash = '';
        }
        var transition = (0, _getTransitionProperties["default"])(this);
        setTimeout(function () {
            _this.mutate(function () {
                document.body.classList.remove(_this.componentNameDash + "-" + _this.props.name);
            });
        }, transition.totalDuration);
        return this;
    };
    /**
      * @name        isOpen
      * @namespace     drawer-webcomponent
      * @type        Function
      *
     * Check if is opened
      *
     * @return 		{Boolean} 		true if opened, false if not
      *
      * @author         Olivier Bossel <olivier.bossel@gmail.com>
     */
    DrawerWebcomponent.prototype.isOpen = function () {
        return this.toggleElm.checked;
    };
    return DrawerWebcomponent;
}(_SWebComponent["default"]));
exports["default"] = DrawerWebcomponent;
module.exports = exports["default"];
//# sourceMappingURL=testing.js.map