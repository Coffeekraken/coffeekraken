"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const getRoot_js_1 = __importDefault(require("../../../utils/getRoot.js"));
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
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
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
class postcssSugarPluginUiButtonInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid', 'gradient', 'outline', 'text', 'loading'],
                default: s_theme_1.default.get('ui.button.defaultLnf'),
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
exports.interface = postcssSugarPluginUiButtonInterface;
function default_1({ params, atRule, postcssApi, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid', scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
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
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
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
                    border: s.color(current, border) solid s.theme(ui.button.borderWidth);

                    --borderWidth: s.theme(ui.button.borderWidth);

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
                border: s.color(current) solid s.theme(ui.button.borderWidth);
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
                  border: rgba(0,0,0,0) solid s.theme(ui.button.borderWidth);
                  color: s.color(current) !important;
                  box-shadow: none !important;
                  transition: s.theme(ui.button.transition);
                `);
                break;
            case 'loading':
                const root = (0, getRoot_js_1.default)(atRule);
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
                  border: s.color(current, border) solid s.theme(ui.button.borderWidth);
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
    }
    // wireframe
    vars.push(`
      @s.wireframe {
        @s.wireframe.border;
        @s.wireframe.background;
      }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MsMkVBQWtEO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDO2dCQUMzRCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDaEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU8rQyx3REFBUztBQUV6RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsVUFBVSxFQUNWLFdBQVcsR0FPZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixHQUFHLEVBQUUsT0FBTyxFQUNaLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbURiLENBQUMsQ0FBQztRQUVDLFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNyQixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7ZUFFWCxDQUFDLENBQUM7Z0JBQ0QsTUFBTTtTQUNiO0tBQ0o7SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7OztTQVFULENBQUMsQ0FBQztRQUVILFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNyQixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkEyQ1QsQ0FBQyxDQUFDO2dCQUVILE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztlQVVYLENBQUMsQ0FBQztnQkFDRCxNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztpQkFNVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixNQUFNLElBQUksR0FBRyxJQUFBLG9CQUFTLEVBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLENBQ1AsVUFBVSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7O21CQVNsQixDQUFDLENBQ0gsQ0FBQztnQkFFRixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBcUJULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXVCakIsQ0FBQyxDQUFDO2dCQUNLLE1BQU07U0FDYjtRQUVELFdBQVc7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztTQUtULENBQUMsQ0FBQztRQUVILFVBQVU7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FxQlQsQ0FBQyxDQUFDO1FBRUgsVUFBVTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7V0FJUCxDQUFDLENBQUM7S0FDUjtJQUVELFlBQVk7SUFDWixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUEzUkQsNEJBMlJDIn0=