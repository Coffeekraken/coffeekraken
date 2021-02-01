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
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const childProcess_1 = __importDefault(require("../../is/childProcess"));
const wait_1 = __importDefault(require("../../time/wait"));
const SStdio_1 = __importDefault(require("../SStdio"));
const SBlessedComponent_1 = __importDefault(require("../../blessed/SBlessedComponent"));
class SBlessedStdio extends SStdio_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(sources, settings = {}) {
        // extends SPanel
        super(sources, deepMerge_1.default({
            blessedStdio: {
                screen: true,
                attach: true,
                logInterval: 30,
                actionPrefix: true,
                blessed: {}
            }
        }, settings));
        /**
         * @name          log
         * @type          Function
         *
         * This method simply log the passed arguments
         *
         * @param       {Mixed}         ...args         The arguments you want to log
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._timeout = 0;
        this._top = 0;
        this.$container = this._createContainer();
        this.$innerContainer = this._createInnerContainer();
        this.$container.append(this.$innerContainer);
        // // listen for resizing
        // this.on('resize', () => {
        //   clearTimeout(this._resizeTimeout);
        //   this._resizeTimeout = setTimeout(() => {
        //     // this._applyTops();
        //   }, 1000);
        // });
        // this._logsBuffer = [];
        // this.on('attach', () => {
        //   this._logBuffer();
        // });
        this._logsEncryptedStack = [];
    }
    /**
     * @name          blessedStdioSettings
     * @type          ISBlessedStdioSettings
     * @get
     *
     * Access the blessedStdio settings
     *
     * @since         2.0.0
     *
     */
    get blessedStdioSettings() {
        return this._settings.blessedStdio;
    }
    _createContainer() {
        if (this.$container)
            return this.$container;
        const $container = new SBlessedComponent_1.default({
            screen: this.blessedStdioSettings.screen,
            attach: this.blessedStdioSettings.attach,
            blessed: Object.assign(Object.assign({ mouse: true, scrollable: true, alwaysScroll: true, scrollbar: {
                    ch: ' ',
                    inverse: true
                }, style: {
                    scrollbar: {
                        bg: 'yellow'
                    }
                }, top: 0, left: 0, right: 0, bottom: 0, padding: {
                    top: 1,
                    left: 2,
                    right: 2,
                    bottom: 1
                } }, (this.blessedStdioSettings.blessed || {})), { style: {
                // bg: 'red'
                } })
        });
        $container.on('show', () => {
            this.display();
        });
        $container.on('attach', () => {
            this.display();
        });
        $container.on('hide', () => {
            this.hide();
        });
        $container.on('detach', () => {
            this.hide();
        });
        return $container;
    }
    _createInnerContainer() {
        const $container = new SBlessedComponent_1.default({
            screen: false,
            attach: false,
            blessed: {
                height: 'shrink',
                top: 0,
                left: 0,
                right: 0,
                style: {
                // bg: 'cyan'
                }
            }
        });
        return $container;
    }
    /**
     *
     * @name          clear
     * @type          Function
     *
     * This method simply clear the Stdio
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            this.$innerContainer.destroy();
            this.$innerContainer = this._createInnerContainer();
            this.$container.append(this.$innerContainer);
            // this.$innerContainer.clearItems();
            // this.$innerContainer.destroy();
            // this.$innerContainer = this._createInnerContainer();
            // this.$container.append(this.$innerContainer);
            // const $parent = this.$container.parent;
            // this.$container = this._createContainer();
            // if ($parent) {
            //   $parent.append(this.$container);
            // }
            // this.$container.children.forEach(($component, i) => {
            //   $component.destroy();
            // });
            // this.$container.setContent('');
            // this.$container.screen.clearRegion(
            //   this.$container.aleft,
            //   this.$container.aleft + this.$container.width,
            //   this.$container.atop,
            //   this.$container.atop + this.$container.height
            // );
            // this.$container.screen.render();
            yield wait_1.default(0);
            // nativeConsole.log(
            //   this.$container.aleft,
            //   this.$container.aleft + this.$container.width,
            //   this.$container.atop,
            //   this.$container.atop + this.$container.height
            // );
            // this.$container.style.bg = 'red';
            // reset the stack
            //
            // this.$container.update();
            return true;
        });
    }
    _log(logObj, component) {
        return __awaiter(this, void 0, void 0, function* () {
            this._timeout += this.blessedStdioSettings.logInterval;
            yield wait_1.default(this._timeout);
            if (this._timeout >= this.blessedStdioSettings.logInterval)
                this._timeout -= this.blessedStdioSettings.logInterval;
            const $component = component.render(logObj, this._settings);
            if (this.$innerContainer.realHeight === 1) {
                $component.top = 0;
            }
            else {
                $component.top = this.$innerContainer.realHeight;
            }
            $component.on('update', () => {
                if (logObj.mt)
                    $component.top += logObj.mt;
                if (logObj.mb)
                    $component.height += logObj.mb;
            });
            this.$innerContainer.append($component);
            // scroll to bottom
            clearTimeout(this._updateTimeout);
            this._updateTimeout = setTimeout(() => {
                try {
                    this.$innerContainer.setScrollPerc(100);
                }
                catch (e) { }
                // update display
                this.$container.screen.render();
            }, 200);
        });
    }
    /**
     * @name          isDisplayed
     * @type          Function
     * @return        Boolean
     *
     * true if is displayed, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    isDisplayed() {
        return this.$container && this.$container.parent !== null;
    }
    /**
     * @name            update
     * @type            Function
     *
     * This method take the content of the this._content property and display it correctly on the screen
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    update() {
        if (childProcess_1.default())
            return;
        if (!this.isDisplayed())
            return;
        super.update();
    }
}
// register default components
const defaultBlessedStdioComponent_1 = __importDefault(require("./components/defaultBlessedStdioComponent"));
const errorBlessedStdioComponent_1 = __importDefault(require("./components/errorBlessedStdioComponent"));
const fileBlessedStdioComponent_1 = __importDefault(require("./components/fileBlessedStdioComponent"));
const headingBlessedStdioComponent_1 = __importDefault(require("./components/headingBlessedStdioComponent"));
const separatorBlessedStdioComponent_1 = __importDefault(require("./components/separatorBlessedStdioComponent"));
const warningBlessedStdioComponent_1 = __importDefault(require("./components/warningBlessedStdioComponent"));
const timeBlessedStdioComponent_1 = __importDefault(require("./components/timeBlessedStdioComponent"));
SBlessedStdio.registerComponent(defaultBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(errorBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(fileBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(headingBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(separatorBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(warningBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(timeBlessedStdioComponent_1.default);
const cls = SBlessedStdio;
exports.default = SBlessedStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsZXNzZWRTdGRpby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNCbGVzc2VkU3RkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBSWQsdUVBQWlEO0FBSWpELHlFQUFxRDtBQU1yRCwyREFBcUM7QUFPckMsdURBQWlDO0FBSWpDLHdGQUV5QztBQStEekMsTUFBTSxhQUFjLFNBQVEsZ0JBQVE7SUEwQmxDOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxPQUFPLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDaEMsaUJBQWlCO1FBQ2pCLEtBQUssQ0FDSCxPQUFPLEVBQ1AsbUJBQVcsQ0FDVDtZQUNFLFlBQVksRUFBRTtnQkFDWixNQUFNLEVBQUUsSUFBSTtnQkFDWixNQUFNLEVBQUUsSUFBSTtnQkFDWixXQUFXLEVBQUUsRUFBRTtnQkFDZixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsT0FBTyxFQUFFLEVBQUU7YUFDWjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQWtKSjs7Ozs7Ozs7O1dBU0c7UUFDSCxhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsU0FBSSxHQUFHLENBQUMsQ0FBQztRQTNKUCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTdDLHlCQUF5QjtRQUN6Qiw0QkFBNEI7UUFDNUIsdUNBQXVDO1FBQ3ZDLDZDQUE2QztRQUM3Qyw0QkFBNEI7UUFDNUIsY0FBYztRQUNkLE1BQU07UUFFTix5QkFBeUI7UUFDekIsNEJBQTRCO1FBQzVCLHVCQUF1QjtRQUN2QixNQUFNO1FBRU4sSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztJQUNoQyxD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