"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const __SInterface = require('../../../interface/SInterface');
const __sugarConfig = require('../../../config/sugar');
/**
 * @name                SSugarAppModulePresetInterface
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
class SSugarAppModulePresetInterface extends __SInterface {
}
SSugarAppModulePresetInterface.definition = {
    name: {
        type: 'String',
        description: 'The preset name',
        required: true
    },
    description: {
        type: 'String',
        description: 'The preset description'
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
SSugarAppModulePresetInterface.makeAvailableAsType();
exports.default = SSugarAppModulePresetInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlUHJlc2V0SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQXBwTW9kdWxlUHJlc2V0SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQzlELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBRXZEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSw4QkFBK0IsU0FBUSxZQUFZOztBQUNoRCx5Q0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLGlCQUFpQjtRQUM5QixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsd0JBQXdCO0tBQ3RDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1QseUVBQXlFO1FBQzNFLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULHdFQUF3RTtRQUMxRSxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxFQUFFO0tBQ1o7Q0FDRixDQUFDO0FBRUosOEJBQThCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztBQUNyRCxrQkFBZSw4QkFBOEIsQ0FBQyJ9