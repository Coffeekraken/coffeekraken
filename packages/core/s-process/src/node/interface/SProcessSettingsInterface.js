"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
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
    emitErrorAsEvent: {
        type: 'Boolean',
        default: sugar_1.default('process.emitErrorAsEvent')
    },
    restart: {
        type: 'Boolean|Number',
        default: 3
    },
    restartOn: {
        type: 'String|Array<String>',
        default: 'error'
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
        default: sugar_1.default('process.runAsChild')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRkFBb0U7QUFDcEUsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSx5QkFBMEIsU0FBUSxxQkFBWTs7QUFDM0Msb0NBQVUsR0FBRztJQUNsQixVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxxQkFBcUIsQ0FBQztLQUM5QztJQUNELGdCQUFnQixFQUFFO1FBQ2hCLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGVBQWEsQ0FBQywwQkFBMEIsQ0FBQztLQUNuRDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxzQkFBc0I7UUFDNUIsT0FBTyxFQUFFLE9BQU87S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsdUJBQXVCO1FBQzdCLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxlQUFlLENBQUM7S0FDeEM7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsZUFBYSxDQUFDLGVBQWUsQ0FBQztLQUN4QztJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsZUFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxlQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7SUFDRCxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsc0JBQXNCLENBQUM7S0FDL0M7Q0FDRixDQUFDO0FBRUosa0JBQWUseUJBQXlCLENBQUMifQ==