"use strict";
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
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const parseMarkdown_1 = __importDefault(require("../../terminal/parseMarkdown"));
const childProcess_1 = __importDefault(require("../../is/childProcess"));
const wait_1 = __importDefault(require("../../time/wait"));
const parseAndFormatLog_1 = __importDefault(require("../../log/parseAndFormatLog"));
const SDefaultBlessedOutputComponent_1 = __importDefault(require("./components/SDefaultBlessedOutputComponent"));
const SErrorBlessedOutputComponent_1 = __importDefault(require("./components/SErrorBlessedOutputComponent"));
/**
 * @name                  SOutput
 * @namespace           sugar.node.blessed
 * @type                  Class
 * @wip
 *
 * This class is a simple SPanel extended one that accesp an SOutput instance
 * to log the data's from and display an simple UI depending on the SOutput configured keys
 *
 * @param         {SOutput}            process           The SOutput instance you want to attach
 * @param         {Object}              [settings={}]     The settings object to configure your SOutput
 * - filter (null) {Function}: Specify a function that will filter the logs to display. This function will receive two parameters. The data object to log and the metas object of the SPromise instance. If you return true, the log will pass the filter. If you return false, the log will not being displayed. And if you return an updated data object, the log will be the one you returned...
 * - maxItemsByGroup (1) {Number}: Specify the number of logs to display by group
 * - clearOnStart (true) {Boolean}: Specify if you want your output to be cleared when received any events matching this pattern: "*.start"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo        Support the "maxItems" setting
 * @todo        Listen for errors and display them correctly
 * @todo      Listen for resizing and replace components correctly
 *
 * @example         js
 * import SOutput from '@coffeekraken/sugar/node/terminal/SOutput';
 * const myPanel = new SOutput(myProcess, {
 *    screen: true
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls = (_a = class SBlessedOutput extends SBlessedComponent_1.default {
        /**
         * @name          constructor
         * @type          Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            // extends SPanel
            super(deepMerge_1.default({
                sources: null,
                filter: null,
                maxItems: -1,
                maxItemsByGroup: 1,
                spaceBetween: 1,
                stacks: ['log', '*.log', 'warning', '*.warning', 'warn', '*.warn'],
                blessed: {
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    scrollable: true,
                    scrollbar: true,
                    // alwaysScroll: true,
                    style: {
                        bg: 'yellow',
                        scrollbar: {
                            fg: 'red',
                            bg: 'cyan'
                        }
                    }
                }
            }, settings));
            this.stack = [];
            /**
             * @name          _process
             * @type          SOutput
             * @private
             *
             * Store the SOutput instance
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._process = null;
            /**
             * @name          _content
             * @type          Array
             * @private
             *
             * Store the content depending on his formatting style like groups, etc...
             *
             * @since         2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._content = [];
            /**
             * @name          $logBox
             * @type          blessed.Box
             * @private
             *
             * Store the actual box where the logs will be pushed
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this.$logBox = null;
            /**
             * @name           $headerBox
             * @type          blessed.box
             * @private
             *
             * Store the header content if a log object has the property "type" to "header"
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this.$headerBox = null;
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
            this._currentModuleId = null;
            /**
             * @name            update
             * @type            Function
             *
             * This method take the content of the this._content property and display it correctly on the screen
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._lastY = 1;
            this._lastContentCount = 0;
            this.$logBoxChilds = [];
            this._updateTimeout = null;
            this._updateCountdown = 0;
            // listen for resizing
            this.on('resize', () => {
                clearTimeout(this._resizeTimeout);
                this._resizeTimeout = setTimeout(() => {
                    // this._applyTops();
                }, 1000);
            });
            if (this._settings.sources !== null) {
                const sources = !Array.isArray(this._settings.sources)
                    ? [this._settings.sources]
                    : this._settings.sources;
                sources.forEach((s) => {
                    // subscribe to the process
                    this.registerSource(s);
                });
            }
        }
        /**
         * @name          registerComponent
         * @type          Function
         * @static
         *
         * This static method allows you to register a new output component
         * that you will be able to use then through the "type" property of
         * the logObj passed to the SBlessedOutput instance.
         *
         * @param     {ISBlessedOutputComponentCtor}      component     The component you want to register
         * @param     {string}      [as=null]           Specify the id you want to use for this component. Overrides the static "id" property of the component itself
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        static registerComponent(component, settings = {}, as = null) {
            // make sure this component has an "id" specified
            if (component.id === undefined && as === null) {
                throw `Sorry but you try to register a component that does not have a built-in static "id" property and you don't have passed the "as" argument to override it...`;
            }
            // save the component inside the stack
            SBlessedOutput.registeredComponents[as || component.id] = {
                component,
                settings,
                as
            };
        }
        /**
         * @name          registerSource
         * @type          Function
         *
         * This method simply listen to the process and log the values getted
         * from it into the panel
         *
         * @param     {SPromise}      source        The source to register
         * @param     {ISBlessedOutputSettings}     [settings={}]
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        registerSource(source, settings = {}) {
            settings = deepMerge_1.default(this._settings, settings);
            // subscribe to data
            source.on(settings.stacks.join(','), (data, metas) => {
                this.log(data);
            });
        }
        /**
         *
         * @name          clear
         * @type          Function
         *
         * This method simply clear the output
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        clear() {
            return __awaiter(this, void 0, void 0, function* () {
                // remove all items from the display list
                this.stack.forEach(($component) => {
                    $component.detach();
                });
                // reset the stack
                this.stack = [];
                return true;
            });
        }
        _processMarkdown(content) {
            content = content.trim();
            content = parseMarkdown_1.default(content);
            return content;
        }
        log(...args) {
            const logs = parseAndFormatLog_1.default(args);
            // @ts-ignore
            logs.forEach((logObj) => __awaiter(this, void 0, void 0, function* () {
                const $lastComponent = this.stack.length ? this.stack.pop() : null;
                // clear
                if (logObj.clear === true) {
                    yield this.clear();
                }
                // make sure the wanted component declared in "type" is registered
                // otherwise, fallback to "default"
                const type = SBlessedOutput.registeredComponents[logObj.type] !== undefined
                    ? logObj.type
                    : 'default';
                // instanciate a new component
                const $component = new SBlessedOutput.registeredComponents[type].component(logObj, SBlessedOutput.registeredComponents[type].settings);
                // append the component to the feed
                if ($lastComponent !== null) {
                    // $component.top = $lastComponent.top + $lastComponent.height;
                    $component.top =
                        $lastComponent.top +
                            $lastComponent.getScrollHeight() +
                            this._settings.spaceBetween;
                }
                $component.left = 4;
                this.append($component);
                // append the log into the stack
                this.stack.push($component);
            }));
            // scroll to bottom
            this.setScrollPerc(100);
            // update display
            this.update();
        }
        /**
         * @name            _applyTops
         * @type            Function
         * @private
         *
         * This method take all the components in the stack and apply the top to each one
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _applyTops() {
            return __awaiter(this, void 0, void 0, function* () {
                let currentTop = 0;
                // loop on each of the components
                for (let i = 0; i < this.stack.length; i++) {
                    const $component = this.stack[i];
                    $component.top = currentTop;
                    // $component.height: 0;
                    // $component.screen.render();
                    // await __wait(10);
                    currentTop += $component.realHeight + this._settings.spaceBetween;
                }
                yield wait_1.default(10);
                this.screen.render();
            });
        }
        update() {
            if (childProcess_1.default())
                return;
            if (!this.isDisplayed())
                return;
        }
        /**
         * @name          _createLogBox
         * @type          Function
         * @private
         *
         * This method take the registered keys in the process and generate a nice and clean UI for it
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _createLogBox() {
            // this.$logBox = __blessed.box({
            //   // width: '100%-4',
            //   top: 0,
            //   left: 0,
            //   right: 0,
            //   bottom: 0,
            //   style: {},
            //   mouse: true,
            //   keys: true,
            //   scrollable: true,
            //   scrollbar: {
            //     ch: ' ',
            //     inverse: true
            //   },
            //   style: {
            //     bg: 'red',
            //     scrollbar: {
            //       bg: __color('terminal.primary').toString()
            //     }
            //   },
            //   padding: {
            //     top: 0,
            //     left: 2,
            //     right: 2,
            //     bottom: 0
            //   }
            // });
            // this.append(this.$logBox);
        }
    },
    /**
     * @name          registeredComponents
     * @type          Object<SBlessedOutputComponent>
     * @static
     *
     * Store the registered output components
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.registeredComponents = {},
    _a);
// register default components
cls.registerComponent(SDefaultBlessedOutputComponent_1.default);
cls.registerComponent(SErrorBlessedOutputComponent_1.default);
module.exports = cls;
//# sourceMappingURL=module.js.map