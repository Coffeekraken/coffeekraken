import __SInterface from '@coffeekraken/s-interface';
import { __fromQuantifier } from '@coffeekraken/sugar/array';
/**
 * @name           filter
 * @as              @sugar.lod.filter
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
        selector: `.s-lod-filter-${levels.join('-')}`,
        nodes: atRule.nodes,
    });
    atRule.replaceWith(newRule);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBRUgsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUtsRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLFVBQVUsR0FNYjs7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsS0FBSyxFQUFFLENBQUMsSUFDTCxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsNkNBQTZDO0lBQzdDLElBQUksQ0FBQyxDQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsT0FBTyxDQUFBLEVBQUU7UUFDeEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsT0FBTztLQUNWO0lBRUQsTUFBTSxNQUFNLEdBQWEsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUN6RCxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBQ2hELE1BQU0sRUFBRSxJQUFJO0tBQ2YsQ0FBQyxDQUFDO0lBRUgsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixRQUFRLEVBQUUsaUJBQWlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDN0MsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO0tBQ3RCLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEMsQ0FBQyJ9