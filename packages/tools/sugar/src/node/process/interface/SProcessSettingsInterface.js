"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../../shared/config/sugar"));
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
        default: sugar_1.default('process.asyncStart')
    },
    killOnError: {
        type: 'Boolean',
        default: sugar_1.default('process.killOnError')
    },
    stdio: {
        type: 'String|SStdio|Boolean',
        alias: 's',
        default: sugar_1.default('process.stdio')
    },
    decorators: {
        type: 'Boolean',
        alias: 'd',
        default: sugar_1.default('process.decorators')
    },
    throw: {
        type: 'Boolean',
        alias: 't',
        default: sugar_1.default('process.throw')
    },
    exitAtEnd: {
        type: 'Boolean',
        alias: 'e',
        default: sugar_1.default('process.exitAtEnd')
    },
    runAsChild: {
        type: 'Boolean',
        alias: 'c',
        // default: __sugarConfig('process.runAsChild'),
        default: false
    },
    definition: {
        type: 'Object',
        default: sugar_1.default('process.definition')
    },
    processPath: {
        type: 'String',
        default: sugar_1.default('process.processPath')
    },
    notification: {
        type: 'Object',
        default: sugar_1.default('process.notification')
    }
};
exports.default = SProcessSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5RUFBeUQ7QUFDekQsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSx5QkFBMEIsU0FBUSxxQkFBWTs7QUFDM0Msb0NBQVUsR0FBRztJQUNsQixVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxxQkFBcUIsQ0FBQztLQUM5QztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsZUFBYSxDQUFDLGVBQWUsQ0FBQztLQUN4QztJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsZUFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxlQUFhLENBQUMsZUFBZSxDQUFDO0tBQ3hDO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxlQUFhLENBQUMsbUJBQW1CLENBQUM7S0FDNUM7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsZ0RBQWdEO1FBQ2hELE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7SUFDRCxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsc0JBQXNCLENBQUM7S0FDL0M7Q0FDRixDQUFDO0FBRUosa0JBQWUseUJBQXlCLENBQUMifQ==