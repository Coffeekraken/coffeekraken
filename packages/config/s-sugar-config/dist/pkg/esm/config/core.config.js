import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        namespace: {
            /**
             * @name            pattern
             * @namespace       config.core.namespace
             * @type            String
             * @default         {path}
             *
             * Specify a generation pattern to generate the namespace. Here's the available tokens:
             * - {package.name}: The package name specified in the package.json
             * - {package.version}: The package version specified in the package.json
             * - {path}: The passed path parameter
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            pattern: '{path}',
            /**
             * @name            context
             * @namespace       config.core.namespace
             * @type            String
             * @default         __packageRoot()
             *
             * Specify the context in which to generate the namespace.
             * The context is simply a root folder from which to search for the package.json
             * file to get the name that serve to the namespace generation
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            context: __packageRoot(),
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBRXRFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxTQUFTLEVBQUU7WUFDUDs7Ozs7Ozs7Ozs7OztlQWFHO1lBQ0gsT0FBTyxFQUFFLFFBQVE7WUFFakI7Ozs7Ozs7Ozs7OztlQVlHO1lBQ0gsT0FBTyxFQUFFLGFBQWEsRUFBRTtTQUMzQjtLQUNKLENBQUM7QUFDTixDQUFDIn0=