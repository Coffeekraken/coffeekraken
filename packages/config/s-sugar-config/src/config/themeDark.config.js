export default {
    extends: 'themeBase',
    colorStates: {
        text: '--lighten 50',
        placeholder: '--lighten 40',
        surface: '--darken 20',
        foreground: '--lighten 50',
        background: '--darken 40',
        border: '--darken 25',
        gradientStart: '--lighten 0',
        gradientEnd: '--darken 20',
        ':hover': {
            text: '--darken 0',
            placeholder: '--lighten 40',
            surface: '--lighten 49',
            foreground: '--lighten 50',
            background: '--darken 40',
            border: '--lighten 40'
        },
        ':focus': {
            text: '--darken 0',
            placeholder: '--lighten 40',
            surface: '--lighten 49',
            foreground: '--lighten 50',
            background: '--darken 40',
            border: '--lighten 40'
        },
        ':active': {
            text: '--darken 0',
            placeholder: '--lighten 40',
            surface: '--lighten 49',
            foreground: '--lighten 50',
            background: '--darken 40',
            border: '--lighten 40'
        },
        ':highlight': {
            text: '--darken 0',
            placeholder: '--lighten 40',
            surface: '--lighten 49',
            foreground: '--lighten 50',
            background: '--darken 40',
            border: '--lighten 40'
        }
    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVEYXJrLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lRGFyay5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtJQUNiLE9BQU8sRUFBRSxXQUFXO0lBRXBCLFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxjQUFjO1FBQ3BCLFdBQVcsRUFBRSxjQUFjO1FBQzNCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLGFBQWEsRUFBRSxhQUFhO1FBQzVCLFdBQVcsRUFBRSxhQUFhO1FBQzFCLFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxZQUFZO1lBQ2xCLFdBQVcsRUFBRSxjQUFjO1lBQzNCLE9BQU8sRUFBRSxjQUFjO1lBQ3ZCLFVBQVUsRUFBRSxjQUFjO1lBQzFCLFVBQVUsRUFBRSxhQUFhO1lBQ3pCLE1BQU0sRUFBRSxjQUFjO1NBQ3ZCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLFlBQVk7WUFDbEIsV0FBVyxFQUFFLGNBQWM7WUFDM0IsT0FBTyxFQUFFLGNBQWM7WUFDdkIsVUFBVSxFQUFFLGNBQWM7WUFDMUIsVUFBVSxFQUFFLGFBQWE7WUFDekIsTUFBTSxFQUFFLGNBQWM7U0FDdkI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsWUFBWTtZQUNsQixXQUFXLEVBQUUsY0FBYztZQUMzQixPQUFPLEVBQUUsY0FBYztZQUN2QixVQUFVLEVBQUUsY0FBYztZQUMxQixVQUFVLEVBQUUsYUFBYTtZQUN6QixNQUFNLEVBQUUsY0FBYztTQUN2QjtRQUNELFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSxZQUFZO1lBQ2xCLFdBQVcsRUFBRSxjQUFjO1lBQzNCLE9BQU8sRUFBRSxjQUFjO1lBQ3ZCLFVBQVUsRUFBRSxjQUFjO1lBQzFCLFVBQVUsRUFBRSxhQUFhO1lBQ3pCLE1BQU0sRUFBRSxjQUFjO1NBQ3ZCO0tBQ0Y7SUFFRCxLQUFLLEVBQUU7UUFDTDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLHFCQUFxQjtZQUM1QixJQUFJLEVBQUUsY0FBYztZQUNwQixVQUFVLEVBQUUsYUFBYTtTQUMxQjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUU7WUFDRixPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUscUJBQXFCO1NBQzdCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxxQkFBcUI7WUFDNUIsV0FBVyxFQUFFLHdCQUF3QjtTQUN0QztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxhQUFhLEVBQUU7WUFDYixPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUscUJBQXFCO1NBQzdCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRTtZQUNQLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxxQkFBcUI7U0FDN0I7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLHFCQUFxQjtTQUM3QjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUU7WUFDTCxPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUscUJBQXFCO1NBQzdCO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRTtZQUNKLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxxQkFBcUI7WUFDNUIsSUFBSSxFQUFFLGNBQWM7U0FDckI7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsU0FBUyxFQUFFO1lBQ1QsT0FBTyxFQUFFLDhCQUE4QjtZQUN2QyxLQUFLLEVBQUUsU0FBUztZQUNoQixHQUFHLEVBQUUsU0FBUztZQUNkLEVBQUUsRUFBRSxTQUFTO1lBQ2IsSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsU0FBUztZQUNkLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsU0FBUztZQUNmLEdBQUcsRUFBRSxTQUFTO1lBQ2QsSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1NBQ2Y7S0FDRjtDQUNGLENBQUMifQ==