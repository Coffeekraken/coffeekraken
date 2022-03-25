import deepMerge from "../../shared/object/deepMerge";
import querySelectorLive from "../dom/query/querySelectorLive";
/*! (C) 2017 Andrea Giammarchi - @WebReflection - ISC License */
document.addEventListener("click", function(t) {
  var e = t.target.shadowRoot ? t.path[0] : t.target, a = (e.closest || function(t2) {
    for (; e && e.nodeName !== t2; )
      e = e.parentNode;
    return e;
  }).call(e, "A");
  if (a && /^(?:_self)?$/i.test(a.target) && !a.hasAttribute("download") && a.getAttribute("rel") !== "external" && !t.ctrlKey && !t.metaKey && !t.shiftKey && !t.altKey && a.href) {
    var n = new URL(a.href), o = location;
    if (n.origin === o.origin) {
      var r = n.pathname + n.search, i = n.hash, s = true;
      if (t.preventDefault(), r === o.pathname + o.search) {
        if (/^#[a-z][a-z0-9.:_-]+$/i.test(i)) {
          var e = document.querySelector(i + ',[name="' + i.slice(1) + '"]');
          e && (t.preventDefault = function() {
            s = false;
          }, setTimeout(function() {
            s && e.scrollIntoView(true);
          }));
        }
        history.replaceState(history.state, document.title, r + i);
      } else {
        var c = new CustomEvent("pushstate");
        c.state = o.href, setTimeout(function() {
          dispatchEvent(c), window.onpushstate && onpushstate(c);
        }), history.pushState(c.state, document.title, r + i);
      }
    }
  }
}, true);
function linksStateAttributes(settings = {}) {
  settings = deepMerge({}, settings);
  function handleLink($linkElm) {
    if ($linkElm.getAttribute("href") === document.location.pathname) {
      $linkElm.setAttribute("actual", true);
      $linkElm.parentNode.setAttribute("actual-parent", true);
      $linkElm.dispatchEvent(new CustomEvent("actual", {
        bubbles: true
      }));
    } else if ($linkElm.getAttribute("href").startsWith(document.location.pathname)) {
      $linkElm.removeAttribute("actual");
      $linkElm.setAttribute("actual-child", true);
      $linkElm.dispatchEvent(new CustomEvent("actual", {
        bubbles: true
      }));
    } else {
      $linkElm.removeAttribute("actual");
      $linkElm.removeAttribute("actual-child");
      $linkElm.parentNode.removeAttribute("actual-parent");
    }
  }
  querySelectorLive(`[href]`, ($linkElm) => {
    handleLink($linkElm);
    setTimeout(() => {
      handleLink($linkElm);
    }, 500);
  });
  window.addEventListener("locationchange", () => {
    Array.from(document.querySelectorAll("[href]")).forEach(($linkElm) => {
      handleLink($linkElm);
    });
  });
  window.addEventListener("popstate", () => {
    Array.from(document.querySelectorAll("[href]")).forEach(($linkElm) => {
      handleLink($linkElm);
    });
  });
  window.addEventListener("pushstate", () => {
    Array.from(document.querySelectorAll("[href]")).forEach(($linkElm) => {
      handleLink($linkElm);
    });
  });
}
var linksStateAttributes_default = linksStateAttributes;
export {
  linksStateAttributes_default as default
};
