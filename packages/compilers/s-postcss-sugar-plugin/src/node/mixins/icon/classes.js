import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.icon
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the classes needed to display the icons you've
 * passed as parameter.
 * The icons parameter define all the icons you want. Each line define a new icon and you can use these
 * different "adapters" to specify your icons:
 *
 * - Line syntax: {adapter}:{iconName}:{iconNameYouWant}
 *
 * Available adapters are:
 *
 * - Filesystem:
 * Here's some example of filesystem icons declarations:
 * @sugar.icon.classes(
 *    fs:src/icons/vuejs.svg:vue
 *    fs:src/icons/something.svg:something
 * );
 *
 * - Font awesome (5)
 * Here's some example of font awesome icons declarations:
 * @sugar.icon.classes(
 *    fa:user:user
 *    fa:heart:heart
 *    fa:fire:fire
 *    fa:copy:copy
 *    fa:box-open:box
 * );
 *
 * @param       {String}       icons        The icons you want. Each line define a new icon
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.icon.classes(
 *    fa:user:user
 *    fa:heart:heart
 *    fs:src/icons/vuejs.svg:vue
 *    fa:fire:fire
 *    fa:copy:copy
 *    fa:box-open:box
 * );
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginIconClassesInterface extends __SInterface {
}
postcssSugarPluginIconClassesInterface.definition = {
    icons: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' ', '\n']
        },
        default: [],
        required: true
    }
};
export { postcssSugarPluginIconClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ icons: [] }, params);
    const vars = [];
    finalParams.icons.forEach(icon => {
        var _a;
        const protocol = icon.split(':')[0];
        // fontawesome
        if (protocol === 'fa' || protocol === 'fab' || protocol === 'far' || protocol === 'fal' || protocol === 'fad') {
            // const as = icon.split(':')[1] ?? iconName;
            const splits = icon.split(':');
            const faIconName = splits[1];
            const as = (_a = splits[2]) !== null && _a !== void 0 ? _a : faIconName;
            vars.push(`
        /**
         * @name        s-icon:${as}
          * @namespace      sugar.css.icon
          * @type           CssClass
          * @platform       css
          * @status         beta
          *
          * This class allows you to display the "<yellow>${as}</yellow>" icon using the "<cyan>i</cyan>" tag like bellow
          *
          * @example        html
          * <i class="s-icon\:${as} s-font\:20"></i>
          * <i class="s-icon\:${as} s-font\:40"></i>
          * <i class="s-icon\:${as} s-font\:60"></i>
          * <i class="s-icon\:${as} s-font\:80"></i>
          * <i class="s-icon\:${as} s-font\:100"></i>
          */
          .s-icon--${as} {
            @sugar.icon.fa(${faIconName}, ${protocol});
          }
      `);
        }
        // filesystem
        if (protocol === 'fs') {
            // const as = icon.split(':')[1] ?? iconName;
            const splits = icon.split(':');
            const path = splits[1];
            const as = splits[2];
            vars.push(`
        /**
         * @name        s-icon:${as}
          * @namespace      sugar.css.icon
          * @type           CssClass
          * @platform         css
          * @status         beta
          *
          * This class allows you to display the "<yellow>${as}</yellow>" icon using the "<cyan>i</cyan>" tag like bellow
          *
          * @example        html
          * <i class="s-icon\:${as} s-font\:20"></i>
          * <i class="s-icon\:${as} s-font\:40"></i>
          * <i class="s-icon\:${as} s-font\:60"></i>
          * <i class="s-icon\:${as} s-font\:80"></i>
          * <i class="s-icon\:${as} s-font\:100"></i>
          */
          .s-icon--${as} {
            @sugar.icon.fs(${path}, ${as});
          }
      `);
        }
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQUVILE1BQU0sc0NBQXVDLFNBQVEsWUFBWTs7QUFDeEQsaURBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQztTQUMzQjtRQUNELE9BQU8sRUFBRSxFQUFFO1FBQ1gsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOztRQUUvQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBDLGNBQWM7UUFDZCxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksUUFBUSxLQUFLLEtBQUssSUFBSSxRQUFRLEtBQUssS0FBSyxJQUFJLFFBQVEsS0FBSyxLQUFLLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTtZQUU3Ryw2Q0FBNkM7WUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxFQUFFLEdBQUcsTUFBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLG1DQUFJLFVBQVUsQ0FBQztZQUVuQyxJQUFJLENBQUMsSUFBSSxDQUFDOztpQ0FFaUIsRUFBRTs7Ozs7OzREQU15QixFQUFFOzs7Z0NBRzlCLEVBQUU7Z0NBQ0YsRUFBRTtnQ0FDRixFQUFFO2dDQUNGLEVBQUU7Z0NBQ0YsRUFBRTs7cUJBRWIsRUFBRTs2QkFDTSxVQUFVLEtBQUssUUFBUTs7T0FFN0MsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxhQUFhO1FBQ2IsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBRXJCLDZDQUE2QztZQUM3QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFHckIsSUFBSSxDQUFDLElBQUksQ0FBQzs7aUNBRWlCLEVBQUU7Ozs7Ozs0REFNeUIsRUFBRTs7O2dDQUc5QixFQUFFO2dDQUNGLEVBQUU7Z0NBQ0YsRUFBRTtnQ0FDRixFQUFFO2dDQUNGLEVBQUU7O3FCQUViLEVBQUU7NkJBQ00sSUFBSSxLQUFLLEVBQUU7O09BRWpDLENBQUMsQ0FBQztTQUNKO0lBRUgsQ0FBQyxDQUFDLENBQUM7SUFJSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9