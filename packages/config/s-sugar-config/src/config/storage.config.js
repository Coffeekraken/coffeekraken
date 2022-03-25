import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
import __systemTmpDir from "@coffeekraken/sugar/node/path/systemTmpDir";
function storage_config_default(env) {
  return {
    system: {
      tmpDir: __systemTmpDir()
    },
    package: {
      rootDir: `${__packageRoot(process.cwd())}`,
      localDir: `[config.storage.package.rootDir]/.local`,
      cacheDir: `[config.storage.package.localDir]/cache`,
      tmpDir: `[config.storage.package.localDir]/temp`,
      nodeModulesDir: `[config.storage.package.rootDir]/node_modules`
    },
    sugar: {
      rootDir: `${__packageRoot(__dirname())}`
    },
    src: {
      rootDir: `[config.storage.package.rootDir]/src`,
      jsDir: `[config.storage.src.rootDir]/js`,
      nodeDir: `[config.storage.src.rootDir]/node`,
      cssDir: `[config.storage.src.rootDir]/css`,
      docDir: `[config.storage.src.rootDir]/doc`,
      fontsDir: `[config.storage.src.rootDir]/fonts`,
      iconsDir: `[config.storage.src.rootDir]/icons`,
      imgDir: `[config.storage.src.rootDir]/img`,
      viewsDir: `[config.storage.src.rootDir]/views`
    },
    dist: {
      rootDir: `[config.storage.package.rootDir]/dist`,
      jsDir: `[config.storage.dist.rootDir]/js`,
      nodeDir: `[config.storage.dist.rootDir]/node`,
      cssDir: `[config.storage.dist.rootDir]/css`,
      docDir: `[config.storage.dist.rootDir]/doc`,
      fontsDir: `[config.storage.dist.rootDir]/fonts`,
      iconsDir: `[config.storage.dist.rootDir]/icons`,
      imgDir: `[config.storage.dist.rootDir]/img`,
      viewsDir: `[config.storage.dist.rootDir]/views`
    },
    exclude: [
      "**/bin/**",
      "**/.DS_Store",
      "**/__WIP__/**",
      "**/__wip__/**",
      "**/__TESTS/**",
      "**/__tests__/**",
      "**/__tests__.wip/**",
      "**/.*/**",
      "**/node_modules/**"
    ]
  };
}
export {
  storage_config_default as default
};
