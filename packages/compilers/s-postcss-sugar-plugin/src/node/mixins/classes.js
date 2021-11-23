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
 * @platform      css
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
export default function ({ params, atRule, fromCache, replaceWith }) {
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
            '@sugar.ratio.classes;',
            '@sugar.border.classes;',
            '@sugar.display.classes;',
            '@sugar.overflow.classes;',
            '@sugar.position.classes;',
            '@sugar.pointer.classes;',
            '@sugar.transition.classes;',
            '@sugar.margin.classes;',
            '@sugar.opacity.classes;',
            '@sugar.scale.classes;',
            '@sugar.padding.classes;',
            '@sugar.visibility.classes;',
            '@sugar.visually.classes;',
            '@sugar.truncate.classes;',
            '@sugar.until.classes;',
            '@sugar.scrollbar.classes;',
            '@sugar.width.classes;',
            '@sugar.components.classes;',
            '@sugar.whiteSpace.classes;',
        ];
        const hash = `classes-${__objectHash({
            css: cssArray,
            theme: __STheme.hash(),
        })}`;
        // from cache
        const cached = yield fromCache(hash, '@sugar.classes;');
        // if (cached) return cached;
        console.log('<yellow>[postcss]</yellow> Compiling the "<yellow>@sugar.classes;</yellow>" statement. This can take some time but will be cached <cyan>until you change your theme configuration</cyan>....');
        // add caching statements
        cssArray.unshift(`/* CACHE:${hash}:@sugar.classes; */`);
        cssArray.push(`/* ENDCACHE:${hash}:@sugar.classes; */`);
        return cssArray;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFLN0MsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBaUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUU7O1FBQ3JFLE1BQU0sUUFBUSxHQUFhO1lBQ3ZCLDBCQUEwQjtZQUMxQixvQkFBb0I7WUFDcEIsdUJBQXVCO1lBQ3ZCLHNCQUFzQjtZQUN0Qix3QkFBd0I7WUFDeEIsMEJBQTBCO1lBQzFCLHVCQUF1QjtZQUN2QixxQkFBcUI7WUFDckIsd0JBQXdCO1lBQ3hCLHVCQUF1QjtZQUN2QixzQkFBc0I7WUFDdEIsc0JBQXNCO1lBQ3RCLHVCQUF1QjtZQUN2QiwwQkFBMEI7WUFDMUIsc0JBQXNCO1lBQ3RCLHVCQUF1QjtZQUN2Qix3QkFBd0I7WUFDeEIseUJBQXlCO1lBQ3pCLDBCQUEwQjtZQUMxQiwwQkFBMEI7WUFDMUIseUJBQXlCO1lBQ3pCLDRCQUE0QjtZQUM1Qix3QkFBd0I7WUFDeEIseUJBQXlCO1lBQ3pCLHVCQUF1QjtZQUN2Qix5QkFBeUI7WUFDekIsNEJBQTRCO1lBQzVCLDBCQUEwQjtZQUMxQiwwQkFBMEI7WUFDMUIsdUJBQXVCO1lBQ3ZCLDJCQUEyQjtZQUMzQix1QkFBdUI7WUFDdkIsNEJBQTRCO1lBQzVCLDRCQUE0QjtTQUMvQixDQUFDO1FBRUYsTUFBTSxJQUFJLEdBQUcsV0FBVyxZQUFZLENBQUM7WUFDakMsR0FBRyxFQUFFLFFBQVE7WUFDYixLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRTtTQUN6QixDQUFDLEVBQUUsQ0FBQztRQUVMLGFBQWE7UUFDYixNQUFNLE1BQU0sR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN4RCw2QkFBNkI7UUFFN0IsT0FBTyxDQUFDLEdBQUcsQ0FDUCw4TEFBOEwsQ0FDak0sQ0FBQztRQUVGLHlCQUF5QjtRQUN6QixRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksSUFBSSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3hELFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLHFCQUFxQixDQUFDLENBQUM7UUFFeEQsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztDQUFBIn0=