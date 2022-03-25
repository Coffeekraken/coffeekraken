import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
function frontstackRecipeNextJs_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    title: "NextJs",
    description: "Create easily a next.js app with coffeekraken tools support",
    requirements: {
      commands: ["[config.package.manager]"]
    },
    defaultStack: "dev",
    stacks: {
      new: {
        description: "Init a new next.js project",
        actions: {
          createApp: __deepMerge(config.frontstack.actions.copy, {
            title: "Create the app",
            description: "Create the app using the create-next-app utility",
            command: `npx create-next-app next-js --typescript`,
            after() {
              process.chdir(`${process.cwd()}/next-js`);
            },
            params: {},
            settings: {}
          }),
          rename: __deepMerge(config.frontstack.actions.rename, {
            params: {}
          }),
          addSugarJson: __deepMerge(config.frontstack.actions.addSugarJson, {
            params: {
              recipe: "nextJs"
            }
          }),
          addManifestJson: __deepMerge(config.frontstack.actions.addManifestJson, {
            params: {}
          }),
          addSugarPostcss: __deepMerge(config.frontstack.actions.addSugarPostcss, {
            params: {}
          })
        }
      },
      dev: {
        description: "Start the development stack",
        runInParallel: true,
        actions: {
          frontendServer: "[config.frontstack.actions.frontendServer]",
          vite: "[config.frontstack.actions.vite]"
        }
      },
      prod: {
        description: "Start the production testing stack",
        sharedParams: {
          env: "production"
        },
        actions: {
          frontendServer: "[config.frontstack.actions.frontendServer]"
        }
      },
      build: {
        description: "Build your final production ready dist package",
        sharedParams: {
          prod: true
        },
        actions: {
          postcssBuild: "[config.frontstack.actions.postcssBuild]",
          viteBuild: "[config.frontstack.actions.viteBuild]",
          imagesBuild: "[config.frontstack.actions.imagesBuild]"
        }
      }
    }
  };
}
export {
  frontstackRecipeNextJs_config_default as default
};
