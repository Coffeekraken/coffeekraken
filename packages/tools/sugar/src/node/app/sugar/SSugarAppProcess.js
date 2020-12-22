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
const SSugarAppModuleObjInterface_1 = __importDefault(require("./interface/SSugarAppModuleObjInterface"));
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
        this._loadModules(this._settings.app.modules);
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
        this.state = 'ready';
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
            this.state = 'ready';
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
        this.state = 'error';
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
        // loop on all registered modules
        Object.keys(modulesObj).forEach((moduleIdx) => {
            const moduleObj = modulesObj[moduleIdx];
            // stop here if a module has error...
            if (this.modulesInError.length)
                return;
            if (moduleObj.params === undefined)
                moduleObj.params = {};
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
            SSugarAppModuleObjInterface_1.default.apply(moduleObj, {
                name: `${this.constructor.name}.SSugarAppModule.${moduleIdx}`
            });
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
            moduleInstance.on('state,*.state', (state, metas) => {
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
            this.modulesObjs[moduleIdx] = moduleObj;
        });
    }
}
exports.default = SSugarAppProcess;
SSugarAppProcess.interface = SSugarAppInterface_1.default;
//# sourceMappingURL=SSugarAppProcess.js.map