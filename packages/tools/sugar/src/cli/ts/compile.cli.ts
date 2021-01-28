// @ts-nocheck

import STsCompileProcess from '../../node/typescript/compile/STsCompileProcess';
import __sugarConfig from '../../node/config/sugar';
import __STsFile from '../../node/typescript/STsFile';

function compileTs(stringArgs = '') {
  const pro = new STsCompileProcess(
    {},
    {
      process: {
        stdio: 'inherit',
        exitAtEnd: true
      }
    }
  );
  pro.run(stringArgs);
}

export = compileTs;
