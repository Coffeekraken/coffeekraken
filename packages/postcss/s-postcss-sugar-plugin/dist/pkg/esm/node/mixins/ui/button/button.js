import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __getRoot from '../../../utils/getRoot';
/**
 * @name          button
 * @as            @sugar.ui.button
 * @namespace     node.mixin.ui.button
 * @type          PostcssMixin
 * @interface     ./button
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "button" UI component css.
 *
 * @param       {'solid'|'gradient'|'outline'|'text'|'loading'}                           [lnf='theme.ui.button.defaultLnf']         The lnf you want to generate
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
                values: ['solid', 'gradient', 'outline', 'text', 'loading'],
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
export default function ({ params, atRule, postcssApi, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid', scope: ['bare', 'lnf'] }, params);
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
            width: calc(var(--s-btn-confirm-width) * var(--s-scale, 1));

            &:after {
              content: attr(confirm);
              position: absolute;
              top: 0; left: 0;
              opacity: 0;
              width: calc(var(--s-btn-confirm-width) * var(--s-scale, 1));
              height: 100%;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              pointer-events: none;
              padding-inline: calc(var(--s-btn-padding-inline) * 0.5);
            }

            &:focus:after,
            &:focus-within:after {
                opacity: 1;
            }

          }

    `);
        switch (finalParams.lnf) {
            case 'text':
                vars.push(`
              padding-inline: calc(sugar.padding(ui.button.paddingInline) * 0.5);
              `);
                break;
        }
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

                    &:hover {
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
                transition: sugar.theme(ui.button.transition);

                &:hover {
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
                  transition: sugar.theme(ui.button.transition);
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
                  i,
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
            case 'solid':
            default:
                vars.push(`
                  background-color: sugar.color(current);
                  border: sugar.color(current, border) solid sugar.theme(ui.button.borderWidth);
                  color: sugar.color(current, foreground) !important;
                  transition: sugar.theme(ui.button.transition);

                  &:hover {
                    background-color: sugar.color(current, --darken 6);
                    color: sugar.color(current, foreground) !important;

                    @sugar.theme(dark) {
                      background-color: sugar.color(current, --lighten 6);
                    }
                  }

                  &:active {
                    background-color: sugar.color(current, --darken 10);

                    @sugar.theme(dark) {
                      background-color: sugar.color(current, --lighten 10);
                    }
                  }

        `);
                break;
        }
        // disabled
        vars.push(`
          &:disabled {
            opacity: 0.3;
            pointer-events: none;
          }
        `);
        // confirm
        vars.push(`
          &[confirm] {
            @sugar.transition (fast);

            &:after {
              background-color: sugar.color(current);
              color: sugar.color(current, foreground) !important;
              @sugar.transition (fast);
              @sugar.color(error);
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
        // outline
        vars.push(`
              &:focus:not(:hover) {
                @sugar.outline;
              }
          `);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBRS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDO2dCQUMzRCxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzthQUNoRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT0QsT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsVUFBVSxFQUNWLFdBQVcsR0FPZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixHQUFHLEVBQUUsT0FBTyxFQUNaLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbURiLENBQUMsQ0FBQztRQUVDLFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNyQixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7ZUFFWCxDQUFDLENBQUM7Z0JBQ0QsTUFBTTtTQUNiO0tBQ0o7SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7OztTQVFULENBQUMsQ0FBQztRQUVILFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNyQixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkEyQ1QsQ0FBQyxDQUFDO2dCQUVILE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztlQVVYLENBQUMsQ0FBQztnQkFDRCxNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztpQkFNVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLENBQ1AsVUFBVSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7O21CQVNsQixDQUFDLENBQ0gsQ0FBQztnQkFFRixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBcUJULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXVCakIsQ0FBQyxDQUFDO2dCQUNLLE1BQU07U0FDYjtRQUVELFdBQVc7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztTQUtULENBQUMsQ0FBQztRQUVILFVBQVU7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FxQlQsQ0FBQyxDQUFDO1FBRUgsVUFBVTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7V0FJUCxDQUFDLENBQUM7S0FDUjtJQUVELFlBQVk7SUFDWixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==