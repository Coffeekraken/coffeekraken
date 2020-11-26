// @ts-nocheck

import __parseArgs from '../../node/cli/parseArgs';
import __SBuildDocCli from '../../node/build/doc/SBuildDocCli';
import __SBuildDocActionsStream from '../../node/build/doc/SBuildDocActionsStream';
import __output from '../../node/process/output';

export default (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {
    definition: __SBuildDocCli.interface.definition
  });
  const stream = new __SBuildDocActionsStream({});
  const proc = stream.start(args);
  __output(proc);
};
