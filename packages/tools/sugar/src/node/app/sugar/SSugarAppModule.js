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
const SBlessedStdio_1 = __importDefault(require("../../stdio/blessed/SBlessedStdio"));
const blessed_1 = __importDefault(require("blessed"));
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
                this.handleShortcuts(shortcutObj, params, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQXBwTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsMkRBQXVDO0FBQ3ZDLHVFQUE2QztBQUU3QyxzRUFBcUQ7QUFHckQsb0hBQThGO0FBQzlGLHVFQUFpRDtBQUNqRCxtRUFBNkM7QUFDN0Msc0ZBQWdFO0FBR2hFLHNEQUFnQztBQUNoQyw4REFBd0M7QUFHeEMsb0dBQThFO0FBZ0Q5RSxNQUFxQixlQUNuQixTQUFRLGtCQUFlO0lBd012Qjs7Ozs7Ozs7T0FRRztJQUNILFlBQ0UsbUJBQStDLEVBQy9DLFFBQXNDO1FBRXRDLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLG1CQUFtQixDQUFDLEVBQUU7WUFDMUIsY0FBYyxFQUFFO2dCQUNkLGFBQWEsRUFBRSxNQUFNO2dCQUNyQixxQkFBcUIsRUFBRSxTQUFTO2FBQ2pDO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQXZOSjs7Ozs7Ozs7OztXQVVHO1FBQ0gsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQVMzQjs7Ozs7Ozs7V0FRRztRQUNILGNBQVMsR0FBOEIsRUFBRSxDQUFDO1FBdUQxQzs7Ozs7Ozs7O1dBU0c7UUFDSCxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBYVo7Ozs7Ozs7Ozs7V0FVRztRQUNPLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFjMUI7Ozs7Ozs7OztXQVNHO1FBQ0sscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBRTlCOzs7Ozs7OztXQVFHO1FBQ0gsV0FBTSxHQUFRLFNBQVMsQ0FBQztRQStEdEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDO1FBRWhELHdEQUF3RDtRQUN4RCx5Q0FBeUM7UUFDekMsTUFBTTtRQUVOLGlEQUFpRDtRQUNqRCwwQ0FBa0MsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFD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