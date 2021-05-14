import __sugarConfig from '@coffeekraken/s-sugar-config';
import {
  typescript,
  postcss,
  globalStyle,
  babel
} from '@coffeekraken/s-svelte-preprocess';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

import __sPostcssSugarPlugin from '@coffeekraken/s-postcss-sugar-plugin';
// import __postcssImportExtGlob from 'postcss-import-ext-glob';
import __precss from 'precss';
// import __postcssPresetEnv from 'postcss-preset-env';

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
    // babel({}),
    postcss({
      plugins: [
        __sPostcssSugarPlugin({
          target: 'component'
        }),
        // __postcssImportExtGlob(),
        __precss()
        // __postcssPresetEnv()
        // __autoprefixer()
      ]
    })
    // globalStyle()
  ]
};
