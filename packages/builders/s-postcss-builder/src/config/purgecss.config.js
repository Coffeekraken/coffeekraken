export default function (env, config) {
    if (env.platform !== 'node')
        return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZ2Vjc3MuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHVyZ2Vjc3MuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3BDLE9BQU87UUFDSCxPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osc0NBQXNDO1lBQ3RDLHVDQUF1QztZQUN2Qyx3Q0FBd0M7WUFDeEMsdUNBQXVDO1lBQ3ZDLHdDQUF3QztZQUN4QywwQ0FBMEM7WUFDMUMsNkNBQTZDO1lBQzdDLHdDQUF3QztTQUMzQztLQUNKLENBQUM7QUFDTixDQUFDIn0=