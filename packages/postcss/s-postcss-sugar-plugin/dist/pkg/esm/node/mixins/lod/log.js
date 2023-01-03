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
 * \@sugar.lod(4) {
 *      .myElement {
 *          background: red;
 *          width: 100%;
 *      }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginLodMixinInterface extends __SInterface {
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
export { postcssSugarPluginLodMixinInterface as interface };
export default function ({ params, atRule, postcssApi, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxZQUFZO0lBQzFELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsT0FBTzthQUNuQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFNNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsR0FLYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsQ0FBQyxFQUNSLE1BQU0sRUFBRSxPQUFPLElBQ1osQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUU1QixJQUFJLE9BQU8sV0FBVyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7U0FBTSxJQUFJLE9BQU8sV0FBVyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDOUMsSUFBSSxVQUFVLEVBQ1YsUUFBUSxFQUNSLFFBQVEsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1NBQ3pCO0tBQ0o7SUFFRCxtQ0FBbUM7SUFDbkMsMkJBQTJCO0lBQzNCLDRCQUE0QjtJQUM1QixrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLHNDQUFzQztJQUN0QywyREFBMkQ7SUFDM0QsdUNBQXVDO0lBQ3ZDLDBFQUEwRTtJQUMxRSxvSEFBb0g7SUFDcEgsUUFBUTtJQUNSLE1BQU07SUFFTixtREFBbUQ7SUFDbkQsbUJBQW1CO0FBQ3ZCLENBQUMifQ==