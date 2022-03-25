import __dirname from "@coffeekraken/sugar/node/fs/dirname";
function frontendServer_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    port: env.env === "production" ? 9090 : 8080,
    hostname: "127.0.0.1",
    rootDir: `[config.storage.package.rootDir]`,
    staticDirs: {
      "/dist": env.env === "production" ? `[config.storage.dist.rootDir]` : `[config.storage.src.rootDir]`
    },
    viewsDir: `[config.storage.src.rootDir]/views`,
    logLevel: "info",
    proxy: {},
    middlewares: {
      bench: {
        description: `Track how many times take a request`,
        path: `${__dirname()}/../node/middleware/benchMiddleware`,
        settings: {}
      },
      request: {
        description: `Inject the "request" object for views`,
        path: `${__dirname()}/../node/middleware/requestMiddleware`,
        settings: {}
      },
      env: {
        description: `Inject an "env" object for the views`,
        path: `${__dirname()}/../node/middleware/envMiddleware`,
        settings: {}
      },
      packageJson: {
        description: `Inject a "packageJson" object for the views`,
        path: `${__dirname()}/../node/middleware/packageJsonMiddleware`,
        settings: {}
      }
    },
    modules: {
      docmap: {
        description: 'This module gives you access to a "docmap" object in the views',
        path: `${__dirname()}/../node/modules/docmap/docmap`,
        settings: {}
      },
      redirect: {
        description: "This module allows you to make redirections depending on requested path",
        path: `${__dirname()}/../node/modules/redirect/redirect`,
        settings: {}
      },
      styleguide: {
        description: "This module handle the /styleguide/... views display",
        path: `${__dirname()}/../node/modules/styleguide/styleguide`,
        settings: {}
      },
      config: {
        description: 'This module gives you access to a "config" and a "configFiles" object into the views',
        path: `${__dirname()}/../node/modules/config/config`,
        settings: {}
      },
      frontspec: {
        description: 'This module gives you access to a "frontspec" object into the views',
        path: `${__dirname()}/../node/modules/frontspec/frontspec`,
        settings: {}
      },
      api: {
        description: "This module handle the /api/... views display",
        path: `${__dirname()}/../node/modules/api/api`,
        settings: {}
      },
      view: {
        description: "This module handle the /view/... views display",
        path: `${__dirname()}/../node/modules/view/view`,
        settings: {
          slug: "/view/*",
          indexView: "index"
        }
      }
    },
    routes: {
      "/": {
        handler: "view"
      },
      "/docmap.json": {
        handler: "docmap"
      }
    },
    handlers: {
      doc: {
        description: `Display some documentation sourced from markdown files`,
        path: `${__dirname()}/../node/handlers/doc`
      },
      markdown: {
        description: `Display some documentation sourced from markdown files`,
        path: `${__dirname()}/../node/handlers/markdown`
      },
      docmap: {
        description: `Serve some docmap item(s) depending on request`,
        path: `${__dirname()}/../node/handlers/docmap`
      }
    }
  };
}
export {
  frontendServer_config_default as default
};
