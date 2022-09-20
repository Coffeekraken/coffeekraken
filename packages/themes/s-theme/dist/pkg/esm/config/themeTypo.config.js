export default (api) => {
    if (api.env.platform !== 'node')
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        h1: {
            'font-family': 'title',
            'font-size': 90,
            'line-height': 1.3,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 50,
            },
            mobile: {
                'font-size': 70,
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        h2: {
            'font-family': 'title',
            'font-size': 80,
            'line-height': 1.3,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 50,
            },
            mobile: {
                'font-size': 60,
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        h3: {
            'font-family': 'title',
            'font-size': 70,
            'line-height': 1.3,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 50,
            },
            mobile: {
                'font-size': 50,
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        h4: {
            'font-family': 'title',
            'font-size': 60,
            'line-height': 1.3,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 50,
            },
            mobile: {
                'font-size': 40,
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        h5: {
            'font-family': 'title',
            'font-size': 50,
            'line-height': 1.3,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 40,
            },
            mobile: {
                'font-size': 30,
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        h6: {
            'font-family': 'title',
            'font-size': 40,
            'line-height': 1.3,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 40,
            },
            mobile: {
                'font-size': 30,
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        lead: {
            'font-family': 'default',
            'font-size': 50,
            'line-height': 1.6,
            'max-width': '55ch',
            rhythmVertical: {
                'margin-bottom': 50,
            },
            mobile: {
                'font-size': 40,
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        hr: {
            get color() {
                return api.theme.color.main;
            },
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        'pre:not([class])': {
            'font-family': 'code',
            color: ['main', 'text'],
            'background-color': ['main', 'surface'],
            'line-height': 1.5,
            get paddingInline() {
                return api.theme.ui.default.paddingInline;
            },
            get paddingBlock() {
                return api.theme.ui.default.paddingBlock;
            },
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
            get depth() {
                return api.theme.ui.default.depth;
            },
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        'code:not(pre > code)': {
            display: 'inline-block',
            'font-family': 'code',
            color: ['main', 'text'],
            'line-height': 1.1,
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        a: {
            color: 'accent',
            'text-decoration': 'underline',
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        em: {
            'font-style': 'italic',
        },
        /**
         * @name          large
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the large typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        large: {
            'font-size': '1.1em',
        },
        /**
         * @name          larger
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the larger typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        larger: {
            'font-size': '1.2em',
        },
        /**
         * @name          largest
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the largest typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        largest: {
            'font-size': '1.3em',
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        small: {
            'font-size': '0.9em',
        },
        /**
         * @name          smaller
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the small typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        smaller: {
            'font-size': '0.8em',
        },
        /**
         * @name          smallest
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the small typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        smallest: {
            'font-size': '0.7em',
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        mark: {
            get 'background-color'() {
                return api.theme.color.accent;
            },
            // @TODO        check to enable this
            // get color() {
            //     return api.theme.color.accent.
            // }
            // color: '[theme.color.accent.foreground]',
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        sup: {
            'vertical-align': 'sup',
            'font-size': '0.6em',
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFO1lBQ0EsYUFBYSxFQUFFLE9BQU87WUFDdEIsV0FBVyxFQUFFLEVBQUU7WUFDZixhQUFhLEVBQUUsR0FBRztZQUNsQixXQUFXLEVBQUUsTUFBTTtZQUNuQixjQUFjLEVBQUU7Z0JBQ1osZUFBZSxFQUFFLEVBQUU7YUFDdEI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLEVBQUU7YUFDbEI7U0FDSjtRQUNEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUU7WUFDQSxhQUFhLEVBQUUsT0FBTztZQUN0QixXQUFXLEVBQUUsRUFBRTtZQUNmLGFBQWEsRUFBRSxHQUFHO1lBQ2xCLFdBQVcsRUFBRSxNQUFNO1lBQ25CLGNBQWMsRUFBRTtnQkFDWixlQUFlLEVBQUUsRUFBRTthQUN0QjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsRUFBRTthQUNsQjtTQUNKO1FBQ0Q7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRTtZQUNBLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsYUFBYSxFQUFFLEdBQUc7WUFDbEIsV0FBVyxFQUFFLE1BQU07WUFDbkIsY0FBYyxFQUFFO2dCQUNaLGVBQWUsRUFBRSxFQUFFO2FBQ3RCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxFQUFFO2FBQ2xCO1NBQ0o7UUFDRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFO1lBQ0EsYUFBYSxFQUFFLE9BQU87WUFDdEIsV0FBVyxFQUFFLEVBQUU7WUFDZixhQUFhLEVBQUUs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