const __parseArgs = require('../../node/cli/parseArgs');
const __packageRoot = require('../../node/path/packageRoot');
const __sugarConfig = require('../../node/config/sugar');
const __SSimpleApp = require('../../node/terminal/SSimpleApp');
const __SHeader = require('../../node/terminal/SHeader');
const __pkg = require('../../../package.json');

const __blessed = require('blessed');
const __BuildScssSPanel = require('../build/scss.cli');

module.exports = async (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {});

  global.SugarApp = new __SSimpleApp('Sugar', {
    homeRoute: 'build/scss',
    package: __pkg,
    menu: {
      'build/scss': {
        title: 'SCSS'
      },
      'build/js': {
        title: 'JS'
      }
    },
    routes: {
      'build/{what}': {
        title: 'Sugar Build [what]',
        content: (params) => {
          return `sugar build.${params.what.value}`;
        }
      }
    }
  });
};
