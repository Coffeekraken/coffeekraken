// import __sPostcssSugarPlugin from '@coffeekraken/s-postcss-sugar-plugin';
// import __autoprefixer from 'autoprefixer';
// import __atRoot from 'postcss-atroot';
// import __extendRule from 'postcss-extend-rule';
// import __purgePostcssPlugin from '@fullhuman/postcss-purgecss';
// @ts-ignore
// import __nested from 'postcss-nested';
// import __nesting from 'postcss-nesting';
// import __propertyLookup from 'postcss-property-lookup';

export default {

 

  plugins: [
    '@coffeekraken/s-postcss-sugar-plugin',
    'postcss-nested',
    'postcss-atroot',
    'postcss-extend-rule',
    'postcss-property-lookup',
    'autoprefixer',
    // '@fullhuman/postcss-purgecss'
  ],
  pluginsOptions: {}
};
