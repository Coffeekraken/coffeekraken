import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiLoaderClassesClassesInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginUiLoaderClassesParams {}

export { postcssSugarPluginUiLoaderClassesClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiLoaderClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiLoaderClassesParams = {
        ...params,
    };

    const vars: string[] = [];

    vars.push(`/**
        * @name           s-loader:spinner
        * @namespace      sugar.css.ui.range
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">spinner</s-color>" loader
        * 
        * @example        html
        * <div class="s-loader\:spinner"></div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-loader--spinner {
            @sugar.ui.loader.spinner();
        }
        `);

    replaceWith(vars);
}
