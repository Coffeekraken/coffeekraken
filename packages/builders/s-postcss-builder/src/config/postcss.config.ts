export default function (env, config) {
    if (env.platform !== 'node') return;

    return {
        plugins: [
            '@coffeekraken/s-postcss-sugar-plugin',
            'postcss-nested',
            'postcss-atroot',
            'postcss-extend-rule',
            'postcss-property-lookup',
            'autoprefixer',
        ],
        pluginsOptions: {},
    };
}
