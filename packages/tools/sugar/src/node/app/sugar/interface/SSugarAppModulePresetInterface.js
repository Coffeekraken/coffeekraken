"use strict";
// @ts-nocheck
const __SInterface = require('../../../interface/SInterface');
const __sugarConfig = require('../../../config/sugar');
/**
 * @name                SSugarAppModulePresetInterface
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
module.exports = SSugarAppModulePresetInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlUHJlc2V0SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQXBwTW9kdWxlUHJlc2V0SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBRWQsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDOUQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFFdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLDhCQUErQixTQUFRLFlBQVk7O0FBQ2hELHlDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsaUJBQWlCO1FBQzlCLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSx3QkFBd0I7S0FDdEM7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDVCx5RUFBeUU7UUFDM0UsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsRUFBRTtLQUNaO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1Qsd0VBQXdFO1FBQzFFLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDWjtDQUNGLENBQUM7QUFFSiw4QkFBOEIsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0FBQ3JELGlCQUFTLDhCQUE4QixDQUFDIn0=