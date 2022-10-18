const { __defaultSugarOptions } = require('@coffeekraken/s-mitosis');

module.exports = {
    files: 'src/js/**/*.lite.tsx',
    targets: ['webcomponent', 'vue3'],
    extensions: ['tsx', 'ts', 'ts', 'vue', 'svelte', 'tsx'],
    options: __defaultSugarOptions()
};