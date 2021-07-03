export default {
    input: '[config.storage.srcCssDir]/index.css',
    output: '[config.storage.distCssDir]/index.css',
    postcss: '[config.postcss]',
    purgeCssOptions: {
        content: [    
            'index.html',
            '[config.storage.src.rootDir]/**/*.js',
            '[config.storage.src.rootDir]/**/*.jsx',
            '[config.storage.src.rootDir]/**/*.html',
            '[config.storage.src.rootDir]/**/*.vue',
            '[config.storage.src.rootDir]/**/*.riot',
            '[config.storage.src.rootDir]/**/*.svelte',
            '[config.storage.src.rootDir]/**/*.blade.php',
            '[config.storage.src.rootDir]/**/*.twig'
        ]
    }
}