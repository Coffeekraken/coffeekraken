"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class STestInterface extends SInterface_1.default {
    },
    _a.definition = {
        input: {
            type: 'String',
            alias: 'i',
            description: 'Input files glob pattern',
            required: true,
            level: 1
        },
        watch: {
            type: 'String|Object',
            alias: 'w',
            description: 'Watch files glob pattern or settings object',
            level: 1
        }
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVzdEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx3RUFBa0Q7QUFzQmxELHVCQUFTLE1BQU0sY0FBZSxTQUFRLG9CQUFZO0tBZ0JqRDtJQWZRLGFBQVUsR0FBRztRQUNsQixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxHQUFHO1lBQ1YsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsZUFBZTtZQUNyQixLQUFLLEVBQUUsR0FBRztZQUNWLFdBQVcsRUFBRSw2Q0FBNkM7WUFDMUQsS0FBSyxFQUFFLENBQUM7U0FDVDtLQUNEO1FBQ0YifQ==