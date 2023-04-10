"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const getRoot_1 = __importDefault(require("../../../utils/getRoot"));
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
class postcssSugarPluginUiButtonInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['default', 'gradient', 'outline', 'text', 'loading'],
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
function default_1({ params, atRule, postcssApi, sharedData, replaceWith, }) {
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
                `);
                break;
            case 'loading':
                const root = (0, getRoot_1.default)(atRule);
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

                  &:hover,
                  &:focus,
                  &:focus-within {
                    background-color: sugar.color(current, --darken 6);
                    color: sugar.color(current, foreground) !important;

                    @sugar.theme(dark) {
                      background-color: sugar.color(current, --lighten 6);
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MscUVBQStDO0FBRS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDO2dCQUM3RCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDaEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU8rQyx3REFBUztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsVUFBVSxFQUNWLFdBQVcsR0FPZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixHQUFHLEVBQUUsU0FBUyxFQUNkLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbURiLENBQUMsQ0FBQztRQUVDLFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNyQixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7ZUFFWCxDQUFDLENBQUM7Z0JBQ0QsTUFBTTtTQUNiO0tBQ0o7SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7OztTQVFULENBQUMsQ0FBQztRQUVILFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNyQixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkEyQ1QsQ0FBQyxDQUFDO2dCQUVILE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O2VBU1gsQ0FBQyxDQUFDO2dCQUNELE1BQU07WUFDVixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7aUJBS1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBQSxpQkFBUyxFQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsTUFBTSxDQUNQLFVBQVUsQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7OzttQkFTbEIsQ0FBQyxDQUNILENBQUM7Z0JBRUYsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBb0JULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1Y7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O1NBZWpCLENBQUMsQ0FBQztnQkFDSyxNQUFNO1NBQ2I7UUFFRCxXQUFXO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7U0FLVCxDQUFDLENBQUM7UUFFSCxVQUFVO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBcUJULENBQUMsQ0FBQztRQUVILFVBQVU7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O1dBSVAsQ0FBQyxDQUFDO0tBQ1I7SUFFRCxZQUFZO0lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7S0FLVCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBL1FELDRCQStRQyJ9