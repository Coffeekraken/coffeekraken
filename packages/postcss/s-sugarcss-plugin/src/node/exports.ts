import SSugarcssPlugin from './SSugarcssPlugin.js';
export * from './SSugarcssPlugin.js';
export const postcss = true;
export default SSugarcssPlugin;

if (typeof module !== 'undefined') {
    module.exports.postcss = true;
    module.exports = SSugarcssPlugin;
}
