export default {
  match: /handlebars\.js/,
  rewrite(src, id) {
    return src.replace(
      'if (global.Symbol && context[global.Symbol.iterator])',
      'if (false)'
    );
  }
};
