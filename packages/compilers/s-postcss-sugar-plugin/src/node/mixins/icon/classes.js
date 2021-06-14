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
    const finalParams = Object.assign({ icons: [] }, params);
    const vars = [];
    finalParams.icons.forEach(icon => {
        var _a;
        const iconName = icon.split(':')[0];
        const as = (_a = icon.split(':')[1]) !== null && _a !== void 0 ? _a : iconName;
        // fontawesome
        if (iconName.slice(0, 3) === 'fa-') {
            const faIconName = iconName.slice(3);
            vars.push(`
        /**
         * @name        s-icon--${as}
          * @namespace      sugar.css.icon.classes.${as}
          * @type           CssClass
          *
          * This class allows you to display the "<yellow>${as}</yellow>" icon using the "<cyan>i</cyan>" tag like bellow
          *
          * @example        html
          * <i class="s-icon--${as} s-font:20"></i>
          * <i class="s-icon--${as} s-font:40"></i>
          * <i class="s-icon--${as} s-font:60"></i>
          * <i class="s-icon--${as} s-font:80"></i>
          * <i class="s-icon--${as} s-font:100"></i>
          */
          .s-icon--${as} {
            @sugar.icon.fa(${faIconName});
          }
      `);
        }
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFTckQsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN4RCxpREFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDO1NBQzNCO1FBQ0QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOztRQUUvQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sRUFBRSxHQUFHLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsbUNBQUksUUFBUSxDQUFDO1FBRTFDLGNBQWM7UUFDZCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUVqQyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXJDLElBQUksQ0FBQyxJQUFJLENBQUM7O2tDQUVrQixFQUFFO3FEQUNpQixFQUFFOzs7NERBR0ssRUFBRTs7O2dDQUc5QixFQUFFO2dDQUNGLEVBQUU7Z0NBQ0YsRUFBRTtnQ0FDRixFQUFFO2dDQUNGLEVBQUU7O3FCQUViLEVBQUU7NkJBQ00sVUFBVTs7T0FFaEMsQ0FBQyxDQUFDO1NBQ0o7SUFFSCxDQUFDLENBQUMsQ0FBQztJQUlILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=