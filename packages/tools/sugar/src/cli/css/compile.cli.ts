// @ts-nocheck

import SScssCompilerProcess from '../../node/scss/compile/SScssCompilerProcess';

function compileScss(stringArgs = '') {
  const pro = new SScssCompilerProcess(
    {},
    {
      process: {
        stdio: 'inherit'
      }
    }
  );
  pro.run(stringArgs);
}

export = compileScss;
