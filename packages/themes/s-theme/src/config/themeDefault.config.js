export default function (env, config) {
    return {
        /**
         * @name          themeName
         * @namespace     config.themeDefault
         * @type          Number
         * @default      default
         *
         * Specify the default theme name
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        themeName: 'default',
        variants: {
            /**
             * @name          light
             * @namespace     config.themeDefault.variants
             * @type          Object
             * @default      [config.themeDefaultLight]
             *
             * Specify the default theme light variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            light: '[config.themeDefaultLight]',
            /**
             * @name          dark
             * @namespace     config.themeDefault.variants
             * @type          Object
             * @default      [config.themeDefaultDark]
             *
             * Specify the default theme dark variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            dark: '[config.themeDefaultDark]',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVEZWZhdWx0LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lRGVmYXVsdC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHLEVBQUUsTUFBTTtJQUNoQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILFNBQVMsRUFBRSxTQUFTO1FBQ3BCLFFBQVEsRUFBRTtZQUNOOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsNEJBQTRCO1lBQ25DOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsMkJBQTJCO1NBQ3BDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==