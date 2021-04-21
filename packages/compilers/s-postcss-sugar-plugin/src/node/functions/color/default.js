"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
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
    console.log(finalParams);
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
        let theme = 'default';
        let name = finalParams.name;
        let modifier = '';
        let invert = false;
        if (name.split('--').length >= 2) {
            if (name.split('--').pop() === 'i') {
                name = name.replace(/\-\-i$/, '');
                invert = true;
            }
            modifier = name.split('--')[1];
            name = name.split('--')[0];
        }
        if (name.split('.').length === 2) {
            theme = name.split('.')[0];
            name = name.split('.')[1];
        }
        console.log(name, modifier, invert);
        const themeConfig = s_sugar_config_1.default(`theme`);
        let modifierStr = modifier || 'default';
        if (invert)
            modifierStr += '-i';
        let colorValue = themeConfig[theme].colors[name][modifierStr];
        if (!colorValue && theme !== 'default')
            colorValue = themeConfig.default.colors[name][modifierStr];
        if (!colorValue) {
            throw new Error(`Sorry but the requested color "<yellow>${name}-${modifierStr}</yellow>" does not exists...`);
        }
        let colorVar = `--s-theme-${theme}-colors-${name}-${modifierStr}`;
        if (finalParams.return === 'var') {
            return `var(${colorVar}, ${colorValue})`;
        }
        else {
            return colorValue;
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUF5RDtBQUl6RCxvRUFBNkM7QUFFN0MsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTs7QUFrQmQscURBQVM7QUFqQjdDLDJDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUM7UUFDeEIsT0FBTyxFQUFFLEtBQUs7S0FDZjtDQUNGLENBQUM7QUFVSixtQkFBeUIsU0FBa0QsRUFBRTtJQUMzRSxNQUFNLFdBQVcsbUJBQ2YsSUFBSSxFQUFFLEVBQUUsRUFDUixRQUFRLEVBQUUsRUFBRSxFQUNaLE1BQU0sRUFBRSxLQUFLLElBQ1YsTUFBTSxDQUNWLENBQUM7SUFFRixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7SUFFekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV6QixJQUNFLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDO1FBQzdDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUNwQiwyRkFBMkYsQ0FDNUY7UUFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDcEIsbUVBQW1FLENBQ3BFO1FBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQ3BCLCtFQUErRSxDQUNoRjtRQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUNwQiwrRUFBK0UsQ0FDaEYsRUFDRDtRQUNBLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDeEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkM7UUFDRCxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN6QjtTQUFNO1FBQ0wsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVuQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNoQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssR0FBRyxFQUFFO2dCQUNsQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDZjtZQUNELFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0I7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFcEMsTUFBTSxXQUFXLEdBQUcsd0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzQyxJQUFJLFdBQVcsR0FBRyxRQUFRLElBQUksU0FBUyxDQUFDO1FBQ3hDLElBQUksTUFBTTtZQUFFLFdBQVcsSUFBSSxJQUFJLENBQUM7UUFFaEMsSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUssS0FBSyxTQUFTO1lBQ3BDLFVBQVUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FDYiwwQ0FBMEMsSUFBSSxJQUFJLFdBQVcsK0JBQStCLENBQzdGLENBQUM7U0FDSDtRQUVELElBQUksUUFBUSxHQUFHLGFBQWEsS0FBSyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUVsRSxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQ2hDLE9BQU8sT0FBTyxRQUFRLEtBQUssVUFBVSxHQUFHLENBQUM7U0FDMUM7YUFBTTtZQUNMLE9BQU8sVUFBVSxDQUFDO1NBQ25CO0tBQ0Y7QUFDSCxDQUFDO0FBOUVELDRCQThFQyJ9