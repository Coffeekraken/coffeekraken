import "../../../../../../chunk-TD77TI6B.mjs";
import __SDocmap from "@coffeekraken/s-docmap";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
async function docmap(express, settings, config) {
  var _a;
  const docmap2 = new __SDocmap();
  const docmapJson = await docmap2.read();
  const menu = docmapJson.menu;
  config.handlers.styleguide = {
    path: `${__dirname()}/styleguideHandler`
  };
  Object.keys((_a = menu.custom.styleguide) == null ? void 0 : _a.slug).forEach((slug) => {
    config.routes[slug] = {
      handler: "styleguide"
    };
  });
  return true;
}
export {
  docmap as default
};
