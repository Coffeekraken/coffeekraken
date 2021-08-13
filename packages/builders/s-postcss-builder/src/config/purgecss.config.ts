export default function (env, config) {
    if (env.platform !== 'node') return {};
    return {
        content: [
            'index.html',
            '[config.storage.src.rootDir]/**/*.js',
            '[config.storage.src.rootDir]/**/*.jsx',
            '[config.storage.src.rootDir]/**/*.html',
            '[config.storage.src.rootDir]/**/*.vue',
            '[config.storage.src.rootDir]/**/*.riot',
            '[config.storage.src.rootDir]/**/*.svelte',
            '[config.storage.src.rootDir]/**/*.blade.php',
            '[config.storage.src.rootDir]/**/*.twig',
        ],
    };
}
