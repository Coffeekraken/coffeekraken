const __parseArgs = require('../../node/cli/parseArgs');
const __packageRoot = require('../../node/path/packageRoot');
const __sugarConfig = require('../../node/config/sugar');
const __SApp = require('../../node/terminal/SApp');
const __SHeader = require('../../node/terminal/SHeader');
const __pkg = require('../../../package.json');

const __blessed = require('blessed');
const __BuildScssSPanel = require('../build/scss.cli');

module.exports = async (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {});

  global.SugarApp = new __SApp('Sugar', {
    homeRoute: '/build/scss',
    layout: async (content) => {
      const container = __blessed.box({
        width: '100%',
        height: '100%'
      });
      const header = new __SHeader(
        `<yellow>Coffeekraken Sugar</yellow>\nv${__pkg.version}`,
        {}
      );

      content.top = header.height;
      content.width = '100%';

      container.append(header);
      container.append(content);

      return container;
    },
    routes: {
      'build/{what}': {
        title: 'Sugar Build [what]',
        content: (params) => {
          return new __BuildScssSPanel('BuildScss', {
            blessed: {
              border: {
                type: 'line'
              },
              style: {
                border: {
                  fg: 'blue'
                }
              }
            }
          });
        }
      }
    }
  });
};
