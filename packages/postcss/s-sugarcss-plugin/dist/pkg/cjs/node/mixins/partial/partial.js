"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @__name           partial
 * @__namespace      node.mixin.export
 * @__type           PostcssMixin
 * @__platform      postcss
 * @__status        wip
 *
 * This mixin allows you to mark some css to be exported as separated file.
 * You can specify the name of your partial
 *
 * @__return        {Css}         The generated css
 *
 * @__example        css
 * \@sugar.partial(general) {
 *   body {
 *      background: red;
 *   }
 * }
 *
 * @__since       2.0.0
 * @__author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginCacheInterface extends s_interface_1.default {
    static get _definition() {
        return {
            id: {
                type: 'String',
            },
        };
    }
}
exports.interface = postcssSugarPluginCacheInterface;
function default_1({ params, atRule, CssVars, nodesToString, postcss, postcssApi, settings, }) {
    const finalParams = Object.assign({ id: '' }, params);
    throw new Error(`<red>[postcss]</red> "<magenta>@sugar.partial</magenta>" mixin is not supported for now...`);
    if (!finalParams.id || finalParams.id === '') {
        throw new Error(`The "@sugar.export" mixin MUST specify an export path or id...`);
    }
    if (!settings.partials) {
        return nodesToString(atRule.nodes);
    }
    // prepare content to be exportd using the export postprocessor
    console.log(`<yellow>[postcss]</yellow> Found "<cyan>${finalParams.id}</cyan>" css partial`);
    atRule.parent.insertBefore(atRule, postcss.parse(`/*! SPARTIAL:${finalParams.id} */`));
    atRule.parent.insertAfter(atRule, postcss.parse(`/*! SENDPARTIAL:${finalParams.id} */`));
    let refNode = atRule;
    atRule.nodes.forEach((node) => {
        atRule.parent.insertAfter(refNode, node);
        refNode = node;
    });
    atRule.remove();
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsRUFBRSxFQUFFO2dCQUNBLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU00QyxxREFBUztBQUV0RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsYUFBYSxFQUNiLE9BQU8sRUFDUCxVQUFVLEVBQ1YsUUFBUSxHQVNYO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEVBQUUsRUFBRSxFQUFFLElBQ0gsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksS0FBSyxDQUNYLDRGQUE0RixDQUMvRixDQUFDO0lBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FDWCxnRUFBZ0UsQ0FDbkUsQ0FBQztLQUNMO0lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDcEIsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsK0RBQStEO0lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQ1AsMkNBQTJDLFdBQVcsQ0FBQyxFQUFFLHNCQUFzQixDQUNsRixDQUFDO0lBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQ3RCLE1BQU0sRUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixXQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FDckQsQ0FBQztJQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUNyQixNQUFNLEVBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsV0FBVyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQ3hELENBQUM7SUFFRixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDckIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNwQixDQUFDO0FBekRELDRCQXlEQyJ9