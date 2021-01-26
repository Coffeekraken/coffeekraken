// @ts-nocheck

import SScssCompileProcess from '../../node/scss/compile/SScssCompileProcess';

function compileScss(stringArgs = '') {
  const pro = new SScssCompileProcess(
    {},
    {
      process: {
        stdio: 'blessed'
      }
    }
  );
  pro.run(stringArgs);
}

export = compileScss;
