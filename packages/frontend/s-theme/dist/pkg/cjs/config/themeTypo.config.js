"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocess = void 0;
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name                    themeTypo
 * @as                      Typos
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-theme typo available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
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
            const endGradientColor = new s_color_1.default(value);
            api.config.themeTypo[`${name}Gradient`] = {
                label: `${(0, string_1.__upperFirst)(name)} gradient`,
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
exports.preprocess = preprocess;
exports.default = (api) => {
    return {
        /**
         * @name          h1
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
                color: ['main', 'text', '--alpha 0.7'],
            },
            rhythmVertical: {
                marginBottom: 40,
            },
        },
        /**
         * @name          lead
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @name          strong
         * @namespace     config.themeTypo
         * @type          Object
         * @default      api.config.themeTypo.bold
         *
         * Specify the css object for the strong typo element
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get strong() {
            return this.bold;
        },
        /**
         * @name          italic
         * @namespace     config.themeTypo
         * @type          Object
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
         * @default      {...}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9FQUE2QztBQUM3Qyx1REFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7OztHQVlHO0FBRUgsU0FBZ0IsVUFBVSxDQUFDLEdBQUc7SUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ3ZCLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztLQUM3QjtJQUVELElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7UUFDakIsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN2RCxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQ3BCLFNBQVM7YUFDWjtZQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUN6QixLQUFLLEVBQUUsSUFBQSxxQkFBWSxFQUFDLElBQUksQ0FBQztnQkFDekIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsS0FBSyxFQUFFO29CQUNILEtBQUssRUFBRSxLQUFLO2lCQUNmO2FBQ0osQ0FBQztZQUVGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxpQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRztnQkFDdEMsS0FBSyxFQUFFLEdBQUcsSUFBQSxxQkFBWSxFQUFDLElBQUksQ0FBQyxXQUFXO2dCQUN2QyxLQUFLLEVBQUUsT0FBTztnQkFDZCxJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUU7b0JBQ0gsY0FBYyxFQUFFLE1BQU07b0JB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