const __parseArgs = require('../../cli/parseArgs');
const __packageRoot = require('../../path/packageRoot');
const __sugarConfig = require('../../config/sugar');
const __buildScss = require('../scss');
const __SLogPanel = require('../../blessed/SLogPanel');
const __deepMerge = require('../../object/deepMerge');

module.exports = class ScssBuildSPanel extends __SProcessPanel {
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          name: 'Sugar Build SCSS',
          beforeLog: () => {
            return '<blue><time/></blue> ';
          }
        },
        settings
      )
    );
  }

  async build(stringArgs = '') {
    const args = __parseArgs(stringArgs, {
      input: {
        type: 'String',
        alias: 'i',
        default:
          (await __sugarConfig('cli.build.scss.input')) ||
          `${__packageRoot(process.cwd())}/src/scss/[^_]*.scss`
      },
      output: {
        type: 'String',
        alias: 'o',
        default:
          (await __sugarConfig('cli.build.scss.output')) ||
          `${__packageRoot(process.cwd())}/dist/css`
      },
      watch: {
        type: 'Boolean',
        alias: 'w',
        default: (await __sugarConfig('cli.build.scss.watch')) || false
      },
      style: {
        type: 'String',
        alias: 's',
        default: (await __sugarConfig('cli.build.scss.style')) || 'expanded'
      },
      map: {
        type: 'Boolean',
        alias: 'm',
        default: await __sugarConfig('cli.build.scss.map')
      },
      prod: {
        type: 'Boolean',
        alias: 'p',
        default: await __sugarConfig('cli.build.scss.prod')
      },
      'include.sugar': {
        type: 'Boolean',
        default:
          (await __sugarConfig('cli.build.scss.include.sugar')) === undefined
            ? true
            : await __sugarConfig('cli.build.scss.include.sugar')
      }
    });

    const _this = this;
    __buildScss(args).on('log', (message) => {
      _this.log(message);
    });
  }
};
