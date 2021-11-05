import __SInterface from '@coffeekraken/s-interface';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __fs from 'fs';
/**
 * @name           classes
 * @namespace      node.mixins.platform
 * @type           PostcssMixin
 * @platform      css
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginPlatformClassesMixinInterface extends __SInterface {
}
postcssSugarPluginPlatformClassesMixinInterface.definition = {
    platforms: {
        type: 'Array<String>',
    },
};
export { postcssSugarPluginPlatformClassesMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ platforms: [] }, params);
    // list all the available platforms in the folder
    const files = __fs.readdirSync(`${__dirname()}/platforms`);
    const vars = [];
    files.forEach((filename) => {
        const name = filename.split('.')[0];
        if (finalParams.platforms.length &&
            finalParams.platforms.indexOf(name) === -1)
            return;
        vars.push(`
        
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-platform--${name} {
          @sugar.platform(${name});
        }

  `);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBRXRCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sK0NBQWdELFNBQVEsWUFBWTs7QUFDL0QsMERBQVUsR0FBRztJQUNoQixTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsZUFBZTtLQUN4QjtDQUNKLENBQUM7QUFPTixPQUFPLEVBQUUsK0NBQStDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFeEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixTQUFTLEVBQUUsRUFBRSxJQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsaURBQWlEO0lBQ2pELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFM0QsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUN2QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBDLElBQ0ksV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNO1lBQzVCLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUxQyxPQUFPO1FBRVgsSUFBSSxDQUFDLElBQUksQ0FBQzs7O3lDQUd1QixJQUFJOzs7Ozs7Ozs7bUNBU1YsSUFBSTs7Ozs7dUJBS2hCLElBQUk7NEJBQ0MsSUFBSTs7O0dBRzdCLENBQUMsQ0FBQztJQUNELENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9