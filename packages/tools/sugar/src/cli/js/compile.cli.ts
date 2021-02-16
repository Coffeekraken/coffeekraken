// @ts-nocheck

import SJsCompilerProcess from '../../node/js/compile/SJsCompilerProcess';

function compileJs(stringArgs = '') {
  const pro = new SJsCompilerProcess(
    {},
    {
      process: {
        stdio: 'inherit',
        runAsChild: true
      }
    }
  );
  pro.run(stringArgs);
}

export default compileJs;
