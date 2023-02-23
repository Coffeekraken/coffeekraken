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
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function expandTemplate(
    $template: HTMLTemplateElement,
): HTMLDivElement {
    const $container = document.createElement('div');
    const html: string[] = [];
    Array.from($template.content.childNodes).forEach(($child) => {
        // @ts-ignore
        if ($child.tagName === 'SCRIPT') {
            document.head.appendChild($child);
        } else {
            // @ts-ignore
            html.push($child.outerHTML ?? $child.textContent);
        }
    });
    $container.innerHTML = html.join('\n');
    $template.parentElement?.insertBefore($container, $template);
    $template.remove();
    return $container;
}
