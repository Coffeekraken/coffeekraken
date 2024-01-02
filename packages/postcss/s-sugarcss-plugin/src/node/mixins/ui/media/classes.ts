import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          classes
 * @as              @s.ui.media.classes
 * @namespace     node.mixin.ui.media
 * @type          PostcssMixin
 * @interface     ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the media classes
 *
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.media.classes
 *
 * @example       css
 * @s.ui.media.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiMediaClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginUiMediaClassesParams {}

export { SSugarcssPluginUiMediaClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiMediaClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiMediaClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Media
        * @namespace          sugar.style.ui.media
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/media
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some media style around any image.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @install          css
        * @s.ui.media.classes;
        * 
        * .my-media {
        *   @s.ui.media;
        * }
        * 
        * @cssClass             s-media                Apply the media style
        * @cssClass             s-media-container       Apply on the HTMLElement that contains a media
        * 
        * @example        html         Default
        * <figure class="s-media-container">
        *   <img class="s-media" src="https://picsum.photos/1600/900?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </figure>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.code(`@s.scope 'bare' {`);
    vars.comment(
        () => `/**
          * @name           s-media
          * @namespace          sugar.style.ui.media
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">bare</s-color>" media
          * 
          * @example        html
          * <figure class="s-media-container">
          *   <img class="s-media" src="https://picsum.photos/1600/900?v=${Math.round(
              Math.random() * 99999,
          )}" />
          * </figure>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
    ).code(
        `
          .s-media {
            @s.scope.only 'bare' {
                @s.ui.media;
            }
          }
      `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
          * @name           s-media-container
          * @namespace          sugar.style.ui.media
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">bare</s-color>" media container
          * 
          * @example        html
          * <figure class="s-media-container">
          *   <img class="s-media" src="https://picsum.photos/1600/900?v=${Math.round(
              Math.random() * 99999,
          )}" />
          * </figure>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
    ).code(
        `
          .s-media-container {
          }
      `,
        { type: 'CssClass' },
    );
    vars.code('}');

    vars.code(`@s.scope 'lnf' {`);
    vars.comment(
        () => `/**
        * @name           s-media
        * @namespace          sugar.style.ui.media
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">default</s-color>" media
        * 
        * @example        html
        * <figure class="s-media-container">
        *   <img class="s-media" src="https://picsum.photos/1600/900?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </figure>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    ).code(
        `
        .s-media {
            @s.scope.only 'lnf' {
                @s.ui.media;
            }
        }
    `,
        { type: 'CssClass' },
    );
    vars.code('}');

    return vars;
}
