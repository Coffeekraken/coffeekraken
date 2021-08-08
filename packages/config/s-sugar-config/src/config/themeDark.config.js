export default {
    extends: 'themeDarkBase',
    color: {
        /**
         * @name                main
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #776D91
         *
         * Specify the <s-color="main">main</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        main: {
            color: '#776D91',
            '...': '[extends.colorStates]'
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
            color: '#7a738c',
            '...': '[extends.colorStates]'
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
            color: '#ffbb00',
            '...': '[extends.colorStates]'
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
            color: '#5100ff',
            '...': '[extends.colorStates]'
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
            color: '#91ff00',
            '...': '[extends.colorStates]'
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
            color: '#ffd500',
            '...': '[extends.colorStates]'
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
            color: '#ff003b',
            '...': '[extends.colorStates]'
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
            color: '#00ffff',
            '...': '[extends.colorStates]'
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
            color: '[theme.color.accent.color]',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVEYXJrLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lRGFyay5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtJQUNiLE9BQU8sRUFBRSxlQUFlO0lBRXhCLEtBQUssRUFBRTtRQUNMOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUU7WUFDSixLQUFLLEVBQUUsU0FBUztZQUNoQixLQUFLLEVBQUUsdUJBQXVCO1NBQy9CO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRTtZQUNGLEtBQUssRUFBRSxTQUFTO1lBQ2hCLEtBQUssRUFBRSx1QkFBdUI7U0FDL0I7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLFNBQVM7WUFDaEIsS0FBSyxFQUFFLHVCQUF1QjtTQUMvQjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxhQUFhLEVBQUU7WUFDYixLQUFLLEVBQUUsU0FBUztZQUNoQixLQUFLLEVBQUUsdUJBQXVCO1NBQy9CO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRTtZQUNQLEtBQUssRUFBRSxTQUFTO1lBQ2hCLEtBQUssRUFBRSx1QkFBdUI7U0FDL0I7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFNBQVM7WUFDaEIsS0FBSyxFQUFFLHVCQUF1QjtTQUMvQjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUU7WUFDTCxLQUFLLEVBQUUsU0FBUztZQUNoQixLQUFLLEVBQUUsdUJBQXVCO1NBQy9CO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSxTQUFTO1lBQ2hCLEtBQUssRUFBRSx1QkFBdUI7U0FDL0I7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsU0FBUyxFQUFFO1lBQ1QsS0FBSyxFQUFFLDRCQUE0QjtZQUNuQyxLQUFLLEVBQUUsU0FBUztZQUNoQixHQUFHLEVBQUUsU0FBUztZQUNkLEVBQUUsRUFBRSxTQUFTO1lBQ2IsSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsU0FBUztZQUNkLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsU0FBUztZQUNmLEdBQUcsRUFBRSxTQUFTO1lBQ2QsSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1NBQ2Y7S0FDRjtDQUNGLENBQUMifQ==