"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
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
class STemplateEngineInterface extends SInterface_1.default {
}
exports.default = STemplateEngineInterface;
STemplateEngineInterface.definitionObj = {
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
};
