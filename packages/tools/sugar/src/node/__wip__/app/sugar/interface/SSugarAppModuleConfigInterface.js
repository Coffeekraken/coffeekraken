"use strict";
// @ts-nocheck
var _a;
const __SInterface = require('../../../class/SInterface');
const __sugarConfig = require('../../../config/sugar');
/**
 * @name                SSugarAppModuleConfigInterface
 * @namespace           sugar.node.ui.sugar.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe a sugar ui module object
 * structure and requirements
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SSugarAppModuleConfigInterface extends __SInterface {
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
        module: {
            type: 'String',
            description: 'The SSugarUiModule based class file path.',
            required: true,
            path: {
                exists: true
            }
        },
        params: {
            type: 'Object',
            description: 'An object of parameters that will be passed to your module constructor',
            required: true,
            default: {}
        }
    },
    _a);
//# sourceMappingURL=SSugarAppModuleConfigInterface.js.map