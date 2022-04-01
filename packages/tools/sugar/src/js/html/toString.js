import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function toStringFn(html, deep = true) {
  if (document !== void 0 && document.createElement !== void 0) {
    const cont = document.createElement("div");
    cont.appendChild(html.cloneNode(deep));
    return cont.innerHTML;
  }
  return html;
}
var toString_default = toStringFn;
export {
  toString_default as default
};
