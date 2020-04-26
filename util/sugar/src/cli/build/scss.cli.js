const __parseArgs = require('../../node/cli/parseArgs');
const __packageRoot = require('../../node/path/packageRoot');
const __sugarConfig = require('../../node/config/sugar');
const __buildScss = require('../../node/build/scss');
const __SPanel = require('../../node/terminal/SPanel');

module.exports = async (stringArgs = '') => {
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

  const panel = new __SPanel('sugar.cli.build.scss', {
    beforeLog: () => {
      return (
        '<blue>' +
        (new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds() +
          '</blue> > ')
      );
    }
  });

  setTimeout(() => {
    panel.log('Hello world');
  }, 1000);

  __buildScss(args).on('log', (message) => {
    // console.log(message);
    panel.log(message);
  });
  // .compiled((file) => {
  //   console.log('COCO', file);
  // })
  // .then((value) => {
  //   console.log('then', value);
  // })
  // .catch((error) => {
  //   console.log('error', error);
  // });
};
