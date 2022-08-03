// @ts-nocheck
import deepMerge from '../../shared/object/deepMerge';
import querySelectorLive from '../dom/query/querySelectorLive';
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
    settings = deepMerge({}, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSwrQkFBK0IsQ0FBQztBQUN0RCxPQUFPLGlCQUFpQixNQUFNLGdDQUFnQyxDQUFDO0FBZ0MvRCxnRUFBZ0U7QUFDaEUsUUFBUSxDQUFDLGdCQUFnQixDQUNyQixPQUFPLEVBQ1AsVUFBVSxDQUFDO0lBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQzlDLENBQUMsR0FBRyxDQUNBLENBQUMsQ0FBQyxPQUFPO1FBQ1QsVUFBVSxDQUFDO1lBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDO2dCQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUNKLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuQixJQUNJLENBQUM7UUFDRCxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztRQUMzQixVQUFVLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUMsT0FBTztRQUNWLENBQUMsQ0FBQyxDQUFDLE9BQU87UUFDVixDQUFDLENBQUMsQ0FBQyxRQUFRO1FBQ1gsQ0FBQyxDQUFDLENBQUMsTUFBTTtRQUNULENBQUMsQ0FBQyxJQUFJLEVBQ1I7UUFDRSxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQ25CLENB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