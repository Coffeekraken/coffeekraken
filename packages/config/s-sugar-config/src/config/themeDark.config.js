export default {
    extends: 'themeBase',
    color: {
        /**
         * @name                neutral
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #776c94
         *
         * Specify the <s-color="neutral">neutral</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        neutral: {
            default: '#776c94',
            '...': '[theme.colorStates]',
            text: '--lighten 50',
            background: '--darken 42'
        },
        /**
         * @name                ui
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #77708a
         *
         * Specify the <s-color="ui">ui</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        ui: {
            default: '#77708a',
            '...': '[theme.colorStates]'
        },
        /**
         * @name                accent
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #f2bc2b
         *
         * Specify the <s-color="accent">accent</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        accent: {
            default: '#FFD501',
            '...': '[theme.colorStates]'
        },
        /**
         * @name                complementary
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #7F43FF
         *
         * Specify the <s-color="complementary">complementary</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        complementary: {
            default: '#7F43FF',
            '...': '[theme.colorStates]'
        },
        /**
         * @name                success
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #B5F168
         *
         * Specify the <s-color="success">success</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        success: {
            default: '#B5F168',
            '...': '[theme.colorStates]'
        },
        /**
         * @name                warning
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #FFD501
         *
         * Specify the <s-color="warning">warning</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        warning: {
            default: '#FFD501',
            '...': '[theme.colorStates]'
        },
        /**
         * @name                error
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #FF4370
         *
         * Specify the <s-color="error">error</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        error: {
            default: '#FF4370',
            '...': '[theme.colorStates]'
        },
        /**
         * @name                info
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #FDA622
         *
         * Specify the <s-color="info">info</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        info: {
            default: '#FDA622',
            '...': '[theme.colorStates]'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVEYXJrLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lRGFyay5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtJQUNiLE9BQU8sRUFBRSxXQUFXO0lBRXBCLEtBQUssRUFBRTtRQUNMOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLElBQUksRUFBRSxjQUFjO1lBQ3BCLFVBQVUsRUFBRSxhQUFhO1NBQzFCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRTtZQUNGLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxxQkFBcUI7U0FDN0I7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLHFCQUFxQjtTQUM3QjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxhQUFhLEVBQUU7WUFDYixPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUscUJBQXFCO1NBQzdCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRTtZQUNQLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxxQkFBcUI7U0FDN0I7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLHFCQUFxQjtTQUM3QjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUU7WUFDTCxPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUscUJBQXFCO1NBQzdCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRTtZQUNKLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxxQkFBcUI7U0FDN0I7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsU0FBUyxFQUFFO1lBQ1QsT0FBTyxFQUFFLDhCQUE4QjtZQUN2QyxLQUFLLEVBQUUsU0FBUztZQUNoQixHQUFHLEVBQUUsU0FBUztZQUNkLEVBQUUsRUFBRSxTQUFTO1lBQ2IsSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsU0FBUztZQUNkLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsU0FBUztZQUNmLEdBQUcsRUFBRSxTQUFTO1lBQ2QsSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1NBQ2Y7S0FDRjtDQUNGLENBQUMifQ==