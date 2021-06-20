import __SugarConfig from '@coffeekraken/s-sugar-config';
import {
  typescript,
  postcss,
  globalStyle,
  babel
} from '@coffeekraken/s-svelte-preprocess';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';

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
      tsconfigDirectory: __packageRootDir()
    }),
    postcss(__SugarConfig.get('svelte'))
  ]
};
