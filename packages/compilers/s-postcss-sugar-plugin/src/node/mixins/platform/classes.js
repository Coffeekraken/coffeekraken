import __SInterface from '@coffeekraken/s-interface';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __fs from 'fs';
/**
 * @name           classes
 * @namespace      node.mixins.platform
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the "platforms" css classes like s-platform:css, etc...
 * "Platforms" are some kind of "icons" of platforms like "css", "node", "js", "php", etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.platform.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginPlatformClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {
            platforms: {
                type: 'Array<String>',
            },
        };
    }
}
export { postcssSugarPluginPlatformClassesMixinInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ platforms: [] }, params);
    // list all the available platforms in the folder
    const files = __fs.readdirSync(`${__dirname()}/platforms`);
    const vars = new CssVars();
    files.forEach((filename) => {
        const name = filename.split('.')[0];
        if (finalParams.platforms.length &&
            finalParams.platforms.indexOf(name) === -1)
            return;
        vars.comment(() => `
        
        /**
         * @name            s-platform:${name}
         * @namespace       sugar.css.platform
         * @type            CssClass
         * @platform          css
         * @status          beta
         * 
         * This class allows you to display a plarform "icon" like "js", "node, "php", etc...
         * 
         * @example     html
         * <i class="s-platform\:${name} s-font:50"></i>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `).code(`
        .s-platform--${name} {
          @sugar.platform(${name});
        }

  `);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBRXRCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sK0NBQWdELFNBQVEsWUFBWTtJQUN0RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxlQUFlO2FBQ3hCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSwrQ0FBK0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV4RSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixTQUFTLEVBQUUsRUFBRSxJQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsaURBQWlEO0lBQ2pELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFM0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDdkIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQyxJQUNJLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTTtZQUM1QixXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFMUMsT0FBTztRQUVYLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozt5Q0FHdUIsSUFBSTs7Ozs7Ozs7O21DQVNWLElBQUk7Ozs7O1NBSzlCLENBQ0EsQ0FBQyxJQUFJLENBQUM7dUJBQ1EsSUFBSTs0QkFDQyxJQUFJOzs7R0FHN0IsQ0FBQyxDQUFDO0lBQ0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=