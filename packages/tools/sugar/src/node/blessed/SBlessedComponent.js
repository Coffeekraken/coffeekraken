"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const blessed_1 = __importDefault(require("blessed"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const color_1 = __importDefault(require("../color/color"));
const hotkey_1 = __importDefault(require("../keyboard/hotkey"));
const childProcess_1 = __importDefault(require("../is/childProcess"));
const onProcessExit_1 = __importDefault(require("../process/onProcessExit"));
/**
 * @name                  SBlessedComponent
 * @namespace           sugar.node.blessed
 * @type                  Class
 * @wip
 *
 * This class is the base one for all the sugar blessed components like input, panel, etc...
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedComponent from '@coffeekraken/sugar/node/blessed/SBlessedComponent';
 * class MyCoolComponent extends SBlessedComponent {
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 * }
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
if (!childProcess_1.default()) {
    hotkey_1.default('ctrl+c', {
        once: true
    }).on('press', () => {
        if (!global.sBlessedComponentScreen)
            return;
        global.sBlessedComponentScreen.destroy();
    });
}
const cls = (_a = class SBlessedComponent extends blessed_1.default.box {
        /**
         * @name                  constructor
         * @type                  Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            // store the settings
            settings = deepMerge_1.default({
                screen: true,
                container: true,
                framerate: null,
                attach: undefined,
                blessed: {}
            }, settings);
            // check if need to create a screen
            let isNewScreen = false;
            if (!SBlessedComponent.screen && settings.screen !== false) {
                isNewScreen = true;
                SBlessedComponent.screen = blessed_1.default.screen({
                    smartCSR: true,
                    title: '[CK] Coffeekraken Sugar',
                    cursor: {
                        artificial: true,
                        shape: {
                            bg: color_1.default('terminal.primary').toString(),
                            ch: '|'
                            // ch: '█'
                        },
                        blink: true
                    }
                });
                SBlessedComponent.screen.on('destroy', () => {
                    SBlessedComponent.screen = null;
                });
            }
            // extends parent
            super(settings.blessed || {});
            /**
             * @name                  _settings
             * @type                  ISBlessedComponentSettings
             * @private
             *
             * Store the component settings
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._settings = {};
            /**
             * @name                  update
             * @type                  Function
             *
             * This method simply update the screen if the component is a child of one
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._renderAfterNotAllowedTimeout = null;
            if (this._settings.attach !== false && isNewScreen) {
                SBlessedComponent.screen.append(this);
            }
            // save screen reference
            this._screen = SBlessedComponent.screen;
            global.sBlessedComponentScreen = SBlessedComponent.screen;
            // keep track of the component status
            this._isDisplayed = false;
            this.on('attach', () => {
                this._isDisplayed = true;
                setTimeout(() => {
                    this.update();
                }, 200);
            });
            this.on('detach', () => {
                this._isDisplayed = false;
            });
            // save the settings
            this._settings = settings;
            // set render interval if not set already
            if (settings.framerate && !SBlessedComponent._framerateInterval) {
                this.setFramerate(settings.framerate);
            }
            onProcessExit_1.default(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    global.sBlessedComponentScreen &&
                        global.sBlessedComponentScreen.destroy();
                }
                catch (e) { }
                this._destroyed = true;
                this.detach();
                return true;
            }));
            if (this.parent) {
                this.update();
            }
            else {
                this.on('attach', () => {
                    setTimeout(() => {
                        this.update();
                    });
                });
            }
        }
        get realHeight() {
            let height = this.height;
            if (typeof this.getScrollHeight === 'function') {
                try {
                    const originalHeight = this.height;
                    this.height = 0;
                    // this.render();
                    height = this.getScrollHeight();
                    this.height = originalHeight;
                    // this.render();
                }
                catch (e) { }
            }
            return height;
        }
        /**
         * @name                  setFramerate
         * @type                  Function
         *
         * This method allows you to simply change the interval timeout between the screen renders process.
         * Note that calling this will change the GLOBAL render screen interval so use with caution...
         *
         * @param       {Number}          interval          The interval between screen rendering processes in ms
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        setFramerate(framerate) {
            clearInterval(SBlessedComponent._framerateInterval);
            SBlessedComponent._framerateInterval = setInterval(() => {
                if (!this.isDisplayed())
                    return;
                this.update();
            }, 1000 / framerate);
        }
        update() {
            if (this.isDestroyed())
                return;
            if (this._screen) {
                this._screen.render();
            }
        }
        /**
         * @name                isDisplayed
         * @type                Function
         *
         * Check if the component is in the display list of the screen
         *
         * @return      {Boolean}             true if is displayed, false if not
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        isDisplayed() {
            return this._isDisplayed;
        }
        /**
         * @name                  isDestroyed
         * @type                  Function
         *
         * Check if the component (screen) has been destroyed
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        isDestroyed() {
            return this._destroyed === true;
        }
    },
    /**
     * @name                  _framerateInterval
     * @type                  Function
     * @private
     * @static
     *
     * Store the setInterval that render the screen
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a._framerateInterval = null,
    _a);
module.exports = cls;
//# sourceMappingURL=SBlessedComponent.js.map