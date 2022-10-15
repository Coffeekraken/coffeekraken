"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (pluginOptions) => (options) => {
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
                        if ((matches === null || matches === void 0 ? void 0 : matches.length) >= 3) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWUsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFDMUMsUUFBUSxhQUFhLENBQUMsTUFBTSxFQUFFO1FBQzFCLEtBQUssY0FBYztZQUNmLE9BQU87Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUNYLDRCQUE0Qjt3QkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsRUFBRTs0QkFDekMsSUFBSSxHQUFHOztrQ0FFRCxJQUFJOzZCQUNULENBQUM7eUJBQ0w7d0JBRUQsa0JBQWtCO3dCQUNsQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUN0QixpRUFBaUUsQ0FDcEUsQ0FBQzt3QkFDRixJQUFJLENBQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE1BQU0sS0FBSSxDQUFDLEVBQUU7NEJBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUNmLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFDVjs7OzZDQUdhLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozt1RUFHZ0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsT0FBTyxDQUFDLENBQUMsQ0FBQzs7NkJBRW5GLENBQ0EsQ0FBQzt5QkFDTDt3QkFDRCxPQUFPLElBQUksQ0FBQztvQkFDaEIsQ0FBQztpQkFDSjthQUNKLENBQUM7WUFDRixNQUFNO1FBQ1YsT0FBTyxDQUFDLENBQUM7WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNiO0tBQ0o7QUFDTCxDQUFDLENBQUMifQ==