import postcssSugarPlugin from './postcssSugarPlugin.js';
export * from './postcssSugarPlugin.js';
export const postcss = true;
export default postcssSugarPlugin;

if (typeof module !== 'undefined') {
    module.exports.postcss = true;
    module.exports = postcssSugarPlugin;
}
