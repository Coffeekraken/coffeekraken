"use strict";
// @ts-nocheck
var _a;
const __SInterface = require('../../../interface/SInterface');
const __sugarConfig = require('../../../config/sugar');
const __SSugarAppModulePresetInterface = require('./SSugarAppModulePresetInterface');
module.exports = (_a = class SSugarAppModuleObjInterface extends __SInterface {
    },
    _a.definition = {
        id: {
            type: 'String',
            description: 'A simple one word id that will be used to identify this module',
            required: true
        },
        name: {
            type: 'String',
            description: 'The module name like "Frontend Server", etc...',
            required: true
        },
        description: {
            type: 'String',
            description: 'The module description',
            required: false
        },
        autoRun: {
            type: 'Boolean',
            description: 'Specify if you want your module to run automatically after loading',
            required: false,
            default: false
        },
        modulePath: {
            type: 'String',
            description: 'The SSugarUiModule based class file path.',
            required: true,
            path: {
                exists: true
            }
        },
        processPath: {
            type: 'String',
            description: 'The SProcess based class file path',
            required: false,
            path: {
                exists: true
            }
        },
        presets: {
            type: 'Object<SSugarAppModulePreset>',
            description: 'An object of presets objects to use with the registered process',
            required: true
        },
        params: {
            type: 'Object',
            description: 'An object of parameters that will be used in your module class instance',
            required: true,
            default: {}
        },
        settings: {
            type: 'Object',
            description: 'An object of settings that will be used in your modules class instance',
            required: true,
            default: {}
        }
    },
    _a);
//# sourceMappingURL=SSugarAppModuleObjInterface.js.map