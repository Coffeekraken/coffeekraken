const __parseArgs = require('../../node/cli/parseArgs');
// const __SPhpDependency = require('../../node/dependency/SPhpDependency');

const __scss = require('../../node/build/scss');

const __SProcess = require('../../node/terminal/SProcess');
const __SProcessPanel = require('../../node/blessed/SProcessPanel');
const __SPhpServerProcess = require('../../node/server/SPhpServerProcess');

const __sugarTermApp = require('../../../termapp/src/node/index');

module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {
    version: {
      alias: 'v',
      default: null
    }
  });

  // class MyProcess extends __SProcessPanel {
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

  // __sugarTermApp.exec([
  //   {
  //     command: ''
  //   },
  //   'ps something wrint wijfwij iowjefijweofji weoi'
  // ]);

  // const pro = new __SPhpServerProcess({});
  // __sugarTermApp.process(pro);

  const myCoolProcess = new __SProcess({
    build: {
      command: () => {
        return __scss();
      }
    }
  });
  __sugarTermApp.process(myCoolProcess);

  // const dep = new __SPhpDependency();
  // dep.install(args.version);
};
