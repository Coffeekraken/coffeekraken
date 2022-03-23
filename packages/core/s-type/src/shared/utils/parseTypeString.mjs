import "../../../../../chunk-JETN4ZEY.mjs";
function parseSingleTypeString(typeString) {
  let ofStr = "", typeStr = typeString;
  const ofPartsString = typeString.match(/<(.+)>$/gm);
  if (ofPartsString && ofPartsString.length) {
    ofStr = ofPartsString[0].replace("<", "").replace(">", "");
  }
  if (ofStr !== "") {
    typeStr = typeStr.replace(`<${ofStr}>`, "");
  }
  let ofTypes = ofStr !== "" ? [ofStr.toLowerCase()] : void 0;
  if (ofStr !== void 0 && ofStr.includes("|")) {
    ofTypes = ofStr.split("|").map((t) => t.trim().toLowerCase());
  }
  return {
    type: typeStr,
    of: ofTypes
  };
}
const fn = function parseTypeString(typeString) {
  typeString = typeString.toLowerCase().trim();
  typeString = typeString.split("|").map((part) => {
    part = part.trim().replace(/^([a-zA-Z0-9-_]+)\[\]$/, "array<$1>");
    return part;
  }).join("|");
  typeString = typeString.split("|").map((part) => {
    part = part.trim().replace(/^([a-zA-Z0-9-_]+)\{\}$/, "object<$1>");
    return part;
  }).join("|");
  let types = [], inGroup = false, currentStr = "";
  for (let i = 0; i < typeString.length; i++) {
    const char = typeString[i];
    if (char === "<") {
      inGroup = true;
      currentStr += char;
    } else if (char === ">") {
      inGroup = false;
      currentStr += char;
    } else if (char === "|") {
      if (inGroup === false) {
        types.push(currentStr);
        currentStr = "";
      } else {
        currentStr += char;
      }
    } else {
      currentStr += char;
    }
  }
  types.push(currentStr);
  const finalTypes = [];
  types.forEach((type) => {
    finalTypes.push(parseSingleTypeString(type));
  });
  const res = {
    raw: typeString,
    types: finalTypes
  };
  return res;
};
var parseTypeString_default = fn;
export {
  parseTypeString_default as default
};
