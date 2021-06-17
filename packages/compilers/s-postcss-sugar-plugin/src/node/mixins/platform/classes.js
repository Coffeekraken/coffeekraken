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
    const finalParams = Object.assign({}, params);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBRXRCLE1BQU0sK0NBQWdELFNBQVEsWUFBWTs7QUFDakUsMERBQVUsR0FBRztJQUNsQixTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsZUFBZTtLQUN0QjtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsK0NBQStDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFeEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLGlEQUFpRDtJQUNqRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsU0FBUyxZQUFZLENBQUMsQ0FBQztJQUV6RCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN2QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBDLElBQUksV0FBVyxDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBRWhGLElBQUksQ0FBQyxJQUFJLENBQUM7OzswQ0FHNEIsSUFBSTs7Ozs7OzttQ0FPWCxJQUFJOzs7Ozt1QkFLaEIsSUFBSTs0QkFDQyxJQUFJOzs7R0FHN0IsQ0FBQyxDQUFDO0lBRUgsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9