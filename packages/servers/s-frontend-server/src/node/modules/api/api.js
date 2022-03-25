import __SDocmap from "@coffeekraken/s-docmap";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
import __set from "@coffeekraken/sugar/shared/object/set";
async function api(express, settings, config) {
  config.handlers.api = {
    description: "Handler that display the api documentation",
    path: `${__dirname()}/apiHandler`
  };
  const docmap = new __SDocmap();
  const docmapJson = await docmap.read();
  const apiMenu = {};
  Object.keys(docmapJson.map).forEach((namespace) => {
    const docmapObj = docmapJson.map[namespace];
    const url = `/api/${namespace}`;
    __set(apiMenu, namespace, {
      type: docmapObj.type,
      name: docmapObj.name,
      namespace,
      url,
      path: docmapObj.path,
      relPath: docmapObj.relPath
    });
    config.routes[url] = {
      handler: "api"
    };
  });
  return true;
}
export {
  api as default
};
