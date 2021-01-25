"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../node/class/SInterface"));
module.exports = (_a = class SNpmBinInterface extends SInterface_1.default {
    },
    _a.definition = {
        action: {
            type: 'String',
            required: true,
            alias: 'a',
            values: ['install', 'i', 'uninstall', 'u', 'un'],
            description: 'Specify which action you want to execute in the "bin" module'
        },
        global: {
            type: 'Boolean',
            required: true,
            alias: 'g',
            description: 'Specify if you want to symlink the passed bin in the global scope or in local one',
            default: false
        },
        package: {
            type: 'String',
            alias: 'p',
            description: "Specify the package you want to install the bin from. If not specified, will take the current package where you're in using ```process.cwd``` function",
            default: null
        },
        bin: {
            type: 'String',
            alias: 'b',
            description: 'Specify the bin you want to symlink',
            default: null
        }
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbUJpbkNsaUludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOcG1CaW5DbGlJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsZ0ZBQXlEO0FBRXpELHVCQUFTLE1BQU0sZ0JBQWlCLFNBQVEsb0JBQVc7S0FnQ2xEO0lBL0JRLGFBQVUsR0FBRztRQUNsQixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLEdBQUc7WUFDVixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO1lBQ2hELFdBQVcsRUFDVCw4REFBOEQ7U0FDakU7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsU0FBUztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLEVBQ1QsbUZBQW1GO1lBQ3JGLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxHQUFHO1lBQ1YsV0FBVyxFQUNULHdKQUF3SjtZQUMxSixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsR0FBRztZQUNWLFdBQVcsRUFBRSxxQ0FBcUM7WUFDbEQsT0FBTyxFQUFFLElBQUk7U0FDZDtLQUNEO1FBQ0YifQ==