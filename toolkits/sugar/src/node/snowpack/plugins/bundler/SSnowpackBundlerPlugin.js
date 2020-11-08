const __defaultInputOptions = require('./defaultInputOptions');
const __defaultOutputOptions = require('./defaultOutputOptions');
const __rollup = require('rollup');
const __os = require('os');
const __path = require('path');
const __spawnSync = require('child_process').spawnSync;
const __glob = require('glob');

const TMP_BUILD_DIRECTORY = __path.join(__os.tmpdir(), 'build');

function __shellRun(cmd, options = {}) {
  options.stdio = options.stdio || 'inherit';
  options.shell = options.shell || true;
  options.encoding = options.encoding || 'utf8';
  return __spawnSync(cmd, options);
}

function __getEntrypoints(entrypoints, buildDirectory) {
  if (typeof entrypoints === 'string') {
    const obj = {};

    __glob.sync(entrypoints).forEach((file) => {
      const { dir, name } = __path.parse(file);

      // This fixes issues that were causing x.js-[hash].js
      const fileWithoutExt = __path.join(dir, name);
      const buildFile = __path.relative(buildDirectory, fileWithoutExt);

      obj[buildFile] = file;
    });
    return obj;
  }

  return entrypoints;
}

module.exports = function SSnowpackBundlerPlugin(
  snowpackConfig,
  pluginOptions = {}
) {
  async function bundle(inputOptions = {}, outputOptions = {}) {
    // const bundle = await __rollup.rollup(inputOptions);
    // const { output } = await bundle.generate(outputOptions);
    // // or write the bundle to disk
    // await bundle.write(outputOptions);

    const baseUrl = snowpackConfig.devOptions.baseUrl || '/';
    const TMP_DEBUG_DIRECTORY = __path.join(__os.tmpdir(), '_source_');

    const buildDirectory = outputOptions.dir;
    outputOptions.dir = TMP_BUILD_DIRECTORY;

    const entrypoints = __getEntrypoints(
      pluginOptions.entrypoints,
      buildDirectory
    );

    console.log(entrypoints);

    const bundle = await __rollup.rollup(inputOptions);
    const { output } = await bundle.generate(outputOptions);
    await bundle.write(outputOptions);

    __shellRun(
      `rm -rf ${TMP_DEBUG_DIRECTORY} && mkdir -p ${TMP_DEBUG_DIRECTORY}`
    );
    __shellRun(`mv ${buildDirectory} ${TMP_DEBUG_DIRECTORY}`);
    __shellRun(`mv ${TMP_BUILD_DIRECTORY} ${buildDirectory}`);
  }

  return {
    name: 'SSnowpackBundlerPlugin',
    async optimize({ buildDirectory }) {
      const inputOptions = __defaultInputOptions(
        buildDirectory,
        TMP_BUILD_DIRECTORY
      );
      const outputOptions = __defaultOutputOptions(buildDirectory);
      await bundle(inputOptions, outputOptions);
    }
  };
};
