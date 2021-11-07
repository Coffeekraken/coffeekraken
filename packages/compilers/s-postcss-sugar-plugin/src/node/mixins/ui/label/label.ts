import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginUiLabelInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                style: {
                    type: 'String',
                    values: ['inline', 'float'],
                    default: __STheme.config('ui.label.defaultStyle'),
                },
                scope: {
                    type: {
                        type: 'Array<String>',
                        splitChars: [',', ' '],
                    },
                    values: ['bare', 'lnf'],
                    default: ['bare', 'lnf'],
                },
            })
        );
    }
}

export interface IPostcssSugarPluginUiLabelParams {
    style: 'inline' | 'float';
    scope: ('bare' | 'lnf')[];
}

export { postcssSugarPluginUiLabelInterface as interface };
export default function ({
    params,
    atRule,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiLabelParams>;
    atRule: any;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiLabelParams = {
        style: __STheme.config('ui.label.defaultStyle'),
        scope: ['bare', 'lnf'],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

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

    return vars;
}
