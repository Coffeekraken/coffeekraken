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
        }
    };
    for (let [target, options] of Object.entries(plugins)) {
        options.plugins.push(__defaultMetasPlugin({
            target
        }));
    }
    return plugins;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sb0JBQW9CLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxvQkFBb0IsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLDBCQUEwQixNQUFNLG9DQUFvQyxDQUFDO0FBQzVFLE9BQU8sb0JBQW9CLE1BQU0sOEJBQThCLENBQUM7QUFHaEUsTUFBTSxDQUFDLE9BQU87SUFDVixNQUFNLE9BQU8sR0FBRztRQUNaLFlBQVksRUFBRTtZQUNWLE9BQU8sRUFBRTtnQkFDTCxvQkFBb0IsQ0FBQztvQkFDakIsTUFBTSxFQUFFLGNBQWM7aUJBQ3pCLENBQUM7Z0JBQ0YsMEJBQTBCLENBQUM7b0JBQ3ZCLE1BQU0sRUFBRSxjQUFjO2lCQUN6QixDQUFDO2dCQUNGLG9CQUFvQixDQUFDO29CQUNqQixNQUFNLEVBQUUsY0FBYztpQkFDekIsQ0FBQzthQUNMO1NBQ0o7UUFDRCxLQUFLLEVBQUU7WUFDSCxPQUFPLEVBQUUsRUFBRTtTQUNkO0tBQ0osQ0FBQztJQUVGLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ25ELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1lBQ3RDLE1BQU07U0FDVCxDQUFDLENBQUMsQ0FBQztLQUNQO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQyJ9