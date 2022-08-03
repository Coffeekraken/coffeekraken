export default function (api) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7U0FDbkU7UUFDRCxJQUFJLEVBQUU7WUFDRjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEVBQUU7U0FDZDtRQUNELElBQUksUUFBUTtZQUNSLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxRQUFRLENBQUM7UUFDMUQsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=