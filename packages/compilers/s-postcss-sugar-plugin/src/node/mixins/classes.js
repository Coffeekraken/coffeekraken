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
}
postcssSugarPluginClassesMixinInterface.definition = {};
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
        if (cached)
            return cached;
        console.log('[postcss] Compiling the "<yellow>@sugar.classes;</yellow>" statement. This can take some time but will be cached <cyan>until you change your theme configuration</cyan>....');
        // add caching statements
        cssArray.unshift(`/* CACHE:${hash}:@sugar.classes; */`);
        cssArray.push(`/* ENDCACHE:${hash}:@sugar.classes; */`);
        return cssArray;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFHN0MsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN2RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUUzQixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFpQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRTs7UUFDckUsTUFBTSxRQUFRLEdBQWE7WUFDdkIsMEJBQTBCO1lBQzFCLG9CQUFvQjtZQUNwQix1QkFBdUI7WUFDdkIsc0JBQXNCO1lBQ3RCLHdCQUF3QjtZQUN4QiwwQkFBMEI7WUFDMUIsdUJBQXVCO1lBQ3ZCLHFCQUFxQjtZQUNyQix3QkFBd0I7WUFDeEIsdUJBQXVCO1lBQ3ZCLHNCQUFzQjtZQUN0QixzQkFBc0I7WUFDdEIsdUJBQXVCO1lBQ3ZCLDBCQUEwQjtZQUMxQixzQkFBc0I7WUFDdEIsdUJBQXVCO1lBQ3ZCLHdCQUF3QjtZQUN4Qix5QkFBeUI7WUFDekIsMEJBQTBCO1lBQzFCLDBCQUEwQjtZQUMxQix5QkFBeUI7WUFDekIsNEJBQTRCO1lBQzVCLHdCQUF3QjtZQUN4Qix5QkFBeUI7WUFDekIsdUJBQXVCO1lBQ3ZCLHlCQUF5QjtZQUN6Qiw0QkFBNEI7WUFDNUIsMEJBQTBCO1lBQzFCLDBCQUEwQjtZQUMxQix1QkFBdUI7WUFDdkIsMkJBQTJCO1lBQzNCLHVCQUF1QjtZQUN2Qiw0QkFBNEI7WUFDNUIsNEJBQTRCO1NBQy9CLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxXQUFXLFlBQVksQ0FBQztZQUNqQyxHQUFHLEVBQUUsUUFBUTtZQUNiLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFO1NBQ3pCLENBQUMsRUFBRSxDQUFDO1FBRUwsYUFBYTtRQUNiLE1BQU0sTUFBTSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hELElBQUksTUFBTTtZQUFFLE9BQU8sTUFBTSxDQUFDO1FBRTFCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsNktBQTZLLENBQ2hMLENBQUM7UUFFRix5QkFBeUI7UUFDekIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUkscUJBQXFCLENBQUMsQ0FBQztRQUN4RCxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxxQkFBcUIsQ0FBQyxDQUFDO1FBRXhELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7Q0FBQSJ9