const { __defaultPropsPlugin, __propsAccessorPlugin, __defineForTargets, __sugarPlugins } = require('@coffeekraken/s-mitosis');

module.exports = {
    files: 'src/js/**/*.lite.tsx',
    dest: 'dist/js',
    targets: ['react', 'webcomponent', 'angular', 'vue', 'svelte', 'solid'],
    extensions: ['tsx', 'ts', 'ts', 'vue', 'svelte', 'tsx'],
    options: {

        ...__sugarPlugins(['defaultProps','propsAccessor'], ['webcomponent'])

        // ...__defineForTargets((target) => {
        //     return {
        //         plugins: [
        //             __propsAccessorPlugin({
        //                 target
        //             }),
        //             __defaultPropsPlugin({
        //                 target
        //             })
        //         ]
        //     }
        // }, ['webcomponent', 'react'])
    }  
};