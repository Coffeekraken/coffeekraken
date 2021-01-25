"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SProcessInterface extends SInterface_1.default {
    },
    // static extendsArray = ['SProcess', 'SPromise'];
    _a.definition = {
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
    },
    _a.title = 'SProcess elements Interface',
    _a.description = 'This interface represent the minimum requirements that MUST have the instance that run some commands etc across the entire toolkit',
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx3RUFBa0Q7QUFjbEQsdUJBQVMsTUFBTSxpQkFBa0IsU0FBUSxvQkFBWTtLQW1EcEQ7SUFsREMsa0RBQWtEO0lBQzNDLGFBQVUsR0FBRztRQUNsQixFQUFFLEVBQUU7WUFDRixJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJO1NBQ2Y7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUM7U0FDdEU7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJO1NBQ2Y7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJO1NBQ2Y7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsZUFBZTtZQUNyQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxFQUFFO1NBQ1o7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsZUFBZTtZQUNyQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxFQUFFO1NBQ1o7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUUsSUFBSTtTQUNmO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFVBQVU7WUFDaEIsUUFBUSxFQUFFLElBQUk7U0FDZjtRQUNELEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxVQUFVO1lBQ2hCLFFBQVEsRUFBRSxJQUFJO1NBQ2Y7S0FDRDtJQUVLLFFBQUssR0FBRyw2QkFBOEI7SUFDdEMsY0FBVyxHQUNoQixvSUFBcUk7UUFDdkkifQ==