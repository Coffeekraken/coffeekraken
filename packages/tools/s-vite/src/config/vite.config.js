import __path from "path";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
import __loadConfigFile from "@coffeekraken/sugar/node/config/loadConfigFile";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
async function preprocess(env, rawViteConfig, rawConfig) {
  var _a;
  const config = (_a = await __loadConfigFile("vite.config.js")) != null ? _a : {};
  return __deepMerge(rawViteConfig, config);
}
function vite_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    root: "[config.storage.package.rootDir]",
    base: "/",
    logLevel: "error",
    mode: "development",
    resolve: {
      alias: {
        static: "",
        vue: "vue/dist/vue.esm-bundler.js"
      }
    },
    plugins: [
      __path.resolve(`${__dirname()}/../node/plugins/sugarPlugin`),
      __path.resolve(`${__dirname()}/../node/plugins/postcssPlugin`)
    ],
    publicDir: "[config.storage.src.rootDir]/public",
    cacheDir: "[config.storage.package.cacheDir]/vite",
    clearScreen: false,
    optimizeDeps: {
      entries: ["index.html"]
    },
    build: {
      lib: {
        entry: "[config.storage.src.rootDir]/js/index.ts",
        name: "index"
      },
      outDir: "[config.storage.dist.jsDir]"
    },
    server: {
      host: "127.0.0.1",
      port: 3e3,
      hostname: "http://[config.vite.server.host]:[config.vite.server.port]",
      proxy: {
        "^(?:(?!\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs|@vite|\\.local|@fs|__vite_ping|index.html).)*$": {
          target: `http://localhost:8080`,
          changeOrigin: true
        },
        "/dist": {
          target: `http://localhost:3000`,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => {
            return path.replace(/\/dist\//, "/src/");
          }
        }
      }
    },
    css: {},
    rewrites: [
      __path.resolve(`${__dirname()}/../node/rewrites/handlebars`)
    ]
  };
}
export {
  vite_config_default as default,
  preprocess
};
