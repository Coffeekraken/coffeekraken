import __defaultMetasPlugin from './plugins/defaultMetasPlugin';
import __defaultPropsPlugin from './plugins/defaultPropsPlugin';
import __exportDefaultClassPlugin from './plugins/exportDefaultClassPlugin';
import __exportDefinePlugin from './plugins/exportDefinePlugin';
export default function () {
    const plugins = {
        webcomponent: {
            plugins: [
                __defaultPropsPlugin({
                    target: 'webcomponent',
                }),
                __exportDefaultClassPlugin({
                    target: 'webcomponent',
                }),
                __exportDefinePlugin({
                    target: 'webcomponent',
                })
            ],
        },
        react: {
            plugins: []
        },
        vue3: {
            plugins: []
        }
    };
    for (let [target, options] of Object.entries(plugins)) {
        options.plugins.push(__defaultMetasPlugin({
            target
        }));
    }
    return plugins;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sb0JBQW9CLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxvQkFBb0IsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLDBCQUEwQixNQUFNLG9DQUFvQyxDQUFDO0FBQzVFLE9BQU8sb0JBQW9CLE1BQU0sOEJBQThCLENBQUM7QUFHaEUsTUFBTSxDQUFDLE9BQU87SUFDVixNQUFNLE9BQU8sR0FBRztRQUNaLFlBQVksRUFBRTtZQUNWLE9BQU8sRUFBRTtnQkFDTCxvQkFBb0IsQ0FBQztvQkFDakIsTUFBTSxFQUFFLGNBQWM7aUJBQ3pCLENBQUM7Z0JBQ0YsMEJBQTBCLENBQUM7b0JBQ3ZCLE1BQU0sRUFBRSxjQUFjO2lCQUN6QixDQUFDO2dCQUNGLG9CQUFvQixDQUFDO29CQUNqQixNQUFNLEVBQUUsY0FBYztpQkFDekIsQ0FBQzthQUNMO1NBQ0o7UUFDRCxLQUFLLEVBQUU7WUFDSCxPQUFPLEVBQUUsRUFBRTtTQUNkO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsT0FBTyxFQUFFLEVBQUU7U0FDZDtLQUNKLENBQUM7SUFFRixLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNuRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztZQUN0QyxNQUFNO1NBQ1QsQ0FBQyxDQUFDLENBQUM7S0FDUDtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMifQ==