import __sPostcssSugarPlugin from '@coffeekraken/s-postcss-sugar-plugin';
import __autoprefixer from 'autoprefixer';

import __advancedVariables from 'postcss-advanced-variables';
import __atRoot from 'postcss-atroot';
import __extendRule from 'postcss-extend-rule';
// @ts-ignore
import __nested from 'postcss-nested';
import __presetEnv from 'postcss-preset-env';
import __propertyLookup from 'postcss-property-lookup';

export default {
  plugins: [
    __sPostcssSugarPlugin(),
    __atRoot(),
    __extendRule(),
    __nested(),
    __propertyLookup(),
    __autoprefixer()
  ]
};
