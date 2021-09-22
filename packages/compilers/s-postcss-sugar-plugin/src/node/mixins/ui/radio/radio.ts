import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiRadioInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['solid'],
            default: __theme().config('ui.range.defaultStyle'),
        },
        scope: {
            type: {
                type: 'Array<String>',
                splitChars: [',', ' '],
            },
            values: ['bare', 'lnf', 'vr'],
            default: ['bare', 'lnf', 'vr'],
        },
    };
}

export interface IPostcssSugarPluginUiRadioParams {
    style: 'solid';
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssSugarPluginUiRadioInterface as interface };
export default function ({
    params,
    atRule,
    applyNoScopes,
    jsObjectToCssProperties,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiRadioParams>;
    atRule: any;
    applyNoScopes: Function;
    jsObjectToCssProperties: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiRadioParams = {
        style: 'solid',
        scope: ['bare', 'lnf', 'vr'],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [
        `
        
`,
    ];

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

    switch (finalParams.style) {
        case 'solid':
            // lnf
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                
                    transition: sugar.theme(ui.radio.transition);
                    border: sugar.theme(ui.radio.borderWidth) solid sugar.color(ui);
                    border-radius: sugar.theme(ui.radio.borderRadius);
                    background-color: transparent;
                    transition: sugar.theme(ui.radio.transition);
                    box-shadow: 0 0 0 0 sugar.color(ui, --alpha 0.2);

                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%; left: 50%;
                        width: 0.4em; height: 0.4em;
                        border-radius: sugar.theme(ui.radio.borderRadius);
                        transform: translate(-50%, -50%);
                        background: sugar.color(ui);
                        opacity: 0;
                        transition: sugar.theme(ui.radio.transition);
                    }
                    label:hover > &:not(:disabled):after,
                    &:hover:not(:disabled):after {
                        opacity: 0.2;
                    }
                    &:checked:not(:disabled):after {
                        opacity: 1 !important;
                    }

                    &:focus:not(:hover):not(:active):not(:disabled) {
                        box-shadow: 0 0 0 sugar.theme(ui.focusOutline.borderWidth) sugar.color(ui, --alpha 0.3);
                    }
 
        `);
            }
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.push(`
            @sugar.rhythm.vertical {
                ${jsObjectToCssProperties(__theme().config('ui.radio.:rhythmVertical'))}
            } 
        `);
    }

    replaceWith(vars);
}
