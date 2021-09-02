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
        type: 'Array<String>',
        values: ['bare', 'lnf'],
        default: ['bare', 'lnf'],
    },
};
export { postcssSugarPluginUiLabelInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: __theme().config('ui.label.defaultStyle'), scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
          width: 100%;
          cursor: pointer;
          font-size: 1rem;
    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
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

                  --delta: 0.1em;

                  & > *:not(input):not(textarea):not(select) {
                    --top: sugar.theme(ui.form.paddingBlock);
                    top: calc(var(--top) + 0.6em + var(--delta));
                    --left: sugar.theme(ui.form.paddingInline);
                    left: calc(var(--left) + 0.2em);
                    position: absolute;
                    z-index: 1;
                    transition: sugar.theme(ui.label.transition);
                  }

                  &:focus,
                  &:focus-within {
                    & > *:not(input):not(textarea):not(select) {
                      --top: sugar.theme(ui.form.paddingBlock);
                      top: calc(var(--top) + 0.3em);
                      --left: sugar.theme(ui.form.paddingInline);
                      left: calc(var(--left) + 0.3em);
                      font-size: 0.7em;
                    }
                  }
                  & > input:not(:placeholder-shown) + *,
                  & > textarea:not(:placeholder-shown) + * {
                    --top: sugar.theme(ui.form.paddingBlock);
                    top: calc(var(--top) + 0.3em);
                    --left: sugar.theme(ui.form.paddingInline);
                    left: calc(var(--left) + 0.3em);
                    font-size: 0.7em;
                  }

                  & > input,
                  & > textarea,
                  & > select {
                    width: 100%;
                    margin: 0;
                    padding-block-start: calc(sugar.theme(ui.form.paddingBlock) + 0.35em + var(--delta));
                    padding-block-end: calc(sugar.theme(ui.form.paddingBlock) + 0.35em + var(--delta));
                    transition: sugar.theme(ui.label.transition);

                    &::placeholder {
                      color: sugar.color(ui, --alpha 0);
                    }
                  }

                  &:focus,
                  &:focus-within {
                    & > input,
                    & > textarea,
                    & > select {
                      padding-block-start: calc(sugar.theme(ui.form.paddingBlock) + 0.7em + calc(var(--delta) * 2));
                      padding-block-end: sugar.theme(ui.form.paddingBlock);

                      &::placeholder {
                        color: sugar.color(ui, placeholder);
                      }
                    }
                  }
                  & > input:not(:placeholder-shown),
                  & > textarea:not(:placeholder-shown) {
                    padding-block-start: calc(sugar.theme(ui.form.paddingBlock) + 0.7em + calc(var(--delta) * 2));
                    padding-block-end: sugar.theme(ui.form.paddingBlock);

                    &::placeholder {
                      color: sugar.color(ui, placeholder);
                    }
                  }

                `);
            }
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`


                  & > *:not(input):not(textarea):not(select) {
                    color: sugar.color(ui, placeholder);
                    transition: sugar.theme(ui.label.transition);
                  }

                  &:focus,
                  &:focus-within {
                    & > *:not(input):not(textarea):not(select) {
                      color: sugar.color(ui) !important;
                    }
                  }

                  & > input,
                  & > textarea,
                  & > select {
                    transition: sugar.theme(ui.label.transition);

                    &::placeholder {
                      color: sugar.color(ui, --alpha 0);
                    }
                  }

                  &:focus,
                  &:focus-within {
                    & > input,
                    & > textarea,
                    & > select {
                      &::placeholder {
                        color: sugar.color(ui, placeholder);
                      }
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

                  & > input:first-child,
                  & > select:first-child,
                  & > textarea:first-child {
                    order: 2;
                  }

                  & > input,
                  & > textarea,
                  & > select {
                    margin-inline-start: sugar.margin(20);
                  }

                `);
            }
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                  color: sugar.color(ui, text);
                `);
            }
            break;
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7O0FBQ2xELDZDQUFVLEdBQUc7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO1FBQzNCLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7S0FDckQ7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsZUFBZTtRQUNyQixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7S0FDM0I7Q0FDSixDQUFDO0FBUU4sT0FBTyxFQUFFLGtDQUFrQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzNELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxFQUNoRCxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJYixDQUFDLENBQUM7S0FDRjtJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDYixDQUFDLENBQUM7S0FDRjtJQUVELFFBQVE7SUFDUixRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDdkIsS0FBSyxPQUFPO1lBQ1IsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkF5RVQsQ0FBQyxDQUFDO2FBQ047WUFDRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFtQ1QsQ0FBQyxDQUFDO2FBQ047WUFDRCxNQUFNO1FBQ1YsS0FBSyxRQUFRLENBQUM7UUFDZDtZQUNJLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQWlCVCxDQUFDLENBQUM7YUFDTjtZQUNELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7O2lCQUVULENBQUMsQ0FBQzthQUNOO1lBQ0QsTUFBTTtLQUNiO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==