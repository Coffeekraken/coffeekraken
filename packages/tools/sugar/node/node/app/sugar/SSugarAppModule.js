"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = __importDefault(require("../../is/class"));
const plainObject_1 = __importDefault(require("../../is/plainObject"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const SSugarAppModuleSettingsInterface_1 = __importDefault(require("./interface/SSugarAppModuleSettingsInterface"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const hotkey_1 = __importDefault(require("../../keyboard/hotkey"));
const SBlessedStdio_1 = __importDefault(require("../../stdio/blessed/SBlessedStdio"));
const blessed_1 = __importDefault(require("blessed"));
const stdio_1 = __importDefault(require("../../stdio/stdio"));
const SSugarAppModuleInterface_1 = __importDefault(require("./interface/SSugarAppModuleInterface"));
class SSugarAppModule extends s_promise_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(moduleObjDescriptor, settings) {
        super(deepMerge_1.default({
            id: moduleObjDescriptor.id,
            sugarAppModule: {
                mainProcessId: 'main',
                processIdUsedForState: undefined
            }
        }, settings || {}));
        /**
         * @name          state
         * @type          String
         * @values        loading,ready,running,error
         * @default       loading
         *
         * Store the module state
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._state = 'loading';
        /**
         * @name          shortcuts
         * @type          ISSugarAppModuleShortcuts
         *
         * Store the shortcuts provided
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.shortcuts = {};
        /**
         * @name          stdio
         * @type          Function
         * @get
         *
         * Access the blessed based UI of this module
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.stdios = {};
        /**
         * @name        _active
         * @type        Boolean
         * @private
         *
         * Store the module state. Active mean that the shortcuts and all the other features
         * of this module can be used
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._active = false;
        /**
         * @name      _moduleProcesses
         * @type      Object
         * @private
         *
         * Store all the "SProcess" instances initiated during the ```start``` phase
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._moduleProcesses = {};
        /**
         * @nane        $stdio
         * @type        blessed.box|SBlessedStdio
         *
         * Store the stdio instance used to be displayed in the GUI
         *
         * @since       2.0.'0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.$stdio = undefined;
        this._moduleObjDescriptor = moduleObjDescriptor;
        // __SIpc.on('sugar.ui.displayedModule', (moduleId) => {
        //   this._active = this.id === moduleId;
        // });
        // @todo    replace this with new interface class
        SSugarAppModuleSettingsInterface_1.default.apply(this._settings);
        // register the module in the list
        SSugarAppModule._registeredModulesArray.push(this);
        this.on('finally', () => {
            const idx = SSugarAppModule._registeredModulesArray.indexOf(this);
            if (idx === -1)
                return;
            SSugarAppModule._registeredModulesArray.splice(idx, 1);
        });
        // init shortcuts
        this._initShortcuts();
        // init the Stdios
        const stdios = Array.isArray(this._moduleObjDescriptor.stdio)
            ? this._moduleObjDescriptor.stdio
            : [this._moduleObjDescriptor.stdio].map((i) => i !== undefined);
        stdios.forEach((stdio) => {
            let stdioSettings = {
                blessedStdio: {
                    attach: false
                }
            }, stdioId, stdioArg = stdio;
            if (plainObject_1.default(stdio)) {
                stdioArg = stdio.stdio;
                stdioSettings = deepMerge_1.default(stdioSettings, stdio.settings || {});
                stdioId = stdio.id;
            }
            // define the stdioId
            if (!stdioId) {
                if (class_1.default(stdioArg))
                    stdioId = stdioArg.name;
                else if (plainObject_1.default(stdio))
                    stdioId = stdio.id;
                else if (typeof stdioArg === 'string')
                    stdioId = stdioArg;
            }
            const stdioInstance = stdio_1.default(this, stdioArg, stdioSettings);
            if (stdioInstance instanceof SBlessedStdio_1.default ||
                stdioInstance instanceof blessed_1.default.box) {
                // @ts-ignore
                this.$stdio = stdioInstance.$container || stdioInstance;
            }
            if (stdioInstance) {
                this.stdio(stdioId || 'unknown', stdioInstance);
            }
        });
        // listen when ready
        this.on('state.ready:1', this._onReady.bind(this));
    }
    state(value) {
        if (!value)
            return this._state;
        // emit an event
        this.emit(`state.${value}`, true);
        this.emit('state', value);
        this._state = value;
    }
    /**
     * @name          description
     * @type          String
     * @get
     *
     * Access the module description
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get description() {
        return this._moduleObjDescriptor.description;
    }
    /**
     * @name          params
     * @type          Object
     *
     * Store the passed module parameters
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get params() {
        return this._moduleObjDescriptor.params;
    }
    /**
     * @name          settings
     * @type          Object
     *
     * Store the passed module settings
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get settings() {
        return this._moduleObjDescriptor.settings;
    }
    /**
     * @name          processPath
     * @type          String
     *
     * Store the passed module process path
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get processPath() {
        return this._moduleObjDescriptor.processPath;
    }
    stdio(id = 'terminal', value) {
        if (value) {
            this.stdios[id] = value;
            this.emit('stdio', {
                id,
                instance: value
            });
            this.emit(`stdio.${id}`, value);
        }
        return this.stdios[id];
    }
    static getRegisteredModules() {
        return this._registeredModulesArray;
    }
    /**
     * @name          getRegisteredModuleById
     * @type          Function
     * @static
     *
     * This static method allows you to get back one of the registered modules using his id
     *
     * @param       {String}          id              The id of the module you want back
     * @return      {Array<SSugarAppModule>}           The list of all the registered modules
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static getRegisteredModuleById(id) {
        return this._registeredModulesArray.filter((module) => {
            return module.id === id;
        })[0];
    }
    /**
     * @name          _onReady
     * @type          Function
     * @private
     *
     * Called when the module is ready
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _onReady() {
        // // listen for presets
        // this.on('preset', (presetObj) => {
        //   // kill the current process if already one
        //   const processId = presetObj.process || this._settings.mainProcessId;
        //   const pro = this.getProcess(processId);
        //   if (pro.isRunning()) {
        //     pro.kill(
        //       `Killing the current "<yellow>${processId}</yellow>" process`
        //     );
        //   }
        //   // merging the params with the preset params
        //   const presetParams = __deepMerge(
        //     this.params || {},
        //     presetObj.params || {}
        //   );
        //   // running the process with the new params
        //   pro.run(presetParams);
        // });
        if (this._moduleObjDescriptor.autoRun === true) {
            this.process.run(this._moduleObjDescriptor.params || {});
        }
    }
    /**
     * @name          process
     * @type          SProcess
     * @get
     *
     * Access the "main" registered process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get process() {
        return this._moduleProcesses[this._settings.mainProcessId];
    }
    /**
     * @name          processIdUsedForState
     * @type          String
     * @get
     *
     * Get the process id that is used for setting the module state
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get processIdUsedForState() {
        if (this._settings.processIdUsedForState === undefined)
            return this._settings.mainProcessId;
        return this._settings.processIdUsedForState;
    }
    /**
     * @name          activate
     * @type          Function
     *
     * This method allows you to activate the module.
     * This mean that the shortcuts, etc will be usable
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    activate() {
        if (this._active === true)
            return;
        this._active = true;
        this.emit('activate', true);
    }
    /**
     * @name          unactivate
     * @type          Function
     *
     * This method allows you to unactivate the module.
     * This mean that the shortcuts, etc will be unusable
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    unactivate() {
        if (this._active === false)
            return;
        this._active = false;
        this.emit('unactivate', true);
    }
    /**
     * @name          isActive
     * @type          Function
     *
     * This method simply return true or false depending on the active module state
     *
     * @return    {Boolean}       true if the module is active (displayed), false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    isActive() {
        return this._active;
    }
    /**
     * @name          ready
     * @type          Function
     *
     * This method simply notify the main SugarUi class that this module
     * is ready
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    ready() {
        setTimeout(() => {
            this.state('ready');
            setTimeout(() => {
                if (this.state() === 'error') {
                    this.emit('warning', {
                        value: `The module <red>${this._settings.name || this._settings.id}</red> cannot start correctly because of an error...`
                    });
                    return;
                }
                // this.emit('log', {
                //   value: `<yellow>${
                //     this._settings.name || this._settings.id
                //   }</yellow> module is <green>ready</green>`
                // });
            });
        });
    }
    /**
     * @name          error
     * @type          Function
     *
     * This method simply notify the main SugarUi class that this module
     * has an error
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    error() {
        setTimeout(() => {
            this.state('error');
            setTimeout(() => {
                this.emit('log', {
                    value: `<yellow>${this._settings.name || this._settings.id}</yellow> module is in <red>error</red> state`
                });
            });
        });
    }
    /**
     * @name        registerProcess
     * @type        Function
     *
     * This method allows you to register a new process "SProcess" based instance
     * that you will be able to use later on by calling the "run" or "stop" module method.
     *
     * @param       {SProcess}        pro       The process instance you want to register
     * @param       {String}      [id='main']      An id for your instance to use later
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    registerProcess(pro, id = this._settings.mainProcessId) {
        if (this._moduleProcesses[id] !== undefined) {
            throw `Sorry but a process with the id "<yellow>${id}</yellow>" in the module "<cyan>${this.this.constructor.name}</cyan>" seem's to already exists...`;
        }
        if (id === this.processIdUsedForState) {
            pro.on('state', (d) => {
                setTimeout(() => {
                    this.state(d.value);
                });
            });
        }
        // Pipe the process
        this.pipe(pro);
        // save the process in the stack
        this._moduleProcesses[id] = pro;
    }
    /**
     * @name        getProcess
     * @type        Function
     *
     * This method allows you to get a process instance using his id.
     * If no id is passed, the "main" one will be retreived
     *
     * @param     {String}      [id='main']      The process if you want back
     * @return    {SProcess}            The process that correspond to the passed id
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    getProcess(id = this._settings.mainProcessId) {
        if (this._moduleProcesses[id] === undefined) {
            throw `Sorry but you try to get a process named "<yellow>${id}</yellow>" that does not have been registered yet... Here's the processes that you have access to:\n- ${Object.keys(this._moduleProcesses).join('\n- ')}`;
        }
        return this._moduleProcesses[id];
    }
    /**
     * @name        _initShortcuts
     * @type        Function
     * @private
     *
     * This method simply init the shortcuts to run process with some
     * special parameters
     *
     * @since     2.0.0
     */
    _initShortcuts() {
        // @wip
        // @ts-ignore
        if (this.handleShortcuts === undefined) {
            throw `You have some shortcuts defined in the module "<yellow>${this.constructor.name}</yellow>" but you don't have the required "<cyan>handleShortcuts(shortcutObj, params, settings)</cyan>" method defined...`;
        }
        if (!this._moduleObjDescriptor.shortcuts ||
            !Object.keys(this._moduleObjDescriptor.shortcuts).length)
            return;
        for (const shortcut in this._moduleObjDescriptor.shortcuts) {
            const shortcutObj = this._moduleObjDescriptor
                .shortcuts[shortcut];
            shortcutObj.keys = shortcut;
            if (shortcutObj.id === undefined)
                shortcutObj.id = shortcut;
            hotkey_1.default(shortcut).on('press', () => {
                if (this.isActive() !== true)
                    return;
                const params = deepMerge_1.default(Object.assign({}, this.params || {}), Object.assign({}, shortcutObj.params || {}));
                const settings = deepMerge_1.default(Object.assign({}, this.settings || {}), Object.assign({}, shortcutObj.settings || {}));
                delete shortcutObj.params;
                delete shortcutObj.settings;
                // this.handleShortcuts(shortcutObj, params, settings);
            });
        }
    }
}
exports.default = SSugarAppModule;
SSugarAppModule.interfaces = {
    this: {
        apply: true,
        class: SSugarAppModuleInterface_1.default
    }
};
/**
 * @name          getRegisteredModules
 * @type          Function
 * @static
 *
 * This static method allows you to get back all the registered modules during this process
 *
 * @return      {Array<SSugarAppModule>}           The list of all the registered modules
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SSugarAppModule._registeredModulesArray = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvYXBwL3N1Z2FyL1NTdWdhckFwcE1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFJZCwyREFBdUM7QUFDdkMsdUVBQTZDO0FBRTdDLHdFQUFzRDtBQUd0RCxvSEFBOEY7QUFDOUYsdUVBQWlEO0FBQ2pELG1FQUE2QztBQUM3QyxzRkFBZ0U7QUFHaEUsc0RBQWdDO0FBQ2hDLDhEQUF3QztBQUd4QyxvR0FBOEU7QUErQzlFLE1BQXFCLGVBQ25CLFNBQVEsbUJBQWU7SUF3TXZCOzs7Ozs7OztPQVFHO0lBQ0gsWUFDRSxtQkFBK0MsRUFDL0MsUUFBc0M7UUFFdEMsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsbUJBQW1CLENBQUMsRUFBRTtZQUMxQixjQUFjLEVBQUU7Z0JBQ2QsYUFBYSxFQUFFLE1BQU07Z0JBQ3JCLHFCQUFxQixFQUFFLFNBQVM7YUFDakM7U0FDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBdk5KOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFNLEdBQVcsU0FBUyxDQUFDO1FBUzNCOzs7Ozs7OztXQVFHO1FBQ0gsY0FBUyxHQUE4QixFQUFFLENBQUM7UUF1RDFDOzs7Ozs7Ozs7V0FTRztRQUNILFdBQU0sR0FBRyxFQUFFLENBQUM7UUFhWjs7Ozs7Ozs7OztXQVVHO1FBQ08sWUFBTyxHQUFHLEtBQUssQ0FBQztRQWMxQjs7Ozs7Ozs7O1dBU0c7UUFDSyxxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFFOUI7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQVEsU0FBUyxDQUFDO1FBK0R0QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsbUJBQW1CLENBQUM7UUFFaEQsd0RBQXdEO1FBQ3hELHlDQUF5QztRQUN6QyxNQUFNO1FBRU4saURBQWlEO1FBQ2pELDBDQUFr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