import __sugarConfig from '@coffeekraken/s-sugar-config';
import {
  typescript,
  postcss,
  globalStyle,
  babel
} from '@coffeekraken/s-svelte-preprocess';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

import __sPostcssSugarPlugin from '@coffeekraken/s-postcss-sugar-plugin';
import __precss from 'precss';

export default {
  compilerOptions: {
    customElement: true,
    format: 'esm'
  },
  preprocess: [
    typescript({
      tsconfigFile: `${__dirname}/tsconfig.json`,
      tsconfigDirectory: __packageRoot()
    }),
    postcss(__sugarConfig('svelte'))
  ]
};
