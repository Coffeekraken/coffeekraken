import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          label
 * @namespace     node.mixin.ui.label
 * @type               PostcssMixin
 * @interface     ./label          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the label style to any element
 *
 * @param       {'inline'|'block'|'float'}                           [style='theme.ui.label.defaultStyle']         The style you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-label {
 *    @sugar.ui.label;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiLabelInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['inline', 'block', 'float'],
                default: __STheme.get('ui.label.defaultStyle'),
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
export { postcssSugarPluginUiLabelInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: __STheme.get('ui.label.defaultStyle'), scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
          width: 100%;
          font-size: sugar.font.size(30);
          display: flex;

          > span {
            order: -1;
          }

          > * {
            cursor: pointer;
          }
    `);
        switch (finalParams.style) {
            case 'float':
                vars.push(`
                  display: block;
                  position: relative;

                  & > span {
                    margin-inline-start: 0;
                  }

                  & input:not([type="checkbox"]):not([type="radio"]),
                  & textarea {
                    padding-block: calc(sugar.padding(ui.form.paddingBlock) * 1.5);
                  }

                  & > span {
                    top: 0;
                    line-height: initial;
                    left: sugar.padding(ui.form.paddingInline);
                    padding-block: calc(sugar.padding(ui.form.paddingBlock) * 1.2);
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
                      left: sugar.padding(ui.form.paddingInline);
                      transform: scale(0.6);
                      opacity: 0.8;
                    }
                    & input:not([type="checkbox"]):not([type="radio"]),
                    & textarea {
                      padding-block-start: calc(sugar.padding(ui.form.paddingBlock, true) * 1.5 * 1.2);
                      padding-block-end: calc(sugar.padding(ui.form.paddingBlock, true) * 1.5 * 0.8);
                    }
                  }
                  
                  & input:not(:placeholder-shown),
                  & textarea:not(:placeholder-shown) {
                      padding-block-start: calc(sugar.padding(ui.form.paddingBlock, true) * 1.5 * 1.2) !important;
                      padding-block-end: calc(sugar.padding(ui.form.paddingBlock, true) * 1.5 * 0.8) !important;
                  }
                  
                  & input:not(:placeholder-shown):not([type="checkbox"]):not([type="radio"]) + span,
                  & textarea:not(:placeholder-shown) + span {
                    top: 0;
                    left: sugar.padding(ui.form.paddingInline);
                    transform: scale(0.6);
                    opacity: 0.8;
                  }

                  [dir="rtl"] &,
                  &[dir="rtl"] {
                    & > *:not(input):not(textarea):not(select) {
                      left: auto;
                      right: sugar.padding(ui.form.paddingInline);
                      transform-origin: 100% 0;
                    }
                    &:focus,
                    &:focus-within {
                      & > *:not(input):not(textarea):not(select) {
                        left: auto;
                        right: sugar.padding(ui.form.paddingInline);
                        opacity: 0.8;
                      }
                    }
                    & > input:not(:placeholder-shown):not([type="checkbox"]):not([type="radio"]) + span,
                    & > textarea:not(:placeholder-shown) + span {
                      left: auto;
                      right: sugar.padding(ui.form.paddingInline);
                      opacity: 0.8;
                    }
                  }

                  & input:not([type="checkbox"]):not([type="radio"]),
                  & textarea {
                    width: 100%;
                    margin: 0;
                  }

                  & > .disabled + *,
                  & > [disabled] + * {
                    @sugar.disabled();
                  }

                `);
                break;
            case 'block':
                vars.push(`
                  display: flex;
                  justify-content: space-between;
                  gap: sugar.margin(20);
                  flex-direction: column;
                  
                  & input:not([type="checkbox"]):not([type="radio"]),
                  & select,
                  & textarea {
                    width: 100%;
                  }
                `);
                break;
            case 'inline':
            default:
                vars.push(`
                  display: flex;
                  justify-content: space-between;
                  gap: sugar.margin(20);

                  > span {
                    padding-block-start: sugar.padding(sugar.theme(ui.form.paddingBlock));
                  }

                `);
                break;
        }
    }
    // style
    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'float':
                vars.push(`
                  
                  & > *:not(input):not(textarea):not(select) {
                    transition: sugar.theme(ui.label.transition);
                  }

                  & > *:not(input):not(textarea):not(select) {
                    color: sugar.color(current, text);
                  }

                  & > input:not([type="checkbox"]):not([type="radio"]),
                  & > textarea,
                  & > select {
                    transition: sugar.theme(ui.label.transition);

                    &::placeholder {
                      color: sugar.color(current, --alpha 0);
                    }
                  }

                  &:focus,
                  &:focus-within {
                    & > input:not([type="checkbox"]):not([type="radio"]),
                    & > textarea,
                    & > select {
                      &::placeholder {
                        color: sugar.color(current, placeholder);
                      }
                    }
                  }
                  & > input:not(:placeholder-shown):not([type="checkbox"]):not([type="radio"]),
                  & > textarea:not(:placeholder-shown) {
                    &::placeholder {
                      color: sugar.color(current, placeholder);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7SUFDekQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDcEMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDakQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9ELE9BQU8sRUFBRSxrQ0FBa0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUMzRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEVBQzVDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O0tBWWIsQ0FBQyxDQUFDO1FBRUMsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQXdGVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OztpQkFXVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssUUFBUSxDQUFDO1lBQ2Q7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O2lCQVNULENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ2I7S0FDSjtJQUVELFFBQVE7SUFDUixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLE9BQU87Z0JBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFxQ1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssT0FBTyxDQUFDO1lBQ2I7Z0JBQ0ksTUFBTTtTQUNiO0tBQ0o7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=