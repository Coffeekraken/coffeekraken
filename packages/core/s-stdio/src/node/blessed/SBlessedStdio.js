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
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __SStdio from '../../shared/SStdio';
import __SBlessedComponent from '@coffeekraken/sugar/node/blessed/SBlessedComponent';
class SBlessedStdio extends __SStdio {
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
        super(sources, __deepMerge({
            blessedStdio: {
                screen: true,
                attach: true,
                logInterval: 50,
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
        const $container = new __SBlessedComponent({
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
        const $container = new __SBlessedComponent({
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
            yield __wait(0);
            return true;
        });
    }
    _log(logObj, component) {
        return __awaiter(this, void 0, void 0, function* () {
            this._timeout += this.blessedStdioSettings.logInterval;
            yield __wait(this._timeout);
            if (this._timeout >= this.blessedStdioSettings.logInterval)
                this._timeout -= this.blessedStdioSettings.logInterval;
            const $component = component.render(logObj, this._settings);
            if (this.$innerContainer.realHeight === 1) {
                if (this.$innerContainer.children.length) {
                    $component.top = 1;
                }
                else {
                    $component.top = 0;
                }
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
        if (__isChildProcess())
            return;
        if (!this.isDisplayed())
            return;
        // @ts-ignore
        super.update();
    }
}
// register default components
import __defaultBlessedStdioComponent from './components/defaultBlessedStdioComponent';
import __errorBlessedStdioComponent from './components/errorBlessedStdioComponent';
import __fileBlessedStdioComponent from './components/fileBlessedStdioComponent';
import __headingBlessedStdioComponent from './components/headingBlessedStdioComponent';
import __separatorBlessedStdioComponent from './components/separatorBlessedStdioComponent';
import __warningBlessedStdioComponent from './components/warningBlessedStdioComponent';
import __timeBlessedStdioComponent from './components/timeBlessedStdioComponent';
SBlessedStdio.registerComponent(__defaultBlessedStdioComponent);
SBlessedStdio.registerComponent(__errorBlessedStdioComponent);
SBlessedStdio.registerComponent(__fileBlessedStdioComponent);
SBlessedStdio.registerComponent(__headingBlessedStdioComponent);
SBlessedStdio.registerComponent(__separatorBlessedStdioComponent);
SBlessedStdio.registerComponent(__warningBlessedStdioComponent);
SBlessedStdio.registerComponent(__timeBlessedStdioComponent);
export default SBlessedStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsZXNzZWRTdGRpby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNCbGVzc2VkU3RkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sZ0JBQWdCLE1BQU0sMENBQTBDLENBQUM7QUFDeEUsT0FBTyxRQUFxQixNQUFNLHFCQUFxQixDQUFDO0FBRXhELE9BQU8sbUJBRU4sTUFBTSxvREFBb0QsQ0FBQztBQTJENUQsTUFBTSxhQUFjLFNBQVEsUUFBUTtJQTBCbEM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNoQyxpQkFBaUI7UUFDakIsS0FBSyxDQUNILE9BQU8sRUFDUCxXQUFXLENBQ1Q7WUFDRSxZQUFZLEVBQUU7Z0JBQ1osTUFBTSxFQUFFLElBQUk7Z0JBQ1osTUFBTSxFQUFFLElBQUk7Z0JBQ1osV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsT0FBTyxFQUFFLEVBQUU7YUFDWjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQThHSjs7Ozs7Ozs7O1dBU0c7UUFDSCxhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBdEhYLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFN0MseUJBQXlCO1FBQ3pCLDRCQUE0QjtRQUM1Qix1Q0FBdUM7UUFDdkMsNkNBQTZDO1FBQzdDLDRCQUE0QjtRQUM1QixjQUFjO1FBQ2QsTUFBTTtRQUVOLHlCQUF5QjtRQUN6Qiw0QkFBNEI7UUFDNUIsdUJBQXVCO1FBQ3ZCLE1BQU07UUFFTixJQUFJLENBQUMsbUJBQW1CLEdBQUcs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