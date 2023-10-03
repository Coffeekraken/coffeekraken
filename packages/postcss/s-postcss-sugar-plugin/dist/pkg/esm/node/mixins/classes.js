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
 * This mixin generate all the sugar classes like utilities for colors, fonts, margins, etc...
 *
 * @param           {Boolean}           [ui=true]           Specify if you want to generate also the ui classes (avatar, etc...)
 * @return        {Css}         The generated css
 *
 * @snippet         @s.classes
 *
 * @example        css
 * \@s.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginClassesInterface extends __SInterface {
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
export { postcssSugarPluginClassesInterface as interface };
export default function ({ params, atRule, cache, sharedData, toCache, replaceWith, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const finalParams = Object.assign({}, params);
        const cssArray = [
            '@s.typo.classes;',
            '@s.container.classes;',
            '@s.grid.classes;',
            '@s.group.classes;',
            '@s.gradient.classes;',
            '@s.layout.classes;',
            '@s.clearfix.classes;',
            '@s.cursor.classes;',
            '@s.color.classes;',
            '@s.fit.classes;',
            '@s.format.classes;',
            '@s.link.classes;',
            '@s.gap.classes;',
            '@s.grow.classes;',
            '@s.shrink.classes;',
            '@s.hide.classes;',
            '@s.text.classes;',
            '@s.font.classes;',
            '@s.depth.classes;',
            '@s.disabled.classes;',
            '@s.flex.classes;',
            '@s.float.classes;',
            '@s.ratio.classes;',
            '@s.border.classes;',
            '@s.display.classes;',
            '@s.overflow.classes;',
            '@s.position.classes;',
            '@s.pointer.classes;',
            '@s.transition.classes;',
            '@s.margin.classes;',
            '@s.offsize.classes;',
            '@s.order.classes;',
            '@s.opacity.classes;',
            '@s.scale.classes;',
            '@s.padding.classes;',
            '@s.spacing.classes;',
            '@s.userSelect.classes;',
            '@s.visibility.classes;',
            '@s.visually.classes;',
            '@s.truncate.classes;',
            '@s.until.classes;',
            '@s.when.classes;',
            '@s.scrollbar.classes;',
            '@s.shape.classes;',
            '@s.width.classes;',
            '@s.whiteSpace.classes;',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7SUFDekQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEVBQUUsRUFBRTtnQkFDQSxXQUFXLEVBQ1AsMkRBQTJEO2dCQUMvRCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsa0NBQWtDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFM0QsTUFBTSxDQUFDLE9BQU8sV0FBaUIsRUFDM0IsTUFBTSxFQUNOLE1BQU0sRUFDTixLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDUCxXQUFXLEdBQ2Q7O1FBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO1FBRUYsTUFBTSxRQUFRLEdBQWE7WUFDdkIsa0JBQWtCO1lBQ2xCLHVCQUF1QjtZQUN2QixrQkFBa0I7WUFDbEIsbUJBQW1CO1lBQ25CLHNCQUFzQjtZQUN0QixvQkFBb0I7WUFDcEIsc0JBQXNCO1lBQ3RCLG9CQUFvQjtZQUNwQixtQkFBbUI7WUFDbkIsaUJBQWlCO1lBQ2pCLG9CQUFvQjtZQUNwQixrQkFBa0I7WUFDbEIsaUJBQWlCO1lBQ2pCLGtCQUFrQjtZQUNsQixvQkFBb0I7WUFDcEIsa0JBQWtCO1lBQ2xCLGtCQUFrQjtZQUNsQixrQkFBa0I7WUFDbEIsbUJBQW1CO1lBQ25CLHNCQUFzQjtZQUN0QixrQkFBa0I7WUFDbEIsbUJBQW1CO1lBQ25CLG1CQUFtQjtZQUNuQixvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLHNCQUFzQjtZQUN0QixzQkFBc0I7WUFDdEIscUJBQXFCO1lBQ3JCLHdCQUF3QjtZQUN4QixvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLG1CQUFtQjtZQUNuQixxQkFBcUI7WUFDckIsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQixxQkFBcUI7WUFDckIsd0JBQXdCO1lBQ3hCLHdCQUF3QjtZQUN4QixzQkFBc0I7WUFDdEIsc0JBQXNCO1lBQ3RCLG1CQUFtQjtZQUNuQixrQkFBa0I7WUFDbEIsdUJBQXVCO1lBQ3ZCLG1CQUFtQjtZQUNuQixtQkFBbUI7WUFDbkIsd0JBQXdCO1NBQzNCLENBQUM7UUFFRixJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUU7WUFDaEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsT0FBTyxRQUFRLENBQUM7UUFFaEIsNENBQTRDO1FBQzVDLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsOEJBQThCO1FBQzlCLFFBQVE7UUFDUixpREFBaUQ7UUFDakQsWUFBWTtJQUNoQixDQUFDO0NBQUEifQ==