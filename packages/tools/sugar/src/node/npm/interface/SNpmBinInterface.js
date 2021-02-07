"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
/**
 * @status              wip
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */
const SInterface_1 = __importDefault(require("../../class/SInterface"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbUJpbkludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOcG1CaW5JbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQ7Ozs7O0dBS0c7QUFFSCx3RUFBaUQ7QUFFakQsdUJBQVMsTUFBTSxnQkFBaUIsU0FBUSxvQkFBVztLQWdDbEQ7SUEvQlEsYUFBVSxHQUFHO1FBQ2xCLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsR0FBRztZQUNWLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7WUFDaEQsV0FBVyxFQUNULDhEQUE4RDtTQUNqRTtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxTQUFTO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsR0FBRztZQUNWLFdBQVcsRUFDVCxtRkFBbUY7WUFDckYsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLEVBQ1Qsd0pBQXdKO1lBQzFKLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7UUFDRCxHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxHQUFHO1lBQ1YsV0FBVyxFQUFFLHFDQUFxQztZQUNsRCxPQUFPLEVBQUUsSUFBSTtTQUNkO0tBQ0Q7UUFDRiJ9