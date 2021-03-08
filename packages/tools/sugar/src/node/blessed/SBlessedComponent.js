"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const blessed_1 = __importDefault(require("blessed"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const color_1 = __importDefault(require("../color/color"));
const hotkey_1 = __importDefault(require("../keyboard/hotkey"));
const childProcess_1 = __importDefault(require("../is/childProcess"));
const onProcessExit_1 = __importDefault(require("../process/onProcessExit"));
const innerWidth_1 = __importDefault(require("./utils/innerWidth"));
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
                scrollable: true
                // mouse: true,
                // keys: true
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
                autoPadding: true,
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
        this._promise = new s_promise_1.default();
        // save screen reference
        this._screen = SBlessedComponent.screen;
        // listen for screen resize
        this._screen.on('resize', () => {
            // update the component
            if (this.isDisplayed())
                this.update();
        });
        // keep track of the component status
        this.on('attach', () => {
            this._isDisplayed = true;
            setTimeout(() => {
                if (this.isDisplayed())
                    this.update();
            }, 50);
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
    /**
     * @name        innerWidth
     * @type        Integer
     * @get
     *
     * Access the inner width of the component. This mean the actual width
     * minus the left/right padding
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get innerWidth() {
        return innerWidth_1.default(this);
    }
    get realHeight() {
        if (!this.isDisplayed())
            return 0;
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
        this.emit('update');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsZXNzZWRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmxlc3NlZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx3RUFBaUQ7QUFDakQsc0RBQWdDO0FBQ2hDLG9FQUE4QztBQUM5QywyREFBcUM7QUFDckMsZ0VBQTBDO0FBRTFDLHNFQUFrRDtBQUdsRCw2RUFBdUQ7QUFFdkQsb0VBQThDO0FBMkM5QyxNQUFNLGlCQUFrQixTQUFRLGlCQUFTLENBQUMsR0FBRztJQXVFM0M7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFdBQXVDLEVBQUU7UUFDbkQscUJBQXFCO1FBQ3JCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLElBQUk7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE9BQU8sRUFBRTtnQkFDUCxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsZUFBZTtnQkFDZixhQUFhO2FBQ2Q7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsbUNBQW1DO1FBQ25DLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUNFLENBQUMsaUJBQWlCLENBQUMsTUFBTTtZQUN6QixRQUFRLENBQUMsTUFBTSxLQUFLLEtBQUs7WUFDekIsQ0FBQyxXQUFXLEVBQ1o7WUFDQSxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ25CLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxpQkFBUyxDQUFDLE1BQU0sQ0FBQztnQkFDMUMsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLHlCQUF5QjtnQkFDaEMsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLE1BQU0sRUFBRTtvQkFDTixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsS0FBSyxFQUFFO3dCQUNMLEVBQUUsRUFBRSxlQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLEVB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