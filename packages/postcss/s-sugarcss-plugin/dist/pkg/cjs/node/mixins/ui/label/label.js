"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          label
 * @as          @s.ui.label
 * @namespace     node.mixin.ui.label
 * @type               PostcssMixin
 * @interface     ./label          interface
 * @platform      postcss
 * @status        stable
 *
 * Apply the label style to any element
 *
 * @param       {'inline'|'block'|'float'}                           [lnf='theme.ui.label.defaultLnf']         The style you want to generate
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet     @s.ui.label
 *
 * @example     css
 * .my-label {
 *    @s.ui.label;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiLabelInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['inline', 'block', 'float'],
                default: s_theme_1.default.current.get('ui.label.defaultLnf'),
            },
        };
    }
}
exports.interface = SSugarcssPluginUiLabelInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: s_theme_1.default.current.get('ui.label.defaultLnf') }, params);
    const vars = [];
    // bare
    vars.push(`@s.scope 'bare' {`);
    vars.push(`
            width: 100%;
            font-size: s.font.size(30);
            display: flex;

            > span {
              order: -1;
              cursor: pointer;
            }

            &[disabled] {
              @s.disabled();
            }
    `);
    switch (finalParams.lnf) {
        case 'float':
            vars.push(`
                  display: block;
                  position: relative;

                  & > span {
                    margin-inline-start: 0;
                  }

                  & > span {
                    top: 0;
                    line-height: initial;
                    left: calc(s.padding(ui.form.paddingInline) * 1.3);
                    padding-block: calc(s.padding(ui.form.paddingBlock) * 1.2);
                    position: absolute;
                    z-index: 1;
                    transform: scale(1);
                    transform-origin: 0 0;
                    user-select: none;
                  }

                  &:focus,
                  &:focus-within {
                    & > span {
                      top: 0;
                      transform: scale(0.6);
                      opacity: 0.8;
                    }
                    & input:not([type="checkbox"]):not([type="radio"]),
                    & textarea {
                      padding-block-start: calc(s.padding(ui.form.paddingBlock, true) * 1.4);
                      padding-block-end: calc(s.padding(ui.form.paddingBlock, true) * 0.6);
                    }
                  }
                  
                  & input:not(:placeholder-shown),
                  & textarea:not(:placeholder-shown) {
                      padding-block-start: calc(s.padding(ui.form.paddingBlock, true) * 1.4) !important;
                      padding-block-end: calc(s.padding(ui.form.paddingBlock, true) * 0.6) !important;
                  }
                  
                  & > span:has(+ input:not(:placeholder-shown):not([type="checkbox"]):not([type="radio"])),
                  & > span:has(+ textarea:not(:placeholder-shown)) {
                    top: 0;
                    transform: scale(0.6);
                    opacity: 0.8;
                  }

                  [dir="rtl"] &,
                  &[dir="rtl"] {
                    & > *:not(input):not(textarea):not(select) {
                      left: auto;
                      right: s.padding(ui.form.paddingInline);
                      transform-origin: 100% 0;
                    }
                    &:focus,
                    &:focus-within {
                      & > *:not(input):not(textarea):not(select) {
                        left: auto;
                        right: s.padding(ui.form.paddingInline);
                        opacity: 0.8;
                      }
                    }
                    & > input:not(:placeholder-shown):not([type="checkbox"]):not([type="radio"]) + span,
                    & > textarea:not(:placeholder-shown) + span {
                      left: auto;
                      right: s.padding(ui.form.paddingInline);
                      opacity: 0.8;
                    }
                  }

                  & input:not([type="checkbox"]):not([type="radio"]),
                  & select,
                  & textarea {
                    width: 100% !important;
                    margin: 0;
                  }

                  & > .disabled + *,
                  & > [disabled] + * {
                    @s.disabled();
                  }

                `);
            break;
        case 'block':
            vars.push(`
                  display: flex;
                  justify-content: space-between;
                  align-items: initial !important;
                  gap: s.margin(20);
                  flex-direction: column;

                  & input:not([type="checkbox"]):not([type="radio"]),
                  & select,
                  & textarea {
                    width: 100% !important;
                  }
                `);
            break;
        case 'inline':
        default:
            vars.push(`
                  display: flex;
                  justify-content: space-between;
                  gap: s.margin(20);

                  &:not(:has(textarea)) {
                    align-items: center;
                  }

                  &:has(textarea) > span {
                    padding-block-start: s.padding(s.theme(ui.form.paddingBlock));
                  }

                `);
            break;
    }
    vars.push('}');
    // style
    vars.push(`@s.scope 'lnf' {`);
    switch (finalParams.lnf) {
        case 'float':
            vars.push(`

                  & > *:not(input):not(textarea):not(select) {
                    transition: s.theme(ui.label.transition);
                  }

                  & > *:not(input):not(textarea):not(select) {
                    color: s.color(current, text);
                  }

                  & > input:not([type="checkbox"]):not([type="radio"]),
                  & > textarea,
                  & > select {
                    width: 100% !important;
                    transition: s.theme(ui.label.transition);

                    &::placeholder {
                      color: s.color(current, --alpha 0);
                    }
                  }

                  &:focus,
                  &:focus-within {
                    & > input:not([type="checkbox"]):not([type="radio"]),
                    & > textarea,
                    & > select {
                      &::placeholder {
                        color: s.color(current, placeholder);
                      }
                    }
                  }
                  & > input:not(:placeholder-shown):not([type="checkbox"]):not([type="radio"]),
                  & > textarea:not(:placeholder-shown) {
                    &::placeholder {
                      color: s.color(current, placeholder);
                    }
                  }

                `);
            break;
        case 'inline':
        case 'block':
        default:
            break;
    }
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBRUgsTUFBTSwrQkFBZ0MsU0FBUSxxQkFBWTtJQUN0RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUNwQyxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQ3ZEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU0yQyxvREFBUztBQUNyRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsR0FBRyxFQUFFLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUM3QyxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7S0FhVCxDQUFDLENBQUM7SUFFSCxRQUFRLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDckIsS0FBSyxPQUFPO1lBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFrRkwsQ0FBQyxDQUFDO1lBQ1AsTUFBTTtRQUNWLEtBQUssT0FBTztZQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztpQkFZTCxDQUFDLENBQUM7WUFDUCxNQUFNO1FBQ1YsS0FBSyxRQUFRLENBQUM7UUFDZDtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7aUJBYUwsQ0FBQyxDQUFDO1lBQ1AsTUFBTTtLQUNiO0lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLFFBQVE7SUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsUUFBUSxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ3JCLEtBQUssT0FBTztZQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQXNDTCxDQUFDLENBQUM7WUFDUCxNQUFNO1FBQ1YsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLE9BQU8sQ0FBQztRQUNiO1lBQ0ksTUFBTTtLQUNiO0lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUE5TUQsNEJBOE1DIn0=