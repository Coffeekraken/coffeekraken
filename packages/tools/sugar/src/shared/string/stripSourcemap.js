function stripSourcemap(str) {
  str = str.replace(/\/\/#\s?sourceMappingURL=[\w\W]+/gm, "");
  return str;
}
export {
  stripSourcemap as default
};
