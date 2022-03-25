import __deepProxy from "./deepProxy";
import __get from "./get";
function resolveTokens(object) {
  const proxiedObject = __deepProxy(object, (getObj) => {
    const rawValue = __get(getObj.target, getObj.key);
    if (typeof rawValue !== "string")
      return rawValue;
    const reg = /\{([a-zA-Z0-9\.-_]+)\}/g;
    const tokens = rawValue.match(reg);
    let finalValue = rawValue;
    if (!tokens)
      return rawValue;
    tokens.forEach((token) => {
      finalValue = finalValue.replace(token, __get(object, token.replace("{", "").replace("}", "").replace("this.", "")));
    });
    return finalValue;
  }, {
    handleGet: true
  });
  return proxiedObject;
}
var resolveTokens_default = resolveTokens;
export {
  resolveTokens_default as default
};
