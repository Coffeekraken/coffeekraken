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
        // trigger an event
        this.trigger(`state.${value}`, true);
        this.trigger('state', value);
        this._state = value;
    }
    stdio(id = 'terminal', value = undefined) {
        if (value !== undefined) {
            this._stdio[id] = value;
            this.trigger('stdio', {
                id,
                instance: value
            });
            this.trigger(`stdio.${id}`, value);
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
        this.trigger('activate', true);
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
        this.trigger('unactivate', true);
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
                    this.trigger('warning', {
                        value: `The module <red>${this._settings.name || this._settings.id}</red> cannot start correctly because of an error...`
                    });
                    return;
                }
                this.trigger('log', {
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
                this.trigger('log', {
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
//# sourceMappingURL=SSugarAppModule.js.map