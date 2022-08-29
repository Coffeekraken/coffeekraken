import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           export
 * @namespace      node.mixin.export
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to mark some css to be exported as separated file.
 * You can specify the name of your export
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * @sugar.export(css/general.css) {
 *   body {
 *      background: red;
 *   }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginCacheInterface extends __SInterface {
    static get _definition() {
        return {
            export: {
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginCacheInterface as interface };
export default function ({ params, atRule, CssVars, pluginHash, themeHash, exportDir, nodesToString, settings, replaceWith, }) {
    const finalParams = Object.assign({ export: '' }, params);
    if (!finalParams.export || finalParams.export === '') {
        throw new Error(`The "@sugar.export" mixin MUST specify an export path or id...`);
    }
    if (!settings.exports) {
        return nodesToString(atRule.nodes);
    }
    const vars = new CssVars();
    // prepare content to be exportd using the export postprocessor
    console.log(`<yellow>[export]</yellow> Found "<cyan>${finalParams.export}</cyan>" export statement`);
    vars.code(`
    /*! SEXPORT:${finalParams.export} */
    ${nodesToString(atRule.nodes)}
    /*! SENDEXPORT:${finalParams.export} */
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxVQUFVLEVBQ1YsU0FBUyxFQUNULFNBQVMsRUFDVCxhQUFhLEVBQ2IsUUFBUSxFQUNSLFdBQVcsR0FXZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixNQUFNLEVBQUUsRUFBRSxJQUNQLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7UUFDbEQsTUFBTSxJQUFJLEtBQUssQ0FDWCxnRUFBZ0UsQ0FDbkUsQ0FBQztLQUNMO0lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7UUFDbkIsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQiwrREFBK0Q7SUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FDUCwwQ0FBMEMsV0FBVyxDQUFDLE1BQU0sMkJBQTJCLENBQzFGLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxDQUFDO2tCQUNJLFdBQVcsQ0FBQyxNQUFNO01BQzlCLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO3FCQUNaLFdBQVcsQ0FBQyxNQUFNO0tBQ2xDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==