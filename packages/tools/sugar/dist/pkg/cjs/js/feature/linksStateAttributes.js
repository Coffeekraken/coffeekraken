"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const fastdom_1 = __importDefault(require("fastdom"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
/*! (C) 2017 Andrea Giammarchi - @WebReflection - ISC License */
document.addEventListener('click', function (t) {
    var e = t.target.shadowRoot ? t.path[0] : t.target, a = (e.closest ||
        function (t) {
            for (; e && e.nodeName !== t;)
                e = e.parentNode;
            return e;
        }).call(e, 'A');
    if (a &&
        /^(?:_self)?$/i.test(a.target) &&
        !a.hasAttribute('download') &&
        'external' !== a.getAttribute('rel') &&
        !t.ctrlKey &&
        !t.metaKey &&
        !t.shiftKey &&
        !t.altKey &&
        a.href) {
        var n = new URL(a.href), o = location;
        if (n.origin === o.origin) {
            var r = n.pathname + n.search, i = n.hash, s = !0;
            if ((t.preventDefault(), r === o.pathname + o.search)) {
                if (/^#[a-z][a-z0-9.:_-]+$/i.test(i)) {
                    var e = document.querySelector(i + ',[name="' + i.slice(1) + '"]');
                    e &&
                        ((t.preventDefault = function () {
                            s = !1;
                        }),
                            setTimeout(function () {
                                s && e.scrollIntoView(!0);
                            }));
                }
                history.replaceState(history.state, document.title, r + i);
            }
            else {
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
}, !0);
function __linksStateAttributes(settings = {}) {
    settings = (0, deepMerge_1.default)({}, settings);
    function handleLink($linkElm) {
        fastdom_1.default.mutate(() => {
            if ($linkElm.getAttribute('href') === document.location.pathname) {
                $linkElm.setAttribute('actual', true);
                $linkElm.parentNode.setAttribute('actual-parent', true);
                console.log('ACDDD');
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
                console.log('AC');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUE4RDtBQUM5RCxzREFBZ0M7QUFDaEMsOEVBQXNEO0FBZ0N0RCxnRUFBZ0U7QUFDaEUsUUFBUSxDQUFDLGdCQUFnQixDQUNyQixPQUFPLEVBQ1AsVUFBVSxDQUFDO0lBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQzlDLENBQUMsR0FBRyxDQUNBLENBQUMsQ0FBQyxPQUFPO1FBQ1QsVUFBVSxDQUFDO1lBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDO2dCQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUNKLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuQixJQUNJLENBQUM7UUFDRCxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztRQUMzQixVQUFVLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUMsT0FBTztRQUNWLENBQUMsQ0FBQyxDQUFDLE9BQU87UUFDVixDQUFDLENBQUMsQ0FBQyxRQUFRO1FBQ1gsQ0FBQyxDQUFDLENBQUMsTUFBTTtRQUNULENBQUMsQ0FBQyxJQUFJLEVBQ1I7UUFDRSxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQ25CLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDakIs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