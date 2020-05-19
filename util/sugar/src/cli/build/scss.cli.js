const __isChildProcess = require('../../node/is/childProcess');
const __buildScss = require('../../node/build/scss');
const __parseHtml = require('../../node/terminal/parseHtml');
const __SProcess = require('../../node/terminal/SProcess');
const __SProcessPanel = require('../../node/blessed/SProcessPanel');
const __parseArgs = require('../../node/cli/parseArgs');
const __ScssBuildSProcess = require('../../node/build/process/ScssBuildSProcess');
const __sugarConfig = require('../../node/config/sugar');
const __initSugar = require('../../node/index');

const definition = {
  input: {
    type: 'String',
    alias: 'i',
    default: __sugarConfig('build.scss.input') || 'src/scss/**/*.scss'
  },
  output: {
    type: 'String',
    alias: 'o',
    default: __sugarConfig('build.scss.output') || 'dist/css'
  },
  watch: {
    type: 'String',
    alias: 'w',
    default: __sugarConfig('build.scss.watch') || 'src/scss/**/*.scss'
  },
  style: {
    type: 'String',
    alias: 's',
    default: __sugarConfig('build.scss.style') || 'expanded'
  },
  map: {
    type: 'Boolean',
    alias: 'm',
    default: __sugarConfig('build.scss.map') || true
  },
  prod: {
    type: 'Boolean',
    alias: 'p',
    default: __sugarConfig('build.scss.prod') || false
  },
  'include.sugar': {
    type: 'Boolean',
    default: __sugarConfig('build.scss.include.sugar') || true
  },
  'vendor.sass': {
    type: 'Object',
    default: __sugarConfig('build.scss.vendor.sass') || {}
  }
};

module.exports = (stringArgs = '') => {
  console.log('COCO');
  console.warn('COCO');
  console.error('COCO');
  console.debug({ hello: 'world' });

  // const args = __parseArgs(stringArgs, definition);

  // if (__isChildProcess()) {
  //   const build = __buildScss(args);
  //   build.on('log', (message) => {
  //     console.log(message);
  //   });
  //   return;
  // }

  // const scssBuildProcess = new __ScssBuildSProcess();
  // const panel = new __SProcessPanel(scssBuildProcess, {});
  // global.screen.append(panel);
};
module.exports.definition = definition;
