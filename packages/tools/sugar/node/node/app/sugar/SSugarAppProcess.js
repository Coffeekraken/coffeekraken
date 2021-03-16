"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const class_1 = __importDefault(require("../../is/class"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL2FwcC9zdWdhci9TU3VnYXJBcHBQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUVBQWlEO0FBQ2pELDJEQUF1QztBQUV2Qyx3RUFBaUQ7QUFDakQsc0VBQWdEO0FBRWhELHdGQUFrRTtBQUdsRSx3RUFFMkI7QUEyQzNCLGFBQWE7QUFDYixNQUFxQixnQkFBaUIsU0FBUSxrQkFBVTtJQXlEdEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQWdDO1FBQzFDLEtBQUssQ0FDSCxFQUFFLEVBQ0YsbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxrQkFBa0I7WUFDdEIsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixRQUFRLEVBQUUsRUFBRTtTQUNiLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQXpESjs7Ozs7Ozs7V0FRRztRQUNILGtCQUFhLEdBQWdDLEVBQUUsQ0FBQztRQUVoRDs7Ozs7Ozs7O1dBU0c7UUFDSCxtQkFBYyxHQUFVLEVBQUUsQ0FBQztRQXNDekIsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckQsaUNBQWlDO1FBRWpDLGdDQUFnQztRQUNoQyx5REFBeUQ7UUFDekQsbURBQW1EO1FBQ25ELGdEQUFnRDtRQUNoRCxxQ0FBcUM7UUFDckMseUNBQXlDO1FBQ3pDLDJCQUEyQjtRQUMzQiw4QkFBOEI7UUFDOUIsa0NBQWtDO1FBQ2xDLDJCQUEyQjtRQUMzQixhQUFhO1FBQ2IsaUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQixzQkFBc0I7UUFDdEIsZ0NBQWdDO1FBQ2hDLG9DQUFvQztRQUNwQyw2QkFBNkI7UUFDN0IsZUFBZTtRQUNmLGtCQUFrQjtRQUNsQixhQUFhO1FBQ2IsVUFBVTtRQUNWLCtCQUErQjtR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