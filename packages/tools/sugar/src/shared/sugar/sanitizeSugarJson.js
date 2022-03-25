function sanitizeSugarJson(sugarJson) {
  sugarJson = Object.assign({}, sugarJson);
  if (!sugarJson.extends)
    sugarJson.extends = [];
  else if (!Array.isArray(sugarJson.extends))
    sugarJson.extends = [sugarJson.extends];
  return sugarJson;
}
export {
  sanitizeSugarJson as default
};
