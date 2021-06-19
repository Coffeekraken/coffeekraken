import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiTabInterface extends __SInterface {
}
postcssSugarPluginUiTabInterface.definition = {
    style: {
        type: 'String',
        values: ['default', 'gradient'],
        default: 'default'
    },
    grow: {
        type: 'Boolean',
        default: false
    },
    direction: {
        type: 'String',
        values: ['vertical', 'horizontal'],
        default: 'horizontal'
    },
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf', 'grow', 'style', 'direction'],
        default: ['bare', 'lnf', 'grow', 'style', 'direction']
    }
};
export { postcssSugarPluginUiTabInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ style: 'default', grow: false, direction: 'horizontal', scope: ['bare', 'lnf', 'grow', 'style', 'direction'] }, params);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
      @sugar.scope.bare {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
      }
    `);
    }
    if (finalParams.grow && finalParams.scope.indexOf('grow') !== -1) {
        vars.push(`
      ${finalParams.grow && finalParams.scope.indexOf('grow') !== -1 ? `
        & > * {
          flex-grow: 1;
        }
      ` : ''}
    `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
      @sugar.scope.lnf {
        background-color: sugar.color(ui, surface);
        border-radius: sugar.theme(ui.tabs.borderRadius);
        box-shadow: sugar.theme(ui.tabs.depth);
        overflow: hidden;

          & > * {
            text-align: center;
            padding: sugar.theme('ui.tabs.padding');
            background-color: sugar.color(ui, surface);
            color: sugar.color(ui, foreground);
            transition: sugar.theme(ui.tabs.transition);
            cursor: pointer;
            display: block;      
          }
      }
    `);
    }
    if (finalParams.style === 'default' && finalParams.scope.indexOf('style') !== -1) {
        vars.push(`
      @sugar.scope.lnf {
        & > dt,
        & > li,
        & > div {
          @sugar.state.hover {
            background-color: sugar.color(complementary);
          }
          @sugar.state.active {
            background-color: sugar.color(accent);
          }          
        }
      }
    `);
    }
    if (finalParams.style === 'gradient' && finalParams.scope.indexOf('style') !== -1) {
        vars.push(`
      @sugar.scope.lnf {
        & > dt,
        & > li,
        & > div,
        & > * {
          @sugar.state.hover {
            @sugar.gradient.linear($start: sugar.color(complementary, gradientStart), $end: sugar.color(complementary, gradientEnd), $angle: 90deg);
          }
          @sugar.state.active {
            @sugar.gradient.linear($start: sugar.color(accent, gradientStart), $end: sugar.color(accent, gradientEnd), $angle: 90deg);
          }          
        }
      }
    `);
    }
    if (finalParams.direction === 'vertical' && finalParams.scope.indexOf('direction') !== -1) {
        vars.push(`
      @sugar.scope.bare {
        display: block;

        & > dt,
        & > li,
        & > div,
        & > * {
          display: block;
          text-align: inherit;
        }
      }
    `);
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFLckQsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZOztBQUNsRCwyQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztRQUMvQixPQUFPLEVBQUUsU0FBUztLQUNuQjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFDLFlBQVksQ0FBQztRQUNqQyxPQUFPLEVBQUcsWUFBWTtLQUN2QjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxXQUFXLENBQUM7UUFDakQsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFdBQVcsQ0FBQztLQUNuRDtDQUNGLENBQUM7QUFVSixPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNHLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxFQUNoQixJQUFJLEVBQUUsS0FBSyxFQUNYLFNBQVMsRUFBRSxZQUFZLEVBQ3ZCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxXQUFXLENBQUMsSUFDN0MsTUFBTSxDQUNWLENBQUM7SUFFSixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7S0FNVCxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksV0FBVyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNoRSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ04sV0FBVyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7T0FJaEUsQ0FBQSxDQUFDLENBQUMsRUFBRTtLQUNOLENBQUMsQ0FBQztLQUNKO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztLQWlCVCxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDaEYsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztLQWFULENBQUMsQ0FBQztLQUNKO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLFVBQVUsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNqRixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQUMsQ0FBQztLQUNKO0lBRUQsSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLFVBQVUsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6RixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7S0FZVCxDQUFDLENBQUM7S0FDSjtJQUdELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=