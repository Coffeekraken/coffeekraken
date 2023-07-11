// @ts-nocheck
import __fastdom from 'fastdom';
import __deepMerge from '../../shared/object/deepMerge.js';
import __querySelectorLive from '../dom/query/querySelectorLive.js';
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
    settings = __deepMerge({}, settings);
    function handleLink($linkElm) {
        // protect for async removed links
        if (!$linkElm) {
            return;
        }
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
    __querySelectorLive(`a[href]`, ($linkElm) => {
        handleLink($linkElm);
        setTimeout(() => {
            handleLink($linkElm);
        }, 500);
    });
    window.addEventListener('locationchange', () => {
        Array.from(document.querySelectorAll('a[href]')).forEach(($linkElm) => {
            handleLink($linkElm);
        });
    });
    window.addEventListener('popstate', () => {
        Array.from(document.querySelectorAll('a[href]')).forEach(($linkElm) => {
            handleLink($linkElm);
        });
    });
    window.addEventListener('pushstate', () => {
        Array.from(document.querySelectorAll('a[href]')).forEach(($linkElm) => {
            handleLink($linkElm);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxXQUFXLE1BQU0sa0NBQWtDLENBQUM7QUFDM0QsT0FBTyxtQkFBbUIsTUFBTSxtQ0FBbUMsQ0FBQztBQWtDcEUsbUVBQW1FO0FBQ25FLDZCQUE2QjtBQUM3QixlQUFlO0FBQ2YscUJBQXFCO0FBQ3JCLDhEQUE4RDtBQUM5RCxvQkFBb0I7QUFDcEIsK0JBQStCO0FBQy9CLGlDQUFpQztBQUNqQyx3RUFBd0U7QUFDeEUsZ0NBQWdDO0FBQ2hDLG9CQUFvQjtBQUNwQiw4QkFBOEI7QUFDOUIsZUFBZTtBQUNmLG1CQUFtQjtBQUNuQixnREFBZ0Q7QUFDaEQsNkNBQTZDO0FBQzdDLHNEQUFzRDtBQUN0RCw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLDZCQUE2QjtBQUM3QiwyQkFBMkI7QUFDM0IscUJBQXFCO0FBQ3JCLGNBQWM7QUFDZCx1Q0FBdUM7QUFDdkMsZ0NBQWdDO0FBQ2hDLDJDQUEyQztBQUMzQyxpREFBaUQ7QUFDakQsa0NBQWtDO0FBQ2xDLDhCQUE4QjtBQUM5QiwyRUFBMkU7QUFDM0UsOERBQThEO0FBQzlELDBEQUEwRDtBQUMxRCxrRUFBa0U7QUFDbEUsNkJBQTZCO0FBQzdCLCtCQUErQjtBQUMvQixpRUFBaUU7QUFDakUsMENBQTBDO0FBQzFDLGtDQUFrQztBQUNsQyx1REFBdUQ7QUFDdkQsNkRBQTZEO0FBQzdELG1DQUFtQztBQUNuQyx3QkFBd0I7QUFDeEIsa0ZBQWtGO0FBQ2xGLDJCQUEyQjtBQUMzQiw0REFBNEQ7QUFDNUQsMENBQTBDO0FBQzFDLG1EQUFtRDtBQUNuRCxnREFBZ0Q7QUFDaEQsd0VBQXdFO0FBQ3hFLDhCQUE4QjtBQUM5Qiw2RUFBNkU7QUFDN0Usb0JBQW9CO0FBQ3BCLGdCQUFnQjtBQUNoQixZQUFZO0FBQ1os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