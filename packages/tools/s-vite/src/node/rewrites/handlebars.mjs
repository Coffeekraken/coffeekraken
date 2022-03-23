import "../../../../../chunk-TD77TI6B.mjs";
var handlebars_default = {
  match: /handlebars\.js/,
  rewrite(src, id) {
    return src.replace("if (global.Symbol && context[global.Symbol.iterator])", "if (false)");
  }
};
export {
  handlebars_default as default
};
