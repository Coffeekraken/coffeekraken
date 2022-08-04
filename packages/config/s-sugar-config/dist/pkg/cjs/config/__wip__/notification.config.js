"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const packageRootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRootDir"));
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
function default_1(env, config) {
    if (env.platform !== 'node')
        return;
    return {
        /**
         * @name            enable
         * @namespace       config.notification
         * @type            Boolean
         * @default         true
         *
         * Allows you to disable all notifications
         *
         * @since           2.0.'0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        enable: true,
        /**
         * @name            adapters
         * @namespace       config.notification
         * @type            Array<String>
         * @default         [__isNode() ? 'node' : 'browser']
         *
         * Specify the adapters to use
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        adapters: [(0, node_1.default)() ? 'node' : 'browser'],
        /**
         * @name            adaptersSettings
         * @namespace       config.notification
         * @type            Array<String>
         * @default         {}
         *
         * Specify the adaptersSettings to use
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        adaptersSettings: {},
        types: {
            default: {
                /**
                 * @name        title
                 * @namespace   config.notification.types.default
                 * @type            String
                 * @default         '[title]'
                 *
                 * Default title for default notification
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: '[title]',
                /**
                 * @name        message
                 * @namespace       config.notification.types.default
                 * @type        String
                 * @default        '[message]'
                 *
                 * Default message for default notification
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                message: '[message]',
                /**
                 * @name            default
                 * @namespace       config.notification.types.default
                 * @type            String
                 * @default         `${__packageRootDir(__dirname())}/src/data/notifications/ck_default.png`
                 *
                 * Specify the "default" default icon to use
                 *
                 * @todo          implement the ck_default.png icon
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                icon: `${(0, packageRootDir_1.default)((0, dirname_1.default)())}/src/data/notifications/ck_default.png`,
            },
            start: {
                /**
                 * @name        title
                 * @namespace   config.notification.types.start
                 * @type            String
                 * @default         '[title]'
                 *
                 * Default title for starting notification
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: '[title]',
                /**
                 * @name        message
                 * @namespace       config.notification.types.start
                 * @type        String
                 * @default        '[message]'
                 *
                 * Default message for starting notification
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                message: '[message]',
                /**
                 * @name            start
                 * @namespace       config.notification.types.start
                 * @type            String
                 * @default         `${__packageRootDir(__dirname())}/src/data/notifications/ck_start.png`
                 *
                 * Specify the "start" default icon to use
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                icon: `${(0, packageRootDir_1.default)((0, dirname_1.default)())}/src/data/notifications/ck_start.png`,
            },
            success: {
                /**
                 * @name        title
                 * @namespace   config.notification.types.success
                 * @type            String
                 * @default         '[title]'
                 *
                 * Default title for success notification
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: '[title]',
                /**
                 * @name        message
                 * @namespace       config.notification.types.success
                 * @type        String
                 * @default        '[message]'
                 *
                 * Default message for success notification
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                message: '[message]',
                /**
                 * @name            icon
                 * @namespace       config.notification.types.success
                 * @type            String
                 * @default         `${__packageRootDir(__dirname())}/src/data/notifications/ck_success.png`
                 *
                 * Specify the "success" default icon to use
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                icon: `${(0, packageRootDir_1.default)((0, dirname_1.default)())}/src/data/notifications/ck_success.png`,
            },
            warning: {
                /**
                 * @name        title
                 * @namespace   config.notification.types.warning
                 * @type            String
                 * @default         '[title]'
                 *
                 * Default title for warning notification
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: '[title]',
                /**
                 * @name        message
                 * @namespace       config.notification.types.warning
                 * @type        String
                 * @default        '[message]'
                 *
                 * Default message for warning notification
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                message: '[message]',
                /**
                 * @name            icon
                 * @namespace       config.notification.types.warning
                 * @type            String
                 * @default         `${__packageRootDir(__dirname())}/src/data/notifications/ck_warning.png`
                 *
                 * Specify the "warning" default icon to use
                 *
                 * @todo          implement the ck_warning.png icon
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                icon: `${(0, packageRootDir_1.default)((0, dirname_1.default)())}/src/data/notifications/ck_warning.png`,
            },
            error: {
                /**
                 * @name        title
                 * @namespace   config.notification.types.error
                 * @type            String
                 * @default         '[title]'
                 *
                 * Default title for error notification
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                title: '[title]',
                /**
                 * @name        message
                 * @namespace       config.notification.types.error
                 * @type        String
                 * @default        '[message]'
                 *
                 * Default message for error notification
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                message: '[message]',
                /**
                 * @name            icon
                 * @namespace       config.notification.types.error
                 * @type            String
                 * @default         `${__packageRootDir(__dirname())}/src/data/notifications/ck_error.png`
                 *
                 * Specify the "error" default icon to use
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                icon: `${(0, packageRootDir_1.default)((0, dirname_1.default)())}/src/data/notifications/ck_error.png`,
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQTREO0FBQzVELGtHQUE0RTtBQUM1RSw4RUFBMEQ7QUFFMUQsbUJBQXlCLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxJQUFJO1FBRVo7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxDQUFDLElBQUEsY0FBUSxHQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBRTNDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxnQkFBZ0IsRUFBRSxFQUFFO1FBRXBCLEtBQUssRUFBRTtZQUNILE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsU0FBUztnQkFFaEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLFdBQVc7Z0JBRXBCOzs7Ozs7Ozs7Ozs7bUJBWUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUcsSUFBQSx3QkFBZ0IsRUFDckIsSUFBQSxpQkFBUyxHQUFFLENBQ2Qsd0NBQXdDO2FBQzVDO1lBRUQsS0FBSyxFQUFFO2dCQUNIOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxTQUFTO2dCQUVoQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsV0FBVztnQkFFcEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUcsSUFBQSx3QkFBZ0IsRUFDckIsSUFBQSxpQkFBUyxHQUFFLENBQ2Qsc0NBQXNDO2FBQzFDO1lBRUQsT0FBTyxFQUFFO2dCQUNMOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxTQUFTO2dCQUVoQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsV0FBVztnQkFFcEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUcsSUFBQSx3QkFBZ0IsRUFDckIsSUFBQSxpQkFBUyxHQUFFLENBQ2Qsd0NBQXdDO2FBQzVDO1lBRUQsT0FBTyxFQUFFO2dCQUNMOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxTQUFTO2dCQUVoQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsV0FBVztnQkFFcEI7Ozs7Ozs7Ozs7OzttQkFZRztnQkFDSCxJQUFJLEVBQUUsR0FBRyxJQUFBLHdCQUFnQixFQUNyQixJQUFBLGlCQUFTLEdBQUUsQ0FDZCx3Q0FBd0M7YUFDNUM7WUFFRCxLQUFLLEVBQUU7Z0JBQ0g7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLFNBQVM7Z0JBRWhCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxXQUFXO2dCQUVwQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsR0FBRyxJQUFBLHdCQUFnQixFQUNyQixJQUFBLGlCQUFTLEdBQUUsQ0FDZCxzQ0FBc0M7YUFDMUM7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBeFFELDRCQXdRQyJ9