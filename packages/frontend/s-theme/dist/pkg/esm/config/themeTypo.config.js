import __SColor from '@coffeekraken/s-color';
import { __upperFirst } from '@coffeekraken/sugar/string';
export function preprocess(api) {
    if (!api.config.themeTypo) {
        api.config.themeTypo = {};
    }
    if (api.theme.color) {
        for (let [name, value] of Object.entries(api.theme.color)) {
            if (name === 'current') {
                continue;
            }
            api.config.themeTypo[name] = {
                label: __upperFirst(name),
                group: 'color',
                type: 'color',
                style: {
                    color: value,
                },
            };
            const endGradientColor = new __SColor(value);
            api.config.themeTypo[`${name}Gradient`] = {
                label: `${__upperFirst(name)} gradient`,
                group: 'color',
                type: 'color',
                style: {
                    backgroundSize: '100%',
                    '-webkitBackgroundClip': 'text',
                    '-mozBackgroundClip': 'text',
                    '-webkitTextFillColor': 'transparent',
                    '-mozTextFillColor': 'transparent',
                    backgroundImage: `linear-gradient(90deg, ${value} 0%, ${endGradientColor.apply(api.theme.gradient.defaultTextModifierEnd)} 100%)`,
                },
            };
        }
    }
    return api.this;
}
export default (api) => {
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
                fontSize: 80,
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
                fontSize: 70,
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
                fontSize: 60,
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
                fontSize: 50,
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
                fontSize: 40,
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
                fontSize: 30,
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
                opacity: 0.6,
            },
            rhythmVertical: {
                marginBottom: 40,
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
                fontSize: 40,
                lineHeight: 1.6,
                maxWidth: '55ch',
                mobile: {
                    fontSize: 40,
                },
            },
            rhythmVertical: {
                marginBottom: 40,
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
            label: '--',
            group: 'block',
            button: {
                label: '--',
            },
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
            button: {
                label: '</>',
            },
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
            button: {
                label: '<svg viewBox="0 0 20 20"><path d="M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z"></path></svg>',
            },
            style: {
                display: 'block',
                fontFamily: 'quote',
            },
            editor: {
                style: {
                    get paddingInlineStart() {
                        return api.theme.ui.default.paddingInline;
                    },
                    get borderLeft() {
                        return `1px solid #000`;
                    },
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
            button: {
                label: '<svg viewBox="0 0 20 20"><path d="m11.077 15 .991-1.416a.75.75 0 1 1 1.229.86l-1.148 1.64a.748.748 0 0 1-.217.206 5.251 5.251 0 0 1-8.503-5.955.741.741 0 0 1 .12-.274l1.147-1.639a.75.75 0 1 1 1.228.86L4.933 10.7l.006.003a3.75 3.75 0 0 0 6.132 4.294l.006.004zm5.494-5.335a.748.748 0 0 1-.12.274l-1.147 1.639a.75.75 0 1 1-1.228-.86l.86-1.23a3.75 3.75 0 0 0-6.144-4.301l-.86 1.229a.75.75 0 0 1-1.229-.86l1.148-1.64a.748.748 0 0 1 .217-.206 5.251 5.251 0 0 1 8.503 5.955zm-4.563-2.532a.75.75 0 0 1 .184 1.045l-3.155 4.505a.75.75 0 1 1-1.229-.86l3.155-4.506a.75.75 0 0 1 1.045-.184z"></path></svg>',
            },
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
            button: {
                label: '<svg viewBox="0 0 20 20"><path d="M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z"></path></svg>',
            },
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
            button: {
                label: 'B',
                style: {
                    fontWeight: 'bolder',
                },
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
            button: {
                label: 'I',
                style: {
                    fontStyle: 'italic',
                },
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
            button: {
                label: 'A',
                style: {
                    fontSize: '1.01em',
                },
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
            button: {
                label: 'A',
                style: {
                    fontSize: '1.02em',
                },
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
            button: {
                label: 'A',
                style: {
                    fontSize: '1.03em',
                },
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
            button: {
                label: 'A',
                style: {
                    fontSize: '0.99em',
                },
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
            button: {
                label: 'A',
                style: {
                    fontSize: '0.98em',
                },
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
            button: {
                label: 'A',
                style: {
                    fontSize: '0.97em',
                },
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
            button: {
                label: 'M',
            },
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
            label: 'Deleted',
            group: 'text',
            style: {
                textDecoration: 'line-through',
            },
            button: {
                label: 'D',
                style: {
                    textDecoration: 'line-through',
                },
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
            label: 'Inserted',
            group: 'text',
            style: {
                textDecoration: 'underline',
            },
            button: {
                label: 'U',
                style: {
                    textDecoration: 'underline',
                },
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
            label: 'Subscript',
            group: 'text',
            style: {
                verticalAlign: 'sub',
                fontSize: '0.6em',
            },
            button: {
                label: 'Sub',
                style: {
                    verticalAlign: 'sub',
                    fontSize: '0.6em',
                },
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
            label: 'Superscript',
            group: 'text',
            style: {
                verticalAlign: 'sup',
                fontSize: '0.6em',
            },
            button: {
                label: 'Sup',
                style: {
                    verticalAlign: 'sup',
                    fontSize: '0.6em',
                },
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUxRCxNQUFNLFVBQVUsVUFBVSxDQUFDLEdBQUc7SUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ3ZCLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztLQUM3QjtJQUVELElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7UUFDakIsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN2RCxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQ3BCLFNBQVM7YUFDWjtZQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUN6QixLQUFLLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDekIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsS0FBSyxFQUFFO29CQUNILEtBQUssRUFBRSxLQUFLO2lCQUNmO2FBQ0osQ0FBQztZQUVGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHO2dCQUN0QyxLQUFLLEVBQUUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVc7Z0JBQ3ZDLEtBQUssRUFBRSxPQUFPO2dCQUNkLElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRTtvQkFDSCxjQUFj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