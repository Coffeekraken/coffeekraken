"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const fastdom_1 = __importDefault(require("fastdom"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
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
function __linksStateAttributes(settings = {}) {
    settings = (0, deepMerge_1.default)({}, settings);
    function handleLink($linkElm) {
        // protect for async removed links
        if (!$linkElm) {
            return;
        }
        fastdom_1.default.mutate(() => {
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
    (0, dom_1.__querySelectorLive)(`a[href]`, ($linkElm) => {
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
exports.default = __linksStateAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUE4RDtBQUM5RCxzREFBZ0M7QUFDaEMsOEVBQXNEO0FBa0N0RCxtRUFBbUU7QUFDbkUsNkJBQTZCO0FBQzdCLGVBQWU7QUFDZixxQkFBcUI7QUFDckIsOERBQThEO0FBQzlELG9CQUFvQjtBQUNwQiwrQkFBK0I7QUFDL0IsaUNBQWlDO0FBQ2pDLHdFQUF3RTtBQUN4RSxnQ0FBZ0M7QUFDaEMsb0JBQW9CO0FBQ3BCLDhCQUE4QjtBQUM5QixlQUFlO0FBQ2YsbUJBQW1CO0FBQ25CLGdEQUFnRDtBQUNoRCw2Q0FBNkM7QUFDN0Msc0RBQXNEO0FBQ3RELDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsNkJBQTZCO0FBQzdCLDJCQUEyQjtBQUMzQixxQkFBcUI7QUFDckIsY0FBYztBQUNkLHVDQUF1QztBQUN2QyxnQ0FBZ0M7QUFDaEMsMkNBQTJDO0FBQzNDLGlEQUFpRDtBQUNqRCxrQ0FBa0M7QUFDbEMsOEJBQThCO0FBQzlCLDJFQUEyRTtBQUMzRSw4REFBOEQ7QUFDOUQsMERBQTBEO0FBQzFELGtFQUFrRTtBQUNsRSw2QkFBNkI7QUFDN0IsK0JBQStCO0FBQy9CLGlFQUFpRTtBQUNqRSwwQ0FBMEM7QUFDMUMsa0NBQWtDO0FBQ2xDLHVEQUF1RDtBQUN2RCw2REFBNkQ7QUFDN0QsbUNBQW1DO0FBQ25DLHdCQUF3QjtBQUN4QixrRkFBa0Y7QUFDbEYsMkJBQTJCO0FBQzNCLDREQUE0RDtBQUM1RCwwQ0FBMEM7QUFDMUMsbURBQW1EO0FBQ25ELGdEQUFnRDtBQUNoRCx3RUFBd0U7QUFDeEUsOEJBQThCO0FBQzlCLDZFQUE2RTtBQUM3RSxvQkFBb0I7QUFDcEIsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWixTQUFTO0FBQ1QsVUFBVTtBQUNWLEtBQUs7QUFFTCxTQUF3QixzQkFBc0IsQ0FDMUMsV0FBbUQs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