import "./index-24861f6a.js";
function __matches(el, selector) {
  if (el.nodeName == "#comment" || el.nodeName == "#text") {
    return false;
  }
  const p = Element.prototype;
  const f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
}
function __querySelectorUp($elm, selector) {
  const originalElm = $elm;
  $elm = $elm.parentNode;
  while ($elm && $elm != originalElm.ownerDocument) {
    if (typeof selector === "function") {
      if (selector($elm))
        return $elm;
    } else if (typeof selector === "string" && __matches($elm, selector)) {
      return $elm;
    }
    $elm = $elm.parentNode;
  }
  return null;
}
export {
  __querySelectorUp as _
};
