import __path from "path";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
var sitemapBuilder_config_default = (env, config) => {
  if (env.platform !== "node")
    return;
  return {
    build: {
      output: `[config.storage.package.rootDir]/sitemap.xml`
    },
    sources: {
      docmap: {
        active: true,
        settings: {},
        path: __path.resolve(`${__dirname()}/../node/sources/SSitemapBuilderDocmapSource`)
      }
    }
  };
};
export {
  sitemapBuilder_config_default as default
};
