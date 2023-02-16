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
    (0, dom_1.__querySelectorLive)(`[href]`, ($linkElm) => {
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
exports.default = __linksStateAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUE4RDtBQUM5RCxzREFBZ0M7QUFDaEMsOEVBQXNEO0FBZ0N0RCxtRUFBbUU7QUFDbkUsNkJBQTZCO0FBQzdCLGVBQWU7QUFDZixxQkFBcUI7QUFDckIsOERBQThEO0FBQzlELG9CQUFvQjtBQUNwQiwrQkFBK0I7QUFDL0IsaUNBQWlDO0FBQ2pDLHdFQUF3RTtBQUN4RSxnQ0FBZ0M7QUFDaEMsb0JBQW9CO0FBQ3BCLDhCQUE4QjtBQUM5QixlQUFlO0FBQ2YsbUJBQW1CO0FBQ25CLGdEQUFnRDtBQUNoRCw2Q0FBNkM7QUFDN0Msc0RBQXNEO0FBQ3RELDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsNkJBQTZCO0FBQzdCLDJCQUEyQjtBQUMzQixxQkFBcUI7QUFDckIsY0FBYztBQUNkLHVDQUF1QztBQUN2QyxnQ0FBZ0M7QUFDaEMsMkNBQTJDO0FBQzNDLGlEQUFpRDtBQUNqRCxrQ0FBa0M7QUFDbEMsOEJBQThCO0FBQzlCLDJFQUEyRTtBQUMzRSw4REFBOEQ7QUFDOUQsMERBQTBEO0FBQzFELGtFQUFrRTtBQUNsRSw2QkFBNkI7QUFDN0IsK0JBQStCO0FBQy9CLGlFQUFpRTtBQUNqRSwwQ0FBMEM7QUFDMUMsa0NBQWtDO0FBQ2xDLHVEQUF1RDtBQUN2RCw2REFBNkQ7QUFDN0QsbUNBQW1DO0FBQ25DLHdCQUF3QjtBQUN4QixrRkFBa0Y7QUFDbEYsMkJBQTJCO0FBQzNCLDREQUE0RDtBQUM1RCwwQ0FBMEM7QUFDMUMsbURBQW1EO0FBQ25ELGdEQUFnRDtBQUNoRCx3RUFBd0U7QUFDeEUsOEJBQThCO0FBQzlCLDZFQUE2RTtBQUM3RSxvQkFBb0I7QUFDcEIsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWixTQUFTO0FBQ1QsVUFBVTtBQUNWLEtBQUs7QUFFTCxTQUF3QixzQkFBc0IsQ0FDMUMsV0FBbUQs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