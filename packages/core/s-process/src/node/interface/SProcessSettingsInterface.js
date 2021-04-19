"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SProcessSettingsInterface
 * @namespace           sugar.node.process.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a process instance usable across the toolkit like in an SCli instance, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcessSettingsInterface extends s_interface_1.default {
}
SProcessSettingsInterface.definition = {
    asyncStart: {
        type: 'Boolean',
        alias: 'a',
        default: s_sugar_config_1.default('process.asyncStart')
    },
    killOnError: {
        type: 'Boolean',
        default: s_sugar_config_1.default('process.killOnError')
    },
    emitErrorAsEvent: {
        type: 'Boolean',
        default: s_sugar_config_1.default('process.emitErrorAsEvent')
    },
    stdio: {
        type: 'String|SStdio|Boolean',
        alias: 's',
        default: s_sugar_config_1.default('process.stdio')
    },
    decorators: {
        type: 'Boolean',
        alias: 'd',
        default: s_sugar_config_1.default('process.decorators')
    },
    throw: {
        type: 'Boolean',
        alias: 't',
        default: s_sugar_config_1.default('process.throw')
    },
    exitAtEnd: {
        type: 'Boolean',
        alias: 'e',
        default: s_sugar_config_1.default('process.exitAtEnd')
    },
    runAsChild: {
        type: 'Boolean',
        alias: 'c',
        default: s_sugar_config_1.default('process.runAsChild')
    },
    definition: {
        type: 'Object',
        default: s_sugar_config_1.default('process.definition')
    },
    processPath: {
        type: 'String',
        default: s_sugar_config_1.default('process.processPath')
    },
    notification: {
        type: 'Object',
        default: s_sugar_config_1.default('process.notification')
    }
};
exports.default = SProcessSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRkFBeUQ7QUFDekQsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSx5QkFBMEIsU0FBUSxxQkFBWTs7QUFDM0Msb0NBQVUsR0FBRztJQUNsQixVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLHdCQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSx3QkFBYSxDQUFDLHFCQUFxQixDQUFDO0tBQzlDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDaEIsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsd0JBQWEsQ0FBQywwQkFBMEIsQ0FBQztLQUNuRDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxlQUFlLENBQUM7S0FDeEM7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLHdCQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLHdCQUFhLENBQUMsZUFBZSxDQUFDO0tBQ3hDO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSx3QkFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSx3QkFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsd0JBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLHdCQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7SUFDRCxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSx3QkFBYSxDQUFDLHNCQUFzQixDQUFDO0tBQy9DO0NBQ0YsQ0FBQztBQUVKLGtCQUFlLHlCQUF5QixDQUFDIn0=