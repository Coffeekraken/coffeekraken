"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            buildInNodeModules
 * @namespace            node.module
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRJbk5vZGVNb2R1bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGRJbk5vZGVNb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsa0JBQWU7SUFDYixNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsUUFBUTtTQUNsQjtLQUNGO0lBQ0QsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLFFBQVE7U0FDbEI7S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxvQkFBb0I7U0FDOUI7S0FDRjtJQUNELFNBQVMsRUFBRTtRQUNULFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxzQkFBc0I7U0FDaEM7S0FDRjtJQUNELE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxtQkFBbUI7U0FDN0I7S0FDRjtJQUNELE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxnQkFBZ0I7U0FDMUI7S0FDRjtJQUNELE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxRQUFRO1NBQ2xCO0tBQ0Y7SUFDRCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsYUFBYTtTQUN2QjtLQUNGO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLGtCQUFrQjtTQUM1QjtLQUNGO0lBQ0QsRUFBRSxFQUFFO1FBQ0YsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLHVCQUF1QjtTQUNqQztLQUNGO0lBQ0QsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLGlCQUFpQjtTQUMzQjtLQUNGO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLFVBQVU7U0FDcEI7S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxpQkFBaUI7U0FDM0I7S0FDRjtJQUNELFdBQVcsRUFBRTtRQUNYLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxpQkFBaUI7U0FDM0I7S0FDRjtJQUNELE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxtQkFBbUI7U0FDN0I7S0FDRjtJQUNELGNBQWMsRUFBRTtRQUNkLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSx3QkFBd0I7U0FDbEM7S0FDRjtJQUNELG1CQUFtQixFQUFFO1FBQ25CLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSw2QkFBNkI7U0FDdkM7S0FDRjtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSwwQkFBMEI7U0FDcEM7S0FDRjtJQUNELGlCQUFpQixFQUFFO1FBQ2pCLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSwyQkFBMkI7U0FDckM7S0FDRjtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSwwQkFBMEI7U0FDcEM7S0FDRjtJQUNELGNBQWMsRUFBRTtRQUNkLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxnQkFBZ0I7U0FDMUI7S0FDRjtJQUNELEdBQUcsRUFBRTtRQUNILFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxNQUFNO1NBQ2hCO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsbUJBQW1CO1NBQzdCO0tBQ0Y7SUFDRCxHQUFHLEVBQUU7UUFDSCxRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsZ0JBQWdCO1NBQzFCO0tBQ0Y7SUFDRCxHQUFHLEVBQUU7UUFDSCxRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsS0FBSztTQUNmO0tBQ0Y7SUFDRCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsTUFBTTtTQUNoQjtLQUNGO0lBQ0QsRUFBRSxFQUFFO1FBQ0YsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLGVBQWU7U0FDekI7S0FDRjtJQUNELElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxpQkFBaUI7U0FDM0I7S0FDRjtDQUNGLENBQUMifQ==