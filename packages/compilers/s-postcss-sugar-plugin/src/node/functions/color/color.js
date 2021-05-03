"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
const theme_1 = __importDefault(require("../../utils/theme"));
class postcssSugarPluginColorInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginColorInterface;
postcssSugarPluginColorInterface.definition = {
    name: {
        type: 'String',
        required: true,
        alias: 'n'
    },
    modifier: {
        type: 'String',
        alias: 'm'
    },
    return: {
        type: 'String',
        values: ['var', 'value'],
        default: 'var'
    }
};
function default_1(params = {}) {
    const finalParams = Object.assign({ name: '', modifier: '', return: 'var' }, params);
    let isPlainColor = false;
    if (finalParams.name.match(/^#[a-zA-Z0-9]{3,6}$/) ||
        finalParams.name.match(/^rgba\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/) ||
        finalParams.name.match(/^rgb\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/) ||
        finalParams.name.match(/^hsl\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/) ||
        finalParams.name.match(/^hsv\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/)) {
        isPlainColor = true;
        const color = new s_color_1.default(finalParams.name);
        if (finalParams.modifier) {
            color.apply(finalParams.modifier);
        }
        return color.toString();
    }
    else {
        let name = finalParams.name;
        let modifier = finalParams.modifier;
        // let invert = false;
        // if (name.split('--').length >= 2) {
        //   if (name.split('--').pop() === 'i') {
        //     name = name.replace(/\-\-i$/, '');
        //     invert = true;
        //   }
        //   modifier = name.split('--')[1];
        //   name = name.split('--')[0];
        // }
        let modifierStr = modifier || 'default';
        // if (invert) modifierStr += '-i';
        const colorValue = theme_1.default().config(`color.${name}.${modifierStr}`);
        let colorVar = `--s-theme-color-${name}-${modifierStr}`;
        if (finalParams.return === 'var') {
            return `var(${colorVar}, ${colorValue})`;
        }
        else {
            return colorValue;
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsb0VBQTZDO0FBQzdDLDhEQUF3QztBQUV4QyxNQUFNLGdDQUFpQyxTQUFRLHFCQUFZOztBQWtCZCxxREFBUztBQWpCN0MsMkNBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztRQUN4QixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQztBQVVKLG1CQUF5QixTQUFrRCxFQUFFO0lBQzNFLE1BQU0sV0FBVyxtQkFDZixJQUFJLEVBQUUsRUFBRSxFQUNSLFFBQVEsRUFBRSxFQUFFLEVBQ1osTUFBTSxFQUFFLEtBQUssSUFDVixNQUFNLENBQ1YsQ0FBQztJQUVGLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztJQUV6QixJQUNFLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDO1FBQzdDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUNwQiwyRkFBMkYsQ0FDNUY7UUFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDcEIsbUVBQW1FLENBQ3BFO1FBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQ3BCLCtFQUErRSxDQUNoRjtRQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUNwQiwrRUFBK0UsQ0FDaEYsRUFDRDtRQUNBLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDeEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkM7UUFDRCxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN6QjtTQUFNO1FBQ0wsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3BDLHNCQUFzQjtRQUV0QixzQ0FBc0M7UUFDdEMsMENBQTBDO1FBQzFDLHlDQUF5QztRQUN6QyxxQkFBcUI7UUFDckIsTUFBTTtRQUNOLG9DQUFvQztRQUNwQyxnQ0FBZ0M7UUFDaEMsSUFBSTtRQUVKLElBQUksV0FBVyxHQUFHLFFBQVEsSUFBSSxTQUFTLENBQUM7UUFDeEMsbUNBQW1DO1FBRW5DLE1BQU0sVUFBVSxHQUFHLGVBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRXBFLElBQUksUUFBUSxHQUFHLG1CQUFtQixJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7UUFFeEQsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtZQUNoQyxPQUFPLE9BQU8sUUFBUSxLQUFLLFVBQVUsR0FBRyxDQUFDO1NBQzFDO2FBQU07WUFDTCxPQUFPLFVBQVUsQ0FBQztTQUNuQjtLQUNGO0FBQ0gsQ0FBQztBQTNERCw0QkEyREMifQ==