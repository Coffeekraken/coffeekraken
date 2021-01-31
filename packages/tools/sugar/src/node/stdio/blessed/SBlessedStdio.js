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
                actionPrefix: true,
                blessed: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    mouse: true,
                    keys: true,
                    scrollable: true,
                    alwaysScroll: true,
                    scrollbar: {
                        ch: ' ',
                        inverse: true
                    },
                    style: {
                        scrollbar: {
                            bg: 'yellow'
                        }
                    }
                }
            }
        }, settings));
        this.stack = [];
        this.$container = new SBlessedComponent_1.default({
            screen: this._settings.blessedStdio.screen,
            attach: this._settings.blessedStdio.attach,
            blessed: Object.assign({ 
                // width: '100%',
                // height: '100%',
                top: 0, left: 0, right: 0, bottom: 0, padding: {
                    top: 1,
                    left: 2,
                    bottom: 1,
                    right: 2
                }, style: {
                    bg: 'cyan'
                } }, (this._settings.blessedStdio.blessed || {}))
        });
        this.$container.on('show', () => {
            this.display();
        });
        this.$container.on('attach', () => {
            this.display();
        });
        this.$container.on('hide', () => {
            this.hide();
        });
        this.$container.on('detach', () => {
            this.hide();
        });
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
        // this._isClearing = true;
        // // remove all items from the display list
        // this.children.forEach(($component) => {
        //   $component.detach();
        // });
        // // reset the stack
        // this.setContent('');
        // this.stack = [];
        // this._isClearing = false;
    }
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
    _log(logObj, component) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            let $lastComponent;
            // clear
            if (logObj.clear === true) {
            }
            else {
                $lastComponent = this.stack.length ? this.stack.pop() : undefined;
            }
            const type = logObj.type || 'default';
            const $component = component.render(logObj, this._settings);
            this.stack.push($component);
            if ($lastComponent) {
                $component.top = $lastComponent.top + $lastComponent.realHeight;
            }
            this.$container.append($component);
            // $component.height = $component.realHeight;
            // scroll to bottom
            clearTimeout(this._updateTimeout);
            this._updateTimeout = setTimeout(() => {
                try {
                    this.$container.setScrollPerc(100);
                }
                catch (e) { }
                // update display
                this.$container.update();
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
SBlessedStdio.registerComponent(defaultBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(errorBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(fileBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(headingBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(separatorBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(warningBlessedStdioComponent_1.default);
const cls = SBlessedStdio;
exports.default = SBlessedStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsZXNzZWRTdGRpby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNCbGVzc2VkU3RkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBSWQsdUVBQWlEO0FBSWpELHlFQUFxRDtBQWFyRCx1REFBaUM7QUFJakMsd0ZBRXlDO0FBOER6QyxNQUFNLGFBQWMsU0FBUSxnQkFBUTtJQVlsQzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2hDLGlCQUFpQjtRQUNqQixLQUFLLENBQ0gsT0FBTyxFQUNQLG1CQUFXLENBQ1Q7WUFDRSxZQUFZLEVBQUU7Z0JBQ1osTUFBTSxFQUFFLElBQUk7Z0JBQ1osTUFBTSxFQUFFLElBQUk7Z0JBQ1osWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLE9BQU8sRUFBRTtvQkFDUCxHQUFHLEVBQUUsQ0FBQztvQkFDTixJQUFJLEVBQUUsQ0FBQztvQkFDUCxNQUFNLEVBQUUsQ0FBQztvQkFDVCxLQUFLLEVBQUUsQ0FBQztvQkFDUixLQUFLLEVBQUUsTUFBTTtvQkFDYixNQUFNLEVBQUUsTUFBTTtvQkFDZCxLQUFLLEVBQUUsSUFBSTtvQkFDWCxJQUFJLEVBQUUsSUFBSTtvQkFDVixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsWUFBWSxFQUFFLElBQUk7b0JBQ2xCLFNBQVMsRUFBRTt3QkFDVCxFQUFFLEVBQUUsR0FBRzt3QkFDUCxPQUFPLEVBQUUsSUFBSTtxQkFDZDtvQkFDRCxLQUFLLEVBQUU7d0JBQ0wsU0FBUyxFQUFFOzRCQUNULEVBQUUsRUFBRSxRQUFRO3lCQUNiO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUE0RUosVUFBSyxHQUFVLEVBQUUsQ0FBQztRQTFFaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDJCQUFtQixDQUFDO1lBQ3hDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFlB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