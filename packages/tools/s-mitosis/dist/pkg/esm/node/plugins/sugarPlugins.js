import __defaultPropsPlugin from './defaultPropsPlugin';
export default (plugins, targets) => {
    const pluginsMap = {
        defaultProps: __defaultPropsPlugin,
    };
    const finalConfig = {};
    targets.forEach((target) => {
        if (!finalConfig[target]) {
            finalConfig[target] = {
                plugins: [],
            };
        }
        plugins.forEach((plugin) => {
            let pluginFn = pluginsMap[plugin];
            if (!pluginFn) {
                throw new Error(`The requested "${plugin}" @coffeekraken/s-mitosis plugin does not exists...`);
            }
            finalConfig[target].plugins.push(pluginFn({
                target,
            }));
        });
    });
    return finalConfig;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsZUFBZSxDQUFDLE9BQWlCLEVBQUUsT0FBaUIsRUFBRSxFQUFFO0lBQ3BELE1BQU0sVUFBVSxHQUFHO1FBQ2YsWUFBWSxFQUFFLG9CQUFvQjtLQUNyQyxDQUFDO0lBRUYsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBRXZCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3RCLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRztnQkFDbEIsT0FBTyxFQUFFLEVBQUU7YUFDZCxDQUFDO1NBQ0w7UUFFRCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDdkIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FDWCxrQkFBa0IsTUFBTSxxREFBcUQsQ0FDaEYsQ0FBQzthQUNMO1lBQ0QsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQzVCLFFBQVEsQ0FBQztnQkFDTCxNQUFNO2FBQ1QsQ0FBQyxDQUNMLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQyxDQUFDIn0=