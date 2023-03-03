import __SInterface from '@coffeekraken/s-interface';
import { __fromQuantifier } from '@coffeekraken/sugar/array';
/**
 * @name           filter
 * @namespace      node.mixin.lod
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./lod
 * @status        beta
 *
 * This mixin allows you to specify which lod you want to keep from the enclosed css.
 * This is useful for example if you want to start with some sugar classes but filter
 * certain levels.
 *
 * @param           {Number|String}         level           The level of details you want to keep. "2" will mean 0, 1 and 2. "=2" will mean filter the level 2. ">=2" will mean 2 and greater, etc...
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.lod.filter($1)
 * \@sugar.lod.filter($1) {
 *      $2
 * }
 *
 * @example        css
 * \@sugar.lod.filter(2) {
 *      \@sugar.ui.button.classes;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginLodFilterMixinInterface extends __SInterface {
    static get _definition() {
        return {
            level: {
                type: 'Number|String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginLodFilterMixinInterface as interface };
export default function ({ params, atRule, settings, postcssApi, }) {
    var _a;
    const finalParams = Object.assign({ level: 0 }, (params !== null && params !== void 0 ? params : {}));
    // check if the lod feature is enabled or not
    if (!((_a = settings.lod) === null || _a === void 0 ? void 0 : _a.enabled)) {
        atRule.replaceWith(atRule.nodes);
        return;
    }
    const levels = __fromQuantifier(finalParams.level, {
        max: Object.keys(settings.lod.levels).length - 1,
        action: '<=',
    });
    const newRule = postcssApi.rule({
        selector: `.s-lod-filter--${levels.join('-')}`,
        nodes: atRule.nodes,
    });
    atRule.replaceWith(newRule);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBS2xFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEVBQ1IsVUFBVSxHQU1iOztJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsQ0FBQyxJQUNMLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRiw2Q0FBNkM7SUFDN0MsSUFBSSxDQUFDLENBQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxPQUFPLENBQUEsRUFBRTtRQUN4QixNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxPQUFPO0tBQ1Y7SUFFRCxNQUFNLE1BQU0sR0FBYSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3pELEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7UUFDaEQsTUFBTSxFQUFFLElBQUk7S0FDZixDQUFDLENBQUM7SUFFSCxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzVCLFFBQVEsRUFBRSxrQkFBa0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM5QyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7S0FDdEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoQyxDQUFDIn0=