import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiRatingClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr'],
                default: ['bare', 'lnf', 'vr'],
            },
        };
    }
}

export interface IPostcssUiRatingClassesParams {
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssUiRatingClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.rating
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent rating
 *
 * @snippet      @s.ui.rating.classes($1);
 *
 * @example        css
 * \@s.ui.rating.classes;
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
    params: Partial<IPostcssUiRatingClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiRatingClassesParams = {
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
        .s-rating {
            @s.ui.rating($scope: bare);
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
            * @name          .s-rating[lnf="default"]
            * @namespace          sugar.style.ui.rating
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> rating
            * 
            * @example        html
            * <s-rating></s-rating>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-rating[lnf="default"]:not(.s-bare) {
                @s.ui.rating($scope: lnf);
            }`,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(
            `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.rating
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-rating></s-rating>
            *   <br />
            *   <s-rating></s-rating>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `@s.rhythm.vertical {
                .s-rating {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.rating.rhythmVertical'),
                    )}
                } 
            }
        `,
            {
                type: 'CssClass',
            },
        );
    }

    return vars;
}
