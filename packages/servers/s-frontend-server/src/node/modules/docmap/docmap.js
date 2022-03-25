import __SDocmap from "@coffeekraken/s-docmap";
import __SPromise from "@coffeekraken/s-promise";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
function docmap(express, settings, config) {
  return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
    const docmap2 = new __SDocmap();
    const docmapJson = await pipe(docmap2.read());
    const menu = docmapJson.menu;
    config.middlewares.docmap = {
      path: `${__dirname()}/docmapMiddleware`,
      settings: {}
    };
    Object.keys(menu.slug).forEach((slug) => {
      config.routes[slug] = {
        handler: "markdown"
      };
    });
    if (menu.packages) {
      Object.keys(menu.packages).forEach((packageName) => {
        var _a;
        const packageObj = menu.packages[packageName];
        Object.keys((_a = packageObj == null ? void 0 : packageObj.slug) != null ? _a : {}).forEach((slug) => {
          config.routes[slug] = {
            handler: "markdown"
          };
        });
      });
    }
    resolve(true);
  });
}
export {
  docmap as default
};
