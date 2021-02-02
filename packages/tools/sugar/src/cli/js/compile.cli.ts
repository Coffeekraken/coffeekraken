// @ts-nocheck

import SJsCompilerProcess from '../../node/js/compile/SJsCompilerProcess';

function compileJs(stringArgs = '') {
  const pro = new SJsCompilerProcess(
    {},
    {
      process: {
        stdio: 'inherit'
      }
    }
  );
  pro.run(stringArgs);
}

export = compileJs;
