import __SInterface from '@coffeekraken/s-interface';
import { __camelCase } from '@coffeekraken/sugar/string';

/**
 * @name          classes
 * @as              @s.ui.loader.classes
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
 * @snippet         @s.ui.loader.classes
 *
 * @example     css
 * @s.ui.loader.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiLoaderClassesClassesInterface extends __SInterface {
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

export interface ISSugarcssPluginUiLoaderClassesParams {
    loaders: ('spinner' | 'round' | 'drop' | 'square-dots')[];
}

export { SSugarcssPluginUiLoaderClassesClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiLoaderClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiLoaderClassesParams = {
        loaders: ['spinner', 'round', 'drop', 'square-dots'],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Loader
        * @namespace          sugar.style.ui.loader
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
        * @install          css
        * @s.ui.loader.classes;
        * 
        * .my-loader {
        *   @s.ui.loader;
        * }
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
            * @namespace          sugar.style.ui.loader
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
            .s-loader-${loaderName} {
                @s.lod.prevent {
                    @s.ui.loader.${__camelCase(loaderName)}();
                }
            }
            `,
            {
                type: 'CssClass',
            },
        );
    });

    return vars;
}
