// @ts-nocheck

import SCompileTsProcess from '../../node/typescript/compile/SCompileTsProcess';

function compileTs(stringArgs = '') {
  const pro = new SCompileTsProcess({
    output: false
  });
  console.log('STRIN', stringArgs);
  pro.run(stringArgs);
}

export = compileTs;
