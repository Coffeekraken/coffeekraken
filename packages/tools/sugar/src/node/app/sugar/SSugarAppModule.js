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
            const stdios = Array.isArray(this._moduleObjDescriptor.stdio)
                ? this._moduleObjDescriptor.stdio
                : [this._moduleObjDescriptor.stdio].map((i) => i !== undefined);
            stdios.forEach((stdio) => {
                let stdioSettings = {}, stdioId, stdioArg = stdio;
                if (plainObject_1.default(stdio)) {
                    stdioArg = stdio.stdio;
                    stdioSettings = stdioSettings || {};
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
        });
    }
    state(value) {
        if (!value)
            return this._state;
        // emit an event
        this.emit(`state.${value}`, true);
        this.emit('state', value);
        this._state = value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQXBwTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsMkRBQXVDO0FBQ3ZDLHVFQUE2QztBQUc3QyxzRUFBcUQ7QUFHckQsb0hBQThGO0FBQzlGLHVFQUFpRDtBQUNqRCxtRUFBNkM7QUFJN0MsOERBQXdDO0FBRXhDLG9HQUE4RTtBQWdEOUUsTUFBcUIsZUFDbkIsU0FBUSxrQkFBZTtJQW1KdkI7Ozs7Ozs7O09BUUc7SUFDSCxZQUNFLG1CQUErQyxFQUMvQyxRQUFzQztRQUV0QyxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLGNBQWMsRUFBRTtnQkFDZCxhQUFhLEVBQUUsTUFBTTtnQkFDckIscUJBQXFCLEVBQUUsU0FBUzthQUNqQztTQUNGLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFqS0o7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQU0sR0FBVyxTQUFTLENBQUM7UUFTM0I7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQThCLEVBQUUsQ0FBQztRQUUxQzs7Ozs7Ozs7O1dBU0c7UUFDSCxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBYVo7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQVEsRUFBRSxDQUFDO1FBRWpCOzs7Ozs7Ozs7O1dBVUc7UUFDSyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBY3hCOzs7Ozs7Ozs7V0FTRztRQUNLLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQThENUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsbUJBQW1CLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2hFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxtQkFBbUIsQ0FBQztRQUVoRCx3REFBd0Q7UUFDeEQseUNBQXlDO1FBQ3pDLE1BQU07UUFFTixpREFBaUQ7UUFDakQsMENBQWtDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV6RCxrQ0FBa0M7UUFDbEMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBUSxJQUFJLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDdEIsTUFBTSxHQUFHLEdBQUcsZUFBZSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBUSxJQUFJLENBQUMsQ0FBQztZQUN6RSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQUUsT0FBTztZQUN2QixlQUFlLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztRQUVILGlCQUFpQjtRQUNqQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtZQUM1QixxQkFBcUI7WUFDckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDOUIsMENBQTBDO2dCQUMxQyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO2dCQUNwRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRTtvQkFDbkIsR0FBRyxDQUFDLElBQUksQ0FDTixnQ0FBZ0MsU0FBUyxvQkFBb0IsQ0FDOUQsQ0FBQztpQkFDSDtnQkFDRCw0Q0FBNEM7Z0JBQzVDLE1BQU0sWUFBWSxHQUFHLG1CQUFXLENBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFDNUIsU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQ3ZCLENBQUM7Z0JBQ0YsMENBQTBDO2dCQUMxQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBRUgsa0JBQWtCO1lBQ2xCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQztnQkFDM0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO2dCQUNqQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUM7WUFDbEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN2QixJQUFJLGFBQWEsR0FBRyxFQUFFLEVBQ3BCLE9BQU8sRUFDUCxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixJQUFJLHFCQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3BCLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUN2QixhQUFhLEdBQUcsYUFBYSxJQUFJLEVBQUUsQ0FBQztvQkFDcEMsT0FBTyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7aUJBQ3BCO2dCQUNELHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDWixJQUFJLGVBQVMsQ0FBQyxRQUFRLENBQUM7d0JBQUUsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7eUJBQzVDLElBQUkscUJBQVMsQ0FBQyxLQUFLLENBQUM7d0JBQUUsT0FBTyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7eUJBQ3pDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUTt3QkFBRSxPQUFPLEdBQUcsUUFBUSxDQUFDO2lCQUMzRDtnQkFFRCxNQUFNLGFBQWEsR0FBRyxlQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxhQUFhLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztpQkFDakQ7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7Z0JBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUM7YUFDMUQ7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUE3TkQsS0FBSyxDQUFDLEtBQWM7UUFDbEIsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0IsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBd0JELEtBQUssQ0FBQyxLQUFhLFVBQVUsRUFBRSxLQUFXO1FBQ3hDLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pCLEVBQUU7Z0JBQ0YsUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUErREQsTUFBTSxDQUFDLG9CQUFvQjtRQUN6QixPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEVBQUU7UUFDL0IsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBd0IsRUFBRSxFQUFFO1lBQ3RFLE9BQU8sTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBbUdEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUkscUJBQXFCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsS0FBSyxTQUFTO1lBQ3BELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUk7WUFBRSxPQUFPO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUs7WUFBRSxPQUFPO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsS0FBSztRQUNILFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXBCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssT0FBTyxFQUFFO29CQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTt3QkFDbkIsS0FBSyxFQUFFLG1CQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFDeEMsc0RBQXNEO3FCQUN2RCxDQUFDLENBQUM7b0JBQ0gsT0FBTztpQkFDUjtnQkFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDZixLQUFLLEVBQUUsV0FDTCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQ3hDLDBDQUEwQztpQkFDM0MsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxLQUFLO1FBQ0gsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFcEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDZixLQUFLLEVBQUUsV0FDTCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQ3hDLCtDQUErQztpQkFDaEQsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWE7UUFDcEQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQzNDLE1BQU0sNENBQTRDLEVBQUUsbUNBQW1DLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksc0NBQXNDLENBQUM7U0FDeko7UUFDRCxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDckMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDcEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsVUFBVSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWE7UUFDMUMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQzNDLE1BQU0scURBQXFELEVBQUUseUdBQXlHLE1BQU0sQ0FBQyxJQUFJLENBQy9LLElBQUksQ0FBQyxnQkFBZ0IsQ0FDdEIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUNsQjtRQUNELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxjQUFjO1FBQ1osSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBRTtZQUN0QyxNQUFNLDBEQUEwRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksNEhBQTRILENBQUM7U0FDbk47UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBZ0IsRUFBRSxFQUFFO1lBQ3ZELE1BQU0sV0FBVyxHQUE2QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZFLFdBQVcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBQzVCLElBQUksV0FBVyxDQUFDLEVBQUUsS0FBSyxTQUFTO2dCQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDO1lBQzVELGdCQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUFFLE9BQU87Z0JBQzdCLE1BQU0sTUFBTSxHQUFHLG1CQUFXLENBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxFQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUM1QyxDQUFDO2dCQUNGLE1BQU0sUUFBUSxHQUFHLG1CQUFXLENBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxFQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUM5QyxDQUFDO2dCQUNGLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQztnQkFDMUIsT0FBTyxXQUFXLENBQUMsUUFBUSxDQUFDO2dCQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBbmRILGtDQW9kQztBQWpkUSwwQkFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxJQUFJO1FBQ1gsS0FBSyxFQUFFLGtDQUEwQjtLQUNsQztDQUNGLENBQUM7QUF3R0Y7Ozs7Ozs7Ozs7O0dBV0c7QUFDSSx1Q0FBdUIsR0FBRyxFQUFFLENBQUMifQ==