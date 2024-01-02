import __SInterface from '@coffeekraken/s-interface';

class postcssUiGoogleMapMarkerClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiGoogleMapClassesParams {}

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
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet      @s.ui.googleMapMarker.classes($1);
 *
 * @example        css
 * \@s.ui.googleMapMarker.classes;
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
        ...params,
    };

    const vars = new CssVars();

    vars.code(`@s.scope 'bare' {`);
    vars.code(
        `
        .s-google-map-marker {
            @s.scope.only 'bare' {
                @s.ui.googleMapMarker;
            }
        }
    `,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    vars.code(`@s.scope 'lnf' {`);
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
            .s-google-map[lnf="default"] .s-google-map-marker {
                @s.scope.only 'lnf' {
                    @s.ui.googleMapMarker;
                }
            }`,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    return vars;
}
