import postcssSugarPlugin from './postcssSugarPlugin';
export * from './postcssSugarPlugin';
export const postcss = true;
export default postcssSugarPlugin;

if (typeof module !== 'undefined') {
    module.exports.postcss = true;
    module.exports = postcssSugarPlugin;
}
