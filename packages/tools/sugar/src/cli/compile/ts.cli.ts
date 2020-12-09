// @ts-nocheck

import SCompileTsProcess from '../../node/typescript/compile/SCompileTsProcess';

function compileTs(stringArgs = '') {
  const pro = new SCompileTsProcess({
    output: false
  });
  pro.run(stringArgs);
}

export = compileTs;
