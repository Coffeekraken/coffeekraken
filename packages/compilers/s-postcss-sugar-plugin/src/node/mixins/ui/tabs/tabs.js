import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginUiTabInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.config('ui.tabs.defaultStyle'),
            },
            grow: {
                type: 'Boolean',
                default: false,
            },
            direction: {
                type: 'String',
                values: ['vertical', 'horizontal'],
                default: 'horizontal',
            },
            outline: {
                type: 'Boolean',
                default: __STheme.config('ui.tabs.outline'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'grow', 'direction'],
                default: ['bare', 'lnf', 'grow', 'direction'],
            },
        };
    }
}
export { postcssSugarPluginUiTabInterface as interface };
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
    const finalParams = Object.assign({ style: __STheme.config('ui.tabs.defaultStyle'), grow: false, direction: 'horizontal', outline: true, scope: ['bare', 'lnf', 'grow', 'direction'] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
    if (finalParams.outline) {
        vars.push(`
        & > *:focus:not(:hover) {
          @sugar.outline;
        }
      `);
    }
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        font-size: sugar.scalable(1rem);
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    `);
    }
    if (finalParams.grow && finalParams.scope.indexOf('grow') !== -1) {
        vars.push(`
      ${finalParams.grow && finalParams.scope.indexOf('grow') !== -1
            ? `
        & > * {
          flex-grow: 1;
        }
      `
            : ''}
    `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
          /** background-color: sugar.color(current, surface); */
          border-radius: sugar.theme(ui.tabs.borderRadius);
          user-select: none;

          & > * > * {
            @sugar.color(main);
          }

          & > * {
            text-align: center;
            padding-inline: sugar.theme(ui.tabs.paddingInline);
            padding-block: sugar.theme(ui.tabs.paddingBlock);
            transition: sugar.theme(ui.tabs.transition);
            cursor: pointer;
            display: block;      
          }

          & > *:first-child {
            border-top-left-radius: sugar.theme(ui.tabs.borderRadius);
            border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius);
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          & > *:last-child {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-top-right-radius: sugar.theme(ui.tabs.borderRadius);
            border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius);
          }

          [dir="rtl"] & > *:first-child,
          &[dir="rtl"] > *:first-child {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-top-right-radius: sugar.theme(ui.tabs.borderRadius);
            border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius);
          }
          [dir="rtl"] & > *:last-child,
          &[dir="rtl"] > *:last-child {
            border-top-left-radius: sugar.theme(ui.tabs.borderRadius);
            border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius);
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }

          & > *:first-child:last-child {
            border-top-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
            border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
            border-top-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
            border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
          }

      `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
          & > * {
            @sugar.state.active {
              background-color: sugar.color(current);
              color: sugar.color(current, foreground);
            }
            @sugar.state.hover {
              background-color: sugar.color(current, --lighten 5);
            }       
          }
        `);
                break;
        }
    }
    // if (finalParams.style === 'gradient' && finalParams.scope.indexOf('style') !== -1) {
    //     vars.push(`
    //   & > dt,
    //   & > li,
    //   & > div,
    //   & > * {
    //     @sugar.state.hover {
    //       @sugar.gradient($start: sugar.color(complementary, gradientStart), $end: sugar.color(complementary, gradientEnd), $angle: 90deg, $type: linear);
    //     }
    //     @sugar.state.active {
    //       @sugar.gradient($start: sugar.color(current, gradientStart), $end: sugar.color(current, gradientEnd), $angle: 90deg, $type: linear);
    //     }
    //   }
    // `);
    // }
    if (finalParams.direction === 'vertical' &&
        finalParams.scope.indexOf('direction') !== -1) {
        vars.push(`
      display: block;

      & > * {
        display: block;
        text-align: inherit;
      }
    `);
        if (finalParams.direction === 'vertical') {
            vars.push(`
          & > *:first-child {
              border-top-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
              border-bottom-left-radius: 0 !important;
              border-top-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
              border-bottom-right-radius: 0 !important;
            }
            & > *:last-child {
              border-top-left-radius: 0 !important;
              border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
              border-top-right-radius: 0 !important;
              border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
            }
        `);
        }
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQzthQUNuRDtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO2dCQUNsQyxPQUFPLEVBQUUsWUFBWTthQUN4QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzthQUM5QztZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQztnQkFDNUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDO2FBQ2hEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVVELE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RCxN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