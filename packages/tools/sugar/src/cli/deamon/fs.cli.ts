const __SFsDeamonProcess = require('../../node/deamon/fs/SFsDeamonProcess');
module.exports = (stringArgs = '') => {
  const pro = new __SFsDeamonProcess();
  pro.run(stringArgs);
};
