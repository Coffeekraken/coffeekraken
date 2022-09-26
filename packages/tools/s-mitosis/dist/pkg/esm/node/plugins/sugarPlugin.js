import __defaultPropsPlugin from './defaultPropsPlugin';
import __propsAccessorPlugin from './propsAccessorPlugin';
export default (pluginOptions) => (options) => {
    return {
        plugins: [
            __defaultPropsPlugin(pluginOptions),
            __propsAccessorPlugin(pluginOptions)
        ]
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxxQkFBcUIsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxlQUFlLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQzFDLE9BQU87UUFDSCxPQUFPLEVBQUU7WUFDTCxvQkFBb0IsQ0FBQyxhQUFhLENBQUM7WUFDbkMscUJBQXFCLENBQUMsYUFBYSxDQUFDO1NBQ3ZDO0tBQ0osQ0FBQTtBQUNMLENBQUMsQ0FBQyJ9