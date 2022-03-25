function strToHtml(string) {
  if (document !== void 0 && document.createElement !== void 0) {
    const cont = document.createElement("div");
    cont.innerHTML = string;
    if (cont.children.length === 1) {
      return cont.children[0];
    } else {
      return cont;
    }
  }
  return string;
}
var strToHtml_default = strToHtml;
export {
  strToHtml_default as default
};
