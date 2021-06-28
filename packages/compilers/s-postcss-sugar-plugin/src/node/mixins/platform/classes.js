import __SInterface from '@coffeekraken/s-interface';
import __fs from 'fs';
class postcssSugarPluginPlatformClassesMixinInterface extends __SInterface {
}
postcssSugarPluginPlatformClassesMixinInterface.definition = {
    platforms: {
        type: 'Array<String>'
    }
};
export { postcssSugarPluginPlatformClassesMixinInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ platforms: [] }, params);
    // list all the available platforms in the folder
    const files = __fs.readdirSync(`${__dirname}/platforms`);
    const vars = [];
    files.forEach(filename => {
        const name = filename.split('.')[0];
        if (finalParams.platforms && finalParams.platforms.indexOf(name) === -1)
            return;
        vars.push(`
        
        /**
         * @name            s-platform--${name}
         * @namespace       sugar.css.mixins.platform
         * @type            CssClass
         * 
         * This class allows you to display a plarform "icon" like "js", "node, "php", etc...
         * 
         * @example     html
         * <i class="s-platform--${name} s-font:50"></i>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-platform--${name} {
          @sugar.platform(${name});
        }

  `);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBRXRCLE1BQU0sK0NBQWdELFNBQVEsWUFBWTs7QUFDakUsMERBQVUsR0FBRztJQUNsQixTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsZUFBZTtLQUN0QjtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsK0NBQStDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFeEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixTQUFTLEVBQUUsRUFBRSxJQUNWLE1BQU0sQ0FDVixDQUFDO0lBRUYsaURBQWlEO0lBQ2pELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFTLFlBQVksQ0FBQyxDQUFDO0lBRXpELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEMsSUFBSSxXQUFXLENBQUMsU0FBUyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU87UUFFaEYsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzBDQUc0QixJQUFJOzs7Ozs7O21DQU9YLElBQUk7Ozs7O3VCQUtoQixJQUFJOzRCQUNDLElBQUk7OztHQUc3QixDQUFDLENBQUM7SUFFSCxDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=