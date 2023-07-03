"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_media_1 = __importDefault(require("@coffeekraken/s-media"));
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
 * @__name           container
 * @__as              @sugar.media.container
 * @__namespace      node.mixin.media
 * @__type           PostcssMixin
 * @__platform      postcss
 * @__status        wip
 *
 * This mixin allows you to apply a container query in your css.
 * If no containerName is passed, it will init the target itself as a the container to use for the query.
 *
 * @__param       {String}        query       The query string like ">200", "<=500", etc...
 * @__return      {Css}         The generated css
 *
 * @__snippet         @sugar.media.container $1
 * \@sugar.media.container $1 {
 *      $2
 * }
 *
 * @__example        css
 * \@sugar.media.container >=200 {
 *      // ...
 * }
 * \@sugar.media.container <=300 {
 *      // ...
 * }
 *
 * @__since       2.0.0
 * @__author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, postcssApi, registerPostProcessor, }) {
    const mediaConfig = s_theme_1.default.get('media');
    const finalParams = Object.assign({ containerName: null }, (params !== null && params !== void 0 ? params : {}));
    if (!finalParams.query) {
        throw new Error(`<red>[@sugar.media]</red> You MUST provide a query in order to use the <yellow>@sugar.media</yellow> mixin...`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msb0VBQTZDO0FBRTdDLE1BQU0sOENBQStDLFNBQVEscUJBQVk7SUFDckUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDMEQsbUVBQVM7QUFFcEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLHFCQUFxQixHQU14QjtJQUNHLE1BQU0sV0FBVyxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTFDLE1BQU0sV0FBVyxtQkFDYixhQUFhLEVBQUUsSUFBSSxJQUNoQixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FDWCwrR0FBK0csQ0FDbEgsQ0FBQztLQUNMO0lBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7SUFFN0IsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3JELE1BQU0sRUFBRSxXQUFXO1FBQ25CLGFBQWEsRUFBRSxXQUFXLENBQUMsYUFBYTtLQUMzQyxDQUFDLENBQUM7SUFFSCxNQUFNLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDcEMsSUFBSSxFQUFFLE9BQU87UUFDYixNQUFNLEVBQUUsYUFBYSxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ2pFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztLQUN0QixDQUFDLENBQUM7SUFFSCxxREFBcUQ7SUFDckQsOEJBQThCO0lBQzlCLDRCQUE0QjtJQUM1QixNQUFNO0lBRU4sK0JBQStCO0lBQy9CLCtEQUErRDtJQUMvRCxnQ0FBZ0M7SUFDaEMsb0RBQW9EO0lBQ3BELFFBQVE7SUFDUixJQUFJO0lBRUosTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBbERELDRCQWtEQyJ9