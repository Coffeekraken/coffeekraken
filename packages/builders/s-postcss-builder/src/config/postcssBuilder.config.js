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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc0J1aWxkZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc0J1aWxkZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7SUFDWCxLQUFLLEVBQUUsc0NBQXNDO0lBQzdDLE1BQU0sRUFBRSx1Q0FBdUM7SUFDL0MsT0FBTyxFQUFFLGtCQUFrQjtJQUMzQixlQUFlLEVBQUU7UUFDYixPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osc0NBQXNDO1lBQ3RDLHVDQUF1QztZQUN2Qyx3Q0FBd0M7WUFDeEMsdUNBQXVDO1lBQ3ZDLHdDQUF3QztZQUN4QywwQ0FBMEM7WUFDMUMsNkNBQTZDO1lBQzdDLHdDQUF3QztTQUMzQztLQUNKO0NBQ0osQ0FBQSJ9