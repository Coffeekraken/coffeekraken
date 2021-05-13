import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __isNode from '@coffeekraken/sugar/shared/is/node';
export default {
    /**
     * @name            enable
     * @namespace       config.notification
     * @type            Boolean
     * @default         true
     *
     * Allows you to disable all notifications
     *
     * @since           2.0.'0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            message: '[message]',
            /**
             * @name            default
             * @namespace       config.notification.types.default
             * @type            String
             * @default         `${__packageRoot(__dirname)}/src/data/notifications/ck_default.png`
             *
             * Specify the "default" default icon to use
             *
             * @todo          implement the ck_default.png icon
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            icon: `${__packageRoot(__dirname)}/src/data/notifications/ck_default.png`
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            message: '[message]',
            /**
             * @name            start
             * @namespace       config.notification.types.start
             * @type            String
             * @default         `${__packageRoot(__dirname)}/src/data/notifications/ck_start.png`
             *
             * Specify the "start" default icon to use
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            icon: `${__packageRoot(__dirname)}/src/data/notifications/ck_start.png`
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            message: '[message]',
            /**
             * @name            icon
             * @namespace       config.notification.types.success
             * @type            String
             * @default         `${__packageRoot(__dirname)}/src/data/notifications/ck_success.png`
             *
             * Specify the "success" default icon to use
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            icon: `${__packageRoot(__dirname)}/src/data/notifications/ck_success.png`
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            message: '[message]',
            /**
             * @name            icon
             * @namespace       config.notification.types.warning
             * @type            String
             * @default         `${__packageRoot(__dirname)}/src/data/notifications/ck_warning.png`
             *
             * Specify the "warning" default icon to use
             *
             * @todo          implement the ck_warning.png icon
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            icon: `${__packageRoot(__dirname)}/src/data/notifications/ck_warning.png`
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            message: '[message]',
            /**
             * @name            icon
             * @namespace       config.notification.types.error
             * @type            String
             * @default         `${__packageRoot(__dirname)}/src/data/notifications/ck_error.png`
             *
             * Specify the "error" default icon to use
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            icon: `${__packageRoot(__dirname)}/src/data/notifications/ck_error.png`
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbi5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFFMUQsZUFBZTtJQUNiOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLEVBQUUsSUFBSTtJQUVaOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFFM0M7Ozs7Ozs7Ozs7T0FVRztJQUNILGdCQUFnQixFQUFFLEVBQUU7SUFFcEIsS0FBSyxFQUFFO1FBQ0wsT0FBTyxFQUFFO1lBQ1A7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxTQUFTO1lBRWhCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsV0FBVztZQUVwQjs7Ozs7Ozs7Ozs7O2VBWUc7WUFDSCxJQUFJLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLHdDQUF3QztTQUMxRTtRQUVELEtBQUssRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsU0FBUztZQUVoQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLFdBQVc7WUFFcEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsc0NBQXNDO1NBQ3hFO1FBRUQsT0FBTyxFQUFFO1lBQ1A7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxTQUFTO1lBRWhCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsV0FBVztZQUVwQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyx3Q0FBd0M7U0FDMUU7UUFFRCxPQUFPLEVBQUU7WUFDUDs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLFNBQVM7WUFFaEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxXQUFXO1lBRXBCOzs7Ozs7Ozs7Ozs7ZUFZRztZQUNILElBQUksRUFBRSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsd0NBQXdDO1NBQzFFO1FBRUQsS0FBSyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxTQUFTO1lBRWhCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsV0FBVztZQUVwQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxzQ0FBc0M7U0FDeEU7S0FDRjtDQUNGLENBQUMifQ==