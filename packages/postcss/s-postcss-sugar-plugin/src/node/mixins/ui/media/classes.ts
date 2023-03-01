import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          classes
 * @namespace     node.mixin.ui.media
 * @type          PostcssMixin
 * @interface     ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the media classes
 *
 * @param       {('default')[]}                                                [lnfs=['default']]         The lnf(s) you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare','lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @sugar.ui.media.classes
 *
 * @example       css
 * \@sugar.ui.media.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiMediaClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiMediaClassesParams {
    scope: ('bare' | 'lnf')[];
}

export { postcssSugarPluginUiMediaClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiMediaClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiMediaClassesParams = {
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Media
        * @namespace          sugar.style.ui
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
        * \\@sugar.ui.media.classes;
        * 
        * .my-media {
        *   \@sugar.ui.media;
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

    if (finalParams.scope.includes('bare')) {
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
            @sugar.ui.media($scope: 'bare');
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

            @sugar.lod.wireframe {
                @sugar.wireframe.image;
        
                &:has(.s-media--map) {
                    @sugar.wireframe.image(map);
                }
            }
        
            @sugar.lod (2) {
                background-image: none;
                background-color: none;
                border: none;
                border-radius: 0;
            }

          }
      `,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        vars.comment(
            () => `/**
        * @name           s-media
        * @namespace          sugar.ui.media
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
        .s-media:not(.s-bare) {
            @sugar.ui.media($scope: 'lnf');
        }
    `,
            { type: 'CssClass' },
        );
    }

    return vars;
}
