import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiLabelInterface extends __SInterface {
}
postcssSugarPluginUiLabelInterface.definition = {
    style: {
        type: 'String',
        values: ['inline', 'float'],
        default: __theme().config('ui.label.defaultStyle'),
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
export { postcssSugarPluginUiLabelInterface as interface };
export default function ({ params, atRule, applyNoScopes, jsObjectToCssProperties, replaceWith, }) {
    const finalParams = Object.assign({ style: __theme().config('ui.label.defaultStyle'), scope: ['bare', 'lnf'] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
          width: 100%;
          font-size: sugar.scalable(1rem);

          > * {
            cursor: pointer;
          }
    `);
    }
    // style
    switch (finalParams.style) {
        case 'float':
            if (finalParams.scope.indexOf('bare') !== -1) {
                vars.push(`
                  display: block;
                  line-height: 1;
                  position: relative;

                  & > *:first-child {
                    margin-inline-start: 0;
                  }

                  --delta: 0.1em;
                  --top: sugar.theme(ui.form.paddingBlock);
                  --left: sugar.theme(ui.form.paddingInline);

                  & > *:not(input):not(textarea):not(select) {
                    top: calc(var(--top) + 0.6em + var(--delta));
                    left: 0;
                    padding-inline: sugar.theme(ui.form.paddingInline);
                    position: absolute;
                    z-index: 1;
                    transform: scale(1);
                    transform-origin: 0 0;
                    user-select: none;
                  }

                  &:focus,
                  &:focus-within {
                    & > *:not(input):not(textarea):not(select) {
                      top: calc(var(--top) + 0.3em);
                      left: 0.3em;
                      transform: scale(0.7);
                    }
                  }
                  & > input:not(:placeholder-shown) + *,
                  & > textarea:not(:placeholder-shown) + * {
                    top: calc(var(--top) + 0.3em);
                    left: 0.3em;
                    transform: scale(0.7);
                  }

                  [dir="rtl"] &,
                  &[dir="rtl"] {
                    & > *:not(input):not(textarea):not(select) {
                      left: auto;
                      right: 0;
                      transform-origin: 100% 0;
                    }
                    &:focus,
                    &:focus-within {
                      & > *:not(input):not(textarea):not(select) {
                        left: auto;
                        right: 0.3em;
                      }
                    }
                    & > input:not(:placeholder-shown) + *,
                    & > textarea:not(:placeholder-shown) + * {
                      left: auto;
                      right: 0.3em;
                    }
                  }

                  & > input,
                  & > textarea,
                  & > select {
                    width: 100%;
                    margin: 0;
                    padding-block-start: calc(sugar.theme(ui.form.paddingBlock, true) + 0.35em + var(--delta));
                    padding-block-end: calc(sugar.theme(ui.form.paddingBlock, true) + 0.35em + var(--delta));
                    
                  }

                  &:focus,
                  &:focus-within {
                    & > input,
                    & > textarea,
                    & > select {
                      padding-block-start: calc(sugar.theme(ui.form.paddingBlock, true) + 0.7em + calc(var(--delta) * 2));
                      padding-block-end: sugar.theme(ui.form.paddingBlock, true);
                    }
                  }
                  & > input:not(:placeholder-shown),
                  & > textarea:not(:placeholder-shown) {
                    padding-block-start: calc(sugar.theme(ui.form.paddingBlock, true) + 0.7em + calc(var(--delta) * 2));
                    padding-block-end: sugar.theme(ui.form.paddingBlock, true);
                  }
                `);
            }
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                  
                  & > *:not(input):not(textarea):not(select) {
                    transition: sugar.theme(ui.label.transition);
                  }

                  & > input,
                  & > textarea,
                  & > select {
                    transition: sugar.theme(ui.label.transition);

                    &::placeholder {
                      color: sugar.color(current, --alpha 0);
                    }
                  }

                  &:focus,
                  &:focus-within {
                    & > input,
                    & > textarea,
                    & > select {
                      &::placeholder {
                        color: sugar.color(current, placeholder);
                      }
                    }
                  }
                  & > input:not(:placeholder-shown),
                  & > textarea:not(:placeholder-shown) {
                    &::placeholder {
                      color: sugar.color(current, placeholder);
                    }
                  }

                `);
            }
            break;
        case 'inline':
        default:
            if (finalParams.scope.indexOf('bare') !== -1) {
                vars.push(`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;    

                  & > *:first-child {
                    order: 2;
                    margin-inline-start: sugar.margin(20);
                  }

                `);
            }
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                
                `);
            }
            break;
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7O0FBQ2xELDZDQUFVLEdBQUc7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO1FBQzNCLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7S0FDckQ7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQ3pCO1FBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO0tBQzNCO0NBQ0osQ0FBQztBQVFOLE9BQU8sRUFBRSxrQ0FBa0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUMzRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUNiLHVCQUF1QixFQUN2QixXQUFXLEdBT2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxFQUNoRCxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBQ0YsV0FBVyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXJELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0tBT2IsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxRQUFRO0lBQ1IsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3ZCLEtBQUssT0FBTztZQUNSLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFvRlQsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBaUNULENBQUMsQ0FBQzthQUNOO1lBQ0QsTUFBTTtRQUNWLEtBQUssUUFBUSxDQUFDO1FBQ2Q7WUFDSSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7O2lCQVVULENBQUMsQ0FBQzthQUNOO1lBQ0QsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7aUJBRVQsQ0FBQyxDQUFDO2FBQ047WUFDRCxNQUFNO0tBQ2I7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9