import "../../../../../chunk-JETN4ZEY.mjs";
function simplifySpecialChars(str) {
  const utf8 = {
    a: /[áàâãªä]/gm,
    A: /[ÁÀÂÃÄ]/gm,
    I: /[ÍÌÎÏ]/gm,
    i: /[íìîï]/gm,
    e: /[éèêë]/gm,
    E: /[ÉÈÊË]/gm,
    o: /[óòôõºö]/gm,
    O: /[ÓÒÔÕÖ]/gm,
    u: /[úùûü]/gm,
    U: /[ÚÙÛÜ]/gm,
    c: /ç/gm,
    C: /Ç/gm,
    n: /ñ/gm,
    N: /Ñ/gm,
    "-": /–/gm,
    " ": /[’‘‹›‚“”«»„[] ]/gm
  };
  Object.keys(utf8).forEach((char) => {
    str = str.replace(utf8[char], char);
  });
  return str;
}
export {
  simplifySpecialChars as default
};
