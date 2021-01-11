// @ts-nocheck

import STsCompileProcess from '../../node/typescript/compile/STsCompileProcess';

function compileTs(stringArgs = '') {
  const pro = new STsCompileProcess({
    stdio: 'inherit',
    exitAtEnd: true
  });
  pro.run(stringArgs);
}

export = compileTs;
