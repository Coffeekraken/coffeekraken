import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginMediaMixinInterface extends __SInterface {
    static get _definition() {
        return {
            query: {
                type: 'String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginMediaMixinInterface as interface };
/**
 * @name           media
 * @namespace      node.mixin.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply any media queries that are defined
 * in the config.theme.media.queries configuration stack like "tablet", "mobile", etc...
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 * @return      {Css}         The generated css
 *
 * @snippet         @sugar.media $1
 * \@sugar.media $1 {
 *      $2
 * }
 *
 * @example        css
 * \@sugar.media >=desktop {
 *      // ...
 * }
 * \@sugar.media tablet {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, postcssApi, registerPostProcessor, }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    const buildedQuery = __STheme.buildMediaQuery(finalParams.query, {
        method: 'media',
    });
    const mediaRule = new postcssApi.AtRule({
        name: 'media',
        params: buildedQuery.replace(/^\@media\s/, ''),
        nodes: atRule.nodes,
    });
    atRule.replaceWith(mediaRule);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0scUNBQXNDLFNBQVEsWUFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YscUJBQXFCLEdBTXhCO0lBQ0csTUFBTSxXQUFXLHFCQUNWLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDN0QsTUFBTSxFQUFFLE9BQU87S0FDbEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksRUFBRSxPQUFPO1FBQ2IsTUFBTSxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUM5QyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7S0FDdEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsQyxDQUFDIn0=