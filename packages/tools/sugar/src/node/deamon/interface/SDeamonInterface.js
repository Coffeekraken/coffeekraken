"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SDeamonInterface extends SInterface_1.default {
    },
    _a.extendsArray = ['SPromise'],
    _a.definition = {
        logs: {
            type: 'Object',
            required: true
        },
        watch: {
            type: 'Function',
            required: true
        },
        state: {
            type: 'String',
            required: true,
            values: ['idle', 'watching', 'error']
        }
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RlYW1vbkludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEZWFtb25JbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsd0VBQWtEO0FBb0JsRCx1QkFBUyxNQUFNLGdCQUFpQixTQUFRLG9CQUFZO0tBaUJuRDtJQWhCUSxlQUFZLEdBQUcsQ0FBQyxVQUFVLENBQUU7SUFDNUIsYUFBVSxHQUFHO1FBQ2xCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsUUFBUSxFQUFFLElBQUk7U0FDZjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxVQUFVO1lBQ2hCLFFBQVEsRUFBRSxJQUFJO1NBQ2Y7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUM7U0FDdEM7S0FDRDtRQUNGIn0=