"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_js_1 = __importDefault(require("../../../node/class/SInterface.js"));
class SNpmBinInterface extends SInterface_js_1.default {
    static get _definition() {
        return {
            action: {
                type: 'String',
                required: true,
                alias: 'a',
                values: ['install', 'i', 'uninstall', 'u', 'un'],
                description: 'Specify which action you want to execute in the "bin" module',
            },
            global: {
                type: 'Boolean',
                required: true,
                alias: 'g',
                description: 'Specify if you want to symlink the passed bin in the global scope or in local one',
                default: false,
            },
            package: {
                type: 'String',
                alias: 'p',
                description: "Specify the package you want to install the bin from. If not specified, will take the current package where you're in using ```process.cwd``` function",
                default: null,
            },
            bin: {
                type: 'String',
                alias: 'b',
                description: 'Specify the bin you want to symlink',
                default: null,
            },
        };
    }
}
exports.default = SNpmBinInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNGQUE0RDtBQUU1RCxNQUFxQixnQkFBaUIsU0FBUSx1QkFBVztJQUNyRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7Z0JBQ2hELFdBQVcsRUFDUCw4REFBOEQ7YUFDckU7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLG1GQUFtRjtnQkFDdkYsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLHdKQUF3SjtnQkFDNUosT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUFFLHFDQUFxQztnQkFDbEQsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBbENELG1DQWtDQyJ9