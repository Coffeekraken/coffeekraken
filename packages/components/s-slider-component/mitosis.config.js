const { __defaultSugarOptions } = require('@coffeekraken/s-mitosis');

module.exports = {
    files: 'src/js/**/*.lite.tsx',
    dest: 'dist/js',
    targets: ['react', 'webcomponent', 'angular', 'vue', 'svelte', 'solid'],
    extensions: ['tsx', 'ts', 'ts', 'vue', 'svelte', 'tsx'],
    options: __defaultSugarOptions()
};