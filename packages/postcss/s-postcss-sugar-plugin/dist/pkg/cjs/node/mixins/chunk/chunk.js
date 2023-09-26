"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           chunk
 * @namespace      node.mixin.chunk
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin allows you to mark some css to be exported as separated file.
 * You can specify the name of your chunk
 * Note that this mixin can only be used at root level
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@s.chunk(general) {
 *   body {
 *      background: red;
 *   }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginChhunkInterface extends s_interface_1.default {
    static get _definition() {
        return {
            id: {
                type: 'String',
            },
        };
    }
}
exports.interface = postcssSugarPluginChhunkInterface;
function default_1({ params, atRule, CssVars, nodesToString, frontData, postcss, postcssApi, settings, }) {
    var _a;
    const finalParams = Object.assign({ id: '' }, params);
    if (!finalParams.id || finalParams.id === '') {
        throw new Error(`The "@s.chunk" mixin MUST specify a chunk id...`);
    }
    if (!settings.chunks) {
        return atRule.nodes;
    }
    // store in the shared data to print it inside the css settings (body:before content)
    if (!frontData.chunks) {
        frontData.chunks = [];
    }
    if (!frontData.chunks.includes(finalParams.id)) {
        frontData.chunks.push(finalParams.id);
    }
    // prepare content to be exportd using the export postprocessor
    (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[postcss]</yellow> Found "<cyan>${finalParams.id}</cyan>" css chunk`);
    atRule.parent.insertBefore(atRule, postcss.parse(`/*! SCHUNK:${finalParams.id} */`));
    atRule.parent.insertAfter(atRule, postcss.parse(`/*! SENDCHUNK:${finalParams.id} */`));
    let refNode = atRule;
    atRule.nodes.forEach((node) => {
        atRule.parent.insertAfter(refNode, node);
        refNode = node;
    });
    atRule.remove();
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0saUNBQWtDLFNBQVEscUJBQVk7SUFDeEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEVBQUUsRUFBRTtnQkFDQSxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNNkMsc0RBQVM7QUFFdkQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLGFBQWEsRUFDYixTQUFTLEVBQ1QsT0FBTyxFQUNQLFVBQVUsRUFDVixRQUFRLEdBVVg7O0lBQ0csTUFBTSxXQUFXLG1CQUNiLEVBQUUsRUFBRSxFQUFFLElBQ0gsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7S0FDdEU7SUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNsQixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDdkI7SUFFRCxxRkFBcUY7SUFDckYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7UUFDbkIsU0FBUyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7S0FDekI7SUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQzVDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN6QztJQUVELCtEQUErRDtJQUMvRCxNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLDJDQUEyQyxXQUFXLENBQUMsRUFBRSxvQkFBb0IsQ0FDaEYsQ0FBQztJQUVGLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUN0QixNQUFNLEVBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLFdBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUNuRCxDQUFDO0lBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQ3JCLE1BQU0sRUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixXQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FDdEQsQ0FBQztJQUVGLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3BCLENBQUM7QUE3REQsNEJBNkRDIn0=