import __parseArgs from '../../node/cli/parseArgs';
import __SBuildViewCli from '../../node/build/views/SBuildViewsCli';
import __SBuildViewsActionsStream from '../../node/build/views/SBuildViewsActionsStream';
import __output from '../../node/process/output';

export default (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {
    definitionObj: __SBuildViewCli.interface.definitionObj
  });
  const stream = new __SBuildViewsActionsStream({});
  const proc = stream.start(args);
  __output(proc);
};
