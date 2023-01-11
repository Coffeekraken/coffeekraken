import __SInterface from '@coffeekraken/s-interface';
import { __fromQuantifier } from '@coffeekraken/sugar/array';
/**
 * @name           only
 * @namespace      node.mixin.lod
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./lod
 * @status        beta
 *
 * This mixin allows you to specify which lod you want to keep from the enclosed css.
 * This is useful for example if you want to start with some sugar classes but ONLY
 * certain levels.
 *
 * @param           {Number|String}         level           The level of details you want to keep. "2" will mean 0, 1 and 2. "=2" will mean only the level 2. ">=2" will mean 2 and greater, etc...
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.lod.only(2) {
 *      \@sugar.ui.button.classes;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginLodOnlyMixinInterface extends __SInterface {
    static get _definition() {
        return {
            level: {
                type: 'Number|String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginLodOnlyMixinInterface as interface };
export default function ({ params, atRule, settings, postcssApi, }) {
    const finalParams = Object.assign({ level: 0 }, (params !== null && params !== void 0 ? params : {}));
    const levels = __fromQuantifier(finalParams.level, {
        max: Object.keys(settings.lod.levels).length,
        action: settings.lod.defaultAction,
    });
    console.log('level', levels);
    return;
    // create a new rule that will wrap
    // the lod scoped ones
    const newSelectors = [];
    levels.forEach((lod) => {
        let cls = `.s-lod--${lod}`;
        if (finalParams.method === 'file') {
            cls += `.s-lod-method--${finalParams.method}`;
        }
        newSelectors.push(`${cls} &`);
    });
    const newRule = postcssApi.rule({
        selector: newSelectors.join(','),
    });
    atRule.nodes.forEach((node) => {
        newRule.append(node);
    });
    atRule.replaceWith(newRule);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUtoRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLFVBQVUsR0FNYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsQ0FBQyxJQUNMLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFNLE1BQU0sR0FBYSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3pELEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTTtRQUM1QyxNQUFNLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhO0tBQ3JDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTdCLE9BQU87SUFFUCxtQ0FBbUM7SUFDbkMsc0JBQXNCO0lBQ3RCLE1BQU0sWUFBWSxHQUFhLEVBQUUsQ0FBQztJQUVsQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDbkIsSUFBSSxHQUFHLEdBQUcsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFO1lBQy9CLEdBQUcsSUFBSSxrQkFBa0IsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pEO1FBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzVCLFFBQVEsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUNuQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzFCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2hDLENBQUMifQ==