import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           transition
 * @namespace      node.mixins.transition
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the needed css to apply a transition setted in
 * the config.theme.transition configuration stack like "slow", "default" and "fast"
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.platform.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginTransitionMixinInterface extends __SInterface {
}
postcssSugarPluginTransitionMixinInterface.definition = {
    name: {
        type: 'String',
        required: true,
        default: 'default',
    },
};
export { postcssSugarPluginTransitionMixinInterface as interface };
/**
 * @name           transition
 * @namespace      mixins.transition
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows apply a transition specified in the theme config like "fast", "slow" and "slow" or others you've been defined
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.transition(fast);
 * }
 *
 * @example       html
 * <h1 class="my-cool-element">Hello world</h1>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    const vars = [
        `transition: sugar.transition(${finalParams.name}) ${finalParams.name !== 'default' ? '!important' : ''};`,
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyYW5zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUMxRCxxREFBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsU0FBUztLQUNyQjtDQUNKLENBQUM7QUFFTixPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxHQUFHLGtCQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFDRixNQUFNLElBQUksR0FBYTtRQUNuQixnQ0FBZ0MsV0FBVyxDQUFDLElBQUksS0FDNUMsV0FBVyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFDcEQsR0FBRztLQUNOLENBQUM7SUFFRixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9