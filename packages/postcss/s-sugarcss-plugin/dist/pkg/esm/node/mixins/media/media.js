import __SInterface from '@coffeekraken/s-interface';
import __SMedia from '@coffeekraken/s-media';
class SSugarcssPluginMediaMixinInterface extends __SInterface {
    static get _definition() {
        return {
            query: {
                type: 'String',
                required: true,
            },
        };
    }
}
export { SSugarcssPluginMediaMixinInterface as interface };
/**
 * @name           media
 * @as              @s.media
 * @namespace      node.mixin.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply any media queries that are defined
 * in the config.theme.media.queries configuration stack like "tablet", "mobile", etc...
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 * @return      {Css}         The generated css
 *
 * @snippet         @s.media $1
 * @s.media $1 {
 *      $2
 * }
 *
 * @example        css
 * @s.media >=desktop {
 *      // ...
 * }
 * @s.media tablet {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, postcssApi, registerPostProcessor, }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    const media = new __SMedia();
    const buildedQuery = media.buildQuery(finalParams.query, {
        method: 'media',
    });
    const mediaRule = new postcssApi.AtRule({
        name: 'media',
        params: buildedQuery.replace(/^\@media\s/, ''),
        nodes: atRule.nodes,
    });
    atRule.replaceWith(mediaRule);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sa0NBQW1DLFNBQVEsWUFBWTtJQUN6RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSxrQ0FBa0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLHFCQUFxQixHQU14QjtJQUNHLE1BQU0sV0FBVyxxQkFDVixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUU3QixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDckQsTUFBTSxFQUFFLE9BQU87S0FDbEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksRUFBRSxPQUFPO1FBQ2IsTUFBTSxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUM5QyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7S0FDdEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsQyxDQUFDIn0=