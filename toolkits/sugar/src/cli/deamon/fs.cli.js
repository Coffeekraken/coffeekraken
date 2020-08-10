const __SWatchFsDeamonCli = require('../../node/deamon/fs/SWatchFsDeamonCli');
const __sugarConfig = require('../../node/config/sugar');
const __isChildProcess = require('../../node/is/childProcess');
const __SError = require('../../node/error/SError');

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
  } else {
    if (!args.input || !args.command) {
      throw new __SError(
        `You need to specify at least a name using the "--name" parameter, or an input and command value using the "--input" and "--command" parameter...`
      );
    }
  }

  const cli = new __SWatchFsDeamonCli({
    output: true
  });
  cli.run(args);
};
