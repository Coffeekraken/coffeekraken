const __parseArgs = require('../../node/cli/parseArgs');
// const __SPhpDependency = require('../../node/dependency/SPhpDependency');

const __SProcess = require('../../node/terminal/SProcess');
const __SPanel = require('../../node/terminal/SPanel');
const __SProcessPanel = require('../../node/terminal/SProcessPanel');
const __SPhpServerProcess = require('../../node/server/SPhpServerProcess');

module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {
    version: {
      alias: 'v',
      default: null
    }
  });

  // class MyProcess extends __SProcess {
  //   constructor() {
  //     super(
  //       {
  //         install: 'npm install',
  //         doSomething: 'php -v',
  //         another: 'node .',
  //         failling: 'curl -v'
  //       },
  //       {
  //         keys: {
  //           run: {
  //             key: 'r',
  //             type: 'run',
  //             menu: 'Do Something',
  //             command: 'doSomething'
  //           },
  //           watch: {
  //             key: 'w',
  //             type: 'toggle',
  //             menu: 'Watch'
  //           }
  //         }
  //       }
  //     );
  //   }
  // }

  // const pro = new MyProcess();

  const pro = new __SPhpServerProcess({});

  const panel = new __SProcessPanel(pro, {
    screen: true
  });

  // const dep = new __SPhpDependency();
  // dep.install(args.version);
};
