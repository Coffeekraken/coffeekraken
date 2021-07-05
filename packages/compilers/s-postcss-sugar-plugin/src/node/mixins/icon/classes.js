import __SInterface from '@coffeekraken/s-interface';
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
            @sugar.icon.fs(${path}, ${as});
          }
      `);
        }
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN4RCxpREFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxFQUFFLEVBQUU7UUFDWCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQU9KLE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7O1FBRS9CLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEMsY0FBYztRQUNkLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssS0FBSyxJQUFJLFFBQVEsS0FBSyxLQUFLLElBQUksUUFBUSxLQUFLLEtBQUssSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFO1lBRTdHLDZDQUE2QztZQUM3QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLEVBQUUsR0FBRyxNQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUNBQUksVUFBVSxDQUFDO1lBRW5DLElBQUksQ0FBQyxJQUFJLENBQUM7O2tDQUVrQixFQUFFO3FEQUNpQixFQUFFOzs7NERBR0ssRUFBRTs7O2dDQUc5QixFQUFFO2dDQUNGLEVBQUU7Z0NBQ0YsRUFBRTtnQ0FDRixFQUFFO2dDQUNGLEVBQUU7O3FCQUViLEVBQUU7NkJBQ00sVUFBVSxLQUFLLFFBQVE7O09BRTdDLENBQUMsQ0FBQztTQUNKO1FBRUQsYUFBYTtRQUNiLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUVyQiw2Q0FBNkM7WUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBR3JCLElBQUksQ0FBQyxJQUFJLENBQUM7O2tDQUVrQixFQUFFO3FEQUNpQixFQUFFOzs7NERBR0ssRUFBRTs7O2dDQUc5QixFQUFFO2dDQUNGLEVBQUU7Z0NBQ0YsRUFBRTtnQ0FDRixFQUFFO2dDQUNGLEVBQUU7O3FCQUViLEVBQUU7NkJBQ00sSUFBSSxLQUFLLEVBQUU7O09BRWpDLENBQUMsQ0FBQztTQUNKO0lBRUgsQ0FBQyxDQUFDLENBQUM7SUFJSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9