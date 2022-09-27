import __defaultPropsPlugin from './plugins/defaultPropsPlugin';
import __exportDefaultClassPlugin from './plugins/exportDefaultClassPlugin';
import __exportDefinePlugin from './plugins/exportDefinePlugin';
export default function () {
    return {
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
                }),
            ],
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sb0JBQW9CLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTywwQkFBMEIsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1RSxPQUFPLG9CQUFvQixNQUFNLDhCQUE4QixDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPO0lBQ1YsT0FBTztRQUNILFlBQVksRUFBRTtZQUNWLE9BQU8sRUFBRTtnQkFDTCxvQkFBb0IsQ0FBQztvQkFDakIsTUFBTSxFQUFFLGNBQWM7aUJBQ3pCLENBQUM7Z0JBQ0YsMEJBQTBCLENBQUM7b0JBQ3ZCLE1BQU0sRUFBRSxjQUFjO2lCQUN6QixDQUFDO2dCQUNGLG9CQUFvQixDQUFDO29CQUNqQixNQUFNLEVBQUUsY0FBYztpQkFDekIsQ0FBQzthQUNMO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9