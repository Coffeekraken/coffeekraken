// @ts-nocheck

import SJsCompilerProcess from '../../node/js/compile/SJsCompilerProcess';

function compileJs(stringArgs = '') {
  const pro = new SJsCompilerProcess(
    {},
    {
      process: {}
    }
  );
  pro.run(stringArgs);
}

export default compileJs;
