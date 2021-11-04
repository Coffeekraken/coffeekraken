import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginUiCheckboxInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['solid'],
            default: __STheme.config('ui.checkbox.defaultStyle'),
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

export interface IPostcssSugarPluginUiCheckboxParams {
    style: 'solid';
    scope: ('bare' | 'lnf')[];
}

export { postcssSugarPluginUiCheckboxInterface as interface };
export default function ({
    params,
    atRule,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiCheckboxParams>;
    atRule: any;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiCheckboxParams = {
        style: 'solid',
        scope: ['bare', 'lnf'],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [
        `
        
`,
    ];

    switch (finalParams.style) {
        case 'solid':
            // bare
            if (finalParams.scope.indexOf('bare') !== -1) {
                vars.push(`
                
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                position: relative;
                width: 1em;
                height: 1em;
                font-size: sugar.scalable(1rem);

                &:disabled {
                    @sugar.disabled;
                }
            `);
            }

            // lnf
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                
                    transition: sugar.theme(ui.checkbox.transition);
                    border: sugar.theme(ui.checkbox.borderWidth) solid sugar.color(current);
                    border-radius: sugar.theme(ui.checkbox.borderRadius);
                    background-color: transparent;
                    transition: sugar.theme(ui.checkbox.transition);
                    box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.2);

                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%; left: 50%;
                        width: 0.4em; height: 0.4em;
                        transform: translate(-50%, -50%);
                        background: sugar.color(current);
                        opacity: 0;
                        transition: sugar.theme(ui.checkbox.transition);
                    }
                    label:hover > &:not(:disabled):after,
                    &:hover:not(:disabled):after {
                        opacity: 0.2;
                    }
                    &:checked:not(:disabled):after {
                        opacity: 1 !important;
                    }

                    &:focus:not(:hover):not(:active):not(:disabled) {
                        box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
                    }
 
        `);
            }
    }

    replaceWith(vars);
}
