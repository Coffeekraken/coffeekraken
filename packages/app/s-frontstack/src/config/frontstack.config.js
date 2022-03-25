function frontstack_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    defaultRecipe: "default",
    exclude: [],
    recipes: {
      default: "[config.frontstackRecipeDefault]",
      nextJs: "[config.frontstackRecipeNextJs]",
      litElement: "[config.frontstackRecipeLitElement]",
      feature: "[config.frontstackRecipeFeature]"
    },
    actions: {
      copy: {
        title: "Copy file/directory",
        description: "Copy a file or a directory from the source to the destination passed in params",
        command: `sugar fs.copy [arguments]`,
        params: {},
        settings: {}
      },
      rename: {
        title: "Rename project",
        description: "Rename a project (folder, package.json, etc...)",
        command: `sugar package.rename [arguments]`,
        params: {},
        settings: {}
      },
      addSugarJson: {
        title: "Adding sugar.json file",
        description: "Adding the sugar.json file to the project",
        command: `sugar add.sugarJson [arguments]`,
        params: {},
        settings: {}
      },
      addManifestJson: {
        title: "Adding manifest.json file",
        description: "Adding the manifest.json file to the project",
        command: `sugar add.manifestJson [arguments]`,
        params: {},
        settings: {}
      },
      addSugarPostcss: {
        title: "Adding sugar postcss plugin",
        description: "Adding the sugar postcss plugin to the project",
        command: `sugar postcss.installPlugin [arguments]`,
        params: {},
        settings: {}
      },
      installDependencies: {
        title: "Install dependencies",
        description: "Install dependencies like node_modules and composer if exists",
        command: `sugar package.install [arguments]`,
        params: {},
        settings: {}
      },
      frontendServer: {
        title: "Frontend server",
        description: "Frontend server using the @coffeekraken/s-frontend-server package",
        command: "%sugar frontendServer.start [arguments]",
        params: {},
        settings: {
          processManager: {
            restart: true
          }
        }
      },
      postcssBuild: {
        title: "PostCSS build action",
        description: "Build css using the amazing PostCSS package",
        command: "%sugar postcss.build [arguments]",
        params: {},
        settings: {
          processManager: {}
        }
      },
      imagesBuild: {
        title: "Images build action",
        description: "Build your images with ease. Compress, resize, webp version, etc...",
        command: "%sugar images.build [arguments]",
        params: {},
        settings: {
          processManager: {}
        }
      },
      vite: {
        title: "Vite development stack",
        description: "Allow to build files easily while developing",
        command: "%sugar vite [arguments]",
        params: {},
        settings: {
          processManager: {}
        }
      },
      viteBuild: {
        title: "Vite build stack",
        description: "Allow to compile javascript (js, ts, riot, react, etc...) files easily",
        command: "%sugar vite.build [arguments]",
        params: {},
        settings: {
          processManager: {}
        }
      },
      docmapBuild: {
        title: "Docmap build action",
        description: "Allow to build and maintain up to date the docmap.json file",
        command: "%sugar docmap.build [arguments]",
        params: {},
        settings: {
          processManager: {}
        }
      },
      sitemapBuild: {
        title: "Sitemap build action",
        description: "Allow to build and maintain up to date the sitemap.xml file",
        command: "%sugar sitemap.build [arguments]",
        params: {},
        settings: {
          processManager: {}
        }
      },
      faviconBuild: {
        title: "Docmap build action",
        description: "Allow to build and maintain up to date your favicon files and the manifest.json",
        command: "%sugar favicon.build [arguments]",
        params: {},
        settings: {
          processManager: {}
        }
      }
    }
  };
}
export {
  frontstack_config_default as default
};
