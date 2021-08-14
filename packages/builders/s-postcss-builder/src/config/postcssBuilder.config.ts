export default function (env, config) {
    if (env.platform !== 'node') return;
    return {
        input: '[config.storage.src.cssDir]/index.css',
        output: '[config.storage.dist.cssDir]/index.css',
        postcss: '[config.postcss]',
        purgecss: '[config.purgecss]',
    };
}
