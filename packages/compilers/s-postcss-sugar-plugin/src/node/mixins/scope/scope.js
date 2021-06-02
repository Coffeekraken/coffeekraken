import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginScopeMixinInterface extends __SInterface {
}
postcssSugarPluginScopeMixinInterface.definition = {
    scopes: {
        type: 'String',
        required: true,
        alias: 's'
    }
};
export { postcssSugarPluginScopeMixinInterface as interface };
/**
 * @name           media
 * @namespace      mixins
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to apply media queries depending on the ```media.config.js``` config
 * file with ease.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.scope(color) {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ scopes: '' }, (params !== null && params !== void 0 ? params : {}));
    // @ts-ignore
    if (!global._postcssSugarPluginScopeMixinScopesStack) {
        // @ts-ignore
        global._postcssSugarPluginScopeMixinScopesStack = [];
    }
    // @ts-ignore
    //   console.log('AD', scopes);
    global._postcssSugarPluginScopeMixinScopesStack.push(finalParams.scopes);
    replaceWith(atRule.nodes);
    // @ts-ignore
    global._postcssSugarPluginScopeMixinScopesStack =
        // @ts-ignore
        global._postcssSugarPluginScopeMixinScopesStack.slice(0, -1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQU9yRCxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7O0FBQ3ZELGdEQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7Q0FDRixDQUFDO0FBRUosT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLEdBQUcsZ0JBQ2xCLE1BQU0sRUFBRSxFQUFFLElBQ1AsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDbEIsQ0FBQztJQUVGLGFBQWE7SUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLHdDQUF3QyxFQUFFO1FBQ3BELGFBQWE7UUFDYixNQUFNLENBQUMsd0NBQXdDLEdBQUcsRUFBRSxDQUFDO0tBQ3REO0lBRUQsYUFBYTtJQUNiLCtCQUErQjtJQUMvQixNQUFNLENBQUMsd0NBQXdDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV6RSxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTFCLGFBQWE7SUFDYixNQUFNLENBQUMsd0NBQXdDO1FBQzdDLGFBQWE7UUFDYixNQUFNLENBQUMsd0NBQXdDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLENBQUMifQ==