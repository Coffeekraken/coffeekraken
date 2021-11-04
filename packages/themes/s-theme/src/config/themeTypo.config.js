export default (env, config) => {
    if (env.platform !== 'node')
        return;
    return {
        /**
         * @name          h1
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the h1 typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        h1: {
            'font-family': 'title',
            'font-size': 90,
            'line-height': 1.3,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 50,
            },
        },
        /**
         * @name          h2
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the h2 typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        h2: {
            'font-family': 'title',
            'font-size': 80,
            'line-height': 1.3,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 50,
            },
        },
        /**
         * @name          h3
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the h3 typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        h3: {
            'font-family': 'title',
            'font-size': 70,
            'line-height': 1.3,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 50,
            },
        },
        /**
         * @name          h4
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the h4 typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        h4: {
            'font-family': 'title',
            'font-size': 60,
            'line-height': 1.3,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 50,
            },
        },
        /**
         * @name          h5
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the h5 typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        h5: {
            'font-family': 'title',
            'font-size': 50,
            'line-height': 1.3,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 40,
            },
        },
        /**
         * @name          h6
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the h6 typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        h6: {
            'font-family': 'title',
            'font-size': 40,
            'line-height': 1.3,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 40,
            },
        },
        /**
         * @name          p
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the p typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        p: {
            'font-family': 'default',
            'font-size': 30,
            'line-height': 1.8,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 50,
            },
        },
        /**
         * @name          lead
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the lead typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        lead: {
            'font-family': 'default',
            'font-size': 50,
            'line-height': 1.6,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 50,
            },
        },
        /**
         * @name          hr
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the hr typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        hr: {
            color: '[theme.color.main.color]',
            opacity: 0.2,
            rhythmVertical: {
                'margin-bottom': 50,
            },
        },
        /**
         * @name          pre
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the pre typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        pre: {
            'font-family': 'code',
            color: ['main', 'text'],
            'background-color': ['main', 'surface'],
            'line-height': 1.5,
            paddingInline: '[theme.ui.default.paddingInline]',
            paddingBlock: '[theme.ui.default.paddingBlock]',
            borderRadius: '[theme.ui.default.borderRadius]',
            depth: '[theme.ui.default.depth]',
            rhythmVertical: {
                'margin-bottom': 50,
            },
        },
        /**
         * @name          code
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the code typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        'code:not(pre > code)': {
            display: 'inline-block',
            'font-family': 'code',
            color: ['main', 'text'],
            'background-color': ['accent', 'surface'],
            borderRadius: 10,
            paddingInline: 10,
            paddingBlock: 0,
        },
        /**
         * @name          a
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the a typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        a: {
            color: 'accent',
        },
        /**
         * @name          quote
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the quote typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        quote: {
            'font-family': 'quote',
        },
        /**
         * @name          b
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the b typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        b: {
            'font-weight': 'bold',
        },
        /**
         * @name          bold
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the bold typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        bold: {
            'font-weight': 'bold',
        },
        /**
         * @name          strong
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the strong typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        strong: {
            'font-weight': 'bold',
        },
        /**
         * @name          i
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the i typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        i: {
            'font-style': 'italic',
        },
        /**
         * @name          italic
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the italic typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        italic: {
            'font-style': 'italic',
        },
        /**
         * @name          em
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the em typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        em: {
            'font-style': 'italic',
        },
        /**
         * @name          small
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the small typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        small: {
            'font-size': '0.5em',
        },
        /**
         * @name          mark
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the mark typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        mark: {
            'background-color': '[theme.color.accent.color]',
            color: '[theme.color.accent.foreground]',
        },
        /**
         * @name          del
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the del typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        del: {
            'text-decoration': 'line-through',
        },
        /**
         * @name          ins
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the ins typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        ins: {
            'text-decoration': 'underline',
        },
        /**
         * @name          sub
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the sub typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        sub: {
            'vertical-align': 'sub',
            'font-size': '0.6em',
        },
        /**
         * @name          sup
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the sup typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        sup: {
            'vertical-align': 'sup',
            'font-size': '0.6em',
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVUeXBvLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lVHlwby5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUMzQixJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDcEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUU7WUFDQSxhQUFhLEVBQUUsT0FBTztZQUN0QixXQUFXLEVBQUUsRUFBRTtZQUNmLGFBQWEsRUFBRSxHQUFHO1lBQ2xCLFdBQVcsRUFBRSxNQUFNO1lBQ25CLGNBQWMsRUFBRTtnQkFDWixlQUFlLEVBQUUsRUFBRTthQUN0QjtTQUNKO1FBQ0Q7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRTtZQUNBLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsYUFBYSxFQUFFLEdBQUc7WUFDbEIsV0FBVyxFQUFFLE1BQU07WUFDbkIsY0FBYyxFQUFFO2dCQUNaLGVBQWUsRUFBRSxFQUFFO2FBQ3RCO1NBQ0o7UUFDRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFO1lBQ0EsYUFBYSxFQUFFLE9BQU87WUFDdEIsV0FBVyxFQUFFLEVBQUU7WUFDZixhQUFhLEVBQUUsR0FBRztZQUNsQixXQUFXLEVBQUUsTUFBTTtZQUNuQixjQUFjLEVBQUU7Z0JBQ1osZUFBZSxFQUFFLEVBQUU7YUFDdEI7U0FDSjtRQUNEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUU7WUFDQSxhQUFhLEVBQUUsT0FBTztZQUN0QixXQUFXLEVBQUUsRUFBRTtZQUNmLGFBQWEsRUFBRSxHQUFHO1lBQ2xCLFdBQVcsRUFBRSxNQUFNO1lBQ25CLGNBQWMsRUFBRTtnQkFDWixlQUFlLEVBQUUsRUFBRTthQUN0QjtTQUNKO1FBQ0Q7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFB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