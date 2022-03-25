import ltrim from "../string/ltrim";
function queryStringToObject(str) {
  str = ltrim(str, "?");
  str = str.replace(/%20/gm, " ");
  str = decodeURIComponent(str);
  let chunks = str.split("&");
  const obj = {};
  chunks = chunks.filter((ch) => {
    return ch !== "";
  });
  for (let c = 0; c < chunks.length; c++) {
    const split = chunks[c].split("=", 2);
    obj[split[0]] = split[1];
  }
  return obj;
}
var queryStringToObject_default = queryStringToObject;
export {
  queryStringToObject_default as default
};
