import __sPostcssSugarPlugin from '@coffeekraken/s-postcss-sugar-plugin';
import __autoprefixer from 'autoprefixer';
import __atRoot from 'postcss-atroot';
import __extendRule from 'postcss-extend-rule';
// @ts-ignore
import __nested from 'postcss-nested';
import __nesting from 'postcss-nesting';
import __propertyLookup from 'postcss-property-lookup';

export default {
  plugins: [
    __sPostcssSugarPlugin(),
    __nested(),
    __atRoot(),
    __extendRule(),
    __propertyLookup(),
    __autoprefixer()
  ]
};
