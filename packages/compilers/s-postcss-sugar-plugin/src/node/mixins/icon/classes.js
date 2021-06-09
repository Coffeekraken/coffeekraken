import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginIconClassesInterface extends __SInterface {
}
postcssSugarPluginIconClassesInterface.definition = {
    icons: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' ', '\n']
        },
        required: true
    }
};
export { postcssSugarPluginIconClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    finalParams.icons.forEach(icon => {
        var _a;
        const iconName = icon.split(':')[0];
        const as = (_a = icon.split(':')[1]) !== null && _a !== void 0 ? _a : iconName;
        console.log(iconName.slice(3));
        // fontawesome
        if (iconName.slice(0, 3) === 'fa-') {
            const faIconName = iconName.slice(3);
            console.log(faIconName);
            vars.push(`
        /**
         * @name        s-icon:${as}
          * @namespace      sugar.css.icon.classes.${as}
          * @type           CssClass
          *
          * This class allows you to display the "<yellow>${as}</yellow>" icon using the "<cyan>i</cyan>" tag like bellow
          *
          * @example        html
          * <i class="s-icon:${as} s-font:20"></i>
          * <i class="s-icon:${as} s-font:40"></i>
          * <i class="s-icon:${as} s-font:60"></i>
          * <i class="s-icon:${as} s-font:80"></i>
          * <i class="s-icon:${as} s-font:100"></i>
          */
          [class*="s-icon:${as}"] {
            @sugar.icon.fa(${faIconName});
          }
      `);
        }
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFTckQsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN4RCxpREFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDO1NBQzNCO1FBQ0QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFNSixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs7UUFFL0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNLEVBQUUsR0FBRyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1DQUFJLFFBQVEsQ0FBQztRQUUxQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvQixjQUFjO1FBQ2QsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7WUFFakMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhCLElBQUksQ0FBQyxJQUFJLENBQUM7O2lDQUVpQixFQUFFO3FEQUNrQixFQUFFOzs7NERBR0ssRUFBRTs7OytCQUcvQixFQUFFOytCQUNGLEVBQUU7K0JBQ0YsRUFBRTsrQkFDRixFQUFFOytCQUNGLEVBQUU7OzRCQUVMLEVBQUU7NkJBQ0QsVUFBVTs7T0FFaEMsQ0FBQyxDQUFDO1NBQ0o7SUFFSCxDQUFDLENBQUMsQ0FBQztJQUlILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=