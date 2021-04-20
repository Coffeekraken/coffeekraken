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
    }
};
function default_1(params = {}) {
    const finalParams = Object.assign({ name: '', modifier: '' }, params);
    let isPlainColor = false;
    if (finalParams.name.match(/^#[a-zA-Z0-9]{3,6}$/) ||
        finalParams.name.match(/^rgba\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/) ||
        finalParams.name.match(/^rgb\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/) ||
        finalParams.name.match(/^hsl\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/) ||
        finalParams.name.match(/^hsv\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/)) {
        isPlainColor = true;
        console.log(finalParams);
        const color = new s_color_1.default(finalParams.name);
        if (finalParams.modifier) {
            console.log(finalParams);
            color.apply(finalParams.modifier);
        }
        return color.toString();
    }
    else {
        const theme = s_sugar_config_1.default('theme');
        if (!theme.default.colors[finalParams.name])
            throw new Error(`Sorry but the requested color "<yellow>${finalParams.name}</yellow>" does not exists...`);
        let colorVar = `--s-colors-${finalParams.name}`;
        if (finalParams.modifier)
            colorVar += `-${finalParams.modifier}`;
        else
            colorVar += '-default';
        let colorValue = theme.default.colors[finalParams.name].default;
        if (finalParams.modifier) {
            colorValue = theme.default.colors[finalParams.name][finalParams.modifier];
        }
        return `var(${colorVar}, ${colorValue})`;
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUF5RDtBQUl6RCxvRUFBNkM7QUFFN0MsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTs7QUFhZCxxREFBUztBQVo3QywyQ0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQVNKLG1CQUF5QixTQUFrRCxFQUFFO0lBQzNFLE1BQU0sV0FBVyxtQkFDZixJQUFJLEVBQUUsRUFBRSxFQUNSLFFBQVEsRUFBRSxFQUFFLElBQ1QsTUFBTSxDQUNWLENBQUM7SUFFRixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7SUFFekIsSUFDRSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztRQUM3QyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDcEIsMkZBQTJGLENBQzVGO1FBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQ3BCLG1FQUFtRSxDQUNwRTtRQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUNwQiwrRUFBK0UsQ0FDaEY7UUFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDcEIsK0VBQStFLENBQ2hGLEVBQ0Q7UUFDQSxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXBCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3pCO1NBQU07UUFDTCxNQUFNLEtBQUssR0FBRyx3QkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQ2IsMENBQTBDLFdBQVcsQ0FBQyxJQUFJLCtCQUErQixDQUMxRixDQUFDO1FBRUosSUFBSSxRQUFRLEdBQUcsY0FBYyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEQsSUFBSSxXQUFXLENBQUMsUUFBUTtZQUFFLFFBQVEsSUFBSSxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7WUFDNUQsUUFBUSxJQUFJLFVBQVUsQ0FBQztRQUU1QixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRWhFLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUN4QixVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzRTtRQUVELE9BQU8sT0FBTyxRQUFRLEtBQUssVUFBVSxHQUFHLENBQUM7S0FDMUM7QUFDSCxDQUFDO0FBckRELDRCQXFEQyJ9