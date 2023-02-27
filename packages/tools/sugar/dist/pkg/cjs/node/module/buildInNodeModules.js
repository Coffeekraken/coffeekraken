"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            buildInNodeModules
 * @namespace            node.module
 * @type            Object
 * @platform        node
 * @status          beta
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
 * @snippet         __buildInNodeModules
 *
 * @example             js
 * import { __builtInNodeModules } from '@coffeekraken/sugar/module';
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = {
    assert: {
        polyfill: {
            browser: 'assert',
        },
    },
    buffer: {
        polyfill: {
            browser: 'buffer',
        },
    },
    console: {
        polyfill: {
            browser: 'console-browserify',
        },
    },
    constants: {
        polyfill: {
            browser: 'constants-browserify',
        },
    },
    crypto: {
        polyfill: {
            browser: 'crypto-browserify',
        },
    },
    domain: {
        polyfill: {
            browser: 'domain-browser',
        },
    },
    events: {
        polyfill: {
            browser: 'events',
        },
    },
    http: {
        polyfill: {
            browser: 'stream-http',
        },
    },
    https: {
        polyfill: {
            browser: 'https-browserify',
        },
    },
    os: {
        polyfill: {
            browser: 'os-browserify/browser',
        },
    },
    path: {
        polyfill: {
            browser: 'path-browserify',
        },
    },
    punycode: {
        polyfill: {
            browser: 'punycode',
        },
    },
    process: {
        polyfill: {
            browser: 'process/browser',
        },
    },
    querystring: {
        polyfill: {
            browser: 'querystring-es3',
        },
    },
    stream: {
        polyfill: {
            browser: 'stream-browserify',
        },
    },
    _stream_duplex: {
        polyfill: {
            browser: 'readable-stream/duplex',
        },
    },
    _stream_passthrough: {
        polyfill: {
            browser: 'readable-stream/passthrough',
        },
    },
    _stream_readable: {
        polyfill: {
            browser: 'readable-stream/readable',
        },
    },
    _stream_transform: {
        polyfill: {
            browser: 'readable-stream/transform',
        },
    },
    _stream_writable: {
        polyfill: {
            browser: 'readable-stream/writable',
        },
    },
    string_decoder: {
        polyfill: {
            browser: 'string_decoder',
        },
    },
    sys: {
        polyfill: {
            browser: 'util',
        },
    },
    timers: {
        polyfill: {
            browser: 'timers-browserify',
        },
    },
    tty: {
        polyfill: {
            browser: 'tty-browserify',
        },
    },
    url: {
        polyfill: {
            browser: 'url',
        },
    },
    util: {
        polyfill: {
            browser: 'util',
        },
    },
    vm: {
        polyfill: {
            browser: 'vm-browserify',
        },
    },
    zlib: {
        polyfill: {
            browser: 'browserify-zlib',
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsa0JBQWU7SUFDWCxNQUFNLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsUUFBUTtTQUNwQjtLQUNKO0lBQ0QsTUFBTSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLFFBQVE7U0FDcEI7S0FDSjtJQUNELE9BQU8sRUFBRTtRQUNMLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxvQkFBb0I7U0FDaEM7S0FDSjtJQUNELFNBQVMsRUFBRTtRQUNQLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxzQkFBc0I7U0FDbEM7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxtQkFBbUI7U0FDL0I7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxnQkFBZ0I7U0FDNUI7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxRQUFRO1NBQ3BCO0tBQ0o7SUFDRCxJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsYUFBYTtTQUN6QjtLQUNKO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLGtCQUFrQjtTQUM5QjtLQUNKO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLHVCQUF1QjtTQUNuQztLQUNKO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLGlCQUFpQjtTQUM3QjtLQUNKO0lBQ0QsUUFBUSxFQUFFO1FBQ04sUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLFVBQVU7U0FDdEI7S0FDSjtJQUNELE9BQU8sRUFBRTtRQUNMLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxpQkFBaUI7U0FDN0I7S0FDSjtJQUNELFdBQVcsRUFBRTtRQUNULFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxpQkFBaUI7U0FDN0I7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxtQkFBbUI7U0FDL0I7S0FDSjtJQUNELGNBQWMsRUFBRTtRQUNaLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSx3QkFBd0I7U0FDcEM7S0FDSjtJQUNELG1CQUFtQixFQUFFO1FBQ2pCLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSw2QkFBNkI7U0FDekM7S0FDSjtJQUNELGdCQUFnQixFQUFFO1FBQ2QsUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLDBCQUEwQjtTQUN0QztLQUNKO0lBQ0QsaUJBQWlCLEVBQUU7UUFDZixRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsMkJBQTJCO1NBQ3ZDO0tBQ0o7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSwwQkFBMEI7U0FDdEM7S0FDSjtJQUNELGNBQWMsRUFBRTtRQUNaLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxnQkFBZ0I7U0FDNUI7S0FDSjtJQUNELEdBQUcsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxNQUFNO1NBQ2xCO0tBQ0o7SUFDRCxNQUFNLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsbUJBQW1CO1NBQy9CO0tBQ0o7SUFDRCxHQUFHLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsZ0JBQWdCO1NBQzVCO0tBQ0o7SUFDRCxHQUFHLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsS0FBSztTQUNqQjtLQUNKO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLE1BQU07U0FDbEI7S0FDSjtJQUNELEVBQUUsRUFBRTtRQUNBLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxlQUFlO1NBQzNCO0tBQ0o7SUFDRCxJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsaUJBQWlCO1NBQzdCO0tBQ0o7Q0FDSixDQUFDIn0=