import __dirname from "@coffeekraken/sugar/node/fs/dirname";
import __path from "path";
const recipe = "default";
function frontstackRecipeLitElement_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    title: "LitElement component",
    description: "LitElement webcomponent recipe",
    templateDir: __path.resolve(`${__dirname()}/../templates/litElement`),
    defaultStack: "dev",
    stacks: {
      dev: {
        description: "Start the development stack",
        actions: {
          vite: "[config.frontstack.actions.vite]"
        }
      },
      build: {
        description: "Build your final production ready dist package",
        actions: {
          viteBuild: {
            action: "[config.frontstack.actions.viteBuild]",
            params: {
              lib: true
            }
          }
        }
      }
    }
  };
}
export {
  frontstackRecipeLitElement_config_default as default
};
