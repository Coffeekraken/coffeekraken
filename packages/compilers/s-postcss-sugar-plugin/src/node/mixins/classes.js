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
            '@sugar.gap.classes;',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFRckQsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBaUIsRUFDM0IsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsR0FDZDs7UUFDRyxNQUFNLFFBQVEsR0FBYTtZQUN2QiwwQkFBMEI7WUFDMUIsb0JBQW9CO1lBQ3BCLHVCQUF1QjtZQUN2QixzQkFBc0I7WUFDdEIsd0JBQXdCO1lBQ3hCLDBCQUEwQjtZQUMxQix1QkFBdUI7WUFDdkIscUJBQXFCO1lBQ3JCLHdCQUF3QjtZQUN4QixxQkFBcUI7WUFDckIsdUJBQXVCO1lBQ3ZCLHNCQUFzQjtZQUN0QixzQkFBc0I7WUFDdEIsdUJBQXVCO1lBQ3ZCLDBCQUEwQjtZQUMxQixzQkFBc0I7WUFDdEIsdUJBQXVCO1lBQ3ZCLHVCQUF1QjtZQUN2Qix3QkFBd0I7WUFDeEIseUJBQXlCO1lBQ3pCLDBCQUEwQjtZQUMxQiwwQkFBMEI7WUFDMUIseUJBQXlCO1lBQ3pCLDRCQUE0QjtZQUM1Qix3QkFBd0I7WUFDeEIseUJBQXlCO1lBQ3pCLHlCQUF5QjtZQUN6Qix1QkFBdUI7WUFDdkIseUJBQXlCO1lBQ3pCLDRCQUE0QjtZQUM1QiwwQkFBMEI7WUFDMUIsMEJBQTBCO1lBQzFCLHVCQUF1QjtZQUN2QixzQkFBc0I7WUFDdEIsMkJBQTJCO1lBQzNCLHVCQUF1QjtZQUN2Qiw0QkFBNEI7WUFDNUIsNEJBQTRCO1NBQy9CLENBQUM7UUFFRixPQUFPLFFBQVEsQ0FBQztRQUVoQix5Q0FBeUM7UUFDekMscUJBQXFCO1FBQ3JCLDhCQUE4QjtRQUM5QixRQUFRO1FBRVIsZ0JBQWdCO1FBQ2hCLDJEQUEyRDtRQUMzRCxnQkFBZ0I7UUFDaEIscUJBQXFCO1FBQ3JCLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsOElBQThJO1FBQzlJLFNBQVM7UUFDVCx5REFBeUQ7UUFDekQsSUFBSTtJQUNSLENBQUM7Q0FBQSJ9