"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const SError_1 = __importDefault(require("../../error/SError"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const hotkey_1 = __importDefault(require("../../keyboard/hotkey"));
const SIpc_1 = __importDefault(require("../../ipc/SIpc"));
const blessed_1 = __importDefault(require("blessed"));
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
    constructor(params = {}, settings = {}) {
        super(deepMerge_1.default({
            id: 'SSugarApp',
            name: 'Sugar App Module',
            autoStart: true,
            autoRun: false,
            shortcuts: {},
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
        this._settings.id = `SSugarAppModule.${this._settings.id}`;
        SIpc_1.default.on('sugar.ui.displayedModule', (moduleId) => {
            this._active = this.id === moduleId;
        });
        // @todo    replace this with new interface class
        // __SSugarAppModuleSettingsInterface.apply(this._settings);
        // register the module in the list
        SSugarAppModule._registeredModulesArray.push(this);
        this.on('cancel', () => {
            const idx = SSugarAppModule._registeredModulesArray.indexOf(this);
            if (idx === -1)
                return;
            SSugarAppModule._registeredModulesArray.splice(idx, 1);
        });
        if (this.constructor.interface) {
            this.constructor.interface.apply(params);
        }
        this.params = params;
        // start if needed
        if (this._settings.autoStart) {
            this.start(this.params, this._settings);
        }
        // init shortcuts
        this._initShortcuts();
        console.log('READ');
        // mark as ready
        this.ready();
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._setState(value);
    }
    _setState(value) {
        // trigger an event
        this.trigger('state', value);
        this._state = value;
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
     * @name          $ui
     * @type          Function
     * @get
     *
     * Access the blessed based UI of this module
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get $ui() {
        if (!this._$ui) {
            this._$ui = blessed_1.default.box({
                content: 'No ui has been provided for this module. To create one, use the "<yellow>SSugarAppModule.createUi</yellow>" method...'
            });
        }
        return this._$ui;
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
            this.state = 'ready';
            setTimeout(() => {
                if (this.state === 'error') {
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
            this.state = 'error';
            setTimeout(() => {
                this.trigger('log', {
                    value: `<yellow>${this._settings.name || this._settings.id}</yellow> module is in <red>error</red> state`
                });
            });
        });
    }
    /**
     * @name        run
     * @type        Function
     *
     * This method simply take an SPromise process or whatever and listen for
     * important events to keep the module updated
     *
     * @param     {Object}      params        An object of parameter to pass to the initiated process
     * @param     {Object}      [settings={}]     An object of settings to pass to the initiated process
     * @return    {SPromise}                  The initiated process
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    run(params = {}, settings = {}, processId = 'main') {
        if (!this._moduleProcesses || !this._moduleProcesses[processId]) {
            throw new SError_1.default(`Sorry but you cannot run a module process that does not have been registered during the "start" phase. Here's the available module processes: ${Object.keys(this._moduleProcesses).join(',')}`);
        }
        settings = deepMerge_1.default(this._settings, settings);
        this._moduleProcesses[processId].run(params, settings);
    }
    /**
     * @name        start
     * @type        Function
     *
     * This method simply take an SPromise instance of a running process
     * and add some listeners on like the "error" one, etc...
     * It also pipe the process events on this module instance
     * so you don't have to take care of that manualy...
     *
     * @param       {SPromise}      moduleProcess        The process you want to observe automatically
     * @return      {SPromise}                            The same process passed as parameter just in case
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    start(moduleProcess) {
        if (moduleProcess instanceof SPromise_1.default) {
            this._moduleProcesses = {
                main: moduleProcess
            };
            // Pipe the process
            SPromise_1.default.pipe(moduleProcess, this);
        }
        else {
            this._moduleProcesses = moduleProcess;
            Object.keys(moduleProcess).forEach((moduleId) => {
                const pro = moduleProcess[moduleId];
                // Pipe the process
                SPromise_1.default.pipe(pro, this);
            });
        }
        // update state
        moduleProcess.on('state', (d) => {
            this.state = d.value;
        });
        // log
        setTimeout(() => {
            if (this.state === 'error')
                return;
            this.trigger('log', {
                value: `Starting up the module <yellow>${this._settings.name || this._settings.id}</yellow>...`
            });
        });
        // autoRun
        if (this._settings.autoRun) {
            setTimeout(() => {
                this.run(this.params, this._settings);
            });
        }
        // return the running process just in case
        return moduleProcess;
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
        Object.keys(this._settings.shortcuts || {}).forEach((shortcut) => {
            const shortcutObj = this._settings.shortcuts[shortcut];
            hotkey_1.default(shortcut).on('press', () => {
                if (!this.isActive())
                    return;
                const params = deepMerge_1.default(Object.assign({}, this.params, Object.assign({}, shortcutObj.params || {})));
                const settings = deepMerge_1.default(Object.assign({}, this._settings, Object.assign({}, shortcutObj.settings || {})));
                this.run(params, settings);
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
