import postcssSugarExportPlugin from './postcssSugarExportPlugin.js';
export * from './postcssSugarExportPlugin.js';
export const postcss = true;
export default postcssSugarExportPlugin;

if (typeof module !== 'undefined') {
    module.exports.postcss = true;
    module.exports = postcssSugarExportPlugin;
}
