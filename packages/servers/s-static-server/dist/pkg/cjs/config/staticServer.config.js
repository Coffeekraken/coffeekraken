"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7UUFDN0IsT0FBTztZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsSUFBSTtZQUVWOzs7Ozs7Ozs7O2VBVUc7WUFDSCwyQkFBMkI7WUFDM0IsUUFBUSxFQUFFLFNBQVM7WUFFbkI7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksT0FBTztnQkFDUCxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sU0FBUyxDQUFDO1lBQzFELENBQUM7U0FDSixDQUFDO0tBQ0w7QUFDTCxDQUFDO0FBOUNELDRCQThDQyJ9