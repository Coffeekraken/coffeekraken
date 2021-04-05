"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = __importDefault(require("../../../shared/is/class"));
const plainObject_1 = __importDefault(require("../../../shared/is/plainObject"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const SSugarAppModuleSettingsInterface_1 = __importDefault(require("./interface/SSugarAppModuleSettingsInterface"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const hotkey_1 = __importDefault(require("../../keyboard/hotkey"));
const blessed_1 = __importDefault(require("blessed"));
const s_stdio_1 = __importDefault(require("@coffeekraken/s-stdio"));
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
            const stdioInstance = s_stdio_1.default.new(this, stdioArg, stdioSettings);
            if (stdioInstance instanceof { SBlessedStdio, as } || )
                ;
        }, stdioInstance instanceof blessed_1.default.box);
        {
            // @ts-ignore
            this.$stdio = stdioInstance.$container || stdioInstance;
        }
        if (stdioInstance) {
            this.stdio(stdioId || 'unknown', stdioInstance);
        }
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
    ;
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
// listen when ready
this.on('state.ready:1', this._onReady.bind(this));
_onReady();
{
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
get;
process();
{
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
get;
processIdUsedForState();
{
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
activate();
{
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
unactivate();
{
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
 * @return    {Boolean}       true if the module is active (displayed), false if not
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
isActive();
{
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
ready();
{
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
error();
{
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
 * @param       {SProcess}        pro       The process instance you want to register
 * @param       {String}      [id='main']      An id for your instance to use later
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
registerProcess(pro, id = this._settings.mainProcessId);
{
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
getProcess(id = this._settings.mainProcessId);
{
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
_initShortcuts();
{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQXBwTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUlkLHFFQUFpRDtBQUNqRCxpRkFBdUQ7QUFFdkQsd0VBQXNEO0FBR3RELG9IQUE4RjtBQUM5RixpRkFBMkQ7QUFDM0QsbUVBQTZDO0FBSTdDLHNEQUFnQztBQUNoQyxvRUFBNkM7QUFHN0Msb0dBQThFO0FBK0M5RSxNQUFxQixlQUNuQixTQUFRLG1CQUFlO0lBd012Qjs7Ozs7Ozs7T0FRRztJQUNILFlBQ0UsbUJBQStDLEVBQy9DLFFBQXNDO1FBRXRDLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLG1CQUFtQixDQUFDLEVBQUU7WUFDMUIsY0FBYyxFQUFFO2dCQUNkLGFBQWEsRUFBRSxNQUFNO2dCQUNyQixxQkFBcUIsRUFBRSxTQUFTO2FBQ2pDO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQXZOSjs7Ozs7Ozs7OztXQVVHO1FBQ0gsV0FBTSxHQUFHLFNBQVMsQ0FBQztRQVNuQjs7Ozs7Ozs7V0FRRztRQUNILGNBQVMsR0FBOEIsRUFBRSxDQUFDO1FBdUQxQzs7Ozs7Ozs7O1dBU0c7UUFDSCxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBYVo7Ozs7Ozs7Ozs7V0FVRztRQUNPLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFjMUI7Ozs7Ozs7OztXQVNHO1FBQ0sscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBRTlCOzs7Ozs7OztXQVFHO1FBQ0gsV0FBTSxHQUFRLFNBQVMsQ0FBQztRQStEdEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDO1FBRWhELHdEQUF3RDtRQUN4RCx5Q0FBeUM7UUFDekMsTUFBTTtRQUVOLGlEQUFpRDtRQUNqRCwwQ0FBa0MsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FB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