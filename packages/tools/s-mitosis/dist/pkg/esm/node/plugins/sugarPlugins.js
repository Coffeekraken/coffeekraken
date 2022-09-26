import __defaultPropsPlugin from './defaultPropsPlugin';
import __propsAccessorPlugin from './propsAccessorPlugin';
export default (plugins, targets) => {
    const pluginsMap = {
        defaultProps: __defaultPropsPlugin,
        propsAccessor: __propsAccessorPlugin
    };
    const finalConfig = {};
    targets.forEach(target => {
        if (!finalConfig[target]) {
            finalConfig[target] = {
                plugins: []
            };
        }
        plugins.forEach(plugin => {
            let pluginFn = pluginsMap[plugin];
            if (!pluginFn) {
                throw new Error(`The requested "${plugin}" @coffeekraken/s-mitosis plugin does not exists...`);
            }
            finalConfig[target].plugins.push(pluginFn({
                target
            }));
        });
    });
    return finalConfig;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxxQkFBcUIsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxlQUFlLENBQUMsT0FBaUIsRUFBRSxPQUFpQixFQUFFLEVBQUU7SUFDcEQsTUFBTSxVQUFVLEdBQUc7UUFDZixZQUFZLEVBQUUsb0JBQW9CO1FBQ2xDLGFBQWEsRUFBRSxxQkFBcUI7S0FDdkMsQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUV2QixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHO2dCQUNsQixPQUFPLEVBQUUsRUFBRTthQUNkLENBQUE7U0FDSjtRQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsTUFBTSxxREFBcUQsQ0FBQyxDQUFDO2FBQ2xHO1lBQ0QsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUN0QyxNQUFNO2FBQ1QsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQUdQLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQyxDQUFDIn0=