import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __getRoot from '../../../utils/getRoot';
/**
 * @name          blockquote
 * @namespace     node.mixin.ui.button
 * @type          PostcssMixin
 * @interface     ./button
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "button" UI component css.
 *
 * @param       {'default'|'gradient'|'outline'|'text'|'loading'}                           [style='theme.ui.button.defaultLnf']         The style you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet     @sugar.ui.button
 *
 * @example       css
 * .my-element {
 *      \@sugar.ui.button();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiButtonInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['default', 'gradient', 'outline', 'text', 'loading'],
                default: __STheme.get('ui.button.defaultLnf'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}
export { postcssSugarPluginUiButtonInterface as interface };
/**
 * @name          button
 * @namespace     ui.button
 * @type               PostcssMixin
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, postcssApi, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'default', scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
          --s-btn-padding-inline: sugar.padding(ui.button.paddingInline);
          --s-btn-padding-block: sugar.padding(ui.button.paddingBlock);
          
          --s-btn-confirm-width: auto;

          font-size: sugar.scalable(1rem);
          line-height: 1;
          text-decoration: none !important;
          position: relative;
          display: inline-flex;
          
          cursor: pointer;
          user-select: none;
          white-space: nowrap;
          vertical-align: middle;
          padding-inline: sugar.padding(ui.button.paddingInline);
          padding-block: sugar.padding(ui.button.paddingBlock);
          gap: sugar.margin(20);
          align-items: center;
          justify-content: center;

          & > * {
            pointer-events: none;
          }

          &[confirm] {
            width: var(--s-btn-confirm-width);

            &:after {
              content: attr(confirm);
              position: absolute;
              top: 0; left: 0;
              width: var(--s-btn-confirm-width); height: 0;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              @sugar.color(error);
              transform: translateY(100%);
              padding-inline: var(--s-btn-padding-inline);
            }

            &:focus,
            &:focus-within {

              &:after {
                height: 100%;
                transform: translateY(0);
              }
            }

          }

    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
          font-size: sugar.scalable(1rem);
          text-decoration: none;
          @sugar.shape;

          &:after {
            @sugar.shape;
          }
        `);
        switch (finalParams.lnf) {
            case 'gradient':
                vars.push(`
                    background: none !important;
                    color: sugar.color(current, foreground) !important;
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
                      color: sugar.color(current, foreground) !important;

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
                color: sugar.color(current) !important;

                &:hover, &:focus {
                  background-color: sugar.color(current);
                  color: sugar.color(current, foreground) !important;
                }
              `);
                break;
            case 'text':
                vars.push(`
                  background: none !important;
                  border: rgba(0,0,0,0) solid sugar.theme(ui.button.borderWidth);
                  color: sugar.color(current) !important;
                  box-shadow: none !important;

                  &:hover, &:focus {
                    transform: scale(1.1);
                  }

                  @sugar.state.disabled {
                    transform: scale(1) !important;
                  }
                `);
                break;
            case 'loading':
                const root = __getRoot(atRule);
                root.append(postcssApi.parse(`
                      @keyframes s-btn-loading {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(360deg);
                        }
                    }
                  `));
                vars.push(`
                  position: relative;
                  pointer-events: none !important;
          
                  img,
                  .s-icon,
                  svg {
                      display: none;
                  }
          
                  &:before {
                      content: '';
                      display: block;
                      width: 1em;
                      height: 1em;
                      border-radius: 50%;
                      border: 3px solid currentColor;
                      border-bottom: none;
                      animation: s-btn-loading 0.4s linear infinite;
                  }
                `);
                break;
            default:
                vars.push(`
                  background-color: sugar.color(current);
                  border: sugar.color(current, border) solid sugar.theme(ui.button.borderWidth);
                  color: sugar.color(current, foreground) !important;
                  @sugar.transition (fast);

                  &:hover,
                  &:focus,
                  &:focus-within {
                    background-color: sugar.color(current, --darken 6);
                    color: sugar.color(current, foreground) !important;

                    @sugar.theme(dark) {
                      background-color: sugar.color(current, --lighten 6);
                    }
                  }

                  &[confirm] {

                    &:after {
                      background-color: sugar.color(current);
                      color: sugar.color(current, foreground) !important;
                      @sugar.transition (fast);
                      color: white !important;
                    }

                    &:hover,
                    &:focus,
                    &:focus-within {

                      &:after {
                        color: sugar.color(current, foreground) !important;
                      }
                    }

                  }
        `);
                break;
        }
        // outline
        // vars.push(`
        //       &:focus:not(:hover) {
        //         @sugar.outline;
        //       }
        //   `);
    }
    // wireframe
    vars.push(`
      @sugar.wireframe {
        @sugar.wireframe.border;
        @sugar.wireframe.background;
      }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBRS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sbUNBQW9DLFNBQVEsWUFBWTtJQUMxRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUM7Z0JBQzdELE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ2hEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPRCxPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixVQUFVLEVBQ1YsV0FBVyxHQU9kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxTQUFTLEVBQ2QsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FzRGIsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7OztTQVFULENBQUMsQ0FBQztRQUVILFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNyQixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkEyQ1QsQ0FBQyxDQUFDO2dCQUVILE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O2VBU1gsQ0FBQyxDQUFDO2dCQUNELE1BQU07WUFDVixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztpQkFhVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLENBQ1AsVUFBVSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7O21CQVNsQixDQUFDLENBQ0gsQ0FBQztnQkFFRixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFvQlQsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FvQ2pCLENBQUMsQ0FBQztnQkFDSyxNQUFNO1NBQ2I7UUFFRCxVQUFVO1FBQ1YsY0FBYztRQUNkLDhCQUE4QjtRQUM5QiwwQkFBMEI7UUFDMUIsVUFBVTtRQUNWLFFBQVE7S0FDWDtJQUVELFlBQVk7SUFDWixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==