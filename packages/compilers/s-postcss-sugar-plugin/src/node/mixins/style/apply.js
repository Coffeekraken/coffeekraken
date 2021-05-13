import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginStyleApplyMixinInterface extends __SInterface {
}
postcssSugarPluginStyleApplyMixinInterface.definition = {
    name: {
        type: 'String',
        required: true
    }
};
export { postcssSugarPluginStyleApplyMixinInterface as interface };
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
// @ts-ignore
if (!global._printedStyles) {
    // @ts-ignore
    global._printedStyles = [];
}
export default function ({ params, atRule, processNested, settings }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    if (
    // @ts-ignore
    !global._definedStyles[finalParams.name] ||
        settings.target !== 'global') {
        vars.push(`content: "s-style-${finalParams.name}"`);
    }
    else {
        vars.push(`@extend .s-style-${finalParams.name}`);
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBseS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxNQUFNLDBDQUEyQyxTQUFRLFlBQVk7O0FBQzVELHFEQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQUVKLE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU1uRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsYUFBYTtBQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO0lBQzFCLGFBQWE7SUFDYixNQUFNLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztDQUM1QjtBQUNELGFBQWE7QUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtJQUMxQixhQUFhO0lBQ2IsTUFBTSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7Q0FDNUI7QUFDRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUNiLFFBQVEsRUFNVDtJQUNDLE1BQU0sV0FBVyxHQUFHLGtCQUNmLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ2xCLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUI7SUFDRSxhQUFhO0lBQ2IsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDeEMsUUFBUSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQzVCO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7S0FDckQ7U0FBTTtRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ25EO0lBRUQsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==