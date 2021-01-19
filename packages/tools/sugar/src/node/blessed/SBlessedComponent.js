"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SPromise_1 = __importDefault(require("../promise/SPromise"));
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
                onProcessExit_1.default(() => {
                    SBlessedComponent.destroyScreen();
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
            this._settings = settings;
            this._promise = new SPromise_1.default();
            // save screen reference
            this._screen = SBlessedComponent.screen;
            // keep track of the component status
            this.on('attach', () => {
                this._isDisplayed = true;
                setTimeout(() => {
                    if (this.isDisplayed())
                        this.update();
                }, 200);
            });
            this.on('detach', () => {
                this._isDisplayed = false;
            });
            // set render interval if not set already
            if (settings.framerate && !SBlessedComponent._framerateInterval) {
                this.setFramerate(settings.framerate);
            }
            if (this._settings.attach !== false && isNewScreen) {
                SBlessedComponent.screen.append(this);
            }
            if (this.parent) {
                if (this.isDisplayed())
                    this.update();
            }
            else {
                this.on('attach', () => {
                    setTimeout(() => {
                        if (this.isDisplayed())
                            this.update();
                    });
                });
            }
        }
        /**
         * @name              getScreen
         * @type              Function
         * @static
         *
         * Get the screen initiated when using some SBlessedComponent instances
         *
         * @return      {Screen}          The blessed screen instance
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        static getScreen() {
            return SBlessedComponent.screen;
        }
        /**
         * @name              destroyScreen
         * @type              Function
         * @static
         *
         * Get the screen initiated when using some SBlessedComponent instances
         *
         * @return      {Screen}          The blessed screen instance
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        static destroyScreen() {
            if (!SBlessedComponent.getScreen())
                return;
            SBlessedComponent.getScreen().destroy();
            SBlessedComponent.screen = undefined;
        }
        get realHeight() {
            let height = this.height;
            if (typeof this.getScrollHeight === 'function') {
                try {
                    const originalHeight = this.height;
                    this.height = 0;
                    height = this.getScrollHeight();
                    this.height = originalHeight;
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
            if (this.isDestroyed() || !this.isDisplayed())
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
            return this._isDisplayed && SBlessedComponent.getScreen();
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
        /**
         * @name          emit
         * @type          Function
         *
         * emit some "events" through the SPromise instance
         *
         * @param       {String}      stack         The stack (name) of the event
         * @param       {Any}         data          The data to pass along the event
         * @return      {SPromise}                  The SPromise instance to maintain chainability
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        emit(stack, data) {
            super.emit(stack, data);
            this.emit(stack, data);
            return this;
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
if (!childProcess_1.default()) {
    hotkey_1.default('ctrl+c', {
        once: true
    }).on('press', () => {
        if (!cls.screen)
            return;
        cls.screen.destroy();
    });
}
module.exports = cls;
//# sourceMappingURL=SBlessedComponent.js.map