"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssSugarPluginMediaContainerMixinInterface extends s_interface_1.default {
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
exports.interface = postcssSugarPluginMediaContainerMixinInterface;
/**
 * @name           container
 * @namespace      node.mixin.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a container query in your css.
 * If no containerName is passed, it will init the target itself as a the container to use for the query.
 *
 * @param       {String}        query       The query string like ">200", "<=500", etc...
 * @return      {Css}         The generated css
 *
 * @snippet         @sugar.media.container $1
 * \@sugar.media.container $1 {
 *      $2
 * }
 *
 * @example        css
 * \@sugar.media.container >=200 {
 *      // ...
 * }
 * \@sugar.media.container <=300 {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, postcssApi, registerPostProcessor, }) {
    const mediaConfig = s_theme_1.default.get('media');
    const finalParams = Object.assign({ containerName: null }, (params !== null && params !== void 0 ? params : {}));
    if (!finalParams.query) {
        throw new Error(`<red>[@sugar.media]</red> You MUST provide a query in order to use the <yellow>@sugar.media</yellow> mixin...`);
    }
    const buildedQuery = s_theme_1.default.buildMediaQuery(finalParams.query, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSw4Q0FBK0MsU0FBUSxxQkFBWTtJQUNyRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUMwRCxtRUFBUztBQUVwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixxQkFBcUIsR0FNeEI7SUFDRyxNQUFNLFdBQVcsR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUxQyxNQUFNLFdBQVcsbUJBQ2IsYUFBYSxFQUFFLElBQUksSUFDaEIsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQ1gsK0dBQStHLENBQ2xILENBQUM7S0FDTDtJQUVELE1BQU0sWUFBWSxHQUFHLGlCQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDN0QsTUFBTSxFQUFFLFdBQVc7UUFDbkIsYUFBYSxFQUFFLFdBQVcsQ0FBQyxhQUFhO0tBQzNDLENBQUMsQ0FBQztJQUVILE1BQU0sU0FBUyxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLEVBQUUsT0FBTztRQUNiLE1BQU0sRUFBRSxhQUFhLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDakUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO0tBQ3RCLENBQUMsQ0FBQztJQUVILHFEQUFxRDtJQUNyRCw4QkFBOEI7SUFDOUIsNEJBQTRCO0lBQzVCLE1BQU07SUFFTiwrQkFBK0I7SUFDL0IsK0RBQStEO0lBQy9ELGdDQUFnQztJQUNoQyxvREFBb0Q7SUFDcEQsUUFBUTtJQUNSLElBQUk7SUFFSixNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFoREQsNEJBZ0RDIn0=