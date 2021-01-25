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
const blessed_1 = __importDefault(require("blessed"));
const childProcess_1 = __importDefault(require("../../is/childProcess"));
const parseAndFormatLog_1 = __importDefault(require("../../log/parseAndFormatLog"));
const parseHtml_1 = __importDefault(require("../../console/parseHtml"));
const countLine_1 = __importDefault(require("../../string/countLine"));
const minimatch_1 = __importDefault(require("minimatch"));
const SBlessedComponent_1 = __importDefault(require("../../blessed/SBlessedComponent"));
const SDefaultBlessedStdioComponent_1 = __importDefault(require("./components/SDefaultBlessedStdioComponent"));
const SErrorBlessedStdioComponent_1 = __importDefault(require("./components/SErrorBlessedStdioComponent"));
const SWarningBlessedStdioComponent_1 = __importDefault(require("./components/SWarningBlessedStdioComponent"));
const SHeadingBlessedStdioComponent_1 = __importDefault(require("./components/SHeadingBlessedStdioComponent"));
class SBlessedStdio extends SBlessedComponent_1.default {
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
        super(deepMerge_1.default({
            filter: null,
            maxItems: -1,
            maxItemsByGroup: 1,
            spaceBetween: 0,
            spaceAround: 0,
            events: [
                'log',
                '*.log',
                'warn',
                '*.warn',
                'error',
                '*.error',
                'reject',
                '*.reject',
                'resolve',
                '*.resolve'
            ],
            mapTypesToEvents: {
                heading: [],
                error: [
                    'error',
                    '*.error',
                    'reject',
                    '*.reject',
                    'cancel',
                    '*.cancel'
                ],
                warning: ['warn', '*.warn']
            },
            metas: {
                spaceRight: 1,
                width: 9,
                time: false
            },
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
        }, settings));
        /**
         * @name      stack
         * @type      Object[]
         *
         * Store all the "containers" that handle components etc...
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.stack = [];
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
        this._sources = Array.isArray(sources) ? sources : [sources];
        // listen for resizing
        this.on('resize', () => {
            clearTimeout(this._resizeTimeout);
            this._resizeTimeout = setTimeout(() => {
                // this._applyTops();
            }, 1000);
        });
        this._sources.forEach((s) => {
            // subscribe to the process
            this.registerSource(s);
        });
        this._logsBuffer = [];
        this.on('attach', () => {
            this._logBuffer();
        });
        this._logsEncryptedStack = [];
    }
    /**
     * @name          registerComponent
     * @type          Function
     * @static
     *
     * This static method allows you to register a new Stdio component
     * that you will be able to use then through the "type" property of
     * the logObj passed to the SBlessedStdio instance.
     *
     * @param     {ISBlessedStdioComponentCtor}      component     The component you want to register
     * @param     {string}      [as=null]           Specify the id you want to use for this component. Overrides the static "id" property of the component itself
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerComponent(component, settings, as) {
        // make sure this component has an "id" specified
        if (component.id === undefined && as === null) {
            throw `Sorry but you try to register a component that does not have a built-in static "id" property and you don't have passed the "as" argument to override it...`;
        }
        // save the component inside the stack
        SBlessedStdio.registeredComponents[as || component.id || 'default'] = {
            component,
            settings: settings || {},
            as
        };
    }
    /**
     * @name          _logBuffer
     * @type          Function
     * @private
     *
     * This method simply take the buffered logs and log them in the feed
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _logBuffer() {
        this._logsBuffer = this._logsBuffer.filter((log) => {
            this.log(log);
            return false;
        });
    }
    /**
     * @name          registerSource
     * @type          Function
     *
     * This method simply listen to the process and log the values getted
     * from it into the panel
     *
     * @param     {SPromise}      source        The source to register
     * @param     {ISBlessedStdioSettings}     [settings={}]
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    registerSource(source, settings = {}) {
        settings = deepMerge_1.default(this._settings, settings);
        // subscribe to data
        source.on((settings.events || []).join(','), (data, metas) => {
            // protection
            if (data === undefined || data === null)
                return;
            // handle the type depending on the passed stack
            const types = Object.keys(settings.mapTypesToEvents);
            for (let i = 0; i < types.length; i++) {
                const stacks = settings.mapTypesToEvents[types[i]];
                const stacksGlob = Array.isArray(stacks) && stacks.length
                    ? `*(${stacks.join('|')})`
                    : stacks;
                if (stacksGlob.length && minimatch_1.default(metas.event, stacksGlob)) {
                    if (typeof data !== 'object') {
                        data = {
                            type: types[i],
                            value: data
                        };
                    }
                    else if (!data.type) {
                        data.type = types[i];
                    }
                    break;
                }
            }
            this.log(data);
        });
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
        this._isClearing = true;
        // remove all items from the display list
        this.children.forEach(($component) => {
            $component.detach();
        });
        // reset the stack
        this.setContent('');
        this.stack = [];
        this._isClearing = false;
    }
    log(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isDisplayed()) {
                this._logsBuffer = [...this._logsBuffer, ...args];
                return;
            }
            const logs = parseAndFormatLog_1.default(args);
            // @ts-ignore
            for (let i = 0; i < logs.length; i++) {
                const logObj = logs[i];
                let $lastContainer;
                // clear
                if (logObj.clear === true) {
                    this.clear();
                }
                else {
                    $lastContainer = this.stack.length ? this.stack.pop() : undefined;
                }
                // make sure the wanted component declared in "type" is registered
                // otherwise, fallback to "default"
                const type = SBlessedStdio.registeredComponents[logObj.type] !== undefined
                    ? logObj.type
                    : 'default';
                // instanciate a new component
                const $component = new SBlessedStdio.registeredComponents[type].component(logObj, SBlessedStdio.registeredComponents[type].settings);
                // container
                const $container = blessed_1.default.box({
                    width: `100%-${this._settings.spaceAround * 2}`,
                    top: 0,
                    left: this._settings.spaceAround,
                    scrollable: true,
                    style: {
                    // bg: 'cyan'
                    }
                });
                let $metas, metasHeight = 0;
                // build metas
                const metasObj = deepMerge_1.default(this._settings.metas, logObj.metas);
                if (metasObj !== undefined) {
                    let content = [metasObj.content || ''];
                    if (metasObj.time === true) {
                        const now = new Date();
                        let hours = now.getHours(), minutes = now.getMinutes(), seconds = now.getSeconds();
                        if (hours < 10)
                            hours = `0${hours}`;
                        if (minutes < 10)
                            minutes = `0${minutes}`;
                        if (seconds < 10)
                            seconds = `0${seconds}`;
                        content = [
                            `<cyan>${hours + ':' + minutes + ':' + seconds}</cyan>`,
                            metasObj.content || ''
                        ];
                    }
                    content = content.map((c) => {
                        c = parseHtml_1.default(c);
                        c = ' '.repeat(metasObj.width - 1 - countLine_1.default(c.trim())) + c;
                        return c;
                    });
                    content = content.filter((c) => c.trim() !== '');
                    metasHeight = content.length;
                    if (content.length > 0) {
                        $metas = blessed_1.default.box({
                            content: content.join('\n'),
                            width: metasObj.width,
                            height: 'shrink',
                            top: 0,
                            left: 0,
                            style: {
                            // bg: 'red'
                            }
                        });
                    }
                }
                if (metasObj !== undefined && $metas !== undefined) {
                    $component.left = metasObj.width + metasObj.spaceRight;
                }
                $container.append($component);
                if ($metas !== undefined) {
                    $container.append($metas);
                    $container.$metas = $metas;
                }
                $container.$component = $component;
                // append the log into the stack
                this.append($container);
                this.stack.push($container);
                // calculate the height to apply
                let contentHeight = 0;
                try {
                    contentHeight = $component.getScrollHeight();
                }
                catch (e) { }
                let containerHeight = contentHeight > metasHeight ? contentHeight : metasHeight;
                // append the component to the feed
                if ($lastContainer !== undefined) {
                    $container.top =
                        // @ts-ignore
                        $lastContainer.top +
                            // @ts-ignore
                            $lastContainer.getScrollHeight() +
                            this._settings.spaceBetween;
                }
                $container.height = containerHeight;
            }
            // scroll to bottom
            clearTimeout(this._updateTimeout);
            this._updateTimeout = setTimeout(() => {
                try {
                    this.setScrollPerc(100);
                }
                catch (e) { }
                // update display
                this.update();
            }, 200);
        });
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
/**
 * @name          registeredComponents
 * @type          Object<SBlessedStdioComponent>
 * @static
 *
 * Store the registered Stdio components
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SBlessedStdio.registeredComponents = {};
// register default components
SBlessedStdio.registerComponent(SDefaultBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(SErrorBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(SWarningBlessedStdioComponent_1.default);
SBlessedStdio.registerComponent(SHeadingBlessedStdioComponent_1.default);
const cls = SBlessedStdio;
exports.default = SBlessedStdio;
//# sourceMappingURL=SBlessedStdio.js.map