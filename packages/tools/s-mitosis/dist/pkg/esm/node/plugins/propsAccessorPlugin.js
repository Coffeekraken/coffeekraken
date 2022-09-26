let _imports = [];
export default (pluginOptions) => (options) => {
    switch (pluginOptions.target) {
        case 'webcomponent':
            return {
                code: {
                    post: (code) => {
                        const string = 'this.state = {';
                        code = code.replace(string, `${string}
                    prop(p) {
                        return this.props?.[p] ?? DEFAULT_PROPS?.[p] ?? p;
                    },`);
                        return code;
                    },
                },
            };
            break;
        default:
            return {};
            break;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksUUFBUSxHQUFhLEVBQUUsQ0FBQztBQUM1QixlQUFlLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQzFDLFFBQU8sYUFBYSxDQUFDLE1BQU0sRUFBRTtRQUN6QixLQUFLLGNBQWM7WUFDZixPQUFPO2dCQUVILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDWCxNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQzt3QkFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQ2YsTUFBTSxFQUNOLEdBQUcsTUFBTTs7O3VCQUdkLENBQ0UsQ0FBQzt3QkFDRixPQUFPLElBQUksQ0FBQztvQkFDaEIsQ0FBQztpQkFDSjthQUNKLENBQUM7WUFDTixNQUFNO1FBQ047WUFDSSxPQUFPLEVBQUUsQ0FBQztZQUNkLE1BQU07S0FDVDtBQUNMLENBQUMsQ0FBQyJ9