"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        browser: {
            /**
             * @name            include
             * @namespace       config.config.browser.include
             * @type            Array<String>
             * @default         ['contact', 'datetime', 'log', 'serve', 'env', 'theme']
             *
             * Specify which configuration you want to include for the "browser". If the array is empty, will include all the configs
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            include: ['contact', 'datetime', 'log', 'serve', 'env', 'theme'],
        },
        node: {
            /**
             * @name            include
             * @namespace       config.config.node.include
             * @type            Array<String>
             * @default         [storage.package.cacheDir]/config
             *
             * Specify which configuration you want to include for the "browser". If the array is empty, will include all the configs
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            include: [],
        },
        get cacheDir() {
            return `${api.config.storage.package.cacheDir}/views`;
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO1NBQ25FO1FBQ0QsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxJQUFJLFFBQVE7WUFDUixPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsUUFBUSxDQUFDO1FBQzFELENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQXBDRCw0QkFvQ0MifQ==