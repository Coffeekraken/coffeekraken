"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
/**
 * @name                SSugarAppModuleObjInterface
 * @namespace           sugar.node.ui.sugar.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
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
class SSugarAppModuleObjInterface extends SInterface_1.default {
}
exports.default = SSugarAppModuleObjInterface;
SSugarAppModuleObjInterface.definition = {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlT2JqSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQXBwTW9kdWxlT2JqSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtFQUF5RDtBQUl6RDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQXFCLDJCQUE0QixTQUFRLG9CQUFZOztBQUFyRSw4Q0E4REM7QUE3RFEsc0NBQVUsR0FBRztJQUNsQixFQUFFLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDVCxnRUFBZ0U7UUFDbEUsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLGdEQUFnRDtRQUM3RCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsd0JBQXdCO1FBQ3JDLFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQ1Qsb0VBQW9FO1FBQ3RFLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLDJDQUEyQztRQUN4RCxRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxJQUFJO1NBQ2I7S0FDRjtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLG9DQUFvQztRQUNqRCxRQUFRLEVBQUUsS0FBSztRQUNmLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxJQUFJO1NBQ2I7S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSwrQkFBK0I7UUFDckMsV0FBVyxFQUNULGlFQUFpRTtRQUNuRSxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1QseUVBQXlFO1FBQzNFLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULHdFQUF3RTtRQUMxRSxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxFQUFFO0tBQ1o7Q0FDRixDQUFDIn0=