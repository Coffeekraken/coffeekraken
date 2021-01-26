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
            blessed: {
                scrollable: true,
                mouse: true,
                keys: true
            }
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
        if (this._settings.attach === true && SBlessedComponent.screen) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsZXNzZWRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmxlc3NlZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxtRUFBNkM7QUFDN0Msc0RBQWdDO0FBQ2hDLG9FQUE4QztBQUM5QywyREFBcUM7QUFDckMsZ0VBQTBDO0FBRTFDLHNFQUFrRDtBQUdsRCw2RUFBdUQ7QUE0Q3ZELE1BQU0saUJBQWtCLFNBQVEsaUJBQVMsQ0FBQyxHQUFHO0lBdUUzQzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksV0FBdUMsRUFBRTtRQUNuRCxxQkFBcUI7UUFDckIsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJO1lBQ2YsTUFBTSxFQUFFLFNBQVM7WUFDakIsT0FBTyxFQUFFO2dCQUNQLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUUsSUFBSTthQUNYO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLG1DQUFtQztRQUNuQyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFDRSxDQUFDLGlCQUFpQixDQUFDLE1BQU07WUFDekIsUUFBUSxDQUFDLE1BQU0sS0FBSyxLQUFLO1lBQ3pCLENBQUMsV0FBVyxFQUNaO1lBQ0EsV0FBVyxHQUFHLElBQUksQ0FBQztZQUNuQixpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsaUJBQVMsQ0FBQyxNQUFNLENBQUM7Z0JBQzFDLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSx5QkFBeUI7Z0JBQ2hDLE1BQU0sRUFBRTtvQkFDTixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsS0FBSyxFQUFFO3dCQUNMLEVBQUUsRUFBRSxlQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLEVBQUU7d0JBQzFDLEVBQUUs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