import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __getRoot from '../../../utils/getRoot.js';
/**
 * @name          button
 * @as            @s.ui.button
 * @namespace     node.mixin.ui.button
 * @type          PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to generate the "button" UI component css.
 *
 * @param       {'solid'|'gradient'|'outline'|'text'|'loading'}                           [lnf='theme.ui.button.defaultLnf']         The lnf you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet     @s.ui.button
 *
 * @example       css
 * .my-element {
 *      @s.ui.button();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiButtonInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid', 'gradient', 'outline', 'text', 'loading'],
                default: __STheme.current.get('ui.button.defaultLnf'),
            },
        };
    }
}
export { SSugarcssPluginUiButtonInterface as interface };
export default function ({ params, atRule, postcssApi, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid' }, params);
    const vars = [];
    vars.push(`@s.scope 'bare' {`);
    // bare
    vars.push(`
            --s-btn-padding-inline: s.padding(ui.button.paddingInline);
            --s-btn-padding-block: s.padding(ui.button.paddingBlock);
            
            --s-btn-confirm-width: auto;

            font-size: s.scalable(1rem);
            line-height: 1;
            text-decoration: none !important;
            position: relative;
            display: inline-flex;
            
            cursor: pointer;
            user-select: none;
            white-space: nowrap;
            vertical-align: middle;
            padding-inline: s.padding(ui.button.paddingInline);
            padding-block: s.padding(ui.button.paddingBlock);
            gap: s.margin(20);
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
              padding-inline: calc(s.padding(ui.button.paddingInline) * 0.3);
              `);
            break;
    }
    vars.push('}');
    // lnf
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
          font-size: s.scalable(1rem);
          text-decoration: none;
          @s.shape;

          &:after {
            @s.shape;
          }
        `);
    switch (finalParams.lnf) {
        case 'gradient':
            vars.push(`
                    background: none !important;
                    color: s.color(current, foreground) !important;
                    transition: s.theme(ui.button.transition);
                    border: s.color(current, border) solid s.border.width(ui.button.borderWidth);

                    --borderWidth: s.border.width(ui.button.borderWidth);

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
                      @s.gradient(s.color(current, gradientStart), s.color(current, gradientEnd), $angle: 90);
                      transition: s.theme(ui.button.transition);
                    }

                    &:after {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      @s.gradient(s.color(current,gradientEnd), s.color(current, gradientStart), $angle: 90);
                      opacity: 0;
                      transition: s.theme(ui.button.transition);
                    }

                    &:hover {
                      color: s.color(current, foreground) !important;

                      &:after {
                        opacity: 1;
                      }
                    }
                `);
            break;
        case 'outline':
            vars.push(`
                background-color: s.color(current, --alpha 0);
                border: s.color(current) solid s.border.width(ui.button.borderWidth);
                color: s.color(current) !important;
                transition: s.theme(ui.button.transition);

                &:hover {
                  background-color: s.color(current);
                  color: s.color(current, foreground) !important;
                }
              `);
            break;
        case 'text':
            vars.push(`
                  background: none !important;
                  border: rgba(0,0,0,0) solid s.border.width(ui.button.borderWidth);
                  color: s.color(current) !important;
                  box-shadow: none !important;
                  transition: s.theme(ui.button.transition);
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
                  background-color: s.color(current);
                  border: s.color(current, border) solid s.border.width(ui.button.borderWidth);
                  color: s.color(current, foreground) !important;
                  transition: s.theme(ui.button.transition);

                  &:hover {
                    background-color: s.color(current, --darken 6);
                    color: s.color(current, foreground) !important;

                    @s.theme(dark) {
                      background-color: s.color(current, --lighten 6);
                    }
                  }

                  &:active {
                    background-color: s.color(current, --darken 10);

                    @s.theme(dark) {
                      background-color: s.color(current, --lighten 10);
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
            @s.transition (fast);

            &:after {
              background-color: s.color(current);
              color: s.color(current, foreground) !important;
              @s.transition (fast);
              @s.color(error);
            }

            &:hover,
            &:focus,
            &:focus-within {

              &:after {
                color: s.color(current, foreground) !important;
              }
            }

          }
        `);
    // outline
    vars.push(`
              &:focus:not(:hover) {
                @s.outline;
              }
          `);
    vars.push(`}`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sU0FBUyxNQUFNLDJCQUEyQixDQUFDO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQztnQkFDM0QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ3hEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLFVBQVUsRUFDVixXQUFXLEdBT2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsR0FBRyxFQUFFLE9BQU8sSUFDVCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFL0IsT0FBTztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBa0RULENBQUMsQ0FBQztJQUVILFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNyQixLQUFLLE1BQU07WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOztlQUVQLENBQUMsQ0FBQztZQUNMLE1BQU07S0FDYjtJQUVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O1NBUUwsQ0FBQyxDQUFDO0lBRVAsUUFBUSxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ3JCLEtBQUssVUFBVTtZQUNYLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBMkNMLENBQUMsQ0FBQztZQUVQLE1BQU07UUFDVixLQUFLLFNBQVM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7O2VBVVAsQ0FBQyxDQUFDO1lBQ0wsTUFBTTtRQUNWLEtBQUssTUFBTTtZQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztpQkFNTCxDQUFDLENBQUM7WUFDUCxNQUFNO1FBQ1YsS0FBSyxTQUFTO1lBQ1YsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQ1AsVUFBVSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7O21CQVNkLENBQUMsQ0FDUCxDQUFDO1lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQXFCTCxDQUFDLENBQUM7WUFDUCxNQUFNO1FBQ1YsS0FBSyxPQUFPLENBQUM7UUFDYjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBdUJiLENBQUMsQ0FBQztZQUNDLE1BQU07S0FDYjtJQUVELFdBQVc7SUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztTQUtMLENBQUMsQ0FBQztJQUVQLFVBQVU7SUFDVixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FxQkwsQ0FBQyxDQUFDO0lBRVAsVUFBVTtJQUNWLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7V0FJSCxDQUFDLENBQUM7SUFFVCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9