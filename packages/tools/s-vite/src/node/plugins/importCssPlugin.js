function importCssPlugin() {
  return {
    name: "vite-import-css",
    apply: "build",
    enforce: "post",
    transform(src, id) {
      if (!id.match(/\.(js|jsx|ts|tsx|riot|vue|svelte)$/))
        return;
      console.log(src);
      return {
        code: src,
        map: null
      };
    },
    load(id) {
      console.log(id);
    }
  };
}
var importCssPlugin_default = importCssPlugin();
export {
  importCssPlugin_default as default
};
