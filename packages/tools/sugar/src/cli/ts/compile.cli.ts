// @ts-nocheck

import STsCompilerProcess from '../../node/typescript/compile/STsCompilerProcess';

function compileTs(stringArgs = '') {
  const pro = new STsCompilerProcess(
    {},
    {
      process: {
        stdio: 'inherit'
      }
    }
  );
  pro.run(stringArgs);
}

export = compileTs;
