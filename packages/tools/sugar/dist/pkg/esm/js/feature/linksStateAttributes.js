// @ts-nocheck
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import __fastdom from 'fastdom';
import deepMerge from '../../shared/object/deepMerge';
// /*! (C) 2017 Andrea Giammarchi - @WebReflection - ISC License */
// document.addEventListener(
//     'click',
//     function (t) {
//         var e = t.target.shadowRoot ? t.path[0] : t.target,
//             a = (
//                 e.closest ||
//                 function (t) {
//                     for (; e && e.nodeName !== t; ) e = e.parentNode;
//                     return e;
//                 }
//             ).call(e, 'A');
//         if (
//             a &&
//             /^(?:_self)?$/i.test(a.target) &&
//             !a.hasAttribute('download') &&
//             'external' !== a.getAttribute('rel') &&
//             !t.ctrlKey &&
//             !t.metaKey &&
//             !t.shiftKey &&
//             !t.altKey &&
//             a.href
//         ) {
//             var n = new URL(a.href),
//                 o = location;
//             if (n.origin === o.origin) {
//                 var r = n.pathname + n.search,
//                     i = n.hash,
//                     s = !0;
//                 if ((t.preventDefault(), r === o.pathname + o.search)) {
//                     if (/^#[a-z][a-z0-9.:_-]+$/i.test(i)) {
//                         var e = document.querySelector(
//                             i + ',[name="' + i.slice(1) + '"]',
//                         );
//                         e &&
//                             ((t.preventDefault = function () {
//                                 s = !1;
//                             }),
//                             setTimeout(function () {
//                                 s && e.scrollIntoView(!0);
//                             }));
//                     }
//                     history.replaceState(history.state, document.title, r + i);
//                 } else {
//                     var c = new CustomEvent('pushstate');
//                     (c.state = o.href),
//                         setTimeout(function () {
//                             dispatchEvent(c),
//                                 window.onpushstate && onpushstate(c);
//                         }),
//                         history.pushState(c.state, document.title, r + i);
//                 }
//             }
//         }
//     },
//     !0,
// );
export default function __linksStateAttributes(settings = {}) {
    settings = deepMerge({}, settings);
    function handleLink($linkElm) {
        __fastdom.mutate(() => {
            if ($linkElm.getAttribute('href') === document.location.pathname) {
                $linkElm.setAttribute('actual', true);
                $linkElm.parentNode.setAttribute('actual-parent', true);
                $linkElm.dispatchEvent(new CustomEvent('actual', {
                    bubbles: true,
                }));
            }
            else if (document.location.pathname !== '/' &&
                $linkElm
                    .getAttribute('href')
                    .startsWith(document.location.pathname)) {
                $linkElm.removeAttribute('actual');
                $linkElm.setAttribute('actual-child', true);
                $linkElm.dispatchEvent(new CustomEvent('actual', {
                    bubbles: true,
                }));
            }
            else {
                $linkElm.removeAttribute('actual');
                $linkElm.removeAttribute('actual-child');
                $linkElm.parentNode.removeAttribute('actual-parent');
            }
        });
    }
    __querySelectorLive(`[href]`, ($linkElm) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxTQUFTLE1BQU0sK0JBQStCLENBQUM7QUFrQ3RELG1FQUFtRTtBQUNuRSw2QkFBNkI7QUFDN0IsZUFBZTtBQUNmLHFCQUFxQjtBQUNyQiw4REFBOEQ7QUFDOUQsb0JBQW9CO0FBQ3BCLCtCQUErQjtBQUMvQixpQ0FBaUM7QUFDakMsd0VBQXdFO0FBQ3hFLGdDQUFnQztBQUNoQyxvQkFBb0I7QUFDcEIsOEJBQThCO0FBQzlCLGVBQWU7QUFDZixtQkFBbUI7QUFDbkIsZ0RBQWdEO0FBQ2hELDZDQUE2QztBQUM3QyxzREFBc0Q7QUFDdEQsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1Qiw2QkFBNkI7QUFDN0IsMkJBQTJCO0FBQzNCLHFCQUFxQjtBQUNyQixjQUFjO0FBQ2QsdUNBQXVDO0FBQ3ZDLGdDQUFnQztBQUNoQywyQ0FBMkM7QUFDM0MsaURBQWlEO0FBQ2pELGtDQUFrQztBQUNsQyw4QkFBOEI7QUFDOUIsMkVBQTJFO0FBQzNFLDhEQUE4RDtBQUM5RCwwREFBMEQ7QUFDMUQsa0VBQWtFO0FBQ2xFLDZCQUE2QjtBQUM3QiwrQkFBK0I7QUFDL0IsaUVBQWlFO0FBQ2pFLDBDQUEwQztBQUMxQyxrQ0FBa0M7QUFDbEMsdURBQXVEO0FBQ3ZELDZEQUE2RDtBQUM3RCxtQ0FBbUM7QUFDbkMsd0JBQXdCO0FBQ3hCLGtGQUFrRjtBQUNsRiwyQkFBMkI7QUFDM0IsNERBQTREO0FBQzVELDBDQUEwQztBQUMxQyxtREFBbUQ7QUFDbkQsZ0RBQWdEO0FBQ2hELHdFQUF3RTtBQUN4RSw4QkFBOEI7QUFDOUIsNkVBQTZFO0FBQzdFLG9CQUFvQjtBQUNwQixnQkFBZ0I7QUFDaEIs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