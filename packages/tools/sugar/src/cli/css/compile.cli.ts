// @ts-nocheck

import SScssCompileProcess from '../../node/scss/compile/SScssCompileProcess';

function compileScss(stringArgs = '') {
  const pro = new SScssCompileProcess(
    {},
    {
      stdio: 'inherit'
    }
  );
  pro.run(stringArgs);
}

export = compileScss;
