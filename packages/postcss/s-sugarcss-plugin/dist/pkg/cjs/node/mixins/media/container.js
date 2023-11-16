"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_media_1 = __importDefault(require("@coffeekraken/s-media"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class SSugarcssPluginMediaContainerMixinInterface extends s_interface_1.default {
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
exports.interface = SSugarcssPluginMediaContainerMixinInterface;
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
function default_1({ params, atRule, postcssApi, registerPostProcessor, }) {
    const mediaConfig = s_theme_1.default.current.get('media');
    const finalParams = Object.assign({ containerName: null }, (params !== null && params !== void 0 ? params : {}));
    if (!finalParams.query) {
        throw new Error(`<red>[@s.media]</red> You MUST provide a query in order to use the <yellow>@s.media</yellow> mixin...`);
    }
    const media = new s_media_1.default();
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msb0VBQTZDO0FBRTdDLE1BQU0sMkNBQTRDLFNBQVEscUJBQVk7SUFDbEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDdUQsZ0VBQVM7QUFFakU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLHFCQUFxQixHQU14QjtJQUNHLE1BQU0sV0FBVyxHQUFHLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVsRCxNQUFNLFdBQVcsbUJBQ2IsYUFBYSxFQUFFLElBQUksSUFDaEIsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQ1gsdUdBQXVHLENBQzFHLENBQUM7S0FDTDtJQUVELE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQVEsRUFBRSxDQUFDO0lBRTdCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUNyRCxNQUFNLEVBQUUsV0FBVztRQUNuQixhQUFhLEVBQUUsV0FBVyxDQUFDLGFBQWE7S0FDM0MsQ0FBQyxDQUFDO0lBRUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksRUFBRSxPQUFPO1FBQ2IsTUFBTSxFQUFFLGFBQWEsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNqRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7S0FDdEIsQ0FBQyxDQUFDO0lBRUgscURBQXFEO0lBQ3JELDhCQUE4QjtJQUM5Qiw0QkFBNEI7SUFDNUIsTUFBTTtJQUVOLCtCQUErQjtJQUMvQiwrREFBK0Q7SUFDL0QsZ0NBQWdDO0lBQ2hDLG9EQUFvRDtJQUNwRCxRQUFRO0lBQ1IsSUFBSTtJQUVKLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQWxERCw0QkFrREMifQ==