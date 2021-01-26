"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const minimatch_1 = __importDefault(require("minimatch"));
const SClass_1 = __importDefault(require("../class/SClass"));
const parseAndFormatLog_1 = __importDefault(require("../log/parseAndFormatLog"));
/**
 * @name          SStdio
 * @namespace     sugar.node.stdio
 * @type          Class
 * @wip
 *
 * This class represent the base one for all the "Stdio"
 * compatible setting.
 *
 * @param     {ISStdioCtorSettings}     [settings={}]       Some settings to configure your Stdio
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SStdio from '@coffeekraken/sugar/node/stdio/SStdio';
 * class MyCoolStdio extends SStdio {
 *    constructor(sources, settings = {}) {
 *      super(sources, settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SStdio extends SClass_1.default {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(sources, settings = {}) {
        super(deepMerge_1.default({
            stdio: {
                filter: null,
                maxItems: -1,
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
                    time: false
                }
            }
        }, settings));
        /**
         * @name      _logsBuffer
         * @type      ILog[]
         * @private
         *
         * Store the logs that does not have been displayed yet
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._logsBuffer = [];
        this.sources = Array.isArray(sources) ? sources : [sources];
        this.sources.forEach((s) => {
            // subscribe to the process
            this.registerSource(s);
        });
        // this.expose(
        //   new __SEventEmitter({
        //     id: this.id
        //   }),
        //   {
        //     as: 'eventEmitter',
        //     props: ['on', 'off', 'emit', 'pipe', 'pipeFrom', 'pipeTo']
        //   }
        // );
    }
    /**
     * @name          registerComponent
     * @type          Function
     * @static
     *
     * This static method allows you to register a new Stdio component
     * that you will be able to use then through the "type" property of
     * the logObj passed to the STerminalStdio instance.
     *
     * @param     {ISStdioComponentCtor}      component     The component you want to register
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
        if (!this.registeredComponents[this.name])
            this.registeredComponents[this.name] = {};
        // save the component inside the stack
        this.registeredComponents[this.name][as || component.id || 'default'] = {
            component,
            settings: settings || {},
            as
        };
    }
    /**
     * @name      stdioSettings
     * @type      ISStdioSettings
     * @get
     *
     * Access the stdio settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get stdioSettings() {
        return this._settings.stdio;
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
    registerSource(source, settings) {
        settings = deepMerge_1.default(this._settings.stdio || {}, settings);
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
     * @name      log
     * @type      Function
     *
     * This method is the one called to log something.
     * It will call the ```_log``` method that each implementation of the
     * SStdio class MUST have
     *
     * @param         {ILog[]}        ...logObj      The log object(s) you want to log
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    log(...logObj) {
        logObj.forEach((log) => {
            log = parseAndFormatLog_1.default(log);
            // clear
            if (log.clear === true) {
                if (typeof this.clear !== 'function')
                    throw new Error(`You try to clear the "<yellow></yellow>" stdio but it does not implements the "<cyan>clear</cyan>" method`);
                this.clear();
            }
            // get the correct component to pass to the _log method
            let componentObj = this.constructor.registeredComponents[this.constructor.name][log.type || 'default'];
            if (!componentObj)
                throw new Error(`Sorry but the requested "<yellow>${log.type || 'default'}</yellow>" in the "<cyan>${this.constructor.name}</cyan>" stdio class does not exists...`);
            if (typeof componentObj.component.render !== 'function') {
                throw new Error(`Your "<yellow>${componentObj.component.id}</yellow>" stdio "<cyan>${this.constructor.name}</cyan>" component does not expose the required function "<magenta>render</magenta>"`);
            }
            this._log(log, componentObj.component);
        });
    }
}
/**
 * @name    registeredComponents
 * @type    ISStdioRegisteredComponents
 * @static
 *
 * Store the registered stdio components
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SStdio.registeredComponents = {};
exports.default = SStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0ZGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N0ZGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQUM5QywwREFBb0M7QUFFcEMsNkRBQW9EO0FBSXBELGlGQUEyRDtBQWtDM0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxNQUFPLFNBQVEsZ0JBQVE7SUF1RjNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsT0FBMEMsRUFDMUMsV0FBZ0MsRUFBRTtRQUVsQyxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRTtnQkFDTCxNQUFNLEVBQUUsSUFBSTtnQkFDWixRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNaLFlBQVksRUFBRSxDQUFDO2dCQUNmLFdBQVcsRUFBRSxDQUFDO2dCQUNkLE1BQU0sRUFBRTtvQkFDTixLQUFLO29CQUNMLE9BQU87b0JBQ1AsTUFBTTtvQkFDTixRQUFRO29CQUNSLE9BQU87b0JBQ1AsU0FBUztvQkFDVCxRQUFRO29CQUNSLFVBQVU7b0JBQ1YsU0FBUztvQkFDVCxXQUFXO2lCQUNaO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixPQUFPLEVBQUUsRUFBRTtvQkFDWCxLQUFLLEVBQUU7d0JBQ0wsT0FBTzt3QkFDUCxTQUFTO3dCQUNULFFBQVE7d0JBQ1IsVUFBVTt3QkFDVixRQUFRO3dCQUNSLFVBQVU7cUJBQ1g7b0JBQ0QsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztpQkFDNUI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxLQUFLO2lCQUNaO2FBQ0Y7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFuSEo7Ozs7Ozs7OztXQVNHO1FBQ0gsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUEwR3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FB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