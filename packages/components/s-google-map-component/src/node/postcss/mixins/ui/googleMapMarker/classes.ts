import __SInterface from '@coffeekraken/s-interface';

class postcssUiGoogleMapMarkerClassesInterface extends __SInterface {
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

export interface IPostcssUiGoogleMapClassesParams {
    scope: ('bare' | 'lnf')[];
}

export { postcssUiGoogleMapMarkerClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.googleMapMarker
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 * 
 * This mixin represent a google map marker
 *
 * @snippet      @sugar.ui.googleMapMarker.classes($1);
 *
 * @example        css
 * \@sugar.ui.googleMapMarker.classes;
 * 
 * @since    2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssUiGoogleMapClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiGoogleMapClassesParams = {
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
        .s-google-map-marker {
            @sugar.ui.googleMapMarker($scope: bare);
        }
    `,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        vars.comment(
            `/**
            * @name          .s-google-map[lnf="default"] .s-google-map-marker
            * @namespace          sugar.style.ui.googleMapMarker
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> google map marker
            * 
            * @example        html
            * <s-google-map>
            *   <s-google-map-marker lat="10" lng="9">
            *       <div class="s-google-map-marker">
            *          <div class="s-google-map-marker_icon">
            *               <i class="fa-solid fa-location-dot"></i>
            *           </div>
            *           <div class="s-google-map-marker_content">
            *               <h3>Hello world...</h3>
            *           </div>
            *       </div>
            *   </s-google-map-marker>
            * </s-google-map>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-google-map[lnf="default"]:not(.s-bare) .s-google-map-marker:not(.s-bare) {
                @sugar.ui.googleMapMarker($scope: lnf);
            }`,
            {
                type: 'CssClass',
            },
        );
    }

    return vars;
}
