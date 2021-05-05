"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginSpaceClassesInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginSpaceClassesInterface;
postcssSugarPluginSpaceClassesInterface.definition = {};
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, params);
    const vars = [
        '@sugar.space.marginClasses;',
        '@sugar.space.paddingClasses;',
        '@sugar.space.autoClasses;'
    ];
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBSXJELE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7O0FBTWQsNERBQVM7QUFMcEQsa0RBQVUsR0FBRyxFQUFFLENBQUM7QUFPekIsbUJBQXlCLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDckIsNkJBQTZCO1FBQzdCLDhCQUE4QjtRQUM5QiwyQkFBMkI7S0FDNUIsQ0FBQztJQUVGLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBckJELDRCQXFCQyJ9