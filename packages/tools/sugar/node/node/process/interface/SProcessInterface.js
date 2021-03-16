"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../class/SInterface"));
/**
 * @name                SProcessInterface
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
class SProcessInterface extends SInterface_1.default {
}
exports.default = SProcessInterface;
// static extendsArray = ['SProcess', 'SPromise'];
SProcessInterface.definition = {
    id: {
        type: 'String',
        required: true
    },
    state: {
        type: 'String',
        required: true,
        values: ['idle', 'running', 'killed', 'error', 'success', 'watching']
    },
    duration: {
        type: 'Number',
        required: true
    },
    startTime: {
        type: 'Number',
        required: true
    },
    endTime: {
        type: 'Number',
        required: true
    },
    stdout: {
        type: 'Array<String>',
        required: true,
        default: []
    },
    stderr: {
        type: 'Array<String>',
        required: true,
        default: []
    },
    process: {
        type: 'Function',
        required: true
    },
    kill: {
        type: 'Function',
        required: true
    },
    log: {
        type: 'Function',
        required: true
    }
};
SProcessInterface.title = 'SProcess elements Interface';
SProcessInterface.description = 'This interface represent the minimum requirements that MUST have the instance that run some commands etc across the entire toolkit';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9wcm9jZXNzL2ludGVyZmFjZS9TUHJvY2Vzc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx3RUFBa0Q7QUFFbEQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFxQixpQkFBa0IsU0FBUSxvQkFBWTs7QUFBM0Qsb0NBbURDO0FBbERDLGtEQUFrRDtBQUMzQyw0QkFBVSxHQUFHO0lBQ2xCLEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQztLQUN0RTtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxlQUFlO1FBQ3JCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxlQUFlO1FBQ3JCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxVQUFVO1FBQ2hCLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtRQUNoQixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFVBQVU7UUFDaEIsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFFSyx1QkFBSyxHQUFHLDZCQUE2QixDQUFDO0FBQ3RDLDZCQUFXLEdBQ2hCLG9JQUFvSSxDQUFDIn0=