"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const postcss_1 = __importDefault(require("postcss"));
const default_1 = __importDefault(require("./default"));
class postcssSugarPluginUiButtonClassesInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginUiButtonClassesInterface;
postcssSugarPluginUiButtonClassesInterface.definition = {
    colors: {
        type: 'String[]',
        alias: 'c'
    },
    sizes: {
        type: 'String[]',
        alias: 's'
    }
};
function default_2(params = {}, atRule) {
    const themeConfig = s_sugar_config_1.default('theme');
    const finalParams = Object.assign({ colors: Object.keys(themeConfig.default.colors), sizes: Object.keys(themeConfig.default.paddings) }, params);
    const vars = [];
    finalParams.colors.forEach((colorName) => {
        const colors = default_1.default({
            color: colorName,
            scope: 'color'
        });
        const cssStr = `
      ${colorName === 'default' ? '.s-btn' : `.s-btn--${colorName}`} {
            ${colors}
        }
      `;
        vars.push(cssStr);
    });
    finalParams.sizes.forEach((sizeName) => {
        const paddings = default_1.default({
            size: sizeName,
            scope: 'size'
        });
        const cssStr = `
        ${sizeName === 'default' ? '.s-btn' : `.s-btn--${sizeName}`} {
            ${paddings}
        }
    `;
        vars.push(cssStr);
    });
    //   console.log(vars.join('\n'));
    if (atRule) {
        const AST = postcss_1.default.parse(vars.join('\n'));
        atRule.replaceWith(AST);
    }
    else {
        return vars.join('\n');
    }
}
exports.default = default_2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUF5RDtBQUV6RCxzREFBZ0M7QUFHaEMsd0RBQWlDO0FBR2pDLE1BQU0sMENBQTJDLFNBQVEscUJBQVk7O0FBa0JkLCtEQUFTO0FBakJ2RCxxREFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsVUFBVTtRQUNoQixLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQVVKLG1CQUNFLFNBQTRELEVBQUUsRUFDOUQsTUFBTTtJQUVOLE1BQU0sV0FBVyxHQUFHLHdCQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFM0MsTUFBTSxXQUFXLG1CQUNmLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQy9DLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQzdDLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDdkMsTUFBTSxNQUFNLEdBQUcsaUJBQVEsQ0FBQztZQUN0QixLQUFLLEVBQUUsU0FBUztZQUNoQixLQUFLLEVBQUUsT0FBTztTQUNmLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHO1FBQ1gsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLFNBQVMsRUFBRTtjQUNyRCxNQUFNOztPQUViLENBQUM7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNyQyxNQUFNLFFBQVEsR0FBRyxpQkFBUSxDQUFDO1lBQ3hCLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLE1BQU07U0FDZCxDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sR0FBRztVQUNULFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxRQUFRLEVBQUU7Y0FDckQsUUFBUTs7S0FFakIsQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxrQ0FBa0M7SUFFbEMsSUFBSSxNQUFNLEVBQUU7UUFDVixNQUFNLEdBQUcsR0FBRyxpQkFBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6QjtTQUFNO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hCO0FBQ0gsQ0FBQztBQWhERCw0QkFnREMifQ==