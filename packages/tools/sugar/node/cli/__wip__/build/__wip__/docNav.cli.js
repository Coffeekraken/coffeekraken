"use strict";
// @ts-nocheck
const __parseArgs = require('../../../node/cli/parseArgs');
const __SBuildDocNavCli = require('../../node/build/docNav/SBuildDocNavCli');
const __SBuildDocNavActionsStream = require('../../node/build/docNav/SBuildDocNavActionsStream');
const __output = require('../../../node/process/output');
module.exports = (stringArgs = '') => {
    const args = __parseArgs(stringArgs, {
        definition: __SBuildDocNavCli.interface.definition
    });
    const stream = new __SBuildDocNavActionsStream({
        name: 'Build docNav.json'
    });
    const proc = stream.start(args);
    __output(proc);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jTmF2LmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jbGkvX193aXBfXy9idWlsZC9fX3dpcF9fL2RvY05hdi5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUMzRCxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQzdFLE1BQU0sMkJBQTJCLEdBQUcsT0FBTyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7QUFDakcsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFO1FBQ25DLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsVUFBVTtLQUNuRCxDQUFDLENBQUM7SUFDSCxNQUFNLE1BQU0sR0FBRyxJQUFJLDJCQUEyQixDQUFDO1FBQzdDLElBQUksRUFBRSxtQkFBbUI7S0FDMUIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsQ0FBQyxDQUFDIn0=