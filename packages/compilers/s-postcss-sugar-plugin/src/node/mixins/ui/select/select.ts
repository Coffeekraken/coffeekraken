import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import sugar from '@coffeekraken/s-sugar-config';

class postcssSugarPluginUiFormSelectInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['solid'],
            default: __theme().config('ui.select.defaultStyle'),
        },
        scope: {
            type: {
                type: 'Array<String>',
                splitChars: [',', ' '],
            },
            values: ['bare', 'lnf', 'vr', 'tf'],
            default: ['bare', 'lnf', 'vr', 'tf'],
        },
    };
}

export interface IPostcssSugarPluginUiFormSelectParams {
    style: 'solid';
    scope: string[];
}

export { postcssSugarPluginUiFormSelectInterface as interface };

export default function ({
    params,
    atRule,
    applyNoScopes,
    jsObjectToCssProperties,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFormSelectParams>;
    atRule: any;
    applyNoScopes: Function;
    jsObjectToCssProperties: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFormSelectParams = {
        style: 'solid',
        scope: [],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            @sugar.ui.base(select, $scope: bare);
          position: relative;
          -webkit-appearance: none;
          appearance: none;
          line-height: 1;
          outline: 0;
      `);
    }

    switch (finalParams.style) {
        case 'solid':
        default:
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                @sugar.ui.base(select, $scope: lnf);
                overflow: hidden;

                &[multiple] option:checked,
                &[multiple] option[selected] {
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    appearance: none;
                    background: sugar.color(ui, --alpha 0.5);
                    color: sugar.color(ui, foreground);
                }
                &[multiple]:focus option:checked,
                &[multiple]:focus option[selected] {
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    appearance: none;
                    background: sugar.color(ui);
                    color: sugar.color(ui, foreground);
                }

                &:not([multiple]) {
                    padding-inline-end: calc(sugar.scalable(sugar.theme(ui.select.paddingInline)) + 1.5em);

                    --padding-inline: sugar.theme(ui.select.paddingInline);

                    background-repeat: no-repeat;
                    background-image: linear-gradient(45deg, transparent 50%, sugar.color(ui) 50%), linear-gradient(135deg, sugar.color(ui) 50%, transparent 50%);
                    background-position: right calc(sugar.scalable(var(--padding-inline)) + sugar.scalable(5px)) top 50%, right sugar.scalable(var(--padding-inline)) top 50%;
                    background-size: sugar.scalable(5px) sugar.scalable(5px), sugar.scalable(5px) sugar.scalable(5px);
                
                    [dir="rtl"] &,
                    &[dir="rtl"] {
                    background-position: left sugar.scalable(var(--padding-inline)) top 50%, left calc(sugar.scalable(var(--padding-inline)) + sugar.scalable(5px)) top 50%;
                    }
                }

                `);

                break;
            }
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.push(`
            @sugar.rhythm.vertical {
                ${jsObjectToCssProperties(__theme().config('ui.select.:rhythmVertical'))}
            } 
        `);
    }

    replaceWith(vars);
}
