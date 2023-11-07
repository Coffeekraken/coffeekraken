import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
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
class SSugarcssPluginUiLabelInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['inline', 'block', 'float'],
                default: __STheme.get('ui.label.defaultLnf'),
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
export { SSugarcssPluginUiLabelInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: __STheme.get('ui.label.defaultLnf'), scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
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
    }
    // style
    if (finalParams.scope.indexOf('lnf') !== -1) {
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
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLCtCQUFnQyxTQUFRLFlBQVk7SUFDdEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDcEMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDL0M7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9ELE9BQU8sRUFBRSwrQkFBK0IsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUN4RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEVBQ3hDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjYixDQUFDLENBQUM7UUFFQyxRQUFRLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDckIsS0FBSyxPQUFPO2dCQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBa0ZULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxPQUFPO2dCQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztpQkFZVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssUUFBUSxDQUFDO1lBQ2Q7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztpQkFhVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNiO0tBQ0o7SUFFRCxRQUFRO0lBQ1IsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxRQUFRLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDckIsS0FBSyxPQUFPO2dCQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQXNDVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxNQUFNO1NBQ2I7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==