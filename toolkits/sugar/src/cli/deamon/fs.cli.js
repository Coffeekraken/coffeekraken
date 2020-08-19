const __SFsDeamonCli = require('../../node/deamon/fs/SFsDeamonCli');
module.exports = (stringArgs = '') => {
  // const deamon = new __SFsDeamon();
  // const promise = deamon.watch(stringArgs);
  // if (!process.env.IS_CHILD_PROCESS) {
  //   __output(promise);
  // }

  // setTimeout(() => {
  //   deamon.cancel();
  // }, 2000);

  // return;
  const cli = new __SFsDeamonCli(stringArgs, {
    output: {}
  });
  cli.run();
};
