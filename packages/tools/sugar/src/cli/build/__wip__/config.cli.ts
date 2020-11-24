// @ts-nocheck

import __parseArgs from '../../node/cli/parseArgs';
import __SBuildConfigCli from '../../node/build/SBuildConfigCli';
import __SBuildConfigActionsStream from '../../node/build/SBuildConfigActionsStream';
import __output from '../../node/process/output';

export default (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {
    definitionObj: __SBuildConfigCli.interface.definitionObj
  });
  const stream = new __SBuildConfigActionsStream({});
  const proc = stream.start(args);
  __output(proc);
};
