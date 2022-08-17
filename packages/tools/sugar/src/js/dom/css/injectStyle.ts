// @ts-nocheck
import __uniqid from '../../../shared/string/uniqid';

/**
 * @name            injectStyle
 * @namespace            js.css
 * @type            Function
 * @platform          js
 * @status              stable
 *
 * Inject a passed style string in the DOM
 *
 * @param         {String}          style         The style to inject in DOM
 * @param           {Partial<IInjectStyleSettings>}     [settings=null]         Some settings to configure your injection
 * @return                          {HTMLStyleElement}      The injected HTMLStyleElement node
 *
 * @setting         {String}        id          An id for the injected style tag
 * @setting         {HTMLElement}   [rootNode=undefined]        A node in which to inject the style
 *
 * @todo        tests
 *
 * @example       js
 * import injectStyle from '@coffeekraken/sugar/js/dom/css/injectStyle';
 * injectStyle('a { color: red; }');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IInjectStyleSettings {
    id: string;
    rootNode: HTMLElement;
}

export default function injectStyle(
    style: string,
    settings?: Partial<IInjectStyleSettings>,
) {
    const finalSettings = <IInjectStyleSettings>{
        id: `injected-style-${__uniqid()}`,
        rootNode: undefined,
        ...(settings ?? {}),
    };

    if (document.querySelector(`#${finalSettings.id}`)) return;
    const $tag = document.createElement('style');
    $tag.type = 'text/css';
    $tag.setAttribute('id', finalSettings.id);
    $tag.innerHTML = style;

    if (finalSettings.rootNode) {
        finalSettings.rootNode.appendChild($tag);
    } else {
        const $firstLink = document.querySelector(
            'head link[rel="stylesheet"]',
        );
        if ($firstLink) {
            $firstLink.parentElement?.insertBefore($tag, $firstLink);
        } else {
            document.head.appendChild($tag);
        }
    }
    return $tag;
}
