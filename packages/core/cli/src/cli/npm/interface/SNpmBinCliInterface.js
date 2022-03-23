// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../node/class/SInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SInterface_1 = __importDefault(require("../../../node/class/SInterface"));
    class SNpmBinInterface extends SInterface_1.default {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbUJpbkNsaUludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOcG1CaW5DbGlJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsZ0ZBQXlEO0lBRXpELE1BQXFCLGdCQUFpQixTQUFRLG9CQUFXO1FBQ3JELE1BQU0sS0FBSyxXQUFXO1lBQ2xCLE9BQU87Z0JBQ0gsTUFBTSxFQUFFO29CQUNKLElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxJQUFJO29CQUNkLEtBQUssRUFBRSxHQUFHO29CQUNWLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7b0JBQ2hELFdBQVcsRUFDUCw4REFBOEQ7aUJBQ3JFO2dCQUNELE1BQU0sRUFBRTtvQkFDSixJQUFJLEVBQUUsU0FBUztvQkFDZixRQUFRLEVBQUUsSUFBSTtvQkFDZCxLQUFLLEVBQUUsR0FBRztvQkFDVixXQUFXLEVBQ1AsbUZBQW1GO29CQUN2RixPQUFPLEVBQUUsS0FBSztpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxRQUFRO29CQUNkLEtBQUssRUFBRSxHQUFHO29CQUNWLFdBQVcsRUFDUCx3SkFBd0o7b0JBQzVKLE9BQU8sRUFBRSxJQUFJO2lCQUNoQjtnQkFDRCxHQUFHLEVBQUU7b0JBQ0QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsS0FBSyxFQUFFLEdBQUc7b0JBQ1YsV0FBVyxFQUFFLHFDQUFxQztvQkFDbEQsT0FBTyxFQUFFLElBQUk7aUJBQ2hCO2FBQ0osQ0FBQztRQUNOLENBQUM7S0FDSjtJQWxDRCxtQ0FrQ0MifQ==