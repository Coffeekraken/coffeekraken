"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      expandTemplate
 * @namespace            js.dom.template
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * This function allows you to take an HTMLTemplateElement and transform it into real DOM.
 * Note that the provided DOM will be wrapper into a nude div
 *
 * @param       {HTMLTemplateElement}           $template       The template to expand
 * @return      {HTMLDivElement}                                   The wrapper div
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __expandTemplate } from '@coffeekraken/sugar/dom'
 * __expandTemplate($templte);
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function expandTemplate($template) {
    var _a;
    const $container = document.createElement('div');
    const html = [];
    Array.from($template.content.childNodes).forEach(($child) => {
        var _a;
        // @ts-ignore
        if ($child.tagName === 'SCRIPT') {
            document.head.appendChild($child);
        }
        else {
            // @ts-ignore
            html.push((_a = $child.outerHTML) !== null && _a !== void 0 ? _a : $child.textContent);
        }
    });
    $container.innerHTML = html.join('\n');
    (_a = $template.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore($container, $template);
    $template.remove();
    return $container;
}
exports.default = expandTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBd0IsY0FBYyxDQUNsQyxTQUE4Qjs7SUFFOUIsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFOztRQUN4RCxhQUFhO1FBQ2IsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQzthQUFNO1lBQ0gsYUFBYTtZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBQSxNQUFNLENBQUMsU0FBUyxtQ0FBSSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDckQ7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxNQUFBLFNBQVMsQ0FBQyxhQUFhLDBDQUFFLFlBQVksQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDN0QsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25CLE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUM7QUFsQkQsaUNBa0JDIn0=