const __parseArgs = require('../../node/cli/parseArgs');
const __SBuildScssCli = require('../../node/build/scss/SBuildScssCli');
const __SBuildScssActionsStream = require('../../node/build/scss/SBuildScssActionsStream');
const __output = require('../../node/process/output');

module.exports = (stringArgs = '') => {
  const cli = new __SBuildScssCli();
  const proc = cli.run(stringArgs);
  __output(proc);

  // const args = __parseArgs(stringArgs, __SBuildScssCli.definitionObj);
  // const stream = new __SBuildScssActionsStream({});
  // const proc = stream.start(args);
  // __output(proc);
  // process.stdin.setRawMode(true);
  // process.stdin.on('keypress', function (chunk, key) {
  //   if (key && key.name === 'c' && key.ctrl) {
  //     console.log('bye bye');
  //     process.exit();
  //   }
  // });
  // console.log('hello');
};
