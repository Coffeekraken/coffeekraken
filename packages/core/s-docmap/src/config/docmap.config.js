import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
import __commonTextFileExtensions from "@coffeekraken/sugar/shared/extension/commonTextFileExtensions";
function docmap_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    read: {
      input: `${__packageRoot()}/docmap.json`
    },
    snapshot: {
      outDir: `[config.storage.package.rootDir]/.docmap`
    },
    installSnapshot: {
      glob: `[config.storage.package.rootDir]/.docmap/*`
    },
    build: {
      globs: [
        "*",
        `src/!(css)/*{0,4}/*.+(${__commonTextFileExtensions(false).join("|")})`,
        `dist/+(css)/*`
      ],
      exclude: [
        "**/__tests__/**/*",
        "**/__tests__.wip/**/*",
        "**/__wip__/**/*"
      ],
      noExtends: false,
      filters: {
        namespace: /#\{.*\}/gm
      },
      tags: [
        "name",
        "type",
        "menu",
        "default",
        "platform",
        "description",
        "namespace",
        "status",
        "example",
        "interface",
        "async",
        "static",
        "since",
        "author"
      ],
      save: true,
      outPath: `[config.storage.package.rootDir]/docmap.json`
    }
  };
}
export {
  docmap_config_default as default
};
