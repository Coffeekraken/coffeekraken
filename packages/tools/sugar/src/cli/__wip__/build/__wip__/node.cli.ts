// @ts-nocheck

import __SBuildNodeCli from '../../node/build/node/SBuildNodeCli';
import __SBuildNodeActionsStream from '../../node/build/node/SBuildNodeActionsStream';
import __output from '../../node/process/output';
import __SugarConfig from '../../node/config/sugar';

export default (stringArgs = '') => {
  const cli = new __SBuildNodeCli();
  __output(cli.run(stringArgs));
};
