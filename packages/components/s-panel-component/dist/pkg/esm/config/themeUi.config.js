export default function (api) {
    return {
        panel: {
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.panel
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for panel ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
            /**
             * @name          transition
             * @namespace     config.themeUi.panel
             * @type          String
             * @default      [theme.transition.default]
             *
             * Specify the default transition for panel ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get transition() {
                return api.theme.transition.default;
            },
            /**
             * @name          depth
             * @namespace     config.themeUi.panel
             * @type          Number
             * @default      5
             *
             * Specify the default depth for your panel ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: 5,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0gsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksWUFBWTtnQkFDWixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFDN0MsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLFVBQVU7Z0JBQ1YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDeEMsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsQ0FBQztTQUNYO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==