// @ts-nocheck

import __SBuildDocMapProcess from '../../node/docMap/SBuildDocMapProcess';
import __SProcessManager from '../../node/process/SProcessManager';
import __SProcessPipe from '../../node/process/SProcessPipe';

export = async (stringArgs = '') => {
  const pipe = new __SProcessPipe([
    __SBuildDocMapProcess,
    (params) => {
      return params;
    },
    __SBuildDocMapProcess
  ]);

  // const manager = new __SProcessManager(pipe, {
  //   // stdio: true
  // });
  // manager.run();

  const runPromise = pipe.run();
  // runPromise.on('log,*.log,warn,*.warn', (value) => {
  //   console.log(value.value || value);
  // });
};
