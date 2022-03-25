import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
function sFile_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    classesMap: {
      "tsconfig.*": `${__packageRoot(__dirname())}/src/node/ts/STsconfigFile`,
      "*.js,*.jsx": `${__packageRoot(__dirname())}/src/node/js/SJsFile`,
      "*.ts,*.tsx": `${__packageRoot(__dirname())}/src/node/typescript/STsFile`,
      "*.scss,*.sass": `${__packageRoot(__dirname())}/src/node/scss/SScssFile`,
      "*.svelte": `${__packageRoot(__dirname())}/src/node/svelte/SSvelteFile`
    }
  };
}
export {
  sFile_config_default as default
};
