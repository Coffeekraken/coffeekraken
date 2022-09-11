import { __dirname } from '@coffeekraken/sugar/fs';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __isNode from '@coffeekraken/sugar/shared/is/node';
export default function (env, config) {
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
        adapters: [__isNode() ? 'node' : 'browser'],
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
                icon: `${__packageRootDir(__dirname())}/src/data/notifications/ck_default.png`,
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
                icon: `${__packageRootDir(__dirname())}/src/data/notifications/ck_start.png`,
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
                icon: `${__packageRootDir(__dirname())}/src/data/notifications/ck_success.png`,
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
                icon: `${__packageRootDir(__dirname())}/src/data/notifications/ck_warning.png`,
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
                icon: `${__packageRootDir(__dirname())}/src/data/notifications/ck_error.png`,
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLGdCQUFnQixNQUFNLDhDQUE4QyxDQUFDO0FBQzVFLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLElBQUk7UUFFWjs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBRTNDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxnQkFBZ0IsRUFBRSxFQUFFO1FBRXBCLEtBQUssRUFBRTtZQUNILE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsU0FBUztnQkFFaEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLFdBQVc7Z0JBRXBCOzs7Ozs7Ozs7Ozs7bUJBWUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUcsZ0JBQWdCLENBQ3JCLFNBQVMsRUFBRSxDQUNkLHdDQUF3QzthQUM1QztZQUVELEtBQUssRUFBRTtnQkFDSDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsU0FBUztnQkFFaEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLFdBQVc7Z0JBRXBCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksRUFBRSxHQUFHLGdCQUFnQixDQUNyQixTQUFTLEVBQUUsQ0FDZCxzQ0FBc0M7YUFDMUM7WUFFRCxPQUFPLEVBQUU7Z0JBQ0w7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLFNBQVM7Z0JBRWhCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxXQUFXO2dCQUVwQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsR0FBRyxnQkFBZ0IsQ0FDckIsU0FBUyxFQUFFLENBQ2Qsd0NBQXdDO2FBQzVDO1lBRUQsT0FBTyxFQUFFO2dCQUNMOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxTQUFTO2dCQUVoQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsV0FBVztnQkFFcEI7Ozs7Ozs7Ozs7OzttQkFZRztnQkFDSCxJQUFJLEVBQUUsR0FBRyxnQkFBZ0IsQ0FDckIsU0FBUyxFQUFFLENBQ2Qsd0NBQXdDO2FBQzVDO1lBRUQsS0FBSyxFQUFFO2dCQUNIOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxTQUFTO2dCQUVoQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsV0FBVztnQkFFcEI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUcsZ0JBQWdCLENBQ3JCLFNBQVMsRUFBRSxDQUNkLHNDQUFzQzthQUMxQztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==