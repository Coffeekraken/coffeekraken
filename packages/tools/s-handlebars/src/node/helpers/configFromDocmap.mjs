import "../../../../../chunk-TD77TI6B.mjs";
function configFromDocmap(docmap, path) {
  const newObj = {};
  Object.keys(docmap.map).forEach((namespace) => {
    if (namespace.startsWith("@coffeekraken.s-vite")) {
      console.log(namespace);
    }
    if (!namespace.includes(path + "."))
      return;
    newObj[namespace.replace(path + ".", "")] = docmap.map[namespace];
  });
  return newObj;
}
export {
  configFromDocmap as default
};
