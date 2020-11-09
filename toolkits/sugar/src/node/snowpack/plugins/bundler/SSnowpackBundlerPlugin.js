const __isPath = require('../../../is/path');
const __defaultInputOptions = require('./defaultInputOptions');
const __defaultOutputOptions = require('./defaultOutputOptions');
const __rollup = require('rollup');
const __os = require('os');
const __path = require('path');
const __spawnSync = require('child_process').spawnSync;
const __glob = require('glob');
const __deepMerge = require('../../../object/deepMerge');
const __deepMap = require('../../../object/deepMap');

const TMP_BUILD_DIRECTORY = __path.join(__os.tmpdir(), 'build');
let BUILD_DIRECTORY;

function __shellRun(cmd, options = {}) {
  options.stdio = options.stdio || 'inherit';
  options.shell = options.shell || true;
  options.encoding = options.encoding || 'utf8';
  return __spawnSync(cmd, options);
}

module.exports = function SSnowpackBundlerPlugin(
  snowpackConfig,
  pluginOptions = {}
) {
  async function bundle(inputOptions = {}, outputOptions = {}) {
    const baseUrl = snowpackConfig.devOptions.baseUrl || '/';
    const TMP_DEBUG_DIRECTORY = __path.join(__os.tmpdir(), '_source_');

    const buildDirectory = BUILD_DIRECTORY;

    inputOptions = __deepMap(inputOptions, (value, prop) => {
      if (typeof value === 'string') {
        value = value.replace('[build]', buildDirectory);
      }
      return value;
    });

    const bundle = await __rollup.rollup(inputOptions);
    // const { output } = await bundle.generate(outputOptions);
    for (let i = 0; i < inputOptions.output.length; i++) {
      const output = inputOptions.output[i];
      await bundle.write(output);
    }

    // __shellRun(
    //   `rm -rf ${TMP_DEBUG_DIRECTORY} && mkdir -p ${TMP_DEBUG_DIRECTORY}`
    // );
    // __shellRun(`mv ${buildDirectory} ${TMP_DEBUG_DIRECTORY}`);
    // __shellRun(`mv ${TMP_BUILD_DIRECTORY} ${buildDirectory}`);
  }

  return {
    name: 'SSnowpackBundlerPlugin',
    async optimize({ buildDirectory }) {
      BUILD_DIRECTORY = buildDirectory;

      const inputOptions = __deepMerge(
        __defaultInputOptions(buildDirectory, TMP_BUILD_DIRECTORY),
        pluginOptions || {}
      );

      // const outputOptions = __deepMerge(
      //   __defaultOutputOptions(buildDirectory),
      //   pluginOptions.outputOptions || {}
      // );
      await bundle(inputOptions);
    }
  };
};
