"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            buildInNodeModules
 * @namespace       sugar.node.module
 * @type            Object
 * @stable
 *
 * This object store the list of built-in node module
 * with a polyfill property for each that point to some
 * polyfill depending on the context wanted. It can be "browser"
 * or some others to come depending on the needs...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import builtInNodeModules from '@coffeekraken/sugar/node/module/builtInNodeModules';
 * // {
 * //   os: {
 * //     polyfill: {
 * //        browser: 'os-browserify'
 * //     }
 * //   },
 * //   ...
 * // }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = {
    assert: {
        polyfill: {
            browser: 'assert'
        }
    },
    buffer: {
        polyfill: {
            browser: 'buffer'
        }
    },
    console: {
        polyfill: {
            browser: 'console-browserify'
        }
    },
    constants: {
        polyfill: {
            browser: 'constants-browserify'
        }
    },
    crypto: {
        polyfill: {
            browser: 'crypto-browserify'
        }
    },
    domain: {
        polyfill: {
            browser: 'domain-browser'
        }
    },
    events: {
        polyfill: {
            browser: 'events'
        }
    },
    http: {
        polyfill: {
            browser: 'stream-http'
        }
    },
    https: {
        polyfill: {
            browser: 'https-browserify'
        }
    },
    os: {
        polyfill: {
            browser: 'os-browserify/browser'
        }
    },
    path: {
        polyfill: {
            browser: 'path-browserify'
        }
    },
    punycode: {
        polyfill: {
            browser: 'punycode'
        }
    },
    process: {
        polyfill: {
            browser: 'process/browser'
        }
    },
    querystring: {
        polyfill: {
            browser: 'querystring-es3'
        }
    },
    stream: {
        polyfill: {
            browser: 'stream-browserify'
        }
    },
    _stream_duplex: {
        polyfill: {
            browser: 'readable-stream/duplex'
        }
    },
    _stream_passthrough: {
        polyfill: {
            browser: 'readable-stream/passthrough'
        }
    },
    _stream_readable: {
        polyfill: {
            browser: 'readable-stream/readable'
        }
    },
    _stream_transform: {
        polyfill: {
            browser: 'readable-stream/transform'
        }
    },
    _stream_writable: {
        polyfill: {
            browser: 'readable-stream/writable'
        }
    },
    string_decoder: {
        polyfill: {
            browser: 'string_decoder'
        }
    },
    sys: {
        polyfill: {
            browser: 'util'
        }
    },
    timers: {
        polyfill: {
            browser: 'timers-browserify'
        }
    },
    tty: {
        polyfill: {
            browser: 'tty-browserify'
        }
    },
    url: {
        polyfill: {
            browser: 'url'
        }
    },
    util: {
        polyfill: {
            browser: 'util'
        }
    },
    vm: {
        polyfill: {
            browser: 'vm-browserify'
        }
    },
    zlib: {
        polyfill: {
            browser: 'browserify-zlib'
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRJbk5vZGVNb2R1bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25vZGUvbW9kdWxlL2J1aWxkSW5Ob2RlTW9kdWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILGtCQUFlO0lBQ2IsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLFFBQVE7U0FDbEI7S0FDRjtJQUNELE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxRQUFRO1NBQ2xCO0tBQ0Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsb0JBQW9CO1NBQzlCO0tBQ0Y7SUFDRCxTQUFTLEVBQUU7UUFDVCxRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsc0JBQXNCO1NBQ2hDO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsbUJBQW1CO1NBQzdCO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsZ0JBQWdCO1NBQzFCO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsUUFBUTtTQUNsQjtLQUNGO0lBQ0QsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLGFBQWE7U0FDdkI7S0FDRjtJQUNELEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxrQkFBa0I7U0FDNUI7S0FDRjtJQUNELEVBQUUsRUFBRTtRQUNGLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSx1QkFBdUI7U0FDakM7S0FDRjtJQUNELElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxpQkFBaUI7U0FDM0I7S0FDRjtJQUNELFFBQVEsRUFBRTtRQUNSLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxVQUFVO1NBQ3BCO0tBQ0Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsaUJBQWlCO1NBQzNCO0tBQ0Y7SUFDRCxXQUFXLEVBQUU7UUFDWCxRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsaUJBQWlCO1NBQzNCO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsbUJBQW1CO1NBQzdCO0tBQ0Y7SUFDRCxjQUFjLEVBQUU7UUFDZCxRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsd0JBQXdCO1NBQ2xDO0tBQ0Y7SUFDRCxtQkFBbUIsRUFBRTtRQUNuQixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsNkJBQTZCO1NBQ3ZDO0tBQ0Y7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsMEJBQTBCO1NBQ3BDO0tBQ0Y7SUFDRCxpQkFBaUIsRUFBRTtRQUNqQixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsMkJBQTJCO1NBQ3JDO0tBQ0Y7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsMEJBQTBCO1NBQ3BDO0tBQ0Y7SUFDRCxjQUFjLEVBQUU7UUFDZCxRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsZ0JBQWdCO1NBQzFCO0tBQ0Y7SUFDRCxHQUFHLEVBQUU7UUFDSCxRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsTUFBTTtTQUNoQjtLQUNGO0lBQ0QsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLG1CQUFtQjtTQUM3QjtLQUNGO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLGdCQUFnQjtTQUMxQjtLQUNGO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLEtBQUs7U0FDZjtLQUNGO0lBQ0QsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLE1BQU07U0FDaEI7S0FDRjtJQUNELEVBQUUsRUFBRTtRQUNGLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxlQUFlO1NBQ3pCO0tBQ0Y7SUFDRCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsaUJBQWlCO1NBQzNCO0tBQ0Y7Q0FDRixDQUFDIn0=