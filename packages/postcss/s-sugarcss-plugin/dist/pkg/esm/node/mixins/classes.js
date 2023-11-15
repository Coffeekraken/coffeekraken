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
/**
 * @name           classes
 * @as              @s.classes
 * @namespace      node.mixin
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./classes
 * @status        stable
 *
 * This mixin generate all the sugar classes like utilities for colors, fonts, margins, etc:
 *
 * - ```@s.border.classes;```
 * - ```@s.clearfix.classes;```
 * - ```@s.color.classes;```
 * - ```@s.container.classes;```
 * - ```@s.cursor.classes;```
 * - ```@s.depth.classes;```
 * - ```@s.disabled.classes;```
 * - ```@s.display.classes;```
 * - ```@s.fit.classes;```
 * - ```@s.flex.classes;```
 * - ```@s.float.classes;```
 * - ```@s.font.classes;```
 * - ```@s.format.classes;```
 * - ```@s.gap.classes;```
 * - ```@s.gradient.classes;```
 * - ```@s.grid.classes;```
 * - ```@s.group.classes;```
 * - ```@s.grow.classes;```
 * - ```@s.hide.classes;```
 * - ```@s.layout.classes;```
 * - ```@s.link.classes;```
 * - ```@s.margin.classes;```
 * - ```@s.offsize.classes;```
 * - ```@s.opacity.classes;```
 * - ```@s.order.classes;```
 * - ```@s.overflow.classes;```
 * - ```@s.padding.classes;```
 * - ```@s.pointer.classes;```
 * - ```@s.position.classes;```
 * - ```@s.ratio.classes;```
 * - ```@s.scale.classes;```
 * - ```@s.scrollbar.classes;```
 * - ```@s.shape.classes;```
 * - ```@s.shrink.classes;```
 * - ```@s.spacing.classes;```
 * - ```@s.text.classes;```
 * - ```@s.transition.classes;```
 * - ```@s.truncate.classes;```
 * - ```@s.typo.classes;```
 * - ```@s.until.classes;```
 * - ```@s.userSelect.classes;```
 * - ```@s.visibility.classes;```
 * - ```@s.visually.classes;```
 * - ```@s.when.classes;```
 * - ```@s.whiteSpace.classes;```
 * - ```@s.width.classes;```
 *
 * @param           {Boolean}           [ui=true]           Specify if you want to generate also the ui classes (avatar, etc...)
 * @return        {Css}         The generated css
 *
 * @snippet         @s.classes
 *
 * @example        css
 * @s.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginClassesInterface extends __SInterface {
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
export { SSugarcssPluginClassesInterface as interface };
export default function ({ params, atRule, cache, sharedData, toCache, replaceWith, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const finalParams = Object.assign({}, params);
        const cssArray = [
            '@s.border.classes;',
            '@s.clearfix.classes;',
            '@s.color.classes;',
            '@s.container.classes;',
            '@s.cursor.classes;',
            '@s.depth.classes;',
            '@s.disabled.classes;',
            '@s.display.classes;',
            '@s.fit.classes;',
            '@s.flex.classes;',
            '@s.float.classes;',
            '@s.font.classes;',
            '@s.format.classes;',
            '@s.gap.classes;',
            '@s.gradient.classes;',
            '@s.grid.classes;',
            '@s.group.classes;',
            '@s.grow.classes;',
            '@s.hide.classes;',
            '@s.layout.classes;',
            '@s.link.classes;',
            '@s.margin.classes;',
            '@s.offsize.classes;',
            '@s.opacity.classes;',
            '@s.order.classes;',
            '@s.overflow.classes;',
            '@s.padding.classes;',
            '@s.pointer.classes;',
            '@s.position.classes;',
            '@s.ratio.classes;',
            '@s.scale.classes;',
            '@s.scrollbar.classes;',
            '@s.shape.classes;',
            '@s.shrink.classes;',
            '@s.spacing.classes;',
            '@s.text.classes;',
            '@s.transition.classes;',
            '@s.truncate.classes;',
            '@s.typo.classes;',
            '@s.until.classes;',
            '@s.userSelect.classes;',
            '@s.visibility.classes;',
            '@s.visually.classes;',
            '@s.when.classes;',
            '@s.whiteSpace.classes;',
            '@s.width.classes;',
        ];
        if (finalParams.ui) {
            cssArray.unshift('@s.ui.classes;');
        }
        return cssArray;
        // const hash = `@s.classes.${__objectHash({
        //     finalParams,
        //     css: cssArray,
        //     theme: __STheme.hash(),
        // })}`;
        // const c = cache('@s.classes', hash, cssArray);
        // return c;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9FRztBQUVILE1BQU0sK0JBQWdDLFNBQVEsWUFBWTtJQUN0RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsRUFBRSxFQUFFO2dCQUNBLFdBQVcsRUFDUCwyREFBMkQ7Z0JBQy9ELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSwrQkFBK0IsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV4RCxNQUFNLENBQUMsT0FBTyxXQUFpQixFQUMzQixNQUFNLEVBQ04sTUFBTSxFQUNOLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNQLFdBQVcsR0FDZDs7UUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBYTtZQUN2QixvQkFBb0I7WUFDcEIsc0JBQXNCO1lBQ3RCLG1CQUFtQjtZQUNuQix1QkFBdUI7WUFDdkIsb0JBQW9CO1lBQ3BCLG1CQUFtQjtZQUNuQixzQkFBc0I7WUFDdEIscUJBQXFCO1lBQ3JCLGlCQUFpQjtZQUNqQixrQkFBa0I7WUFDbEIsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixvQkFBb0I7WUFDcEIsaUJBQWlCO1lBQ2pCLHNCQUFzQjtZQUN0QixrQkFBa0I7WUFDbEIsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixrQkFBa0I7WUFDbEIsb0JBQW9CO1lBQ3BCLGtCQUFrQjtZQUNsQixvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLHFCQUFxQjtZQUNyQixtQkFBbUI7WUFDbkIsc0JBQXNCO1lBQ3RCLHFCQUFxQjtZQUNyQixxQkFBcUI7WUFDckIsc0JBQXNCO1lBQ3RCLG1CQUFtQjtZQUNuQixtQkFBbUI7WUFDbkIsdUJBQXVCO1lBQ3ZCLG1CQUFtQjtZQUNuQixvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLGtCQUFrQjtZQUNsQix3QkFBd0I7WUFDeEIsc0JBQXNCO1lBQ3RCLGtCQUFrQjtZQUNsQixtQkFBbUI7WUFDbkIsd0JBQXdCO1lBQ3hCLHdCQUF3QjtZQUN4QixzQkFBc0I7WUFDdEIsa0JBQWtCO1lBQ2xCLHdCQUF3QjtZQUN4QixtQkFBbUI7U0FDdEIsQ0FBQztRQUVGLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRTtZQUNoQixRQUFRLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdEM7UUFFRCxPQUFPLFFBQVEsQ0FBQztRQUVoQiw0Q0FBNEM7UUFDNUMsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQiw4QkFBOEI7UUFDOUIsUUFBUTtRQUNSLGlEQUFpRDtRQUNqRCxZQUFZO0lBQ2hCLENBQUM7Q0FBQSJ9