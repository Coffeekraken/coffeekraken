"use strict";
// @ts-nocheck
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
 * @status              wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a STemplateEngine based class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STemplateEngineInterface extends SInterface_1.default {
}
exports.default = STemplateEngineInterface;
STemplateEngineInterface.definition = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RlbXBsYXRlRW5naW5lSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvdGVtcGxhdGUvZW5naW5lcy9pbnRlcmZhY2UvU1RlbXBsYXRlRW5naW5lSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDJFQUFxRDtBQUdyRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQXFCLHdCQUF5QixTQUFRLG9CQUFZOztBQUFsRSwyQ0EwQkM7QUF6QlEsbUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztRQUMxQixNQUFNLEVBQUUsSUFBSTtRQUNaLFdBQVcsRUFDVCx5RkFBeUY7UUFDM0YsT0FBTyxFQUFFLE1BQU07UUFDZixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFVBQVU7UUFDaEIsUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsSUFBSTtRQUNaLFdBQVcsRUFDVCw2R0FBNkc7S0FDaEg7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsVUFBVTtRQUNoQixRQUFRLEVBQUUsSUFBSTtRQUNkLFdBQVcsRUFDVCw4SEFBOEg7S0FDakk7Q0FDRixDQUFDIn0=