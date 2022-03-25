import __dirname from "@coffeekraken/sugar/node/fs/dirname";
import __path from "path";
function frontstackRecipeDefault_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    title: "Default",
    description: "Default s-frontstack recipe ",
    templateDir: __path.resolve(`${__dirname()}/../templates/default`),
    requirements: {
      commands: ["[config.package.manager]", "composer"]
    },
    defaultStack: "dev",
    stacks: {
      new: {
        description: "Init a new project with this recipe",
        actions: {
          copy: {
            extends: "copy",
            title: "Copy default template",
            description: "Copy the default template files",
            params: {
              src: __path.resolve(__dirname(), `../templates/default/.`),
              dest: `${process.cwd()}/default`,
              chdir: true
            }
          },
          rename: {
            extends: "rename",
            title: "Rename default template package",
            description: "Renamt the default template package with the user input",
            params: {}
          },
          addSugarJson: {
            extends: "addSugarJson",
            title: "Add the sugar.json file",
            description: "Add the sugar.json file",
            params: {
              recipe: "default"
            }
          },
          addManifestJson: {
            extends: "addManifestJson",
            title: "Add manifest.json file",
            description: "Add the manifest.json file",
            params: {}
          },
          installDependencies: {
            extends: "installDependencies",
            title: "Install the dependencies",
            description: "Install the package dependencies (npm,composer)",
            params: {}
          }
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
        sharedParams: {},
        actions: {
          postcssBuild: "[config.frontstack.actions.postcssBuild]",
          viteBuild: "[config.frontstack.actions.viteBuild]",
          imagesBuild: "[config.frontstack.actions.imagesBuild]",
          faviconBuild: "[config.frontstack.actions.faviconBuild]",
          docmapBuild: "[config.frontstack.actions.docmapBuild]",
          sitemapBuild: "[config.frontstack.actions.sitemapBuild]"
        }
      }
    }
  };
}
export {
  frontstackRecipeDefault_config_default as default
};
