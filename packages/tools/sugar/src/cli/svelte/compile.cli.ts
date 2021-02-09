// @ts-nocheck

import SSvelteCompilerProcess from '../../node/svelte/compile/SSvelteCompilerProcess';

function compileSvelte(stringArgs = '') {
  const pro = new SSvelteCompilerProcess(
    {},
    {
      process: {
        stdio: 'inherit'
      }
    }
  );
  pro.run(stringArgs);
}

export default compileSvelte;
