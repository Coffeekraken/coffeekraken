"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = __importDefault(require("../../is/class"));
const SError_1 = __importDefault(require("../../error/SError"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SSugarAppInterface_1 = __importDefault(require("./interface/SSugarAppInterface"));
const sugar_1 = __importDefault(require("../../config/sugar"));
const SSugarAppModule_1 = __importDefault(require("./SSugarAppModule"));
/**
 * @name            SSugarAppProcess
 * @namespace           sugar.node.ui.sugar
 * @type            Class
 * @extends         SProcess
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
class SSugarAppProcess extends SProcess_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(Object.assign({ id: 'SSugarAppProcess', name: 'Sugar App Process', app: sugar_1.default('sugar-app') }, settings));
        /**
         * @name              modulesObjs
         * @type              Object<Object>
         * @private
         *
         * Store the registered modules objects
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.modulesObjs = {};
        /**
         * @name              modulesInError
         * @type              Array<SSugarAppModule>
         * @private
         *
         * Store all the modules that are in error
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.modulesInError = [];
        // load and check each modules
        this.modulesObjs = this._loadModules(this._settings.app.modules);
        // Pipe all the modules "events"
        Object.keys(this.modulesObjs).forEach((moduleIdx) => {
            const moduleObj = this.modulesObjs[moduleIdx];
            SPromise_1.default.pipe(moduleObj.instance, this, {
                processor: (value, metas) => {
                    if (typeof value === 'object') {
                        value.module = {
                            id: moduleObj.id,
                            name: moduleObj.name,
                            idx: moduleIdx
                        };
                    }
                    else {
                        value = {
                            module: {
                                id: moduleObj.id,
                                name: moduleObj.name,
                                idx: moduleIdx
                            },
                            value
                        };
                    }
                    return [value, metas];
                }
            });
        });
    }
    /**
     * @name              process
     * @type              Function
     *
     * Method that execute the frontend server code, listen for errors, etc...
     *
     * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings = {}) {
        const promise = new SPromise_1.default();
        return promise;
    }
    /**
     * @name            _modulesReady
     * @type            Function
     * @private
     *
     * This method is called once all the modules are flagged as ready
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _modulesReady() {
        setTimeout(() => {
            this.state('ready');
        }, 20);
    }
    /**
     * @name            _modulesError
     * @type            Function
     * @private
     *
     * This method is called once a module is flagged as in error
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _modulesError() {
        this.state('error');
    }
    /**
     * @name            _loadModules
     * @type            Function
     * @private
     *
     * This method simply load and check all the registered modules
     * before being able to continue the process...
     *
     * @param       {Object}      modulesObj        An object of SSugarAppModuleInterface compatible modules
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _loadModules(modulesObj) {
        // track how many modules are ready
        let readyModulesCount = 0;
        const returnedModulesObj = {};
        // loop on all registered modules
        Object.keys(modulesObj).forEach((moduleIdx) => {
            const moduleObj = modulesObj[moduleIdx];
            if (moduleObj.params === undefined)
                moduleObj.params = {};
            if (moduleObj.settings === undefined)
                moduleObj.settings = {};
            // stop here if a module has error...
            if (this.modulesInError.length)
                return;
            if (moduleObj.processPath && moduleObj.processPath.slice(-3) !== '.js') {
                moduleObj.processPath += '.js';
            }
            if (moduleObj.modulePath && moduleObj.modulePath.slice(-3) !== '.js') {
                moduleObj.modulePath += '.js';
            }
            // if we provide only a process
            if (!moduleObj.modulePath && moduleObj.processPath) {
                moduleObj.modulePath = `${__dirname}/SSugarAppProcessModule.js`;
                moduleObj.params.processPath = moduleObj.processPath;
            }
            // validate module interface
            // __SSugarAppModuleObjInterface.apply(moduleObj, {
            //   name: `${this.constructor.name}.SSugarAppModule.${moduleIdx}`,
            //   throw: true
            // });
            // require and instanciate the module class
            const moduleClass = require(moduleObj.modulePath);
            if (!class_1.default(moduleClass)) {
                throw new SError_1.default(`The passed module file "<cyan>${moduleObj.modulePath}</cyan>" does not export a <green>proper Class</green> for the module "<yellow>${moduleObj.name}</yellow>"...`);
            }
            const moduleInstance = new moduleClass(moduleObj);
            if (!(moduleInstance instanceof SSugarAppModule_1.default)) {
                throw new SError_1.default(`It seems that the passed class for your module "<yellow>${moduleObj.name}</yellow>" does not extends the sugar "<green>SSugarAppModule</green>" one...`);
            }
            moduleObj.instance = moduleInstance;
            moduleInstance.on('state', (state, metas) => {
                if (state === 'ready') {
                    if (this.modulesInError.indexOf(moduleObj) !== -1)
                        return;
                    // update module ready count
                    readyModulesCount++;
                    // when all the modules are loaded, call the _modulesReady method
                    if (readyModulesCount >= Object.keys(modulesObj).length) {
                        this._modulesReady();
                    }
                }
                else if (state === 'error') {
                    // add the module in the error modules stack
                    this.modulesInError.push(moduleObj);
                    this._modulesError();
                }
            });
            // add the validated module in the _modulesObjArray property
            returnedModulesObj[moduleIdx] = moduleObj;
        });
        return returnedModulesObj;
    }
}
exports.default = SSugarAppProcess;
SSugarAppProcess.interfaces = {
    this: SSugarAppInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckFwcFByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsMkRBQXVDO0FBQ3ZDLGdFQUEwQztBQUMxQyxzRUFBZ0Q7QUFDaEQsc0VBQWdEO0FBRWhELHdGQUFrRTtBQUNsRSwrREFBK0M7QUFFL0Msd0VBQWtEO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQXFCLGdCQUFpQixTQUFRLGtCQUFVO0lBNkJ0RDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxpQkFDSCxFQUFFLEVBQUUsa0JBQWtCLEVBQ3RCLElBQUksRUFBRSxtQkFBbUIsRUFDekIsR0FBRyxFQUFFLGVBQWEsQ0FBQyxXQUFXLENBQUMsSUFDNUIsUUFBUSxFQUNYLENBQUM7UUF2Q0w7Ozs7Ozs7OztXQVNHO1FBQ0gsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFFakI7Ozs7Ozs7OztXQVNHO1FBQ0gsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFtQmxCLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFakUsZ0NBQWdDO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ2xELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUMsa0JBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUU7Z0JBQ3hDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDMUIsSUFBSSxPQUFP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