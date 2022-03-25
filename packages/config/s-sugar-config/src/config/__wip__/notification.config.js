import __packageRootDir from "@coffeekraken/sugar/node/path/packageRootDir";
import __isNode from "@coffeekraken/sugar/shared/is/node";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
function notification_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    enable: true,
    adapters: [__isNode() ? "node" : "browser"],
    adaptersSettings: {},
    types: {
      default: {
        title: "[title]",
        message: "[message]",
        icon: `${__packageRootDir(__dirname())}/src/data/notifications/ck_default.png`
      },
      start: {
        title: "[title]",
        message: "[message]",
        icon: `${__packageRootDir(__dirname())}/src/data/notifications/ck_start.png`
      },
      success: {
        title: "[title]",
        message: "[message]",
        icon: `${__packageRootDir(__dirname())}/src/data/notifications/ck_success.png`
      },
      warning: {
        title: "[title]",
        message: "[message]",
        icon: `${__packageRootDir(__dirname())}/src/data/notifications/ck_warning.png`
      },
      error: {
        title: "[title]",
        message: "[message]",
        icon: `${__packageRootDir(__dirname())}/src/data/notifications/ck_error.png`
      }
    }
  };
}
export {
  notification_config_default as default
};
