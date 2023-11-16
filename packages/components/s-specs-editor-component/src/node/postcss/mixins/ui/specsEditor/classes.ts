import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiSpecsEditorClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr', 'behavior'],
                default: ['bare', 'lnf', 'vr', 'behavior'],
            },
        };
    }
}

export interface IPostcssUiSpecsEditorClassesParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
    scope: ('bare' | 'lnf' | 'behavior' | 'vr')[];
}
export { postcssUiSpecsEditorClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.specsEditor
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 * @private
 *
 * This mixin represent a specs editor
 *
 * @snippet      @s.ui.specsEditor.classes($1);
 *
 * @example        css
 * \@s.ui.specsEditor.classes;
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
    params: Partial<IPostcssUiSpecsEditorClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiSpecsEditorClassesParams = {
        lnfs: ['solid'],
        defaultLnf: 'solid',
        scope: ['bare', 'lnf', 'behavior'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
        .s-specs-editor {
            @s.ui.specsEditor($scope: bare);
        }
    `,
            {
                type: 'CssClass',
            },
        );
    }

    if (
        finalParams.lnfs.includes(finalParams.defaultLnf) &&
        finalParams.scope.includes('lnf')
    ) {
        vars.comment(
            `/**
            * @name          .s-specs-editor[lnf="default"]
            * @namespace          sugar.style.ui.specsEditor
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> slider
            * 
            * @example        html
            * <s-slider></s-slider>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-specs-editor[lnf="default"]:not(.s-bare) {
                @s.ui.specsEditor($lnf: ${finalParams.defaultLnf}, $scope: lnf);
            }
            `,
            {
                type: 'CssClass',
            },
        );
    }

    if (
        finalParams.lnfs.includes(finalParams.defaultLnf) &&
        finalParams.scope.includes('behavior')
    ) {
        vars.code(
            `
            .s-specs-editor[behavior="default"] {
                @s.ui.specsEditor($lnf: ${finalParams.defaultLnf}, $scope: behavior);
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
            * @namespace          sugar.style.ui.specsEditor
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-slider></s-slider>
            *   <br />
            *   <s-slider></s-slider>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `@s.rhythm.vertical {
                .s-specs-editor {
                    ${__STheme.current.jsObjectToCssProperties(
                        __STheme.current.get('ui.specsEditor.rhythmVertical'),
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
