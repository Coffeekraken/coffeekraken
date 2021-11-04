import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           depth
 * @namespace      node.mixins.depth
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to apply a certain depth that are defined
 * in the config.theme.depth stack like 10, 20, etc...
 *
 * @return        {Css}         The generated css for all the classes in the toolkit
 *
 * @example         postcss
 * .my-element {
 *    \@sugar.depth(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginDepthInterface extends __SInterface {
}
postcssSugarPluginDepthInterface.definition = {
    depth: {
        type: 'Number|String',
        required: true,
        alias: 'd',
    },
};
export { postcssSugarPluginDepthInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ depth: 0 }, params);
    const vars = [`box-shadow: sugar.depth(${finalParams.depth});`];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXB0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTs7QUFDaEQsMkNBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsZUFBZTtRQUNyQixRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ2I7Q0FDSixDQUFDO0FBT04sT0FBTyxFQUFFLGdDQUFnQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLENBQUMsSUFDTCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLENBQUMsMkJBQTJCLFdBQVcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQzFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=