import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           lod
 * @namespace      node.mixin.lod
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./lod
 * @status        beta
 *
 * This mixin allows you to set certain part of your css in a lod (level of details) specific level.
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.lod.when(4) {
 *      .myElement {
 *          background: red;
 *          width: 100%;
 *      }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginLodWhenMixinInterface extends __SInterface {
    static get _definition() {
        return {
            level: {
                type: 'Number|String',
                required: true,
            },
            method: {
                type: 'String',
                values: ['remove', 'file', 'class'],
                default: 'class',
            },
        };
    }
}
export { postcssSugarPluginLodWhenMixinInterface as interface };
export default function ({ params, atRule, settings, postcssApi, }) {
    var _a;
    // check if the lod feature is enabled or not
    if (!((_a = settings.lod) === null || _a === void 0 ? void 0 : _a.enabled)) {
        return;
    }
    const finalParams = Object.assign({ level: 0, method: 'class' }, (params !== null && params !== void 0 ? params : {}));
    const levels = [];
    if (typeof finalParams.level === 'number') {
        levels.push(finalParams.level);
    }
    else if (typeof finalParams.level === 'string') {
        let startLevel, endLevel, levelInt = parseInt(finalParams.level.replace(/^(><)\=?/, ''));
        if (finalParams.level.startsWith('>=')) {
            startLevel = levelInt;
        }
    }
    // atRule.nodes.forEach((node) => {
    //     // handle only rules
    //     if (!node.selector) {
    //         return;
    //     }
    //     // mark the rule with the level
    //     // that will be processed in the "lod" postprocessor
    //     // node._sLodWhen = finalParams;
    //     if (!node.selector.includes(`.s-lod-when--${finalParams.level}`)) {
    //         node.selector = `.s-lod-when--${finalParams.level}.s-lod-method--${finalParams.method} ${node.selector}`;
    //     }
    // });
    // atRule.parent.insertAfter(atRule, atRule.nodes);
    // atRule.remove();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsT0FBTzthQUNuQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixVQUFVLEdBTWI7O0lBRUcsNkNBQTZDO0lBQzdDLElBQUksQ0FBQyxDQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsT0FBTyxDQUFBLEVBQUU7UUFDeEIsT0FBTztLQUNWO0lBRUQsTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLEtBQUssRUFBRSxDQUFDLEVBQ1IsTUFBTSxFQUFFLE9BQU8sSUFDWixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBRTVCLElBQUksT0FBTyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsQztTQUFNLElBQUksT0FBTyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM5QyxJQUFJLFVBQVUsRUFDVixRQUFRLEVBQ1IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BDLFVBQVUsR0FBRyxRQUFRLENBQUM7U0FDekI7S0FDSjtJQUVELG1DQUFtQztJQUNuQywyQkFBMkI7SUFDM0IsNEJBQTRCO0lBQzVCLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1Isc0NBQXNDO0lBQ3RDLDJEQUEyRDtJQUMzRCx1Q0FBdUM7SUFDdkMsMEVBQTBFO0lBQzFFLG9IQUFvSDtJQUNwSCxRQUFRO0lBQ1IsTUFBTTtJQUVOLG1EQUFtRDtJQUNuRCxtQkFBbUI7QUFDdkIsQ0FBQyJ9