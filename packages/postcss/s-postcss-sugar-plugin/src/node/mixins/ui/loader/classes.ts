import __SInterface from '@coffeekraken/s-interface';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';

/**
 * @name          classes
 * @namespace     node.mixin.ui.loader
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the loader classes
 *
 * @param       {('spinner'|'round'|'drop'|'square-dots')}                [loaders=['spinner','round','drop','square-dots']]         The loader(s) you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.loader.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiLoaderClassesClassesInterface extends __SInterface {
    static get _definition() {
        return {
            loaders: {
                description: 'Specify the loaders you want to generate',
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['spinner', 'round', 'drop', 'square-dots'],
                default: ['spinner', 'round', 'drop', 'square-dots'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiLoaderClassesParams {
    loaders: ('spinner' | 'round' | 'drop' | 'square-dots')[];
}

export { postcssSugarPluginUiLoaderClassesClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiLoaderClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiLoaderClassesParams = {
        loaders: ['spinner', 'round', 'drop', 'square-dots'],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Loaders
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/loaders
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply loader styles like "spinner", and more to come...
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.loaders
            .map(
                (loaderName) => `
            * @cssClass         s-loader:${loaderName}            Display a ${loaderName} loader
        `,
            )
            .join('\n')}
        * 
        ${finalParams.loaders
            .map(
                (loaderName) => `
            * @example        html      ${loaderName} loader
            *   <div class="s-grid:5">
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20"></div>
            *       </div>
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20 s-color:accent"></div>
            *       </div>
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20 s-color:complementary"></div>
            *       </div>
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20 s-color:info"></div>
            *       </div>
            *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
            *           <div class="s-loader:${loaderName} s-scale:20 s-color:error"></div>
            *       </div>
            *   </div>
        `,
            )
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    finalParams.loaders.forEach((loaderName) => {
        vars.comment(
            () => `/**
            * @name           s-loader:${loaderName}
            * @namespace          sugar.style.ui.range
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${loaderName}</s-color>" loader
            * 
            * @example        html
            * <div class="s-loader:${loaderName}"></div>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
        `,
        ).code(
            `
            .s-loader--${loaderName} {
                @sugar.ui.loader.${__camelCase(loaderName)}();
            }
            `,
            {
                type: 'CssClass',
            },
        );
    });

    return vars;
}
