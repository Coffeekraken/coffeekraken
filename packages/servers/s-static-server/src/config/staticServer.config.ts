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
