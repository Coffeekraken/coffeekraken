import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          avatar
 * @namespace     node.mixins.ui.avatar
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "avatar" UI component css.
 *
 * @param       {'solid'|'gradient'|'outline'|'text'}                           [style=theme.ui.button.defaultStyle]         The style you want your avatar to have
 * @param       {'default'|'square'|'puill'}                     [shape='default']       The shape you want your badge to have
 * @param       {Boolean}                                         [outline=theme.ui.button.outline]
 * @param       {('bare'|'lnf')[]}        [scope=['bare','lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      \@sugar.ui.button();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginUiButtonInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid', 'gradient', 'outline', 'text'],
                default: __STheme.config('ui.button.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.config('ui.button.defaultShape'),
            },
            outline: {
                type: 'Boolean',
                default: __STheme.config('ui.button.outline'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape'],
                default: ['bare', 'lnf', 'shape'],
            },
        };
    }
}
export { postcssSugarPluginUiButtonInterface as interface };
/**
 * @name          button
 * @namespace     ui.button
 * @type          CssMixin
 * @interface     ./button          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the button style to any element
 *
 * @example     css
 * .my-button {
 *    @sugar.ui.button;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, applyNoScopes, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', shape: 'default', outline: true, scope: ['bare', 'lnf', 'shape'] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        font-size: sugar.scalable(1rem);
        position: relative;
        display: inline-block;
        cursor: pointer;
        white-space: nowrap;
        vertical-align: middle;
        padding-inline: sugar.theme(ui.button.paddingInline);
        padding-block: sugar.theme(ui.button.paddingBlock);

        & > * {
          pointer-events: none;
        }
        & > i,
        & > .s-icon {
          font-size: 1em;
        }
    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
          font-size: sugar.scalable(1rem);
        `);
        switch (finalParams.style) {
            case 'gradient':
                vars.push(`
                    background: none !important;
                    color: sugar.color(current, foreground);
                    transition: sugar.theme(ui.button.transition);
                    border: sugar.color(current, border) solid sugar.theme(ui.button.borderWidth);

                    --borderWidth: sugar.theme(ui.button.borderWidth);

                    & > * {
                      position: relative;
                      z-index: 1;
                    }

                    &:before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      @sugar.gradient(sugar.color(current, gradientStart), sugar.color(current, gradientEnd), $angle: 90);
                      transition: sugar.theme(ui.button.transition);
                    }

                    &:after {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      @sugar.gradient(sugar.color(current,gradientEnd), sugar.color(current, gradientStart), $angle: 90);
                      opacity: 0;
                      transition: sugar.theme(ui.button.transition);
                    }

                    &:hover, &:focus {
                      color: sugar.color(current, foreground);

                      &:after {
                        opacity: 1;
                      }
                    }
                `);
                break;
            case 'outline':
                vars.push(`
                background-color: sugar.color(current, --alpha 0);
                border: sugar.color(current) solid sugar.theme(ui.button.borderWidth);
                color: sugar.color(current);

                &:hover, &:focus {
                  background-color: sugar.color(current);
                  color: sugar.color(current, foreground);
                }
              `);
                break;
            case 'text':
                vars.push(`
                  background: none !important;
                  border: rgba(0,0,0,0) solid sugar.theme(ui.button.borderWidth);
                  color: sugar.color(current);
                  box-shadow: none !important;

                  &:hover, &:focus {
                    color: sugar.color(current);
                    transform: scale(1.1);
                  }

                  @sugar.state.disabled {
                    transform: scale(1) !important;
                  }
                `);
                break;
            case 'solid':
            default:
                vars.push(`
                  background-color: sugar.color(current);
                  border: sugar.color(current, border) solid sugar.theme(ui.button.borderWidth);
                  color: sugar.color(current, foreground);

                  &:hover, &:focus {
                    background-color: sugar.color(current, 60);
                    color: sugar.color(current, foreground);
                  }
        `);
                break;
        }
        if (finalParams.outline) {
            vars.push(`
              &:focus:not(:hover) {
                @sugar.outline;
              }
          `);
        }
    }
    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;

                    &:before,
                    &:after {
                      border-radius: 0;
                    }
                  `);
                break;
            case 'pill':
                vars.push(`
                    border-radius: 9999px;

                    &:before,
                    &:after {
                      border-radius: 9999px;
                    }
                  `);
                break;
            default:
                vars.push(`
                    border-radius: sugar.theme(ui.button.borderRadius);

                    &:before,
                    &:after {
                      border-radius: sugar.theme(ui.button.borderRadius);
                    }
                  `);
                break;
        }
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxZQUFZO0lBQzFELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDO2dCQUNoRCxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQzthQUNyRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDckMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUM7YUFDckQ7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7YUFDaEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztnQkFDaEMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7YUFDcEM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBU0QsT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2IsVUFBVSxFQUNWLFdBQVcsR0FPZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsT0FBTyxFQUNkLEtBQUssRUFBRSxTQUFTLEVBQ2hCLE9BQU8sRUFBRSxJQUFJLEVBQ2IsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsSUFDNUIsTUFBTSxDQUNaLENBQUM7SUFDRixXQUFXLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFckQsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBaUJiLENBQUMsQ0FBQztLQUNGO0lBRUQsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7U0FFVCxDQUFDLENBQUM7UUFFSCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBMkNULENBQUMsQ0FBQztnQkFFSCxNQUFNO1lBQ1YsS0FBSyxTQUFTO2dCQUNWLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7OztlQVNYLENBQUMsQ0FBQztnQkFDRCxNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7O2lCQWNULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7U0FTakIsQ0FBQyxDQUFDO2dCQUNLLE1BQU07U0FDYjtRQUNELElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O1dBSVgsQ0FBQyxDQUFDO1NBQ0o7S0FDSjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDckMsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O21CQU9QLENBQUMsQ0FBQztnQkFDTCxNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7bUJBT1AsQ0FBQyxDQUFDO2dCQUNMLE1BQU07WUFDVjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O21CQU9QLENBQUMsQ0FBQztnQkFDTCxNQUFNO1NBQ2I7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==