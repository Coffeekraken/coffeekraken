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
 * @status        wip
 *
 * This mixin allows you to mark some css to be exported as separated file.
 * You can specify the name of your chunk
 * Note that this mixin can only be used at root level
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.chunk(general) {
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
    const finalParams = Object.assign({ id: '' }, params);
    if (!finalParams.id || finalParams.id === '') {
        throw new Error(`The "@sugar.chunk" mixin MUST specify a chunk id...`);
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
    console.log(`<yellow>[postcss]</yellow> Found "<cyan>${finalParams.id}</cyan>" css chunk`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0saUNBQWtDLFNBQVEscUJBQVk7SUFDeEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEVBQUUsRUFBRTtnQkFDQSxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNNkMsc0RBQVM7QUFFdkQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLGFBQWEsRUFDYixTQUFTLEVBQ1QsT0FBTyxFQUNQLFVBQVUsRUFDVixRQUFRLEdBVVg7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsRUFBRSxFQUFFLEVBQUUsSUFDSCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztLQUMxRTtJQUVELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQ2xCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztLQUN2QjtJQUVELHFGQUFxRjtJQUNyRixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtRQUNuQixTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztLQUN6QjtJQUNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDNUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3pDO0lBRUQsK0RBQStEO0lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQ1AsMkNBQTJDLFdBQVcsQ0FBQyxFQUFFLG9CQUFvQixDQUNoRixDQUFDO0lBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQ3RCLE1BQU0sRUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsV0FBVyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQ25ELENBQUM7SUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FDckIsTUFBTSxFQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLFdBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUN0RCxDQUFDO0lBRUYsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDcEIsQ0FBQztBQTdERCw0QkE2REMifQ==