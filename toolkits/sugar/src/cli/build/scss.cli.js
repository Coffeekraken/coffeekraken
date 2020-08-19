const __SBuildScssCli = require('../../node/build/scss/SBuildScssCli');

module.exports = (stringArgs = '') => {
  const cli = new __SBuildScssCli(stringArgs, {
    output: {}
  });
  cli.run();

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
