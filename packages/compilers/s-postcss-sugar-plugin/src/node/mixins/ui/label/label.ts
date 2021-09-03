import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiLabelInterface extends __SInterface {
    static definition = {
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
}

export interface IPostcssSugarPluginUiLabelParams {
    style: 'inline' | 'float';
    scope: ('bare' | 'lnf')[];
}

export { postcssSugarPluginUiLabelInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiLabelParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiLabelParams = {
        style: __theme().config('ui.label.defaultStyle'),
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
          width: 100%;
          cursor: pointer;
          font-size: sugar.scalable(1rem);
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
                  --top: sugar.theme(ui.form.paddingBlock);
                  --left: sugar.theme(ui.form.paddingInline);

                  & > *:not(input):not(textarea):not(select) {
                    top: calc(var(--top) + 0.6em + var(--delta));
                    left: 0;
                    padding-inline: sugar.scalable(sugar.theme(ui.form.paddingInline));
                    position: absolute;
                    z-index: 1;
                    transition: sugar.theme(ui.label.transition);
                    transform: scale(1);
                    transform-origin: 0 0;
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
