import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginUiRangeClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            values: ['solid'],
            default: ['solid'],
        },
        defaultStyle: {
            type: 'String',
            values: ['solid'],
            default: __STheme.config('ui.range.defaultStyle'),
        },
    };
}

export interface IPostcssSugarPluginUiRangeClassesParams {
    styles: 'solid'[];
    defaultStyle: 'solid';
}

export { postcssSugarPluginUiRangeClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiRangeClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiRangeClassesParams = {
        styles: ['solid'],
        defaultStyle: 'solid',
        ...params,
    };

    const vars: string[] = [];

    finalParams.styles.forEach((style) => {
        let cls = `s-range`;
        if (style !== finalParams.defaultStyle) {
            cls += `--${style}`;
        }

        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.range
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" range
        * 
        * @example        html
        * <input type="range" class="s-range" min="0" max="100" step="10" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .${cls} {
            @sugar.ui.range($style: ${style});
        }
        `);
    });

    replaceWith(vars);
}
