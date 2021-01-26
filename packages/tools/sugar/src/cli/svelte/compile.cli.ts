// @ts-nocheck

import SSvelteCompileProcess from '../../node/svelte/compile/SSvelteCompileProcess';

function compileSvelte(stringArgs = '') {
  const pro = new SSvelteCompileProcess(
    {},
    {
      process: {
        stdio: 'inherit'
      }
    }
  );
  pro.run(stringArgs);
}

export = compileSvelte;
