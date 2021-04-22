"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = require("@coffeekraken/s-sugar-config");
class postcssSugarPluginPaddingInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginPaddingInterface;
postcssSugarPluginPaddingInterface.definition = {
    name: {
        type: 'String',
        required: true,
        alias: 'n'
    },
    ratio: {
        type: 'Number',
        alias: 'r'
    },
    return: {
        type: 'String',
        values: ['var', 'value'],
        default: 'var'
    }
};
function default_1(params = {}) {
    const finalParams = Object.assign({ name: '', return: 'var' }, params);
    let theme = 'default', name = finalParams.name;
    if (name.split('.').length === 2) {
        theme = name.split('.')[0];
        name = name.split('.')[1];
    }
    const size = s_sugar_config_1.themeConfig(`padding.${name}`, theme);
    // if (finalParams.ratio) {
    // }
    if (finalParams.return === 'var') {
        return `var(--s-theme-${theme}-padding-${name}, ${size})`;
    }
    else {
        return size;
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhZGRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGlFQUEyRDtBQUUzRCxNQUFNLGtDQUFtQyxTQUFRLHFCQUFZOztBQWtCZCx1REFBUztBQWpCL0MsNkNBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztRQUN4QixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQztBQVNKLG1CQUNFLFNBQW9ELEVBQUU7SUFFdEQsTUFBTSxXQUFXLG1CQUNmLElBQUksRUFBRSxFQUFFLEVBQ1IsTUFBTSxFQUFFLEtBQUssSUFDVixNQUFNLENBQ1YsQ0FBQztJQUVGLElBQUksS0FBSyxHQUFHLFNBQVMsRUFDbkIsSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFFMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDaEMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0I7SUFFRCxNQUFNLElBQUksR0FBRyw0QkFBVyxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFbkQsMkJBQTJCO0lBRTNCLElBQUk7SUFFSixJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQ2hDLE9BQU8saUJBQWlCLEtBQUssWUFBWSxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUM7S0FDM0Q7U0FBTTtRQUNMLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBNUJELDRCQTRCQyJ9