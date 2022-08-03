"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const querySelectorLive_1 = __importDefault(require("../dom/query/querySelectorLive"));
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
function linksStateAttributes(settings = {}) {
    settings = (0, deepMerge_1.default)({}, settings);
    function handleLink($linkElm) {
        if ($linkElm.getAttribute('href') === document.location.pathname) {
            $linkElm.setAttribute('actual', true);
            $linkElm.parentNode.setAttribute('actual-parent', true);
            $linkElm.dispatchEvent(new CustomEvent('actual', {
                bubbles: true,
            }));
        }
        else if (document.location.pathname !== '/' &&
            $linkElm.getAttribute('href').startsWith(document.location.pathname)) {
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
    }
    (0, querySelectorLive_1.default)(`[href]`, ($linkElm) => {
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
exports.default = linksStateAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhFQUFzRDtBQUN0RCx1RkFBK0Q7QUFnQy9ELGdFQUFnRTtBQUNoRSxRQUFRLENBQUMsZ0JBQWdCLENBQ3JCLE9BQU8sRUFDUCxVQUFVLENBQUM7SUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFDOUMsQ0FBQyxHQUFHLENBQ0EsQ0FBQyxDQUFDLE9BQU87UUFDVCxVQUFVLENBQUM7WUFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUM7Z0JBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7WUFDakQsT0FBTyxDQUFDLENBQUM7UUFDYixDQUFDLENBQ0osQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLElBQ0ksQ0FBQztRQUNELGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO1FBQzNCLFVBQVUsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQyxPQUFPO1FBQ1YsQ0FBQyxDQUFDLENBQUMsT0FBTztRQUNWLENBQUMsQ0FBQyxDQUFDLFFBQVE7UUFDWCxDQUFDLENBQUMsQ0FBQyxNQUFNO1FBQ1QsQ0FBQyxDQUFDLElBQUksRUFDUjtRQUNFLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFDbkIsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FB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