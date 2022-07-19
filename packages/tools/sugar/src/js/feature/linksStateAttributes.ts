// @ts-nocheck

import deepMerge from '../../shared/object/deepMerge';
import querySelectorLive from '../dom/query/querySelectorLive';

/**
 * @name 		linksStateAttributes
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @status      beta
 *
 * This feature simply add some special attributes on links like "actual" when the link correspond to the actual visited page url,
 * "actual-child" when the link point to a child page, and maybe some more depending on needs and "actual-parent" on the actual link parent node
 *
 * @param       {Object}        [settings={}]         An object of settings to configure your feature
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @example       js
 * import linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
 * linksStateAttributes();
 *
 * @example    html
 * <!-- page url: /something -->
 * <a href="/something" actual>Hello</a>
 * <a href="/something/cool" actual-child>World</a>
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IlinksStateAttributesSettings {}

/*! (C) 2017 Andrea Giammarchi - @WebReflection - ISC License */
document.addEventListener(
    'click',
    function (t) {
        var e = t.target.shadowRoot ? t.path[0] : t.target,
            a = (
                e.closest ||
                function (t) {
                    for (; e && e.nodeName !== t; ) e = e.parentNode;
                    return e;
                }
            ).call(e, 'A');
        if (
            a &&
            /^(?:_self)?$/i.test(a.target) &&
            !a.hasAttribute('download') &&
            'external' !== a.getAttribute('rel') &&
            !t.ctrlKey &&
            !t.metaKey &&
            !t.shiftKey &&
            !t.altKey &&
            a.href
        ) {
            var n = new URL(a.href),
                o = location;
            if (n.origin === o.origin) {
                var r = n.pathname + n.search,
                    i = n.hash,
                    s = !0;
                if ((t.preventDefault(), r === o.pathname + o.search)) {
                    if (/^#[a-z][a-z0-9.:_-]+$/i.test(i)) {
                        var e = document.querySelector(
                            i + ',[name="' + i.slice(1) + '"]',
                        );
                        e &&
                            ((t.preventDefault = function () {
                                s = !1;
                            }),
                            setTimeout(function () {
                                s && e.scrollIntoView(!0);
                            }));
                    }
                    history.replaceState(history.state, document.title, r + i);
                } else {
                    var c = new CustomEvent('pushstate');
                    (c.state = o.href),
                        setTimeout(function () {
                            dispatchEvent(c),
                                window.onpushstate && onpushstate(c);
                        }),
                        history.pushState(c.state, document.title, r + i);
                }
            }
        }
    },
    !0,
);

function linksStateAttributes(
    settings: Partial<IlinksStateAttributesSettings> = {},
): void {
    settings = deepMerge({}, settings);

    function handleLink($linkElm) {
        if ($linkElm.getAttribute('href') === document.location.pathname) {
            $linkElm.setAttribute('actual', true);
            $linkElm.parentNode.setAttribute('actual-parent', true);
            $linkElm.dispatchEvent(
                new CustomEvent('actual', {
                    bubbles: true,
                }),
            );
        } else if (
            document.location.pathname !== '/' &&
            $linkElm.getAttribute('href').startsWith(document.location.pathname)
        ) {
            $linkElm.removeAttribute('actual');
            $linkElm.setAttribute('actual-child', true);
            $linkElm.dispatchEvent(
                new CustomEvent('actual', {
                    bubbles: true,
                }),
            );
        } else {
            $linkElm.removeAttribute('actual');
            $linkElm.removeAttribute('actual-child');
            $linkElm.parentNode.removeAttribute('actual-parent');
        }
    }

    querySelectorLive(`[href]`, ($linkElm) => {
        handleLink($linkElm);
        setTimeout(() => {
            handleLink($linkElm);
        }, 500);
    });
    window.addEventListener('locationchange', () => {
        Array.from(document.querySelectorAll('[href]')).forEach(($linkElm) => {
            handleLink($linkElm);
        });
    });
    window.addEventListener('popstate', () => {
        Array.from(document.querySelectorAll('[href]')).forEach(($linkElm) => {
            handleLink($linkElm);
        });
    });
    window.addEventListener('pushstate', () => {
        Array.from(document.querySelectorAll('[href]')).forEach(($linkElm) => {
            handleLink($linkElm);
        });
    });
}
export default linksStateAttributes;
