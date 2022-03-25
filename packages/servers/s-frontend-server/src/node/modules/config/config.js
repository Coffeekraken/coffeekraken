import __dirname from "@coffeekraken/sugar/node/fs/dirname";
async function config(express, settings, config2) {
  config2.middlewares.config = {
    description: 'Middleware that inject a "config" and a "configFiles" object for the views',
    path: `${__dirname()}/configMiddleware`,
    settings: {}
  };
  return true;
}
export {
  config as default
};
