import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           partial
 * @namespace      node.mixin.export
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to mark some css to be exported as separated file.
 * You can specify the name of your partial
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * @sugar.partial(general) {
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
            id: {
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginCacheInterface as interface };
export default function ({ params, atRule, CssVars, nodesToString, settings, }) {
    const finalParams = Object.assign({ id: '' }, params);
    if (!finalParams.id || finalParams.id === '') {
        throw new Error(`The "@sugar.export" mixin MUST specify an export path or id...`);
    }
    if (!settings.partials) {
        return nodesToString(atRule.nodes);
    }
    const vars = new CssVars();
    // prepare content to be exportd using the export postprocessor
    console.log(`<yellow>[partial]</yellow> Found "<cyan>${finalParams.id}</cyan>" partial statement`);
    vars.code(`
    /*! SPARTIAL:${finalParams.id} */
    ${nodesToString(atRule.nodes)}
    /*! SENDPARTIAL:${finalParams.id} */
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEVBQUUsRUFBRTtnQkFDQSxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxhQUFhLEVBQ2IsUUFBUSxHQU9YO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEVBQUUsRUFBRSxFQUFFLElBQ0gsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMxQyxNQUFNLElBQUksS0FBSyxDQUNYLGdFQUFnRSxDQUNuRSxDQUFDO0tBQ0w7SUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNwQixPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEM7SUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLCtEQUErRDtJQUMvRCxPQUFPLENBQUMsR0FBRyxDQUNQLDJDQUEyQyxXQUFXLENBQUMsRUFBRSw0QkFBNEIsQ0FDeEYsQ0FBQztJQUVGLElBQUksQ0FBQyxJQUFJLENBQUM7bUJBQ0ssV0FBVyxDQUFDLEVBQUU7TUFDM0IsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7c0JBQ1gsV0FBVyxDQUFDLEVBQUU7S0FDL0IsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9