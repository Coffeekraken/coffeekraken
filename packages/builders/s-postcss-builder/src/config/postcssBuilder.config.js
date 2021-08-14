export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        input: '[config.storage.src.cssDir]/index.css',
        output: '[config.storage.dist.cssDir]/index.css',
        postcss: '[config.postcss]',
        purgecss: '[config.purgecss]',
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc0J1aWxkZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc0J1aWxkZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3BDLE9BQU87UUFDSCxLQUFLLEVBQUUsdUNBQXVDO1FBQzlDLE1BQU0sRUFBRSx3Q0FBd0M7UUFDaEQsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixRQUFRLEVBQUUsbUJBQW1CO0tBQ2hDLENBQUM7QUFDTixDQUFDIn0=