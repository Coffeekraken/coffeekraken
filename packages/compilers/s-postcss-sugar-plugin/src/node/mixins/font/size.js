import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           size
 * @namespace      node.mixins.font
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate the css needed to apply a font-size depending on the font sizes
 * defines in the config.theme.font.size stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.font.size(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFontSizeInterface extends __SInterface {
    static get _definition() {
        return {
            size: {
                type: 'String|Number',
                values: Object.keys(__STheme.config('font.size')),
                required: true,
            },
        };
    }
}
export { postcssSugarPluginFontSizeInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ size: 50 }, params);
    const vars = [];
    vars.push(`font-size: sugar.font.size(${finalParams.size})`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDakQsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTUQsT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsSUFDTCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLDhCQUE4QixXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUU3RCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=