import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiSpecsEditorClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiSpecsEditorClassesParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
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
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       behavior        Behavior css
 * @scope       vr              Vertical rhythm css
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
        ...params,
    };

    const vars = new CssVars();

    vars.code(`@s.scope 'bare' {`);
    vars.code(
        `
        .s-specs-editor {
            @s.scope.only 'bare' {
                @s.ui.specsEditor;
            }
        }
    `,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    if (finalParams.lnfs.includes(finalParams.defaultLnf)) {
        vars.code(`@s.scope 'lnf' {`);
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
            .s-specs-editor[lnf="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.specsEditor($lnf: ${finalParams.defaultLnf});
                }
            }
            `,
            {
                type: 'CssClass',
            },
        );
        vars.code('}');
    }

    if (finalParams.lnfs.includes(finalParams.defaultLnf)) {
        vars.code(`@s.scope 'behavior' {`);
        vars.code(
            `
            .s-specs-editor[behavior="default"] {
                @s.scope.only 'behavior' {
                    @s.ui.specsEditor($lnf: ${finalParams.defaultLnf});
                }
            }`,
            {
                type: 'CssClass',
            },
        );
        vars.code('}');
    }

    vars.code(`@s.scope 'vr' {`);
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
    vars.code('}');

    return vars;
}
