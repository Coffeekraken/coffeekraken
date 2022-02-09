import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @namespace      node.mixins.cursor
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the cusros helper classes like `.s-cursor:pointer` etc...
 *
 * @feature         Support these values (for now): none, all, auto and fill
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.cursor.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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

    const cursors = ['auto','default','none','context-menu','help','pointer','progress','wait','cell','crosshair','text','vertical-text','alias','copy','move','no-drop','not-allowed','e-resize','n-resize','ne-resize','nw-resize','s-resize','se-resize','sw-resize','w-resize','ew-resize','ns-resize','nesw-resize','nwse-resize','col-resize','row-resize','all-scroll','zoom-in','zoom-out','grab','grabbing'];

    vars.comment(
        () => `
      /**
        * @name          Cursor
        * @namespace          sugar.css.cursor
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/cursor
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a specific cursor on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${cursors
            .map((cursor) => {
                return ` * @cssClass     s-cursor:${cursor}            Apply the ${cursor} cursor`;
            })
            .join('\n')}
        * 
        * @example         html
        * <div class="s-grid:5">
        ${cursors
            .map((cursor) => {
                return ` *   <div class="s-cursor:${cursor} s-p:30 s-text:center s-ratio:16-9" style="padding-block-start: 30%">
                <p class="s-typo:p:bold">${cursor}</p>
        *   </div>
            * `;
            })
            .join('\n')}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
    );

    cursors.forEach(cursor => {

        vars.comment(
            () => `/**
        * @name          s-cursor:${cursor}
        * @namespace          sugar.css.cursor
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to apply a "<yellow>${cursor}</yellow>" cursor style to any HTMLElement
        * 
        * @example        html
        * <div class="s-cursor:${cursor}">
        *   Hover me!
        * </div>
        * 
        * @since         2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
        ).code(`
        .s-cursor--${cursor} {
            cursor: ${cursor};
        }`);

    });

    return vars;
}
