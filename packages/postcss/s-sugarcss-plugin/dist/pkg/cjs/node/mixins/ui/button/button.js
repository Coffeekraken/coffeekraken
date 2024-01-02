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
class SSugarcssPluginUiButtonInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid', 'gradient', 'outline', 'text', 'loading'],
                default: s_theme_1.default.current.get('ui.button.defaultLnf'),
            },
        };
    }
}
exports.interface = SSugarcssPluginUiButtonInterface;
function default_1({ params, atRule, postcssApi, sharedData, replaceWith, }) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MsMkVBQWtEO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUM7Z0JBQzNELE9BQU8sRUFBRSxpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDeEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTTRDLHFEQUFTO0FBRXRELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixVQUFVLEVBQ1YsV0FBVyxHQU9kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxPQUFPLElBQ1QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRS9CLE9BQU87SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWtEVCxDQUFDLENBQUM7SUFFSCxRQUFRLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDckIsS0FBSyxNQUFNO1lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7ZUFFUCxDQUFDLENBQUM7WUFDTCxNQUFNO0tBQ2I7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7OztTQVFMLENBQUMsQ0FBQztJQUVQLFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNyQixLQUFLLFVBQVU7WUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQTJDTCxDQUFDLENBQUM7WUFFUCxNQUFNO1FBQ1YsS0FBSyxTQUFTO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztlQVVQLENBQUMsQ0FBQztZQUNMLE1BQU07UUFDVixLQUFLLE1BQU07WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7aUJBTUwsQ0FBQyxDQUFDO1lBQ1AsTUFBTTtRQUNWLEtBQUssU0FBUztZQUNWLE1BQU0sSUFBSSxHQUFHLElBQUEsb0JBQVMsRUFBQyxNQUFNLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxDQUNQLFVBQVUsQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7OzttQkFTZCxDQUFDLENBQ1AsQ0FBQztZQUVGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFxQkwsQ0FBQyxDQUFDO1lBQ1AsTUFBTTtRQUNWLEtBQUssT0FBTyxDQUFDO1FBQ2I7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXVCYixDQUFDLENBQUM7WUFDQyxNQUFNO0tBQ2I7SUFFRCxXQUFXO0lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7U0FLTCxDQUFDLENBQUM7SUFFUCxVQUFVO0lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBcUJMLENBQUMsQ0FBQztJQUVQLFVBQVU7SUFDVixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O1dBSUgsQ0FBQyxDQUFDO0lBRVQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFwUkQsNEJBb1JDIn0=