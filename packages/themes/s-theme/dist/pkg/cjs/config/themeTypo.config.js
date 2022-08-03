"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (api) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRTtZQUNBLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsYUFBYSxFQUFFLEdBQUc7WUFDbEIsV0FBVyxFQUFFLE1BQU07WUFDbkIsY0FBYyxFQUFFO2dCQUNaLGVBQWUsRUFBRSxFQUFFO2FBQ3RCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxFQUFFO2FBQ2xCO1NBQ0o7UUFDRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFO1lBQ0EsYUFBYSxFQUFFLE9BQU87WUFDdEIsV0FBVyxFQUFFLEVBQUU7WUFDZixhQUFhLEVBQUUsR0FBRztZQUNsQixXQUFXLEVBQUUsTUFBTTtZQUNuQixjQUFjLEVBQUU7Z0JBQ1osZUFBZSxFQUFFLEVBQUU7YUFDdEI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLEVBQUU7YUFDbEI7U0FDSjtRQUNEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUU7WUFDQSxhQUFhLEVBQUUsT0FBTztZQUN0QixXQUFXLEVBQUUsRUFBRTtZQUNmLGFBQWEsRUFBRSxHQUFHO1lBQ2xCLFdBQVcsRUFBRSxNQUFNO1lBQ25CLGNBQWMsRUFBRTtnQkFDWixlQUFlLEVBQUUsRUFBRTthQUN0QjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsRUFBRTthQUNsQjtTQUNKO1FBQ0Q7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRTtZQUNBLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsYUFBYSxFQUFFLEdBQUc7WUFDbEIsV0FBVyxFQUFFLE1BQU07WUFDbkIsY0FBYyxFQUFFO2dCQUNaLGVBQWUs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