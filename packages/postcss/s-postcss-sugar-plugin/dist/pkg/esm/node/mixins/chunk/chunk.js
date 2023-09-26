import __SInterface from '@coffeekraken/s-interface';
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
class postcssSugarPluginChhunkInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginChhunkInterface as interface };
export default function ({ params, atRule, CssVars, nodesToString, frontData, postcss, postcssApi, settings, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZO0lBQ3hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxFQUFFLEVBQUU7Z0JBQ0EsSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTUQsT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsYUFBYSxFQUNiLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFFBQVEsR0FVWDs7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsRUFBRSxFQUFFLEVBQUUsSUFDSCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztLQUN0RTtJQUVELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQ2xCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztLQUN2QjtJQUVELHFGQUFxRjtJQUNyRixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtRQUNuQixTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztLQUN6QjtJQUNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDNUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3pDO0lBRUQsK0RBQStEO0lBQy9ELE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsMkNBQTJDLFdBQVcsQ0FBQyxFQUFFLG9CQUFvQixDQUNoRixDQUFDO0lBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQ3RCLE1BQU0sRUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsV0FBVyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQ25ELENBQUM7SUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FDckIsTUFBTSxFQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLFdBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUN0RCxDQUFDO0lBRUYsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDcEIsQ0FBQyJ9