import __SInterface from '@coffeekraken/s-interface';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZO0lBQ3hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxFQUFFLEVBQUU7Z0JBQ0EsSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTUQsT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsYUFBYSxFQUNiLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFFBQVEsR0FVWDtJQUNHLE1BQU0sV0FBVyxtQkFDYixFQUFFLEVBQUUsRUFBRSxJQUNILE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO0tBQzFFO0lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDbEIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ3ZCO0lBRUQscUZBQXFGO0lBQ3JGLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1FBQ25CLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0tBQ3pCO0lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUM1QyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDekM7SUFFRCwrREFBK0Q7SUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FDUCwyQ0FBMkMsV0FBVyxDQUFDLEVBQUUsb0JBQW9CLENBQ2hGLENBQUM7SUFFRixNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FDdEIsTUFBTSxFQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxXQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FDbkQsQ0FBQztJQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUNyQixNQUFNLEVBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsV0FBVyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQ3RELENBQUM7SUFFRixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDckIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNwQixDQUFDIn0=