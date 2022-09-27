"use strict";
// import { SComponentDefaultPropsInterface } from '@coffeekraken/s-component';
Object.defineProperty(exports, "__esModule", { value: true });
let isDefaultPropsDefined = false;
exports.default = (pluginOptions) => (options) => {
    switch (pluginOptions.target) {
        case 'webcomponent':
            return {
                code: {
                    pre: (code) => {
                        // default class
                        code = code.replace(/class ([a-zA-Z0-9]+) extends HTMLElement/, 'export default class $1 extends HTMLElement');
                        // define function
                        const line = code.match(/customElements.define\(.*\);/);
                        code = code.replace(line, `
                        export function define() {
                            ${line}
                        }
                        `);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrRUFBK0U7O0FBRS9FLElBQUkscUJBQXFCLEdBQUcsS0FBSyxDQUFDO0FBQ2xDLGtCQUFlLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQzFDLFFBQVEsYUFBYSxDQUFDLE1BQU0sRUFBRTtRQUMxQixLQUFLLGNBQWM7WUFDZixPQUFPO2dCQUNILElBQUksRUFBRTtvQkFDRixHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDVixnQkFBZ0I7d0JBQ2hCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUNmLDBDQUEwQyxFQUMxQyw2Q0FBNkMsQ0FDaEQsQ0FBQzt3QkFFRixrQkFBa0I7d0JBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQzt3QkFDeEQsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQ2YsSUFBSSxFQUNKOzs4QkFFRSxJQUFJOzt5QkFFVCxDQUNBLENBQUM7d0JBQ0YsT0FBTyxJQUFJLENBQUM7b0JBQ2hCLENBQUM7aUJBQ0o7YUFDSixDQUFDO1lBQ0YsTUFBTTtRQUNWLE9BQU8sQ0FBQyxDQUFDO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDYjtLQUNKO0FBQ0wsQ0FBQyxDQUFDIn0=