import postcssSugarExportPlugin from './postcssSugarExportPlugin';
export * from './postcssSugarExportPlugin';
export const postcss = true;
export default postcssSugarExportPlugin;

if (typeof module !== 'undefined') {
    module.exports.postcss = true;
    module.exports = postcssSugarExportPlugin;
}
