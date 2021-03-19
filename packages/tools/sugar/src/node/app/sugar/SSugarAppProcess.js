"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const class_1 = __importDefault(require("../../../shared/is/class"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SSugarAppInterface_1 = __importDefault(require("./interface/SSugarAppInterface"));
const SSugarAppModule_1 = __importDefault(require("./SSugarAppModule"));
// @ts-ignore
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
    constructor(settings) {
        super({}, deepMerge_1.default({
            id: 'SSugarAppProcess',
            name: 'Sugar App Process',
            sugarApp: {}
        }, settings));
        /**
         * @name              loadedModules
         * @type              ISSugarAppModulesDescriptor
         *
         * Store the loaded modules objects
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.loadedModules = {};
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
        this.loadedModules = this._loadModules(this.modules);
        // console.log(this.modulesObjs);
        // Pipe all the modules "events"
        // Object.keys(this.modulesObjs).forEach((moduleIdx) => {
        //   const moduleObj = this.modulesObjs[moduleIdx];
        //   __SPromise.pipe(moduleObj.instance, this, {
        //     processor: (value, metas) => {
        //       if (typeof value === 'object') {
        //         value.module = {
        //           id: moduleObj.id,
        //           name: moduleObj.name,
        //           idx: moduleIdx
        //         };
        //       } else {
        //         value = {
        //           module: {
        //             id: moduleObj.id,
        //             name: moduleObj.name,
        //             idx: moduleIdx
        //           },
        //           value
        //         };
        //       }
        //       return [value, metas];
        //     }
        //   });
        // });
    }
    /**
     * @name      sugarAppSettings
     * @type      ISSugarAppSettings
     * @get
     *
     * Access the sugar app settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get sugarAppSettings() {
        return this._settings.sugarApp;
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
        const promise = new s_promise_1.default();
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
     * @param       {ISSugarAppModulesDescriptor}      modules        An object of SSugarAppModuleInterface compatible modules
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _loadModules(modules) {
        // track how many modules are ready
        let readyModulesCount = 0;
        const returnedModulesObj = {};
        // loop on all registered modules
        Object.keys(modules).forEach((moduleIdx) => {
            const moduleObj = modules[moduleIdx];
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
            const moduleClass = require(moduleObj.modulePath).default;
            if (!class_1.default(moduleClass)) {
                throw new Error(`The passed module file "<cyan>${moduleObj.modulePath}</cyan>" does not export a <green>proper Class</green> for the module "<yellow>${moduleObj.name}</yellow>"...`);
            }
            const moduleInstance = new moduleClass(moduleObj);
            if (!(moduleInstance instanceof SSugarAppModule_1.default)) {
                throw new Error(`It seems that the passed class for your module "<yellow>${moduleObj.name}</yellow>" does not extends the sugar "<green>SSugarAppModule</green>" one...`);
            }
            moduleInstance.on('state', (state, metas) => {
                if (state === 'ready') {
                    if (this.modulesInError.indexOf(moduleObj) !== -1)
                        return;
                    // update module ready count
                    readyModulesCount++;
                    // when all the modules are loaded, call the _modulesReady method
                    if (readyModulesCount >= Object.keys(modules).length) {
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
            returnedModulesObj[moduleIdx] = moduleInstance;
        });
        return returnedModulesObj;
    }
}
exports.default = SSugarAppProcess;
SSugarAppProcess.interfaces = {
    this: {
        apply: true,
        class: SSugarAppInterface_1.default
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckFwcFByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpRkFBMkQ7QUFDM0QscUVBQWlEO0FBRWpELHdFQUFpRDtBQUNqRCxzRUFBZ0Q7QUFFaEQsd0ZBQWtFO0FBR2xFLHdFQUUyQjtBQTJDM0IsYUFBYTtBQUNiLE1BQXFCLGdCQUFpQixTQUFRLGtCQUFVO0lBeUR0RDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBZ0M7UUFDMUMsS0FBSyxDQUNILEVBQUUsRUFDRixtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGtCQUFrQjtZQUN0QixJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLFFBQVEsRUFBRSxFQUFFO1NBQ2IsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBekRKOzs7Ozs7OztXQVFHO1FBQ0gsa0JBQWEsR0FBZ0MsRUFBRSxDQUFDO1FBRWhEOzs7Ozs7Ozs7V0FTRztRQUNILG1CQUFjLEdBQVUsRUFBRSxDQUFDO1FBc0N6Qiw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVyRCxpQ0FBaUM7UUFFakMsZ0NBQWdDO1FBQ2hDLHlEQUF5RDtRQUN6RCxtREFBbUQ7UUFDbkQsZ0RBQWdEO1FBQ2hELHFDQUFxQztRQUNyQyx5Q0FBeUM7UUFDekMsMkJBQTJCO1FBQzNCLDhCQUE4QjtRQUM5QixrQ0FBa0M7UUFDbEMsMkJBQTJCO1FBQzNCLGFBQWE7UUFDYixpQkFBaUI7UUFDakIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixnQ0FBZ0M7UUFDaEMsb0NBQW9DO1FBQ3BDLDZCQUE2QjtRQUM3QixlQUFlO1FBQ2Ysa0JBQWtCO1FBQ2xCLGFBQWE7UUFDYixVQUFVO1FBQ1YsK0JBQStCO1FBQy9CLFFBQVE7UUFDUixRQUFRO1FBQ1IsTUFBTTtJ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