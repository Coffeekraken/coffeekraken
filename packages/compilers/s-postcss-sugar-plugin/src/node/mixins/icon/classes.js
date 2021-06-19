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
        const protocol = icon.split(':')[0];
        // fontawesome
        if (protocol === 'fa' || protocol === 'fab' || protocol === 'far' || protocol === 'fal' || protocol === 'fad') {
            // const as = icon.split(':')[1] ?? iconName;
            const splits = icon.split(':');
            const faIconName = splits[1];
            const as = (_a = splits[2]) !== null && _a !== void 0 ? _a : faIconName;
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
            @sugar.icon.fs(${path});
          }
      `);
        }
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN4RCxpREFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDO1NBQzNCO1FBQ0QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOztRQUUvQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBDLGNBQWM7UUFDZCxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksUUFBUSxLQUFLLEtBQUssSUFBSSxRQUFRLEtBQUssS0FBSyxJQUFJLFFBQVEsS0FBSyxLQUFLLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTtZQUU3Ryw2Q0FBNkM7WUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxFQUFFLEdBQUcsTUFBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLG1DQUFJLFVBQVUsQ0FBQztZQUVuQyxJQUFJLENBQUMsSUFBSSxDQUFDOztrQ0FFa0IsRUFBRTtxREFDaUIsRUFBRTs7OzREQUdLLEVBQUU7OztnQ0FHOUIsRUFBRTtnQ0FDRixFQUFFO2dDQUNGLEVBQUU7Z0NBQ0YsRUFBRTtnQ0FDRixFQUFFOztxQkFFYixFQUFFOzZCQUNNLFVBQVUsS0FBSyxRQUFROztPQUU3QyxDQUFDLENBQUM7U0FDSjtRQUVELGFBQWE7UUFDYixJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFFckIsNkNBQTZDO1lBQzdDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUdyQixJQUFJLENBQUMsSUFBSSxDQUFDOztrQ0FFa0IsRUFBRTtxREFDaUIsRUFBRTs7OzREQUdLLEVBQUU7OztnQ0FHOUIsRUFBRTtnQ0FDRixFQUFFO2dDQUNGLEVBQUU7Z0NBQ0YsRUFBRTtnQ0FDRixFQUFFOztxQkFFYixFQUFFOzZCQUNNLElBQUk7O09BRTFCLENBQUMsQ0FBQztTQUNKO0lBRUgsQ0FBQyxDQUFDLENBQUM7SUFJSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9