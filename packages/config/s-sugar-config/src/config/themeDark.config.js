export default {
    extends: 'themeDarkBase',
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
            default: '#776d91',
            '...': '[theme.colorStates]',
            text: '--lighten 50',
            background: '--darken 42'
        },
        /**
         * @name                ui
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #7a738c
         *
         * Specify the <s-color="ui">ui</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        ui: {
            default: '#7a738c',
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
            '...': '[theme.colorStates]',
            gradientEnd: '--spin 345 --darken 10',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVEYXJrLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lRGFyay5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtJQUNiLE9BQU8sRUFBRSxlQUFlO0lBRXhCLEtBQUssRUFBRTtRQUNMOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLElBQUksRUFBRSxjQUFjO1lBQ3BCLFVBQVUsRUFBRSxhQUFhO1NBQzFCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRTtZQUNGLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxxQkFBcUI7U0FDN0I7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLHFCQUFxQjtZQUM1QixXQUFXLEVBQUUsd0JBQXdCO1NBQ3RDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILGFBQWEsRUFBRTtZQUNiLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxxQkFBcUI7U0FDN0I7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLHFCQUFxQjtTQUM3QjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUscUJBQXFCO1NBQzdCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRTtZQUNMLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxxQkFBcUI7U0FDN0I7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLHFCQUFxQjtZQUM1QixJQUFJLEVBQUUsY0FBYztTQUNyQjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxTQUFTLEVBQUU7WUFDVCxPQUFPLEVBQUUsOEJBQThCO1lBQ3ZDLEtBQUssRUFBRSxTQUFTO1lBQ2hCLEdBQUcsRUFBRSxTQUFTO1lBQ2QsRUFBRSxFQUFFLFNBQVM7WUFDYixJQUFJLEVBQUUsU0FBUztZQUNmLEdBQUcsRUFBRSxTQUFTO1lBQ2QsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSxTQUFTO1lBQ2YsR0FBRyxFQUFFLFNBQVM7WUFDZCxJQUFJLEVBQUUsU0FBUztZQUNmLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFNBQVM7U0FDZjtLQUNGO0NBQ0YsQ0FBQyJ9