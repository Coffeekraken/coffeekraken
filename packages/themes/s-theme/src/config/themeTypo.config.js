(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (env, config) => {
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
                }
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
                }
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
                }
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
                }
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
                }
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
                }
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
                }
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
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            'pre:not([class])': {
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
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVUeXBvLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lVHlwby5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxrQkFBZSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUMzQixPQUFPO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRTtnQkFDQSxhQUFhLEVBQUUsT0FBTztnQkFDdEIsV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsYUFBYSxFQUFFLEdBQUc7Z0JBQ2xCLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixjQUFjLEVBQUU7b0JBQ1osZUFBZSxFQUFFLEVBQUU7aUJBQ3RCO2dCQUNELE1BQU0sRUFBRTtvQkFDSixXQUFXLEVBQUUsRUFBRTtpQkFDbEI7YUFDSjtZQUNEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxFQUFFLEVBQUU7Z0JBQ0EsYUFBYSxFQUFFLE9BQU87Z0JBQ3RCLFdBQVcsRUFBRSxFQUFFO2dCQUNmLGFBQWEsRUFBRSxHQUFHO2dCQUNsQixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsY0FBYyxFQUFFO29CQUNaLGVBQWUsRUFBRSxFQUFFO2lCQUN0QjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osV0FBVyxFQUFFLEVBQUU7aUJBQ2xCO2FBQ0o7WUFDRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsRUFBRSxFQUFFO2dCQUNBLGFBQWEsRUFBRSxPQUFPO2dCQUN0QixXQUFXLEVBQUUsRUFBRTtnQkFDZixhQUFhLEVBQUUsR0FBRztnQkFDbEIsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLGNBQWMsRUFBRTtvQkFDWixlQUFlLEVBQUUsRUFBRTtpQkFDdEI7Z0JBQ0QsTUFBTSxFQUFFO29CQUNKLFdBQVcsRUFBRSxFQUFFO2lCQUNsQjthQUNKO1lBQ0Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRTtnQkFDQSxhQUFhLEVBQUUsT0FBTztnQkFDdEIsV0FBVyxFQUFFLEVBQUU7Z0JB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