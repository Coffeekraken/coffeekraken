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
            label: 'H1',
            group: 'styles',
            style: {
                display: 'block',
                fontFamily: 'title',
                fontSize: 90,
                lineHeight: 1.3,
                maxWidth: '55ch',
                mobile: {
                    fontSize: 70,
                },
            },
            rhythmVertical: {
                marginBottom: 50,
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
            label: 'H2',
            group: 'styles',
            style: {
                display: 'block',
                fontFamily: 'title',
                fontSize: 80,
                lineHeight: 1.3,
                maxWidth: '55ch',
                mobile: {
                    fontSize: 60,
                },
            },
            rhythmVertical: {
                marginBottom: 50,
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
            label: 'H3',
            group: 'styles',
            style: {
                display: 'block',
                fontFamily: 'title',
                fontSize: 70,
                lineHeight: 1.3,
                maxWidth: '55ch',
                mobile: {
                    fontSize: 50,
                },
            },
            rhythmVertical: {
                marginBottom: 50,
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
            label: 'H4',
            group: 'styles',
            style: {
                display: 'block',
                fontFamily: 'title',
                fontSize: 60,
                lineHeight: 1.3,
                maxWidth: '55ch',
                mobile: {
                    fontSize: 40,
                },
            },
            rhythmVertical: {
                marginBottom: 50,
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
            label: 'H5',
            group: 'styles',
            style: {
                display: 'block',
                fontFamily: 'title',
                fontSize: 50,
                lineHeight: 1.3,
                maxWidth: '55ch',
                mobile: {
                    fontSize: 30,
                },
            },
            rhythmVertical: {
                marginBottom: 40,
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
            label: 'H6',
            group: 'styles',
            style: {
                display: 'block',
                fontFamily: 'title',
                fontSize: 40,
                lineHeight: 1.3,
                maxWidth: '55ch',
                mobile: {
                    fontSize: 30,
                },
            },
            hythmVertical: {
                marginBottom: 40,
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
            label: 'Paragraph',
            group: 'styles',
            default: true,
            style: {
                display: 'block',
                fontFamily: 'default',
                fontSize: 30,
                lineHeight: 1.8,
                maxWidth: '55ch',
            },
            rhythmVertical: {
                marginBottom: 50,
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
            label: 'Lead paragraph',
            group: 'styles',
            style: {
                display: 'block',
                fontFamily: 'default',
                fontSize: 50,
                lineHeight: 1.6,
                maxWidth: '55ch',
                mobile: {
                    fontSize: 40,
                },
            },
            rhythmVertical: {
                marginBottom: 50,
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
            label: '------',
            group: 'block',
            style: {
                display: 'block',
                get color() {
                    return api.theme.color.main;
                },
                opacity: 0.2,
            },
            rhythmVertical: {
                marginBottom: 50,
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
            label: 'Pre',
            group: 'text',
            style: {
                display: 'block',
                fontFamily: 'code',
                color: ['main', 'text'],
                backgroundColor: ['main', 'surface'],
                lineHeight: 1.5,
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
            },
            rhythmVertical: {
                marginBottom: 50,
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
            label: 'Code',
            group: 'text',
            style: {
                display: 'inline-block',
                fontFamily: 'code',
                color: ['main', 'text'],
                lineHeight: 1.1,
                backgroundColor: ['accent', 'surface'],
                borderRadius: 10,
                paddingInline: 10,
                paddingBlock: 0,
            },
        },
        /**
         * @name          blockquote
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {}
         *
         * Specify the css object for the blockquote typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        blockquote: {
            label: 'Blockquote',
            group: 'block',
            style: {
                display: 'block',
                fontFamily: 'quote',
            },
            editorStyle: {
                get paddingInlineStart() {
                    return api.theme.ui.default.paddingInline;
                },
                get borderLeft() {
                    return `1px solid #000`;
                },
            },
            rhythmVertical: {
                marginBottom: 50,
            },
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
            label: 'Link',
            group: 'text',
            style: {
                color: 'accent',
                textDecoration: 'underline',
            },
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
            label: 'Quote',
            group: 'text',
            style: {
                fontFamily: 'quote',
            },
            rhythmVertical: {
                marginBottom: 50,
            },
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
            label: 'Bold',
            group: 'text',
            style: {
                fontWeight: 'bold',
            },
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
            label: 'Italic',
            group: 'text',
            style: {
                fontStyle: 'italic',
            },
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
            label: 'Large',
            group: 'text',
            style: {
                fontSize: '1.1em',
            },
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
            label: 'Larger',
            group: 'text',
            style: {
                fontSize: '1.2em',
            },
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
            label: 'Largest',
            group: 'text',
            style: {
                fontSize: '1.3em',
            },
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
            label: 'Small',
            group: 'text',
            style: {
                fontSize: '0.9em',
            },
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
            label: 'Smaller',
            group: 'text',
            style: {
                fontSize: '0.8em',
            },
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
            label: 'Smallest',
            group: 'text',
            style: {
                fontSize: '0.7em',
            },
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
            label: 'Mark',
            group: 'text',
            style: {
                get backgroundColor() {
                    return api.theme.color.accent;
                },
            },
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
            label: 'Del',
            group: 'text',
            style: {
                textDecoration: 'line-through',
            },
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
            label: 'Ins',
            group: 'text',
            style: {
                textDecoration: 'underline',
            },
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
            label: 'Sub',
            group: 'text',
            style: {
                verticalAlign: 'sub',
                fontSize: '0.6em',
            },
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
            label: 'Sup',
            group: 'text',
            style: {
                verticalAlign: 'sup',
                fontSize: '0.6em',
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFO1lBQ0EsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsUUFBUTtZQUNmLEtBQUssRUFBRTtnQkFDSCxPQUFPLEVBQUUsT0FBTztnQkFDaEIsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFVBQVUsRUFBRSxHQUFHO2dCQUNmLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixNQUFNLEVBQUU7b0JBQ0osUUFBUSxFQUFFLEVBQUU7aUJBQ2Y7YUFDSjtZQUNELGNBQWMsRUFBRTtnQkFDWixZQUFZLEVBQUUsRUFBRTthQUNuQjtTQUNKO1FBQ0Q7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRTtZQUNBLEtBQUssRUFBRSxJQUFJO1lBQ1gsS0FBSyxFQUFFLFFBQVE7WUFDZixLQUFLLEVBQUU7Z0JBQ0gsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLFVBQVUsRUFBRSxPQUFPO2dCQUNuQixRQUFRLEVBQUUsRUFBRTtnQkFDWixVQUFVLEVBQUUsR0FBRztnQkFDZixRQUFRLEVBQUUsTUFBTTtnQkFDaEIsTUFBTSxFQUFFO29CQUNKLFFBQVEsRUFBRSxFQUFFO2lCQUNmO2FBQ0o7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osWUFBWSxFQUFFLEVBQUU7YUFDbkI7U0FDSjtRQUNEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUU7WUFDQSxLQUFLLEVBQUUsSUFBSTtZQUNYLEtBQUssRUFBRSxRQUFRO1lBQ2YsS0FBSyxFQUFFO2dCQUNILE9BQU8sRUFBRSxPQUFPO2dCQUNoQixVQUFVLEVB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