function typeDefinitionArrayObjectToString(typeDefinitionArrayObj) {
  const parts = [];
  if (!Array.isArray(typeDefinitionArrayObj))
    typeDefinitionArrayObj = [typeDefinitionArrayObj];
  typeDefinitionArrayObj.forEach((definition) => {
    let part = definition.type;
    if (definition.of) {
      const ofString = typeDefinitionArrayObjectToString(definition.of);
      part += `<${ofString}>`;
    }
    parts.push(part);
  });
  return parts.join("|");
}
var typeDefinitionArrayObjectToString_default = typeDefinitionArrayObjectToString;
export {
  typeDefinitionArrayObjectToString_default as default
};
