export default (pluginOptions) => (options) => {
    switch (pluginOptions.target) {
        case 'webcomponent':
            return {
                code: {
                    pre: (code) => {
                        // default class
                        code = code.replace(/class ([a-zA-Z0-9]+) extends HTMLElement/, 'export default class $1 extends HTMLElement');
                        return code;
                    },
                },
            };
            break;
        default: {
            return {};
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWUsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFDMUMsUUFBUSxhQUFhLENBQUMsTUFBTSxFQUFFO1FBQzFCLEtBQUssY0FBYztZQUNmLE9BQU87Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUNWLGdCQUFnQjt3QkFDaEIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQ2YsMENBQTBDLEVBQzFDLDZDQUE2QyxDQUNoRCxDQUFDO3dCQUNGLE9BQU8sSUFBSSxDQUFDO29CQUNoQixDQUFDO2lCQUNKO2FBQ0osQ0FBQztZQUNGLE1BQU07UUFDVixPQUFPLENBQUMsQ0FBQztZQUNMLE9BQU8sRUFBRSxDQUFDO1NBQ2I7S0FDSjtBQUNMLENBQUMsQ0FBQyJ9