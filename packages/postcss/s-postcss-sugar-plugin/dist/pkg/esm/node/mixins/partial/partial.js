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
export default function ({ params, atRule, CssVars, nodesToString, postcss, postcssApi, settings, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEVBQUUsRUFBRTtnQkFDQSxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxhQUFhLEVBQ2IsT0FBTyxFQUNQLFVBQVUsRUFDVixRQUFRLEdBU1g7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsRUFBRSxFQUFFLEVBQUUsSUFDSCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxLQUFLLENBQUMsNEZBQTRGLENBQUMsQ0FBQztJQUU5RyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMxQyxNQUFNLElBQUksS0FBSyxDQUNYLGdFQUFnRSxDQUNuRSxDQUFDO0tBQ0w7SUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNwQixPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEM7SUFFRCwrREFBK0Q7SUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FDUCwyQ0FBMkMsV0FBVyxDQUFDLEVBQUUsc0JBQXNCLENBQ2xGLENBQUM7SUFFRixNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FDdEIsTUFBTSxFQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLFdBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUNyRCxDQUFDO0lBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQ3JCLE1BQU0sRUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixXQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FDeEQsQ0FBQztJQUVGLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3BCLENBQUMifQ==