export default function (api) {
    return {
        light: {
            /**
             * @name                border
             * @namespace           config.themeWireframe.light
             * @type                String
             * @default             1px solid this.borderColor
             *
             * Specify the "border" for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get border() {
                return `1px solid ${this.borderColor}`;
            },
            /**
             * @name                borderColor
             * @namespace           config.themeWireframe.light
             * @type                String
             * @default             rgba(255,255,255,0.1)
             *
             * Specify the "borderColor" for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderColor: 'rgba(255,255,255,0.1)',
            /**
             * @name                background
             * @namespace           config.themeWireframe.light
             * @type                String
             * @default             rgba(0,0,0)
             *
             * Specify the "background" color for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            background: 'rgba(0,0,0)',
            /**
             * @name                surface
             * @namespace           config.themeWireframe.light
             * @type                String
             * @default             #fafafa
             *
             * Specify the "surface" color for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            surface: '#fafafa',
        },
        dark: {
            /**
             * @name                border
             * @namespace           config.themeWireframe.dark
             * @type                String
             * @default             1px solid rgba(0,0,0,0.2)
             *
             * Specify the "border" for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get border() {
                return `1px solid ${this.borderColor}`;
            },
            /**
             * @name                borderColor
             * @namespace           config.themeWireframe.dark
             * @type                String
             * @default             rgba(0,0,0,0.1)
             *
             * Specify the "border" for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderColor: 'rgba(255,255,255,0.1)',
            /**
             * @name                background
             * @namespace           config.themeWireframe.dark
             * @type                String
             * @default             #2D323A
             *
             * Specify the "background" color for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            background: '#2D323A',
            /**
             * @name                surface
             * @namespace           config.themeWireframe.dark
             * @type                String
             * @default             #3B424C
             *
             * Specify the "surface" color for your wireframe
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            surface: '#3B424C',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0gsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksTUFBTTtnQkFDTixPQUFPLGFBQWEsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzNDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsV0FBVyxFQUFFLHVCQUF1QjtZQUVwQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBVSxFQUFFLGFBQWE7WUFFekI7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxTQUFTO1NBQ3JCO1FBRUQsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksTUFBTTtnQkFDTixPQUFPLGFBQWEsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzNDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsV0FBVyxFQUFFLHVCQUF1QjtZQUVwQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBVSxFQUFFLFNBQVM7WUFFckI7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxTQUFTO1NBQ3JCO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==