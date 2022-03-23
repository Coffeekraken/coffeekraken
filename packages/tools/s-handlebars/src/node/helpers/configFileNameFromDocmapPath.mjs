import "../../../../../chunk-TD77TI6B.mjs";
function configFileNameFromDocmapPath(namespace) {
  if (!namespace.match(/^[a-zA-Z0-9_\-\.@]+\.config\.[a-zA-Z0-9_\-]+$/)) {
    throw new Error(`Sorry but the passed config path "${namespace}" is not a valid one and does not exists in the docmap`);
  }
  return `${namespace.split(".").pop()}.config.js`;
}
export {
  configFileNameFromDocmapPath as default
};
