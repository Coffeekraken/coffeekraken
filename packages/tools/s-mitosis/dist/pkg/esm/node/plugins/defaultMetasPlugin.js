// import { SComponentDefaultPropsInterface } from '@coffeekraken/s-component';
let isDefaultPropsDefined = false;
export default (pluginOptions) => (options) => {
    return {
        json: {
            pre: (json) => { },
        },
        code: {
            pre: (code) => {
                if (!code.match(/export const metas = \{/)) {
                    code = `
                        ${code}
                        export const metas = {};
                    `;
                }
                code = `
                    ${code}
                    if (!metas.type) {
                        metas.type = '${pluginOptions.target}';
                    }
                `;
                return code;
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtFQUErRTtBQUUvRSxJQUFJLHFCQUFxQixHQUFHLEtBQUssQ0FBQztBQUNsQyxlQUFlLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQzFDLE9BQU87UUFDSCxJQUFJLEVBQUU7WUFDRixHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFFLENBQUM7U0FDcEI7UUFDRCxJQUFJLEVBQUU7WUFDRixHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO29CQUN4QyxJQUFJLEdBQUc7MEJBQ0QsSUFBSTs7cUJBRVQsQ0FBQztpQkFDTDtnQkFDRCxJQUFJLEdBQUc7c0JBQ0QsSUFBSTs7d0NBRWMsYUFBYSxDQUFDLE1BQU07O2lCQUUzQyxDQUFDO2dCQUNGLE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDLENBQUMifQ==