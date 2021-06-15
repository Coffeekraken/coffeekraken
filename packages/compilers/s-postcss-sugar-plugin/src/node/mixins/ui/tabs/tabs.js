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
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf', 'grow', 'style'],
        default: ['bare', 'lnf', 'grow', 'style']
    }
};
export { postcssSugarPluginUiTabInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ style: 'default', grow: false, scope: ['bare', 'lnf', 'grow', 'style'] }, params);
    console.log(finalParams);
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
        & > div {
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
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFLckQsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZOztBQUNsRCwyQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztRQUMvQixPQUFPLEVBQUUsU0FBUztLQUNuQjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQztRQUNyQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxPQUFPLENBQUM7S0FDdkM7Q0FDRixDQUFDO0FBU0osT0FBTyxFQUFFLGdDQUFnQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDRyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLFNBQVMsRUFDaEIsSUFBSSxFQUFFLEtBQUssRUFDWCxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxPQUFPLENBQUMsSUFDakMsTUFBTSxDQUNWLENBQUM7SUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRTNCLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztLQU1ULENBQUMsQ0FBQztLQUNKO0lBRUQsSUFBSSxXQUFXLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2hFLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDTixXQUFXLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztPQUloRSxDQUFBLENBQUMsQ0FBQyxFQUFFO0tBQ04sQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBaUJULENBQUMsQ0FBQztLQUNKO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNoRixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O0tBYVQsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLEtBQUssVUFBVSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2pGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7S0FhVCxDQUFDLENBQUM7S0FDSjtJQUdELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=