"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("../../is/path"));
const filename_1 = __importDefault(require("../../fs/filename"));
const SBlessedStdio_1 = __importDefault(require("../../blessed/stdio/SBlessedStdio"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const SSugarAppModuleSettingsInterface_1 = __importDefault(require("./interface/SSugarAppModuleSettingsInterface"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const hotkey_1 = __importDefault(require("../../keyboard/hotkey"));
/**
 * @name            SSugarAppModule
 * @namespace           sugar.node.ui.sugar
 * @type            Class
 * @extends         SPromise
 * @wip
 *
 * This class represent the process that expose every registered "modules"
 * through through a socket connection and handle the talk between
 * the backend parts with the frontend parts of each modules.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
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
    constructor(moduleObj, settings = {}) {
        super(deepMerge_1.default({
            mainProcessId: 'main',
            processUsedForState: undefined,
            processSettings: {}
        }, settings));
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
         * @name          params
         * @type          Object
         *
         * Store the passed module parameters
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.params = {};
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
        this._settings.id = `SSugarAppModule.${moduleObj.id}`;
        this._moduleObj = moduleObj;
        // __SIpc.on('sugar.ui.displayedModule', (moduleId) => {
        //   this._active = this.id === moduleId;
        // });
        // @todo    replace this with new interface class
        SSugarAppModuleSettingsInterface_1.default.apply(this._settings);
        if (this.constructor.interface) {
            this.constructor.interface.apply(this._moduleObj);
        }
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
        this.on('state.ready:1', () => {
            // listen for presets
            this.on('preset', (presetObj) => {
                // kill the current process if already one
                const processId = presetObj.process || this._settings.mainProcessId;
                const pro = this.getProcess(processId);
                if (pro.isRunning()) {
                    pro.kill(`Killing the current "<yellow>${processId}</yellow>" process`);
                }
                // merging the params with the preset params
                const presetParams = deepMerge_1.default(this._moduleObj.params || {}, presetObj.params || {});
                // running the process with the new params
                pro.run(presetParams);
            });
            // init the Stdios
            const stdios = Array.isArray(this._moduleObj.stdio)
                ? this._moduleObj.stdio
                : [this._moduleObj.stdio].map((i) => i !== undefined);
            stdios.forEach((stdio) => {
                if (stdio === 'terminal') {
                    this.stdio('terminal', new SBlessedStdio_1.default(this, {}));
                }
                else if (stdio === 'socket') {
                    // @todo      integrate socket stdio
                    // this.stdio('socket', undefined);
                }
                else if (path_1.default(stdio, true)) {
                    const Cls = require(stdio);
                    this.stdio(filename_1.default(stdio).split('.').slice(0, -1).join('.'), new Cls(this, {}));
                }
            });
            if (this._moduleObj.autoRun === true) {
                this.process.run(moduleObj.params || {});
            }
        });
    }
    state(value = null) {
        if (value === null)
            return this._state;
        // emit an event
        this.emit(`state.${value}`, true);
        this.emit('state', value);
        this._state = value;
    }
    stdio(id = 'terminal', value = undefined) {
        if (value !== undefined) {
            this._stdio[id] = value;
            this.emit('stdio', {
                id,
                instance: value
            });
            this.emit(`stdio.${id}`, value);
        }
        return this._stdio[id];
    }
    /**
     * @name          id
     * @type          Boolean
     * @get
     *
     * Access the "settings.id" property
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get id() {
        return this._settings.id;
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
     * @name          processUsedForState
     * @type          String
     * @get
     *
     * Get the process id that is used for setting the module state
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get processUsedForState() {
        if (this._settings.processUsedForState === undefined)
            return this._settings.mainProcessId;
        return this._settings.processUsedForState;
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
        if (id === this.processUsedForState) {
            pro.on('state', (d) => {
                setTimeout(() => {
                    this.state(d.value);
                });
            });
        }
        // Pipe the process
        SPromise_1.default.pipe(pro, this);
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
        if (this._moduleObj.shortcuts !== undefined &&
            this.handleShortcuts === undefined) {
            throw `You have some shortcuts defined in the module "<yellow>${this.constructor.name}</yellow>" but you don't have the required "<cyan>handleShortcuts(shortcutObj, params, settings)</cyan>" method defined...`;
        }
        Object.keys(this._moduleObj.shortcuts || {}).forEach((shortcut) => {
            const shortcutObj = this._moduleObj.shortcuts[shortcut];
            shortcutObj.keys = shortcut;
            if (shortcutObj.id === undefined)
                shortcutObj.id = shortcut;
            hotkey_1.default(shortcut).on('press', () => {
                if (!this.isActive())
                    return;
                const params = deepMerge_1.default(Object.assign({}, this._moduleObj.params || {}), Object.assign({}, shortcutObj.params || {}));
                const settings = deepMerge_1.default(Object.assign({}, this._moduleObj.settings || {}), Object.assign({}, shortcutObj.settings || {}));
                delete shortcutObj.params;
                delete shortcutObj.settings;
                this.handleShortcuts(shortcutObj, params, settings);
            });
        });
    }
}
exports.default = SSugarAppModule;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQXBwTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHlEQUFxQztBQUNyQyxpRUFBOEM7QUFDOUMsc0ZBQWdFO0FBQ2hFLHNFQUFnRDtBQUdoRCxvSEFBOEY7QUFDOUYsdUVBQWlEO0FBQ2pELG1FQUE2QztBQUs3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFxQixlQUFnQixTQUFRLGtCQUFVO0lBa0lyRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksU0FBUyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2xDLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsYUFBYSxFQUFFLE1BQU07WUFDckIsbUJBQW1CLEVBQUUsU0FBUztZQUM5QixlQUFlLEVBQUUsRUFBRTtTQUNwQixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFwSko7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQU0sR0FBRyxTQUFTLENBQUM7UUFTbkI7Ozs7Ozs7OztXQVNHO1FBQ0gsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQTJCWjs7Ozs7Ozs7V0FRRztRQUNILFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFWjs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQjs7Ozs7Ozs7O1dBU0c7UUFDSCxxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUEwRHBCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLG1CQUFtQixTQUFTLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFFNUIsd0RBQXdEO1FBQ3hELHlDQUF5QztRQUN6QyxNQUFNO1FBRU4saURBQWlEO1FBQ2pELDBDQUFrQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFekQsSUFBSSxJQUFJLENBQUMs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