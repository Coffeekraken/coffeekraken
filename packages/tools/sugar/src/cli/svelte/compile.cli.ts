// @ts-nocheck

import SSvelteCompileProcess from '../../node/svelte/compile/SSvelteCompileProcess';

function compileSvelte(stringArgs = '') {
  const pro = new SSvelteCompileProcess(
    {},
    {
      stdio: 'inherit'
    }
  );
  pro.run(stringArgs);
}

export = compileSvelte;
