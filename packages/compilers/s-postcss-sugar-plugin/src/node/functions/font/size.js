"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
const isValidUnitValue_1 = __importDefault(require("@coffeekraken/sugar/shared/css/isValidUnitValue"));
class postcssSugarPluginFontSizeInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginFontSizeInterface;
postcssSugarPluginFontSizeInterface.definition = {
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
function default_1({ params }) {
    const finalParams = Object.assign({ name: '', return: 'var' }, params);
    const name = finalParams.name;
    if (isValidUnitValue_1.default(name))
        return name;
    let size = theme_1.default().config(`font.size.${name}`);
    if (finalParams.return === 'var') {
        return `var(--s-theme-font-size-${name}, ${size})`;
    }
    else {
        return size;
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUN4Qyx1R0FBaUY7QUFFakYsTUFBTSxtQ0FBb0MsU0FBUSxxQkFBWTs7QUFjZCx3REFBUztBQWJoRCw4Q0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDO1FBQ3hCLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDO0FBU0osbUJBQXlCLEVBQ3ZCLE1BQU0sRUFHUDtJQUNDLE1BQU0sV0FBVyxtQkFDZixJQUFJLEVBQUUsRUFBRSxFQUNSLE1BQU0sRUFBRSxLQUFLLElBQ1YsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBRTlCLElBQUksMEJBQWtCLENBQUMsSUFBSSxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFMUMsSUFBSSxJQUFJLEdBQUcsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVqRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQ2hDLE9BQU8sMkJBQTJCLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQztLQUNwRDtTQUFNO1FBQ0wsT0FBTyxJQUFJLENBQUM7S0FDYjtBQUNILENBQUM7QUF0QkQsNEJBc0JDIn0=