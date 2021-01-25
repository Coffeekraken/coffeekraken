"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SCliInterface extends SInterface_1.default {
    },
    _a.definition = {
        interface: {
            type: 'SInterface',
            required: true,
            static: true
        },
        processClass: {
            type: 'SProcessManager',
            required: true,
            static: true
        },
        command: {
            type: 'String',
            required: true,
            static: true
        }
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaUludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDbGlJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsd0VBQWtEO0FBb0JsRCx1QkFBUyxNQUFNLGFBQWMsU0FBUSxvQkFBWTtLQWtCaEQ7SUFqQlEsYUFBVSxHQUFHO1FBQ2xCLFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxZQUFZO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLElBQUk7U0FDYjtRQUNELFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFFBQVE7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxJQUFJO1NBQ2I7S0FDRDtRQUNGIn0=