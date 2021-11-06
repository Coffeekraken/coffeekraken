export default (env, config) => {
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
