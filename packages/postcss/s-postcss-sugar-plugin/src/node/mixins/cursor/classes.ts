import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @as              @s.cursor.classes
 * @namespace      node.mixin.cursor
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the cusros helper classes like `.s-cursor:pointer` etc...
 *
 * @feature         Support these values (for now): none, all, auto and fill
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.cursor.classes
 *
 * @example        css
 * @s.cursor.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginCursorClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginCursorClassesParams {}

export { postcssSugarPluginCursorClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginCursorClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginCursorClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    const cursors = [
        'auto',
        'default',
        'none',
        'context-menu',
        'help',
        'pointer',
        'progress',
        'wait',
        'cell',
        'crosshair',
        'text',
        'vertical-text',
        'alias',
        'copy',
        'move',
        'no-drop',
        'not-allowed',
        'e-resize',
        'n-resize',
        'ne-resize',
        'nw-resize',
        's-resize',
        'se-resize',
        'sw-resize',
        'w-resize',
        'ew-resize',
        'ns-resize',
        'nesw-resize',
        'nwse-resize',
        'col-resize',
        'row-resize',
        'all-scroll',
        'zoom-in',
        'zoom-out',
        'grab',
        'grabbing',
    ];

    vars.comment(
        () => `
      /**
        * @name          Cursor
        * @namespace          sugar.style.helpers.cursor
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/cursor
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply a specific cursor on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.cursor.classes; 
        * 
        ${cursors
            .map((cursor) => {
                return ` * @cssClass     s-cursor:${cursor}            Apply the ${cursor} cursor`;
            })
            .join('\n')}
        * 
        * @example         html
        * <div class="s-flex:wrap s-gap:20">
        ${cursors
            .map((cursor) => {
                return ` *   <div class="s-cursor:${cursor} s-flex:center s-width:20 s-radius s-ratio:16-9">
                    ${cursor}
        *   </div>
            * `;
            })
            .join('\n')}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    cursors.forEach(
        (cursor) => {
            vars.comment(
                () => `/**
        * @name          s-cursor:${cursor}
        * @namespace          sugar.style.helpers.cursor
        * @type               CssClass
        * @platform             css
        * @status             stable
        * 
        * This class allows you to apply a "<yellow>${cursor}</yellow>" cursor style to any HTMLElement
        * 
        * @example        html
        * <div class="s-cursor:${cursor}">
        *   Hover me!
        * </div>
        * 
        * @since         2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
            ).code(`
        .s-cursor-${cursor} {
            cursor: ${cursor};
        }`);
        },
        { type: 'CssClass' },
    );

    return vars;
}
