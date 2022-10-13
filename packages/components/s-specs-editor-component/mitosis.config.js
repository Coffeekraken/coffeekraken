const { __defaultSugarOptions } = require('@coffeekraken/s-mitosis');

module.exports = {
    files: 'src/js/**/*.lite.tsx',
    targets: ['react', 'webcomponent'],
    extensions: ['tsx', 'ts', 'ts', 'vue', 'svelte', 'tsx'],
    options: __defaultSugarOptions()
};