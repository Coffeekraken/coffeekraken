import "../../../../chunk-JETN4ZEY.mjs";
const languages = [
  {
    name: "SugarCss",
    parsers: ["sugar-css"]
  }
];
const loc = (prop) => (node) => {
  return node.loc && node.loc[prop] && node.loc[prop].offset;
};
const parsers = {
  "sugar-css": {
    parse,
    astFormat: "sugar-css-ast",
    hasPragma,
    locStart: loc("start"),
    locEnd: loc("end"),
    preprocess
  }
};
function parse(text, parsers2, options) {
}
function hasPragma(text) {
}
function preprocess(text, options) {
}
export {
  languages,
  parsers
};
