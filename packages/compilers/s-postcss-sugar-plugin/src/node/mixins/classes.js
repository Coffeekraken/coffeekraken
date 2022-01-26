var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginClassesMixinInterface as interface };
/**
 * @name           classes
 * @namespace      node.mixins.classes
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the sugar classes like utilities for colors, fonts, margins, etc...
 *
 * @return        {Css}         The generated css for all the classes in the toolkit
 *
 * @example         postcss
 * \@sugar.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, fromCache, toCache, replaceWith, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const cssArray = [
            '@sugar.reset.styleguide;',
            '@sugar.ui.classes;',
            '@sugar.align.classes;',
            '@sugar.typo.classes;',
            '@sugar.layout.classes;',
            '@sugar.clearfix.classes;',
            '@sugar.color.classes;',
            '@sugar.fit.classes;',
            '@sugar.format.classes;',
            '@sugar.align.classes;',
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
            '@sugar.opacity.classes;',
            '@sugar.scale.classes;',
            '@sugar.padding.classes;',
            '@sugar.visibility.classes;',
            '@sugar.visually.classes;',
            '@sugar.truncate.classes;',
            '@sugar.until.classes;',
            '@sugar.when.classes;',
            '@sugar.scrollbar.classes;',
            '@sugar.width.classes;',
            '@sugar.components.classes;',
            '@sugar.whiteSpace.classes;',
        ];
        return cssArray;
        // const hash = `classes-${__objectHash({
        //     css: cssArray,
        //     theme: __STheme.hash(),
        // })}`;
        // // from cache
        // const cached = await fromCache(hash, '@sugar.classes;');
        // if (cached) {
        //     return cached;
        // } else {
        //     console.log(
        //         `<yellow>[postcss]</yellow> This can take some time but will be cached <cyan>until you change your theme configuration</cyan>....`,
        //     );
        //     return toCache(hash, cssArray, '@sugar.classes;');
        // }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFRckQsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBaUIsRUFDM0IsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsR0FDZDs7UUFDRyxNQUFNLFFBQVEsR0FBYTtZQUN2QiwwQkFBMEI7WUFDMUIsb0JBQW9CO1lBQ3BCLHVCQUF1QjtZQUN2QixzQkFBc0I7WUFDdEIsd0JBQXdCO1lBQ3hCLDBCQUEwQjtZQUMxQix1QkFBdUI7WUFDdkIscUJBQXFCO1lBQ3JCLHdCQUF3QjtZQUN4Qix1QkFBdUI7WUFDdkIsc0JBQXNCO1lBQ3RCLHNCQUFzQjtZQUN0Qix1QkFBdUI7WUFDdkIsMEJBQTBCO1lBQzFCLHNCQUFzQjtZQUN0Qix1QkFBdUI7WUFDdkIsdUJBQXVCO1lBQ3ZCLHdCQUF3QjtZQUN4Qix5QkFBeUI7WUFDekIsMEJBQTBCO1lBQzFCLDBCQUEwQjtZQUMxQix5QkFBeUI7WUFDekIsNEJBQTRCO1lBQzVCLHdCQUF3QjtZQUN4Qix5QkFBeUI7WUFDekIseUJBQXlCO1lBQ3pCLHVCQUF1QjtZQUN2Qix5QkFBeUI7WUFDekIsNEJBQTRCO1lBQzVCLDBCQUEwQjtZQUMxQiwwQkFBMEI7WUFDMUIsdUJBQXVCO1lBQ3ZCLHNCQUFzQjtZQUN0QiwyQkFBMkI7WUFDM0IsdUJBQXVCO1lBQ3ZCLDRCQUE0QjtZQUM1Qiw0QkFBNEI7U0FDL0IsQ0FBQztRQUVGLE9BQU8sUUFBUSxDQUFDO1FBRWhCLHlDQUF5QztRQUN6QyxxQkFBcUI7UUFDckIsOEJBQThCO1FBQzlCLFFBQVE7UUFFUixnQkFBZ0I7UUFDaEIsMkRBQTJEO1FBQzNELGdCQUFnQjtRQUNoQixxQkFBcUI7UUFDckIsV0FBVztRQUNYLG1CQUFtQjtRQUNuQiw4SUFBOEk7UUFDOUksU0FBUztRQUNULHlEQUF5RDtRQUN6RCxJQUFJO0lBQ1IsQ0FBQztDQUFBIn0=