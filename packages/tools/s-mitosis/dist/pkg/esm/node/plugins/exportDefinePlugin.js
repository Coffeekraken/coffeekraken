export default (pluginOptions) => (options) => {
    switch (pluginOptions.target) {
        case 'webcomponent':
            return {
                code: {
                    post: (code) => {
                        // add the SComponent object
                        if (!code.match(/import __SComponent from/)) {
                            code = `
                                import __SComponent from '@coffeekraken/s-component';
                                ${code}
                            `;
                        }
                        // define function
                        const matches = code.match(/customElements.define\(\"([a-zA-Z0-9_-]+)\"\, ([a-zA-Z0-9]+)\);/);
                        if (matches.length >= 3) {
                            code = code.replace(matches[0], `
                            export function define(
                                props = {},
                                tagName = '${matches[1]}'
                            ) {
                                __SComponent.setDefaultProps(tagName, props);
                                customElements.define(tagName, class ${matches[2]}Component extends ${matches[2]} {});
                            }
                            `);
                        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWUsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFDMUMsUUFBUSxhQUFhLENBQUMsTUFBTSxFQUFFO1FBQzFCLEtBQUssY0FBYztZQUNmLE9BQU87Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUNYLDRCQUE0Qjt3QkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsRUFBRTs0QkFDekMsSUFBSSxHQUFHOztrQ0FFRCxJQUFJOzZCQUNULENBQUM7eUJBQ0w7d0JBRUQsa0JBQWtCO3dCQUNsQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUN0QixpRUFBaUUsQ0FDcEUsQ0FBQzt3QkFDRixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFOzRCQUNyQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDZixPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQ1Y7Ozs2Q0FHYSxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7dUVBR2dCLE9BQU8sQ0FBQyxDQUFDLENBQUMscUJBQXFCLE9BQU8sQ0FBQyxDQUFDLENBQUM7OzZCQUVuRixDQUNBLENBQUM7eUJBQ0w7d0JBQ0QsT0FBTyxJQUFJLENBQUM7b0JBQ2hCLENBQUM7aUJBQ0o7YUFDSixDQUFDO1lBQ0YsTUFBTTtRQUNWLE9BQU8sQ0FBQyxDQUFDO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDYjtLQUNKO0FBQ0wsQ0FBQyxDQUFDIn0=