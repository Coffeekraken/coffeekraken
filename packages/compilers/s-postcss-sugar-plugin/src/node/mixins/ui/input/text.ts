import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import sugar from '@coffeekraken/s-sugar-config';

class postcssSugarPluginUiFormInputInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['default', 'underline'],
            default: __theme().config('ui.input.defaultStyle'),
        },
        scope: {
            type: 'String',
            values: ['bare', 'lnf', 'style'],
            default: ['bare', 'lnf', 'style'],
        },
    };
}

export interface IPostcssSugarPluginUiFormInputParams {
    style: 'default' | 'underline';
    scope: string[];
}

export { postcssSugarPluginUiFormInputInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFormInputParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFormInputParams = {
        style: 'default',
        scope: [],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
    @sugar.ui.base(input);
  `);
    }

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        width: 100%;
    `);
    }

    switch (finalParams.style) {
        case 'underline':
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                    background-color: sugar.color(ui, --alpha 0);
                    border-top: none !important;
                    border-left: none !important;
                    border-right: none !important;
                    border-bottom: sugar.color(ui) solid sugar.theme(ui.input.borderWidth) !important;
                    border-radius: 0;
                    padding-inline: 0 !important;

                    &:hover, &:focus {
                        background-color: sugar.color(ui, --alpha 0.1);
                    }
                `);
            }
            break;
        case 'default':
        default:
            break;
    }

    replaceWith(vars);
}
