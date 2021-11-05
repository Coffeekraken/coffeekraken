import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginUiAvatarClassesInterface extends __SInterface {
}
postcssSugarPluginUiAvatarClassesInterface.definition = {
    styles: {
        type: 'String[]',
        values: ['solid'],
        default: ['solid'],
    },
    defaultColor: {
        type: 'String',
        default: __STheme.config('ui.avatar.defaultColor'),
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: __STheme.config('ui.avatar.defaultStyle'),
    },
    scope: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' '],
        },
        values: ['bare', 'lnf', 'vr', 'tf'],
        default: ['bare', 'lnf', 'vr', 'tf'],
    },
};
export { postcssSugarPluginUiAvatarClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/avatar.js`],
    };
}
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], defaultStyle: 'solid', defaultColor: 'ui', scope: [] }, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Avatar
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/avatar
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some avatar style around any image.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass       s-avatar        Apply the default avatar style
        * @cssClass       s-avatar:square     Apply the square avatar style
        * 
        * @example        html
        ${finalParams.styles.map((style) => {
        return ` * <!-- ${style} -->
                  * <div class="s-mbe:50">
                  *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
                  *   <img class="s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`} s-font:100 s-mie:20 s-mbe:20" src="https://picsum.photos/300/300?v=23" />
                  *   <img class="s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`} s-font:100 s-mie:20 s-mbe:20 s-color:accent" src="https://picsum.photos/300/300?v=24" />
                  *   <img class="s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`} s-font:100 s-mie:20 s-mbe:20 s-color:complementary" src="https://picsum.photos/300/300?v=26" />
                  *   <img class="s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`} s-font:100 s-mie:20 s-mbe:20 s-color:info" src="https://picsum.photos/300/300?v=21" />
                  *   <img class="s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`} s-font:100 s-mie:20 s-mbe:20 s-color:success" src="https://picsum.photos/300/300?v=255" />
                  *   <img class="s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`} s-font:100 s-mie:20 s-mbe:20 s-color:error" src="https://picsum.photos/300/300?v=2121" />
                  * </div>`;
    })}
        * 
        * <!-- square -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Square style</h3>
        *   <img class="s-avatar:square s-font:100 s-mie:20 s-mbe:20" src="https://picsum.photos/300/300?v=233434" />
        *   <img class="s-avatar:square s-font:100 s-mie:20 s-mbe:20 s-color:accent" src="https://picsum.photos/300/300?v=23234234" />
        *   <img class="s-avatar:square s-font:100 s-mie:20 s-mbe:20 s-color:complementary" src="https://picsum.photos/300/300?v=23111" />
        *   <img class="s-avatar:square s-font:100 s-mie:20 s-mbe:20 s-color:info" src="https://picsum.photos/300/300?v=23332" />
        *   <img class="s-avatar:square s-font:100 s-mie:20 s-mbe:20 s-color:success" src="https://picsum.photos/300/300?v=2333232" />
        *   <img class="s-avatar:square s-font:100 s-mie:20 s-mbe:20 s-color:error" src="https://picsum.photos/300/300?v=23222" />
        * </div>
        * 
        * <!-- rounded -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Rounded style</h3>
        *   <img class="s-avatar:rounded s-font:100 s-mie:20 s-mbe:20" src="https://picsum.photos/300/300?v=eee" />
        *   <img class="s-avatar:rounded s-font:100 s-mie:20 s-mbe:20 s-color:accent" src="https://picsum.photos/300/300?v=wdewdw" />
        *   <img class="s-avatar:rounded s-font:100 s-mie:20 s-mbe:20 s-color:complementary" src="https://picsum.photos/300/300?v=23e23" />
        *   <img class="s-avatar:rounded s-font:100 s-mie:20 s-mbe:20 s-color:info" src="https://picsum.photos/300/300?v=34f3" />
        *   <img class="s-avatar:rounded s-font:100 s-mie:20 s-mbe:20 s-color:success" src="https://picsum.photos/300/300?v=23f3f" />
        *   <img class="s-avatar:rounded s-font:100 s-mie:20 s-mbe:20 s-color:error" src="https://picsum.photos/300/300?v=22f22" />
        * </div>
        * 
        * * <!-- interactive -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Interactive style</h3>
        *   <img class="s-avatar:interactive s-font:100 s-mie:20 s-mbe:20" src="https://picsum.photos/300/300?v=23223434" />
        *   <img class="s-avatar:interactive s-font:100 s-mie:20 s-mbe:20 s-color:accent" src="https://picsum.photos/300/300?v=2333234234" />
        *   <img class="s-avatar:interactive s-font:100 s-mie:20 s-mbe:20 s-color:complementary" src="https://picsum.photos/300/300?v=2113111" />
        *   <img class="s-avatar:interactive s-font:100 s-mie:20 s-mbe:20 s-color:info" src="https://picsum.photos/300/300?v=26663332" />
        *   <img class="s-avatar:interactive s-font:100 s-mie:20 s-mbe:20 s-color:success" src="https://picsum.photos/300/300?v=288333232" />
        *   <img class="s-avatar:interactive s-font:100 s-mie:20 s-mbe:20 s-color:error" src="https://picsum.photos/300/300?v=23343222" />
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    finalParams.styles.forEach((style) => {
        vars.push(`/**
          * @name           s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`}
          * @namespace      sugar.css.ui.avatar
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">default</s-color>" avatar
          * 
          * @example        html
          * <span class="s-avatar">
          *   <img src="https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f" />
          * </span>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
        vars.push(`
          .s-avatar${style === finalParams.defaultStyle ? '' : `--${style}`} {
            @sugar.color(${finalParams.defaultColor});
            @sugar.ui.avatar($shape: default, $style: ${style});
          }
      `);
    });
    vars.push(`/**
          * @name           s-avatar:square
          * @namespace      sugar.css.ui.avatar
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">square</s-color>" avatar
          * 
          * @example        html
          * <span class="s-avatar:square">
          *   <img src="https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f" />
          * </span>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
          .s-avatar--square {
              @sugar.ui.avatar($shape: square, $scope: 'shape');
          }
      `);
    vars.push(`/**
          * @name           s-avatar:rounded
          * @namespace      sugar.css.ui.avatar
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">rounded</s-color>" avatar
          * 
          * @example        html
          * <span class="s-avatar:rounded">
          *   <img src="https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f" />
          * </span>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
          .s-avatar--rounded {
              @sugar.ui.avatar($shape: rounded, $scope: 'shape');
          }
      `);
    vars.push(`/**
          * @name           s-avatar:interactive
          * @namespace      sugar.css.ui.avatar
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">interactive</s-color>" avatar
          * 
          * @example        html
          * <span class="s-avatar:interactive">
          *   <img src="https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f" />
          * </span>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
          .s-avatar--interactive {
              @sugar.ui.avatar($scope: 'interactive');
          }
      `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUMxRCxxREFBVSxHQUFHO0lBQ2hCLE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxVQUFVO1FBQ2hCLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDckI7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0tBQ3JEO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUM7S0FDckQ7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQ3pCO1FBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQ25DLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztLQUN2QztDQUNKLENBQUM7QUFVTixPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbkUsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsTUFBTSxVQUFVLFlBQVk7SUFDeEIsT0FBTztRQUNILEtBQUssRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLFlBQVks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