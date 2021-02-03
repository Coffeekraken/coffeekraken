"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const class_1 = __importDefault(require("../../is/class"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SSugarAppInterface_1 = __importDefault(require("./interface/SSugarAppInterface"));
const SSugarAppModule_1 = __importDefault(require("./SSugarAppModule"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckFwcFByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1RUFBaUQ7QUFDakQsMkRBQXVDO0FBRXZDLHNFQUFnRDtBQUNoRCxzRUFBZ0Q7QUFFaEQsd0ZBQWtFO0FBR2xFLHdFQUUyQjtBQTRDM0IsTUFBcUIsZ0JBQWlCLFNBQVEsa0JBQVU7SUF5RHREOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFnQztRQUMxQyxLQUFLLENBQ0gsRUFBRSxFQUNGLG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsa0JBQWtCO1lBQ3RCLElBQUksRUFBRSxtQkFBbUI7WUFDekIsUUFBUSxFQUFFLEVBQUU7U0FDYixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUF6REo7Ozs7Ozs7O1dBUUc7UUFDSCxrQkFBYSxHQUFnQyxFQUFFLENBQUM7UUFFaEQ7Ozs7Ozs7OztXQVNHO1FBQ0gsbUJBQWMsR0FBVSxFQUFFLENBQUM7UUFzQ3pCLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJELGlDQUFpQztRQUVqQyxnQ0FBZ0M7UUFDaEMseURBQXlEO1FBQ3pELG1EQUFtRDtRQUNuRCxnREFBZ0Q7UUFDaEQscUNBQXFDO1FBQ3JDLHlDQUF5QztRQUN6QywyQkFBMkI7UUFDM0IsOEJBQThCO1FBQzlCLGtDQUFrQztRQUNsQywyQkFBMkI7UUFDM0IsYUFBYTtRQUNiLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsc0JBQXNCO1FBQ3RCLGdDQUFnQztRQUNoQyxvQ0FBb0M7UUFDcEMsNkJBQTZCO1FBQzdCLGVBQWU7UUFDZixrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLFVBQVU7UUFDViwrQkFBK0I7UUFDL0IsUUFBUTtRQUNSLFFBQVE7UUFDUixNQUFNO0lBQ1IsQ0FBQztJ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