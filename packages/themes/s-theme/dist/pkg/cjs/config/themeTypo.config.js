"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocess = void 0;
const string_1 = require("@coffeekraken/sugar/string");
function preprocess(api) {
    if (!api.config.themeTypo) {
        api.config.themeTypo = {};
    }
    if (api.theme.color) {
        for (let [name, value] of Object.entries(api.theme.color)) {
            if (name === 'current') {
                continue;
            }
            api.config.themeTypo[name] = {
                label: (0, string_1.__upperFirst)(name),
                group: 'color',
                type: 'color',
                style: {
                    color: value,
                },
            };
        }
    }
    return api.this;
}
exports.preprocess = preprocess;
exports.default = (api) => {
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
            group: 'style',
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
            group: 'style',
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
            group: 'style',
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
            group: 'style',
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
            group: 'style',
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
            group: 'style',
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
            group: 'style',
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
            group: 'style',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVEQUEwRDtBQUUxRCxTQUFnQixVQUFVLENBQUMsR0FBRztJQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDdkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0tBQzdCO0lBRUQsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtRQUNqQixLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDcEIsU0FBUzthQUNaO1lBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUc7Z0JBQ3pCLEtBQUssRUFBRSxJQUFBLHFCQUFZLEVBQUMsSUFBSSxDQUFDO2dCQUN6QixLQUFLLEVBQUUsT0FBTztnQkFDZCxJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLEtBQUs7aUJBQ2Y7YUFDSixDQUFDO1NBQ0w7S0FDSjtJQUVELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztBQUNwQixDQUFDO0FBdkJELGdDQXVCQztBQUVELGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDbkIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRTtZQUNBLEtBQUssRUFBRSxJQUFJO1lBQ1gsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUU7Z0JBQ0gsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLFVBQVUsRUFB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