import __matches from "./matches";
function querySelectorUp($elm, selector) {
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
var querySelectorUp_default = querySelectorUp;
export {
  querySelectorUp_default as default
};
