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
import __objectHash from '@coffeekraken/sugar/shared/object/objectHash';
import __STheme from '@coffeekraken/s-theme';
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
export default function ({ params, atRule, cache, sharedData, toCache, replaceWith, }) {
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
        const hash = `@sugar.classes.${__objectHash({
            css: cssArray,
            theme: __STheme.hash(),
        })}`;
        const c = cache('@sugar.classes', hash, cssArray);
        return c;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFLN0MsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBaUIsRUFDM0IsTUFBTSxFQUNOLE1BQU0sRUFDTixLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDUCxXQUFXLEdBQ2Q7O1FBQ0csTUFBTSxRQUFRLEdBQWE7WUFDdkIsMEJBQTBCO1lBQzFCLG9CQUFvQjtZQUNwQix1QkFBdUI7WUFDdkIsc0JBQXNCO1lBQ3RCLHdCQUF3QjtZQUN4QiwwQkFBMEI7WUFDMUIsdUJBQXVCO1lBQ3ZCLHFCQUFxQjtZQUNyQix3QkFBd0I7WUFDeEIscUJBQXFCO1lBQ3JCLHVCQUF1QjtZQUN2QixzQkFBc0I7WUFDdEIsc0JBQXNCO1lBQ3RCLHVCQUF1QjtZQUN2QiwwQkFBMEI7WUFDMUIsc0JBQXNCO1lBQ3RCLHVCQUF1QjtZQUN2Qix1QkFBdUI7WUFDdkIsd0JBQXdCO1lBQ3hCLHlCQUF5QjtZQUN6QiwwQkFBMEI7WUFDMUIsMEJBQTBCO1lBQzFCLHlCQUF5QjtZQUN6Qiw0QkFBNEI7WUFDNUIsd0JBQXdCO1lBQ3hCLHlCQUF5QjtZQUN6Qix5QkFBeUI7WUFDekIsdUJBQXVCO1lBQ3ZCLHlCQUF5QjtZQUN6Qiw0QkFBNEI7WUFDNUIsMEJBQTBCO1lBQzFCLDBCQUEwQjtZQUMxQix1QkFBdUI7WUFDdkIsc0JBQXNCO1lBQ3RCLDJCQUEyQjtZQUMzQix1QkFBdUI7WUFDdkIsNEJBQTRCO1lBQzVCLDRCQUE0QjtTQUMvQixDQUFDO1FBRUYsTUFBTSxJQUFJLEdBQUcsa0JBQWtCLFlBQVksQ0FBQztZQUN4QyxHQUFHLEVBQUUsUUFBUTtZQUNiLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFO1NBQ3pCLENBQUMsRUFBRSxDQUFDO1FBQ0wsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7Q0FBQSJ9