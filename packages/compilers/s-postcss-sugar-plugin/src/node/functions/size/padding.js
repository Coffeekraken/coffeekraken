"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
class postcssSugarPluginSizePaddingInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginSizePaddingInterface;
postcssSugarPluginSizePaddingInterface.definition = {
    name: {
        type: 'String',
        required: true,
        alias: 'n'
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
    const themeConfig = s_sugar_config_1.default('theme');
    let size = themeConfig[theme || 'default'].paddings[name];
    //   console.log('SIT', size);
    if (finalParams.return === 'var') {
        return `var(--s-theme-${theme}-paddings-${name}, ${size})`;
    }
    else {
        return size;
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhZGRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUF5RDtBQU16RCxNQUFNLHNDQUF1QyxTQUFRLHFCQUFZOztBQWNkLDJEQUFTO0FBYm5ELGlEQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUM7UUFDeEIsT0FBTyxFQUFFLEtBQUs7S0FDZjtDQUNGLENBQUM7QUFTSixtQkFDRSxTQUF3RCxFQUFFO0lBRTFELE1BQU0sV0FBVyxtQkFDZixJQUFJLEVBQUUsRUFBRSxFQUNSLE1BQU0sRUFBRSxLQUFLLElBQ1YsTUFBTSxDQUNWLENBQUM7SUFFRixJQUFJLEtBQUssR0FBRyxTQUFTLEVBQ25CLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBRTFCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2hDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzNCO0lBRUQsTUFBTSxXQUFXLEdBQUcsd0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUzQyxJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUxRCw4QkFBOEI7SUFFOUIsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtRQUNoQyxPQUFPLGlCQUFpQixLQUFLLGFBQWEsSUFBSSxLQUFLLElBQUksR0FBRyxDQUFDO0tBQzVEO1NBQU07UUFDTCxPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQztBQTVCRCw0QkE0QkMifQ==