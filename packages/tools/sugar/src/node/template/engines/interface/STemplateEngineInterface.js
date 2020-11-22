"use strict";
var _a;
const __SInterface = require('../../../class/SInterface');
const __sugarConfig = require('../../../config/sugar');
/**
 * @name                STemplateEngineInterface
 * @namespace           sugar.node.template.engines.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a STemplateEngine based class
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class STemplateEngineInterface extends __SInterface {
    },
    _a.definitionObj = {
        input: {
            type: 'String',
            required: true,
            values: ['path', 'string'],
            static: true,
            description: 'Specify if the template engine class support a view path as input, or a template string',
            default: 'path',
            level: 1
        },
        canRender: {
            type: 'Function',
            required: true,
            static: true,
            description: 'A simple method that take parameter a templateString and must return true if it can handle it, false if not'
        },
        render: {
            type: 'Function',
            required: true,
            description: 'Main render method that must return an SPromise instance resolved once the rendering process has been successfully completed'
        }
    },
    _a);
