/**
 * @name            reloadStylesheets
 * @namespace       js.dom.css
 * @type             Function
 * @platform          js
 * @status           stable
 *
 * This function just loop on each "link" tags that point to some css files
 * and reload them by adding a "queryString" with the timestamp in it
 * to prevent caching
 *
 * @param       {}
 *
 * @example         js
 * import { __reloeadStylesheets } from '@coffeekraken/sugar/dom';
 * __reloadStylesheets();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function reloadStylesheets(settings) {
    const finalSettings = Object.assign({ $root: document }, (settings !== null && settings !== void 0 ? settings : {}));
    // loop on all stylesheetgs link and add the timestamp in
    for (var link of finalSettings.$root.querySelectorAll('link[rel=stylesheet]')) {
        // @ts-ignore
        link.href = link.href.replace(/\?.*|$/, '?' + Date.now());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBTUgsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FDckMsUUFBOEM7SUFFOUMsTUFBTSxhQUFhLG1CQUNmLEtBQUssRUFBRSxRQUFRLElBQ1osQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUNGLHlEQUF5RDtJQUN6RCxLQUFLLElBQUksSUFBSSxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQ2pELHNCQUFzQixDQUN6QixFQUFFO1FBQ0MsYUFBYTtRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztLQUM3RDtBQUNMLENBQUMifQ==