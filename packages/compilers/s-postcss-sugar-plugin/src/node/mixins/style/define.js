import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginStyleDefineMixinInterface extends __SInterface {
}
postcssSugarPluginStyleDefineMixinInterface.definition = {
    name: {
        type: 'String',
        required: true
    }
};
export { postcssSugarPluginStyleDefineMixinInterface as interface };
/**
 * @name           scope
 * @namespace      mixins.theme
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to start a scope whithin which the passed theme will be used to generate
 * the different styles.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.theme.scope(dark) {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
if (!global._definedStyles) {
    // @ts-ignore
    global._definedStyles = {};
}
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    if (!finalParams.name) {
        throw new Error(`<red>[postcss.sugar.style]</red> Sorry but to define a style you MUST specify a name for it`);
    }
    if (atRule.parent && atRule.parent.type !== 'root') {
        throw new Error(`<red>[postcss.sugar.style]</red> Sorry but this mixin MUST be called at stylesheet root`);
    }
    const styleCss = atRule.nodes
        .map((node) => {
        if (node.type === 'decl')
            return node.toString() + ';';
        return node.toString();
    })
        .join('\n');
    // @ts-ignore
    global._definedStyles[finalParams.name] = processNested([`.s-style-${finalParams.name} {`, styleCss, `}`].join('\n'));
    const AST = processNested([].join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVmaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JELE1BQU0sMkNBQTRDLFNBQVEsWUFBWTs7QUFDN0Qsc0RBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBRUosT0FBTyxFQUFFLDJDQUEyQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTXBFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxhQUFhO0FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7SUFDMUIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0NBQzVCO0FBQ0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxHQUFHLGtCQUNmLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ2xCLENBQUM7SUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtRQUNyQixNQUFNLElBQUksS0FBSyxDQUNiLDZGQUE2RixDQUM5RixDQUFDO0tBQ0g7SUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQ2xELE1BQU0sSUFBSSxLQUFLLENBQ2IseUZBQXlGLENBQzFGLENBQUM7S0FDSDtJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLO1NBQzFCLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1osSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWQsYUFBYTtJQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FDckQsQ0FBQyxZQUFZLFdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUM3RCxDQUFDO0lBRUYsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6QyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==