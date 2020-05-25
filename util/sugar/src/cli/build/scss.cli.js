const __isChildProcess = require('../../node/is/childProcess');
const __buildScss = require('../../node/build/scss');
const __parseArgs = require('../../node/cli/parseArgs');
const __SProcessOutput = require('../../node/blessed/SProcessOutput');
const __sugarConfig = require('../../node/config/sugar');

const definition = {
  input: {
    type: 'String',
    alias: 'i',
    description: 'Input files glob pattern',
    default: __sugarConfig('build.scss.input') || 'src/scss/**/*.scss'
  },
  output: {
    type: 'String',
    alias: 'o',
    description: 'Output folder path',
    default: __sugarConfig('build.scss.output') || 'dist/css'
  },
  watch: {
    type: 'String',
    alias: 'w',
    description: 'Watch files glob pattern',
    default: __sugarConfig('build.scss.watch') || 'src/scss/**/*.scss'
  },
  style: {
    type: 'String',
    alias: 's',
    description: 'Output style (nested,expanded,compact,compressed)',
    default: __sugarConfig('build.scss.style') || 'expanded'
  },
  map: {
    type: 'Boolean',
    alias: 'm',
    description: 'Generate a sourcemap file',
    default: __sugarConfig('build.scss.map') || true
  },
  prod: {
    type: 'Boolean',
    alias: 'p',
    description: 'Generate the production ready files',
    default: __sugarConfig('build.scss.prod') || false
  },
  'include.sugar': {
    type: 'Boolean',
    description: 'Include the coffeekraken sugar toolkit',
    default: __sugarConfig('build.scss.include.sugar') || true
  },
  'vendor.sass': {
    type: 'Object',
    description: 'Object passed to the sass compiler',
    default: __sugarConfig('build.scss.vendor.sass') || {}
  }
};

module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, definition);
  const build = __buildScss(args);
  if (__isChildProcess()) {
    build.on('stdout.data', (message) => {
      console.log(message);
    });
    return;
  }
  const output = new __SProcessOutput(build, {});
  output.attach();
};

module.exports.definition = definition;
