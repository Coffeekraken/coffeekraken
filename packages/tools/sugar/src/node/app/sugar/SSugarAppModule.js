"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = __importDefault(require("../../is/class"));
const plainObject_1 = __importDefault(require("../../is/plainObject"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const SSugarAppModuleSettingsInterface_1 = __importDefault(require("./interface/SSugarAppModuleSettingsInterface"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const hotkey_1 = __importDefault(require("../../keyboard/hotkey"));
const stdio_1 = __importDefault(require("../../stdio/stdio"));
const SSugarAppModuleInterface_1 = __importDefault(require("./interface/SSugarAppModuleInterface"));
class SSugarAppModule extends SPromise_1.default {
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
        this._stdio = {};
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
        this._settings.id = `SSugarAppModule.${moduleObjDescriptor.id}`;
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
            this._stdio[id] = value;
            this.emit('stdio', {
                id,
                instance: value
            });
            this.emit(`stdio.${id}`, value);
        }
        return this._stdio[id];
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
            if (stdioInstance) {
                this.stdio(stdioId || 'unknown', stdioInstance);
            }
        });
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
                this.emit('log', {
                    value: `<yellow>${this._settings.name || this._settings.id}</yellow> module is <green>ready</green>`
                });
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
        if (this.handleShortcuts === undefined) {
            throw `You have some shortcuts defined in the module "<yellow>${this.constructor.name}</yellow>" but you don't have the required "<cyan>handleShortcuts(shortcutObj, params, settings)</cyan>" method defined...`;
        }
        if (!Object.keys(this.shortcuts).length)
            return;
        Object.keys(this.shortcuts).forEach((shortcut) => {
            const shortcutObj = this.shortcuts[shortcut];
            shortcutObj.keys = shortcut;
            if (shortcutObj.id === undefined)
                shortcutObj.id = shortcut;
            hotkey_1.default(shortcut).on('press', () => {
                if (!this.isActive())
                    return;
                const params = deepMerge_1.default(Object.assign({}, this.params || {}), Object.assign({}, shortcutObj.params || {}));
                const settings = deepMerge_1.default(Object.assign({}, this.settings || {}), Object.assign({}, shortcutObj.settings || {}));
                delete shortcutObj.params;
                delete shortcutObj.settings;
                this.handleShortcuts(shortcutObj, params, settings);
            });
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQXBwTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsMkRBQXVDO0FBQ3ZDLHVFQUE2QztBQUc3QyxzRUFBcUQ7QUFHckQsb0hBQThGO0FBQzlGLHVFQUFpRDtBQUNqRCxtRUFBNkM7QUFJN0MsOERBQXdDO0FBRXhDLG9HQUE4RTtBQWdEOUUsTUFBcUIsZUFDbkIsU0FBUSxrQkFBZTtJQTZMdkI7Ozs7Ozs7O09BUUc7SUFDSCxZQUNFLG1CQUErQyxFQUMvQyxRQUFzQztRQUV0QyxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLGNBQWMsRUFBRTtnQkFDZCxhQUFhLEVBQUUsTUFBTTtnQkFDckIscUJBQXFCLEVBQUUsU0FBUzthQUNqQztTQUNGLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUEzTUo7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQU0sR0FBVyxTQUFTLENBQUM7UUFTM0I7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQThCLEVBQUUsQ0FBQztRQXVEMUM7Ozs7Ozs7OztXQVNHO1FBQ0gsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQWFaOzs7Ozs7Ozs7O1dBVUc7UUFDSyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBY3hCOzs7Ozs7Ozs7V0FTRztRQUNLLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQThENUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsbUJBQW1CLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2hFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxtQkFBbUIsQ0FBQztRQUVoRCx3REFBd0Q7UUFDeEQseUNBQXlDO1FBQ3pDLE1BQU07UUFFTixpREFBaUQ7UUFDakQsMENBQWtDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV6RCxrQ0FBa0M7UUFDbEMsZUFBZSxDQUFDLHVC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