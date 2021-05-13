import __sPostcssSugarPlugin from '@coffeekraken/s-postcss-sugar-plugin';
// import __postcssImportExtGlob from 'postcss-import-ext-glob';
import __precss from 'precss';
// import __postcssPresetEnv from 'postcss-preset-env';
import __autoprefixer from 'autoprefixer';

export default {
  plugins: [
    // @ts-ignore
    __sPostcssSugarPlugin({
      target: 'component'
    }),
    // __postcssImportExtGlob(),
    __precss(),
    // __postcssPresetEnv(),
    __autoprefixer()
  ]
};
