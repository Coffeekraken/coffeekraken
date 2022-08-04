"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           classes
 * @namespace      node.mixin.classes
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./classes
 * @status        beta
 *
 * This mixin generate all the sugar classes like utilities for colors, fonts, margins, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            ui: {
                description: 'Specify if you want the UI classes to be generated or not',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginClassesInterface;
function default_1({ params, atRule, cache, sharedData, toCache, replaceWith, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const finalParams = Object.assign({}, params);
        const cssArray = [
            '@sugar.typo.classes;',
            '@sugar.container.classes;',
            '@sugar.grid.classes;',
            '@sugar.group.classes;',
            '@sugar.layout.classes;',
            '@sugar.clearfix.classes;',
            '@sugar.cursor.classes;',
            '@sugar.color.classes;',
            '@sugar.fit.classes;',
            '@sugar.format.classes;',
            '@sugar.link.classes;',
            '@sugar.gap.classes;',
            '@sugar.height.classes;',
            '@sugar.text.classes;',
            '@sugar.font.classes;',
            '@sugar.depth.classes;',
            '@sugar.disabled.classes;',
            '@sugar.flex.classes;',
            '@sugar.float.classes;',
            '@sugar.ratio.classes;',
            '@sugar.border.classes;',
            '@sugar.display.classes;',
            '@sugar.overflow.classes;',
            '@sugar.position.classes;',
            '@sugar.pointer.classes;',
            '@sugar.transition.classes;',
            '@sugar.margin.classes;',
            '@sugar.offsize.classes;',
            '@sugar.order.classes;',
            '@sugar.opacity.classes;',
            '@sugar.scale.classes;',
            '@sugar.padding.classes;',
            '@sugar.userSelect.classes;',
            '@sugar.visibility.classes;',
            '@sugar.visually.classes;',
            '@sugar.truncate.classes;',
            '@sugar.until.classes;',
            '@sugar.when.classes;',
            '@sugar.scrollbar.classes;',
            '@sugar.width.classes;',
            // '@sugar.components.classes;',
            '@sugar.whiteSpace.classes;',
        ];
        if (finalParams.ui) {
            cssArray.unshift('@sugar.ui.classes;');
        }
        cssArray.unshift('@sugar.reset;');
        return cssArray;
        // const hash = `@sugar.classes.${__objectHash({
        //     finalParams,
        //     css: cssArray,
        //     theme: __STheme.hash(),
        // })}`;
        // const c = cache('@sugar.classes', hash, cssArray);
        // return c;
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLGtDQUFtQyxTQUFRLHFCQUFZO0lBQ3pELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxFQUFFLEVBQUU7Z0JBQ0EsV0FBVyxFQUNQLDJEQUEyRDtnQkFDL0QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTThDLHVEQUFTO0FBRXhELG1CQUErQixFQUMzQixNQUFNLEVBQ04sTUFBTSxFQUNOLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNQLFdBQVcsR0FDZDs7UUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBYTtZQUN2QixzQkFBc0I7WUFDdEIsMkJBQTJCO1lBQzNCLHNCQUFzQjtZQUN0Qix1QkFBdUI7WUFDdkIsd0JBQXdCO1lBQ3hCLDBCQUEwQjtZQUMxQix3QkFBd0I7WUFDeEIsdUJBQXVCO1lBQ3ZCLHFCQUFxQjtZQUNyQix3QkFBd0I7WUFDeEIsc0JBQXNCO1lBQ3RCLHFCQUFxQjtZQUNyQix3QkFBd0I7WUFDeEIsc0JBQXNCO1lBQ3RCLHNCQUFzQjtZQUN0Qix1QkFBdUI7WUFDdkIsMEJBQTBCO1lBQzFCLHNCQUFzQjtZQUN0Qix1QkFBdUI7WUFDdkIsdUJBQXVCO1lBQ3ZCLHdCQUF3QjtZQUN4Qix5QkFBeUI7WUFDekIsMEJBQTBCO1lBQzFCLDBCQUEwQjtZQUMxQix5QkFBeUI7WUFDekIsNEJBQTRCO1lBQzVCLHdCQUF3QjtZQUN4Qix5QkFBeUI7WUFDekIsdUJBQXVCO1lBQ3ZCLHlCQUF5QjtZQUN6Qix1QkFBdUI7WUFDdkIseUJBQXlCO1lBQ3pCLDRCQUE0QjtZQUM1Qiw0QkFBNEI7WUFDNUIsMEJBQTBCO1lBQzFCLDBCQUEwQjtZQUMxQix1QkFBdUI7WUFDdkIsc0JBQXNCO1lBQ3RCLDJCQUEyQjtZQUMzQix1QkFBdUI7WUFDdkIsZ0NBQWdDO1lBQ2hDLDRCQUE0QjtTQUMvQixDQUFDO1FBRUYsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFO1lBQ2hCLFFBQVEsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUMxQztRQUVELFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFbEMsT0FBTyxRQUFRLENBQUM7UUFFaEIsZ0RBQWdEO1FBQ2hELG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsOEJBQThCO1FBQzlCLFFBQVE7UUFDUixxREFBcUQ7UUFDckQsWUFBWTtJQUNoQixDQUFDO0NBQUE7QUF4RUQsNEJBd0VDIn0=