export default function (api) {
    if (api.env.platform === 'node') {
        return {
            /**
             * @name              port
             * @namespace         config.staticServer
             * @type              Number
             * @default           8080
             *
             * Specify the port to use for the static server
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            port: 8080,
            /**
             * @name              hostname
             * @namespace         config.staticServer
             * @type              String
             * @default           127.0.0.1
             *
             * Specify the hostname to use for the static server
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            // hostname: __ipAddress(),
            hostname: '0.0.0.0',
            /**
             * @name              rootDir
             * @namespace         config.staticServer
             * @type              String
             * @default           [config.storage.package.rootDir]/static
             *
             * Specify the root directory to use for the static server
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get rootDir() {
                return `${api.config.storage.package.rootDir}/static`;
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM3QixPQUFPO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxJQUFJO1lBRVY7Ozs7Ozs7Ozs7ZUFVRztZQUNILDJCQUEyQjtZQUMzQixRQUFRLEVBQUUsU0FBUztZQUVuQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxPQUFPO2dCQUNQLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxTQUFTLENBQUM7WUFDMUQsQ0FBQztTQUNKLENBQUM7S0FDTDtBQUNMLENBQUMifQ==