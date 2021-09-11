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
            type: 'String',
            values: ['bare', 'lnf'],
            default: ['bare', 'lnf'],
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
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFormSelectParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFormSelectParams = {
        style: 'solid',
        scope: [],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
          position: relative;
          -webkit-appearance: none;
          appearance: none;
          line-height: 1;
          outline: 0;
      `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
                @sugar.ui.base(select);
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

                `);

                break;
        }
    }

    replaceWith(vars);
}
