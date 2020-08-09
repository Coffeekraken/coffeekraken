const __SWatchFsDeamonCli = require('../../node/deamon/fs/SWatchFsDeamonCli');
const __sugarConfig = require('../../node/config/sugar');

module.exports = (stringArgs = '') => {
  const args = __SWatchFsDeamonCli.parseArgs(stringArgs);

  if (args.name) {
    const deamons = __sugarConfig('deamons');
    if (!deamons[args.name]) {
      throw new Error(
        `You try to launch a deamon called "<yellow>${
          args.name
        }</yellow>" but it seemd that it is not availble... Here's the list of available deamons: ${Object.keys(
          deamons
        )
          .map((d) => {
            return `<cyan>${d}</cyan>`;
          })
          .join(', ')}`
      );
    }

    // get the values from the wanted deamon
    args.input = deamons[args.name].input;
    args.command = deamons[args.name].command;
  }

  console.log(args);

  const cli = new __SWatchFsDeamonCli({
    output: {}
  });
  cli.run(args);
};

// // reading the file content
// const content = __fs.readFileSync(filepath, 'utf8');
// const testReg = /\*\s?@test\s+(.*)/g;
// const testMatches = content.match(testReg);
// let testfile;
// if (testMatches && testMatches[0]) {
//   testfile = __path.resolve(
//     path,
//     testMatches[0].replace(/\s?\*\s?@test\s+/, '').trim()
//   );
// } else {
//   testfile = deamonObj.testfile;
//   testfile = testfile.replace('%name', name).replace('%path', path);
// }

// // preparing the command to run
// const runtime = deamonObj.command.split(' ')[0];
// const config = __sugarConfig(runtime);
// const args = __argsToString(config.cli || config);
// let command = deamonObj.command
//   .replace('%path', path)
//   .replace('%name', name)
//   .replace('%testfile', testfile)
//   .replace('%arguments', args);

// console.log(
//   `Running the test "<yellow>${testfile.replace(
//     `${__packageRoot(path)}/`,
//     ''
//   )}</yellow>"...`
// );

// __childProcess
//   .spawn(command, null, {
//     stdio: 'inherit',
//     shell: true
//   })
//   .on('close', () => {
//     delete runningTests[filepath];
//   });
