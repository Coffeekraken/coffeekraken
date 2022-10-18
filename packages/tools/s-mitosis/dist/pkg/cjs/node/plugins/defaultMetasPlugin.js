"use strict";
// import { SComponentDefaultPropsInterface } from '@coffeekraken/s-component';
Object.defineProperty(exports, "__esModule", { value: true });
let isDefaultPropsDefined = false;
exports.default = (pluginOptions) => (options) => {
    return {
        json: {
            pre: (json) => { },
        },
        code: {
            pre: (code) => {
                let codeToAdd = ``;
                if (!code.match(/export const metas = \{/)) {
                    codeToAdd = `
                        export const metas = {};
                    `;
                }
                codeToAdd += `
                    if (!metas.type) {
                        metas.type = '${pluginOptions.target}';
                    }
                `;
                // adding the code in the actual generated code
                if (code.trim().match(/<\/script>$/gm)) {
                    // .vue
                    code = code.replace(/<\/script>$/gm, `
                        ${codeToAdd}
                    </script>`);
                }
                else {
                    // standard js code
                    code = `
                        ${code}
                        ${codeToAdd}
                    `;
                }
                return code;
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrRUFBK0U7O0FBRS9FLElBQUkscUJBQXFCLEdBQUcsS0FBSyxDQUFDO0FBQ2xDLGtCQUFlLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQzFDLE9BQU87UUFDSCxJQUFJLEVBQUU7WUFDRixHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFFLENBQUM7U0FDcEI7UUFDRCxJQUFJLEVBQUU7WUFDRixHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDVixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0JBRW5CLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLEVBQUU7b0JBQ3hDLFNBQVMsR0FBRzs7cUJBRVgsQ0FBQztpQkFDTDtnQkFDRCxTQUFTLElBQUk7O3dDQUVXLGFBQWEsQ0FBQyxNQUFNOztpQkFFM0MsQ0FBQztnQkFFRiwrQ0FBK0M7Z0JBQy9DLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTtvQkFDcEMsT0FBTztvQkFDUCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDZixlQUFlLEVBQ2Y7MEJBQ0UsU0FBUzs4QkFDTCxDQUNULENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsbUJBQW1CO29CQUNuQixJQUFJLEdBQUc7MEJBQ0QsSUFBSTswQkFDSixTQUFTO3FCQUNkLENBQUM7aUJBQ0w7Z0JBRUQsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMsQ0FBQyJ9