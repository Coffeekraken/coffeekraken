import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginStyleClassesMixinInterface extends __SInterface {
}
postcssSugarPluginStyleClassesMixinInterface.definition = {};
export { postcssSugarPluginStyleClassesMixinInterface as interface };
/**
 * @name           classes
 * @namespace      mixins.style
 * @type           Mixin
 * @status        beta
 *
 * This mixin print the styles css
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.style();
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
    // const finalParams = <postcssSugarPluginStyleClassesMixinParams>{
    //   ...(params ?? {})
    // };
    const vars = [];
    // @ts-ignore
    Object.keys(global._definedStyles).forEach((styleName) => {
        // @ts-ignore
        vars.push(global._definedStyles[styleName].toString());
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM5RCx1REFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFJckU7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsYUFBYTtBQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO0lBQzFCLGFBQWE7SUFDYixNQUFNLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztDQUM1QjtBQUNELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxtRUFBbUU7SUFDbkUsc0JBQXNCO0lBQ3RCLEtBQUs7SUFFTCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3ZELGFBQWE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=