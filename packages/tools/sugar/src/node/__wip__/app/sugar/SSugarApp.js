"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const sugar_1 = __importDefault(require("../../config/sugar"));
const SSugarAppModuleConfigInterface_1 = __importDefault(require("./interface/SSugarAppModuleConfigInterface"));
const class_1 = __importDefault(require("../../is/class"));
const SError_1 = __importDefault(require("../../error/SError"));
const SSugarAppModule_1 = __importDefault(require("./SSugarAppModule"));
/**
 * @name            SSugarApp
 * @namespace       sugar.node.ui.sugar
 * @type            Class
 * @extends         SPromise
 * @wip
 *
 * This class represent the main sugar ui one. His work it to:
 * - Aggregate all the wanted modules registered through the ```sugar-app.config.js``` file
 * - Instantiate all the modules like frontend server, build scss, etc...
 * - Configure the frontend server to serve all the needed files like js or css ones, etc...
 * - Open a socket connection to allow the front modules parts to talk with the back parts easily
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @param       {Object}              [settings={}]           An object of settings to configure your sugar ui:
 * -
 *
 * @example         js
 * import SSugarApp from @coffeekraken/sugar/node/ui/sugar/SSugarApp';
 * const sugarUi = new SSugarApp();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarApp extends SPromise_1.default {
    /**
     * @name              constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        settings = deepMerge_1.default({
            id: 'SSugarApp',
            name: 'Sugar App'
        }, settings);
        super(settings);
        /**
         * @name              _modulesObjs
         * @type              Object<Object>
         * @private
         *
         * Store the registered modules objects
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._modulesObjs = {};
        /**
         * @name              _modulesInError
         * @type              Array<SSugarAppModule>
         * @private
         *
         * Store all the modules that are in error
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._modulesInError = [];
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
        // load and check each modules
        this._loadModules(sugar_1.default('sugar-app.modules'));
        // Pipe all the modules "events"
        Object.keys(this._modulesObjs).forEach((moduleIdx) => {
            const moduleObj = this._modulesObjs[moduleIdx];
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
                    // metas.stack = `module.${metas.stack}`;
                    return [value, metas];
                }
            });
        });
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._setState(value);
    }
    _setState(value) {
        if (['loading', 'ready', 'error'].indexOf(value) === -1) {
            throw new SError_1.default(`Sorry but the "<yellow>state</yellow>" property setted to "<magenta>${__toString(value)}</magenta>" of your "<cyan>${this.constructor.name}</cyan>" class can contain only one of these values: ${[
                'loading',
                'ready',
                'error'
            ]
                .map((i) => {
                return `"<green>${i}</green>"`;
            })
                .join(', ')}`);
        }
        // trigger an event
        this.trigger('state', value);
        this._state = value;
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
            for (const [key, moduleObj] of Object.entries(this._modulesObjs)) {
                if (moduleObj.instance.autoRun) {
                    moduleObj.instance.run();
                }
            }
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
            if (this._modulesInError.length)
                return;
            if (moduleObj.module && moduleObj.module.slice(-3) !== '.js') {
                moduleObj.module += '.js';
            }
            // validate module interface
            SSugarAppModuleConfigInterface_1.default.applyAndComplete(moduleObj, {
                name: `${this.constructor.name}.SSugarAppModule.${moduleIdx}`
            });
            // require and instanciate the module class
            const moduleClass = require(moduleObj.module);
            if (!class_1.default(moduleClass)) {
                throw new SError_1.default(`The passed module file "<cyan>${moduleObj.module}</cyan>" does not export a <green>proper Class</green> for the module "<yellow>${moduleObj.name}</yellow>"...`);
            }
            const settings = {
                id: moduleObj.id,
                name: moduleObj.name,
                shortcuts: moduleObj.shortcuts
            };
            const moduleInstance = new moduleClass(moduleObj.params, settings);
            if (!(moduleInstance instanceof SSugarAppModule_1.default)) {
                throw new SError_1.default(`It seems that the passed class for your module "<yellow>${moduleObj.name}</yellow>" does not extends the sugar "<green>SSugarAppModule</green>" one...`);
            }
            moduleObj.instance = moduleInstance;
            moduleInstance.on('state,*.state', (state, metas) => {
                if (state === 'ready') {
                    if (this._modulesInError.indexOf(moduleObj) !== -1)
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
                    this._modulesInError.push(moduleObj);
                    this._modulesError();
                }
            });
            // add the validated module in the _modulesObjArray property
            this._modulesObjs[moduleIdx] = moduleObj;
        });
    }
}
exports.default = SSugarApp;
//# sourceMappingURL=module.js.map