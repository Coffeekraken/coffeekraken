import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginUiLoaderClassesClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginUiLoaderClassesParams {}

export { postcssSugarPluginUiLoaderClassesClassesInterface as interface };

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/spinner.js`],
    };
}

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
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Loaders
        * @namespace          sugar.css.ui
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
        * @cssClass         s-loader:spinner            Display a spinner loader
        * 
        * @example        html
        * <!-- Spinner -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Spinner</h3>
        *   <div class="s-grid:5">
        *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *           <div class="s-loader:spinner"></div>
        *       </div>
        *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *           <div class="s-loader:spinner s-color:accent"></div>
        *       </div>
        *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *           <div class="s-loader:spinner s-color:complementary"></div>
        *       </div>
        *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *           <div class="s-loader:spinner s-color:info"></div>
        *       </div>
        *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *           <div class="s-loader:spinner s-color:error"></div>
        *       </div>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
    );

    vars.comment(
        () => `/**
        * @name           s-loader:spinner
        * @namespace      sugar.css.ui.range
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">spinner</s-color>" loader
        * 
        * @example        html
        * <div class="s-loader:spinner"></div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     `,
    ).code(`
        .s-loader--spinner {
            @sugar.ui.loader.spinner();
        }
        `);

    return vars;
}
