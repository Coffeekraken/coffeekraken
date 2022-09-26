"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let isDefaultPropsDefined = false;
exports.default = (pluginOptions) => (options) => {
    switch (pluginOptions.target) {
        case 'webcomponent':
            return {
                json: {
                    post: (json) => {
                        if (json.exports.DEFAULT_PROPS) {
                            isDefaultPropsDefined = true;
                        }
                    },
                },
                code: {
                    post: (code) => {
                        const string = 'this._root.innerHTML = `';
                        if (isDefaultPropsDefined) {
                            code = code.replace(string, `
                            for (let [key, value] of Object.entries(DEFAULT_PROPS)) {
                                if (this.props[key] === undefined) {
                                    this.props[key] = DEFAULT_PROPS[key];
                                }
                            }
                            ${string}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxxQkFBcUIsR0FBRyxLQUFLLENBQUM7QUFDbEMsa0JBQWUsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFDMUMsUUFBTyxhQUFhLENBQUMsTUFBTSxFQUFFO1FBQ3pCLEtBQUssY0FBYztZQUNmLE9BQU87Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUNYLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7NEJBQzVCLHFCQUFxQixHQUFHLElBQUksQ0FBQzt5QkFDaEM7b0JBQ0wsQ0FBQztpQkFDSjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQ1gsTUFBTSxNQUFNLEdBQUcsMEJBQTBCLENBQUM7d0JBQzFDLElBQUkscUJBQXFCLEVBQUU7NEJBQ3ZCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUNmLE1BQU0sRUFDTjs7Ozs7OzhCQU1GLE1BQU07NkJBQ1AsQ0FDQSxDQUFDO3lCQUNMO3dCQUNELE9BQU8sSUFBSSxDQUFDO29CQUNoQixDQUFDO2lCQUNKO2FBQ0osQ0FBQztZQUNOLE1BQU07UUFDTixPQUFPLENBQUMsQ0FBQztZQUNMLE9BQU8sRUFBRSxDQUFDO1NBQ2I7S0FDSjtBQUNMLENBQUMsQ0FBQyJ9