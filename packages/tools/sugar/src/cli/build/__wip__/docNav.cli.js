"use strict";
import __parseArgs from '../../../node/cli/parseArgs';
import __SBuildDocNavCli from '../../node/build/docNav/SBuildDocNavCli';
import __SBuildDocNavActionsStream from '../../node/build/docNav/SBuildDocNavActionsStream';
import __output from '../../../node/process/output';

export default (stringArgs = '') => {
    const args = __parseArgs(stringArgs, {
        definitionObj: __SBuildDocNavCli.interface.definitionObj
    });
    const stream = new __SBuildDocNavActionsStream({
        name: 'Build docNav.json'
    });
    const proc = stream.start(args);
    __output(proc);
};
