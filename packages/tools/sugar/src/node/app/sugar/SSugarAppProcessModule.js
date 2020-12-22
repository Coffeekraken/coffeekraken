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
                'ctrl+s': {
                    id: 'stop',
                    name: 'Stop',
                    params: {},
                    settings: {}
                }
            }
        }), deepMerge_1.default(settings));
        const ProcessClass = require(moduleObj.processPath);
        const pro = new ProcessClass(Object.assign(Object.assign({}, this._settings.processSettings), { metas: false, stdio: false }));
        // register process
        this.registerProcess(pro);
        // set the module as ready
        this.ready();
    }
    handleShortcuts(shortcutObj, params, settings) {
        switch (shortcutObj.id) {
            case 'stop':
                this.process.kill();
                break;
            case 'run':
                this.process.run(params);
                break;
        }
    }
};
//# sourceMappingURL=SSugarAppProcessModule.js.map