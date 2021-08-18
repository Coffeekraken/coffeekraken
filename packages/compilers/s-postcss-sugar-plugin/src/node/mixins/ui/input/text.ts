import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import sugar from '@coffeekraken/s-sugar-config';

class postcssSugarPluginUiFormInputInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['default'],
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
    style: 'default';
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

    // switch (finalParams.style) {
    //   default:
    //     break;
    // }

    replaceWith(vars);
}
