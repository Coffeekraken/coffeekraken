export default {
    extends: 'themeLightBase',
    color: {
        /**
         * @name                main
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #776d91
         *
         * Specify the <s-color="main">main</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        main: {
            default: '#787987',
            '...': '[theme.colorStates]',
            text: '--darken 20',
            background: '--lighten 50'
        },
        /**
         * @name                ui
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #fff
         *
         * Specify the <s-color="ui">ui</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        ui: {
            default: '#787987',
            '...': '[theme.colorStates]'
        },
        /**
         * @name                accent
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #ffbb00
         *
         * Specify the <s-color="accent">accent</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        accent: {
            default: '#ffbb00',
            '...': '[theme.colorStates]'
        },
        /**
         * @name                complementary
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #5100ff
         *
         * Specify the <s-color="complementary">complementary</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        complementary: {
            default: '#5100ff',
            '...': '[theme.colorStates]'
        },
        /**
         * @name                success
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #91ff00
         *
         * Specify the <s-color="success">success</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        success: {
            default: '#91ff00',
            '...': '[theme.colorStates]'
        },
        /**
         * @name                warning
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #ffd500
         *
         * Specify the <s-color="warning">warning</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        warning: {
            default: '#ffd500',
            '...': '[theme.colorStates]'
        },
        /**
         * @name                error
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #ff003b
         *
         * Specify the <s-color="error">error</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        error: {
            default: '#ff003b',
            '...': '[theme.colorStates]'
        },
        /**
         * @name                info
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #00ffff
         *
         * Specify the <s-color="info">info</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        info: {
            default: '#00ffff',
            '...': '[theme.colorStates]',
            text: '--lighten 20'
        },
        /**
         * @name                extension
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #2b3438
         *
         * Specify the <primary>extension</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        extension: {
            default: '[theme.color.accent.default]',
            blade: '#ff2d20',
            php: '#8892BF',
            js: '#f7df1e',
            node: '#68A063',
            css: '#498FE1',
            scss: '#CF649A',
            sass: '#CF649A',
            json: '#000000',
            jpg: '#B2C0E1',
            jpeg: '#B2C0E1',
            pdf: '#E7786E',
            doc: '#60D7FD',
            psd: '#F9D659',
            mp3: '#E98C61',
            png: '#C29DFB',
            aac: '#B1C5C9',
            zip: '#9CC04E',
            dmg: '#E36E4B'
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVMaWdodC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZUxpZ2h0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0lBQ2IsT0FBTyxFQUFFLGdCQUFnQjtJQUV6QixLQUFLLEVBQUU7UUFDTDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLHFCQUFxQjtZQUM1QixJQUFJLEVBQUUsYUFBYTtZQUNuQixVQUFVLEVBQUUsY0FBYztTQUMzQjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUU7WUFDRixPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUscUJBQXFCO1NBQzdCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxxQkFBcUI7U0FDN0I7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsYUFBYSxFQUFFO1lBQ2IsT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLHFCQUFxQjtTQUM3QjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUscUJBQXFCO1NBQzdCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRTtZQUNQLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxxQkFBcUI7U0FDN0I7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFO1lBQ0wsT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLHFCQUFxQjtTQUM3QjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLElBQUksRUFBRSxjQUFjO1NBQ3JCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFNBQVMsRUFBRTtZQUNULE9BQU8sRUFBRSw4QkFBOEI7WUFDdkMsS0FBSyxFQUFFLFNBQVM7WUFDaEIsR0FBRyxFQUFFLFNBQVM7WUFDZCxFQUFFLEVBQUUsU0FBUztZQUNiLElBQUksRUFBRSxTQUFTO1lBQ2YsR0FBRyxFQUFFLFNBQVM7WUFDZCxJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsU0FBUztZQUNkLElBQUksRUFBRSxTQUFTO1lBQ2YsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztTQUNmO0tBQ0Y7Q0FDRixDQUFDIn0=