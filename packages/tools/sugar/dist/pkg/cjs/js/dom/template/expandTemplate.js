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
 * @snippet         __expandTemplate($1)
 *
 * @example    js
 * import { __expandTemplate } from '@coffeekraken/sugar/dom'
 * __expandTemplate($templte);
 *
 * @since           2.0.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUF3QixjQUFjLENBQ2xDLFNBQThCOztJQUU5QixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUMxQixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7O1FBQ3hELGFBQWE7UUFDYixJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDSCxhQUFhO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFBLE1BQU0sQ0FBQyxTQUFTLG1DQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNyRDtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLE1BQUEsU0FBUyxDQUFDLGFBQWEsMENBQUUsWUFBWSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM3RCxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkIsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQztBQWxCRCxpQ0FrQkMifQ==