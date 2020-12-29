"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SSugarAppModule_1 = __importDefault(require("./SSugarAppModule"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
module.exports = class SSugarAppProcessModule extends SSugarAppModule_1.default {
    // static interface = __SFrontendServerInterface;
    /**
     * @name            constructor
     * @type             Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(moduleObj, settings = {}) {
        // check the settings interface
        super(deepMerge_1.default(moduleObj, {
            shortcuts: {
                'ctrl+r': {
                    id: 'run',
                    name: 'Run',
                    params: {},
                    settings: {}
                },
                'ctrl+e': {
                    id: 'exit',
                    name: 'Exit',
                    params: {},
                    settings: {}
                }
            }
        }), deepMerge_1.default(settings));
        const ProcessClass = require(moduleObj.processPath);
        const pro = new ProcessClass(Object.assign(Object.assign({}, (this._settings.processSettings || {})), { metas: false, stdio: false, initialParams: Object.assign({}, moduleObj.params || {}) }));
        // class ModuleInterface extends __SInterface {
        //   static definition = {
        //     ...__SSugarAppModuleObjInterface.definition,
        //     params: ProcessInterface.definition || {},
        //     presets: {
        //       '*': ProcessInterface.definition || {}
        //     }
        //   };
        // }
        // console.log(ModuleInterface.definition);
        // // apply the interface on the moduleObj
        // ModuleInterface.apply(moduleObj);
        // register process
        this.registerProcess(pro);
        // set the module as ready
        this.ready();
    }
    handleShortcuts(shortcutObj, params, settings) {
        switch (shortcutObj.id) {
            case 'exit':
                this.process.kill(`The process has been killed using the "<yellow>ctrl+e</yellow>" shortcut`);
                break;
            case 'run':
                this.process.run(params);
                break;
        }
    }
};
//# sourceMappingURL=SSugarAppProcessModule.js.map