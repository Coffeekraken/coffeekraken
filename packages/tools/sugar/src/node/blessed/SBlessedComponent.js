"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const blessed_1 = __importDefault(require("blessed"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const color_1 = __importDefault(require("../color/color"));
const hotkey_1 = __importDefault(require("../keyboard/hotkey"));
const childProcess_1 = __importDefault(require("../is/childProcess"));
const onProcessExit_1 = __importDefault(require("../process/onProcessExit"));
class SBlessedComponent extends blessed_1.default.box {
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
        if (!SBlessedComponent.screen &&
            settings.screen !== false &&
            !isNewScreen) {
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
        if (this._settings.attach !== false && SBlessedComponent.screen) {
            SBlessedComponent.screen.append(this);
        }
        if (this.parent) {
            setTimeout(() => {
                if (this.isDisplayed())
                    this.update();
            });
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
        return this._isDisplayed && SBlessedComponent.getScreen() !== undefined;
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
}
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
SBlessedComponent._framerateInterval = null;
if (!childProcess_1.default()) {
    hotkey_1.default('ctrl+c', {
        once: true
    }).on('press', () => {
        if (!cls.screen)
            return;
        cls.screen.destroy();
    });
}
const cls = SBlessedComponent;
exports.default = SBlessedComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsZXNzZWRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmxlc3NlZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxtRUFBNkM7QUFDN0Msc0RBQWdDO0FBQ2hDLG9FQUE4QztBQUM5QywyREFBcUM7QUFDckMsZ0VBQTBDO0FBRTFDLHNFQUFrRDtBQUdsRCw2RUFBdUQ7QUE0Q3ZELE1BQU0saUJBQWtCLFNBQVEsaUJBQVMsQ0FBQyxHQUFHO0lBdUUzQzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksV0FBdUMsRUFBRTtRQUNuRCxxQkFBcUI7UUFDckIsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJO1lBQ2YsTUFBTSxFQUFFLFNBQVM7WUFDakIsT0FBTyxFQUFFLEVBQUU7U0FDWixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsbUNBQW1DO1FBQ25DLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUNFLENBQUMsaUJBQWlCLENBQUMsTUFBTTtZQUN6QixRQUFRLENBQUMsTUFBTSxLQUFLLEtBQUs7WUFDekIsQ0FBQyxXQUFXLEVBQ1o7WUFDQSxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ25CLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxpQkFBUyxDQUFDLE1BQU0sQ0FBQztnQkFDMUMsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLHlCQUF5QjtnQkFDaEMsTUFBTSxFQUFFO29CQUNOLFVBQVUsRUFBRSxJQUFJO29CQUNoQixLQUFLLEVBQUU7d0JBQ0wsRUFBRSxFQUFFLGVBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsRUFBRTt3QkFDMUMsRUFBRSxFQUFFLEdBQUc7d0JBQ1AsVUFBVTtxQkFDWDtvQkFDRCxLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGLENBQUMs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