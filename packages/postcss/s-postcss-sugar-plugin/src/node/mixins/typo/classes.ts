import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name           classes
 * @as              @s.typo.classes
 * @namespace      node.mixin.typo
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the typo helper classes like s-typo:h1, s-typo:p, and all the typo
 * elements that are defined in the config.theme.typo configuration stack.
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.typo.classes
 *
 * @example        css
 * @s.typo.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginTypoClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginTypoClassesParams {}

export { postcssSugarPluginTypoClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginTypoClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginTypoClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    const typosObj = __STheme.get('typo');

    vars.comment(
        () => `
      /**
        * @name          Typo
        * @namespace          sugar.style.helpers.typo
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/typography
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply basic typo styles like \`sub\`, \`strong\`, etc... on any HTMLElement
        * These styles are defined in the \`theme.typo\` theme settings.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.typo.classes;
        * 
        ${Object.keys(typosObj)
            .map((typoName) => {
                return ` * @cssClass            s-typo:${typoName}          Apply the \`${typoName}\` style`;
            })
            .join('\n')}
        * @cssClass             s-format:text           Format automatically child tags like \`strong\` to the \`s-typo:string\` style
        * @cssClass             s-rhythm:vertical           Apply the vertical rhythm to all direct child tags
        *
         ${Object.keys(typosObj)
             .map((typoName) => {
                 return ` * @example        html        ${typoName}
            *   <${typoName} class="s-typo:${typoName}">
            *       ${__faker.name.findName()}
            *   </${typoName}>
            * `;
             })
             .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    Object.keys(typosObj).forEach((typoName) => {
        const typoObj = typosObj[typoName];
        const cls = `s-typo:${typoName}`;

        const css = __STheme.jsObjectToCssProperties(typoObj.style ?? {}, {});

        vars.comment(
            () => `/**
            * @name            ${cls}
            * @namespace          sugar.style.helpers.typo
            * @type             CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the "<yellow>${typoName}</yellow>" typography style to any HTMLElement
            * 
            * @example      html
            * <span class="${cls.replace(':', ':')}">Something cool</span>
            * 
            * @since        2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `,
        ).code(
            `
        .${cls.replace(':', '-')} {
                ${css}
        }`,
            { type: 'CssClass' },
        );

        vars.comment(
            () => `/**
            * @name            s-format:text ${typoName}
            * @namespace          sugar.style.helpers.typo
            * @type             CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the "<yellow>${typoName}</yellow>" typography style to any ${typoName} tag in the .s-format:text scope
            * 
            * @example      html
            * <div class="s-format\:text">
            *   <${typoName}>Something cool</${typoName}>
            * 
            * @since        2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `,
        ).code(
            `
        @s.format.text {
            ${typoName} {
                ${css}
            }
        }`,
            { type: 'CssClass' },
        );

        vars.comment(
            () => `/**
            * @name            s-rhythm:vertical .${typoName}, s-rhythm:vertical ${typoName}
            * @namespace          sugar.style.helpers.typo
            * @type             CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the "<yellow>${typoName}</yellow>" typography style to any ${typoName} tag in the .s-format:text scope
            * 
            * @feature          Vertical rhythm
            * 
            * @example      html
            * <div class="s-format\:text">
            *   <${typoName}>Something cool</${typoName}>
            * 
            * @since        2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `,
        ).code(
            `
        @s.rhythm.vertical {
            ${typoName}, .${typoName} {
                ${__STheme.jsObjectToCssProperties(
                    typoObj.rhythmVertical ?? {},
                )}
            }
        }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
