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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxTQUFTLE1BQU0sK0JBQStCLENBQUM7QUFrQ3RELG1FQUFtRTtBQUNuRSw2QkFBNkI7QUFDN0IsZUFBZTtBQUNmLHFCQUFxQjtBQUNyQiw4REFBOEQ7QUFDOUQsb0JBQW9CO0FBQ3BCLCtCQUErQjtBQUMvQixpQ0FBaUM7QUFDakMsd0VBQXdFO0FBQ3hFLGdDQUFnQztBQUNoQyxvQkFBb0I7QUFDcEIsOEJBQThCO0FBQzlCLGVBQWU7QUFDZixtQkFBbUI7QUFDbkIsZ0RBQWdEO0FBQ2hELDZDQUE2QztBQUM3QyxzREFBc0Q7QUFDdEQsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1Qiw2QkFBNkI7QUFDN0IsMkJBQTJCO0FBQzNCLHFCQUFxQjtBQUNyQixjQUFjO0FBQ2QsdUNBQXVDO0FBQ3ZDLGdDQUFnQztBQUNoQywyQ0FBMkM7QUFDM0MsaURBQWlEO0FBQ2pELGtDQUFrQztBQUNsQyw4QkFBOEI7QUFDOUIsMkVBQTJFO0FBQzNFLDhEQUE4RDtBQUM5RCwwREFBMEQ7QUFDMUQsa0VBQWtFO0FBQ2xFLDZCQUE2QjtBQUM3QiwrQkFBK0I7QUFDL0IsaUVBQWlFO0FBQ2pFLDBDQUEwQztBQUMxQyxrQ0FBa0M7QUFDbEMsdURBQXVEO0FBQ3ZELDZEQUE2RDtBQUM3RCxtQ0FBbUM7QUFDbkMsd0JBQXdCO0FBQ3hCLGtGQUFrRjtBQUNsRiwyQkFBMkI7QUFDM0IsNERBQTREO0FBQzVELDBDQUEwQztBQUMxQyxtREFBbUQ7QUFDbkQsZ0RBQWdEO0FBQ2hELHdFQUF3RTtBQUN4RSw4QkFBOEI7QUFDOUIsNkVBQTZFO0FBQzdFLG9CQUFvQjtBQUNwQixnQkFBZ0I7QUFDaEIsWUFBWTtBQUNaLFNBQVM7QUFDVCxVQUFVO0FBQ1YsS0FBSztBQUVMLE1BQU0sQ0FBQyxPQUFPLFVBQVUsc0JBQXNCLENBQzFDLFdBQW1ELEVBQUU7SUFFckQsUUFBUSxHQUFHLFNBQVMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFbkMsU0FBUyxVQUFVLENBQUMsUUFBUTtRQUN4QixrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE9BQU87U0FDVjtRQUNELFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ2xCLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtnQkFDOUQsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3RDLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDeEQsUUFBUSxDQUFDLGFBQWEsQ0FDbEIsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO29CQUN0QixPQUFPLEVBQUUsSUFBSTtpQkFDaEIsQ0FBQyxDQUNMLENBQUM7YUFDTDtpQkFBTSxJQUNILFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEdBQUc7Z0JBQ2xDLFFBQVE7cUJBQ0gsWUFBWSxDQUFDLE1BQU0sQ0FBQztxQkFDcEIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQzdDO2dCQUNFLFFBQVEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25DLFFBQVEsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxRQUFRLENBQUMsYUFBYSxDQUNsQixJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7b0JBQ3RCLE9BQU8sRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQ0wsQ0FBQzthQUNMO2lCQUFNO2dCQUNILFFBQVEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25DLFFBQVEsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3pDLFFBQVEsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3hEO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDeEMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQzNDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbEUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2xFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7UUFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNsRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==