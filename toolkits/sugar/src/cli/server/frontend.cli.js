const __FrontendServerCli = require('../../node/server/frontend/SFrontendServerCli');
const __output = require('../../node/process/output');
const __isChildProcess = require('../../node/is/childProcess');

module.exports = (stringArgs = '') => {
  const cli = new __FrontendServerCli({
    output: {
      maxItemsByGroup: 1,
      filter: (data, metas) => {
        // if (metas.level > 3) return false;
        return true;
      }
    }
  });
  cli.run(stringArgs);
};
