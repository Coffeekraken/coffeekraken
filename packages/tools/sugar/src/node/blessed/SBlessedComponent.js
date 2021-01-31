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
        this._promise = new SPromise_1.default();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsZXNzZWRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmxlc3NlZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxtRUFBNkM7QUFDN0Msc0RBQWdDO0FBQ2hDLG9FQUE4QztBQUM5QywyREFBcUM7QUFDckMsZ0VBQTBDO0FBRTFDLHNFQUFrRDtBQUdsRCw2RUFBdUQ7QUFFdkQsb0VBQThDO0FBMkM5QyxNQUFNLGlCQUFrQixTQUFRLGlCQUFTLENBQUMsR0FBRztJQXVFM0M7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFdBQXVDLEVBQUU7UUFDbkQscUJBQXFCO1FBQ3JCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLElBQUk7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE9BQU8sRUFBRTtnQkFDUCxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7YUFDWDtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixtQ0FBbUM7UUFDbkMsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQ0UsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNO1lBQ3pCLFFBQVEsQ0FBQyxNQUFNLEtBQUssS0FBSztZQUN6QixDQUFDLFdBQVcsRUFDWjtZQUNBLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDbkIsaUJBQWlCLENBQUMsTUFBTSxHQUFHLGlCQUFTLENBQUMsTUFBTSxDQUFDO2dCQUMxQyxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUseUJBQXlCO2dCQUNoQyxXQUFXLEVBQUUsSUFBSTtnQkFDakIsTUFBTSxFQUFFO29CQUNOLFVBQVUsRUFBRSxJQUFJO29CQUNoQixLQUFLLEVBQUU7d0JBQ0wsRUFBRSxFQUFFLGVBQU8sQ0FBQyxrQkFB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