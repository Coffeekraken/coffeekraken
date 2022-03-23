import "../../../../../../chunk-TD77TI6B.mjs";
import __SDocmap from "@coffeekraken/s-docmap";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
async function view(express, settings, config) {
  var _a;
  const docmap = new __SDocmap();
  const docmapJson = await docmap.read();
  const menu = docmapJson.menu;
  config.handlers.view = {
    path: `${__dirname()}/viewHandler`
  };
  config.routes[(_a = settings.slug) != null ? _a : "/view/*"] = {
    handler: "view"
  };
  return true;
}
export {
  view as default
};
