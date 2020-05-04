const __parseArgs = require('../../node/cli/parseArgs');
const __SPhpDependency = require('../../node/dependency/SPhpDependency');

const __SProcess = require('../../node/terminal/SProcess');

module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {
    version: {
      alias: 'v',
      default: null
    }
  });

  class MyProcess extends __SProcess {
    _watch = false;

    constructor() {
      super(
        {
          install: 'npm install',
          doSomething: 'php -v',
          another: 'node .',
          failling: 'curl -v'
        },
        {
          keys: {
            run: {
              key: 'r',
              type: 'run',
              command: 'doSomething'
            },
            watch: {
              key: 'w',
              type: 'toggle',
              path: '_watch'
            }
          }
        }
      );
    }
  }

  const pro = new MyProcess()
    .on('toggle', (key) => {
      console.log('toggle', key);
    })
    .on('run', (key) => {
      console.log('run', key);
    })
    .then((value) => {
      console.log('then', value);
    });

  // const dep = new __SPhpDependency();
  // dep.install(args.version);
};
