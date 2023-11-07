import __SInterface from '@coffeekraken/s-interface';
import __SMedia from '@coffeekraken/s-media';
import __STheme from '@coffeekraken/s-theme';
class SSugarcssPluginMediaContainerMixinInterface extends __SInterface {
    static get _definition() {
        return {
            query: {
                type: 'String',
                required: true,
            },
            containerName: {
                type: 'String',
            },
        };
    }
}
export { SSugarcssPluginMediaContainerMixinInterface as interface };
/**
 * @name           container
 * @as              @s.media.container
 * @namespace      node.mixin.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin allows you to apply a container query in your css.
 * If no containerName is passed, it will init the target itself as a the container to use for the query.
 *
 * @param       {String}        query       The query string like ">200", "<=500", etc...
 * @return      {Css}         The generated css
 *
 * @snippet         @s.media.container $1
 * @s.media.container $1 {
 *      $2
 * }
 *
 * @example        css
 * @s.media.container >=200 {
 *      // ...
 * }
 * @s.media.container <=300 {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, postcssApi, registerPostProcessor, }) {
    const mediaConfig = __STheme.get('media');
    const finalParams = Object.assign({ containerName: null }, (params !== null && params !== void 0 ? params : {}));
    if (!finalParams.query) {
        throw new Error(`<red>[@s.media]</red> You MUST provide a query in order to use the <yellow>@s.media</yellow> mixin...`);
    }
    const media = new __SMedia();
    const buildedQuery = media.buildQuery(finalParams.query, {
        method: 'container',
        containerName: finalParams.containerName,
    });
    const mediaRule = new postcssApi.AtRule({
        name: 'media',
        params: `container ${buildedQuery.replace(/^\@container\s/, '')}`,
        nodes: atRule.nodes,
    });
    // const containerDecl = new postcssApi.Declaration({
    //     prop: 'container-type',
    //     value: `inline-size`,
    // });
    // if (!params.containerName) {
    //     const parentWithSelector = __parentWithSelector(atRule);
    //     if (parentWithSelector) {
    //         parentWithSelector.append(containerDecl);
    //     }
    // }
    atRule.replaceWith(mediaRule);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sMkNBQTRDLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSwyQ0FBMkMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLHFCQUFxQixHQU14QjtJQUNHLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFMUMsTUFBTSxXQUFXLG1CQUNiLGFBQWEsRUFBRSxJQUFJLElBQ2hCLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUNwQixNQUFNLElBQUksS0FBSyxDQUNYLHVHQUF1RyxDQUMxRyxDQUFDO0tBQ0w7SUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBRTdCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUNyRCxNQUFNLEVBQUUsV0FBVztRQUNuQixhQUFhLEVBQUUsV0FBVyxDQUFDLGFBQWE7S0FDM0MsQ0FBQyxDQUFDO0lBRUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksRUFBRSxPQUFPO1FBQ2IsTUFBTSxFQUFFLGFBQWEsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNqRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7S0FDdEIsQ0FBQyxDQUFDO0lBRUgscURBQXFEO0lBQ3JELDhCQUE4QjtJQUM5Qiw0QkFBNEI7SUFDNUIsTUFBTTtJQUVOLCtCQUErQjtJQUMvQiwrREFBK0Q7SUFDL0QsZ0NBQWdDO0lBQ2hDLG9EQUFvRDtJQUNwRCxRQUFRO0lBQ1IsSUFBSTtJQUVKLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsQ0FBQyJ9