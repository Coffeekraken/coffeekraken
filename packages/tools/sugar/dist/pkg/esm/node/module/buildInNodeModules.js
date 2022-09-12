// @ts-nocheck
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
export default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxlQUFlO0lBQ1gsTUFBTSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLFFBQVE7U0FDcEI7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxRQUFRO1NBQ3BCO0tBQ0o7SUFDRCxPQUFPLEVBQUU7UUFDTCxRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsb0JBQW9CO1NBQ2hDO0tBQ0o7SUFDRCxTQUFTLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsc0JBQXNCO1NBQ2xDO0tBQ0o7SUFDRCxNQUFNLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsbUJBQW1CO1NBQy9CO0tBQ0o7SUFDRCxNQUFNLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsZ0JBQWdCO1NBQzVCO0tBQ0o7SUFDRCxNQUFNLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsUUFBUTtTQUNwQjtLQUNKO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLGFBQWE7U0FDekI7S0FDSjtJQUNELEtBQUssRUFBRTtRQUNILFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxrQkFBa0I7U0FDOUI7S0FDSjtJQUNELEVBQUUsRUFBRTtRQUNBLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSx1QkFBdUI7U0FDbkM7S0FDSjtJQUNELElBQUksRUFBRTtRQUNGLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxpQkFBaUI7U0FDN0I7S0FDSjtJQUNELFFBQVEsRUFBRTtRQUNOLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxVQUFVO1NBQ3RCO0tBQ0o7SUFDRCxPQUFPLEVBQUU7UUFDTCxRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsaUJBQWlCO1NBQzdCO0tBQ0o7SUFDRCxXQUFXLEVBQUU7UUFDVCxRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsaUJBQWlCO1NBQzdCO0tBQ0o7SUFDRCxNQUFNLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsbUJBQW1CO1NBQy9CO0tBQ0o7SUFDRCxjQUFjLEVBQUU7UUFDWixRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsd0JBQXdCO1NBQ3BDO0tBQ0o7SUFDRCxtQkFBbUIsRUFBRTtRQUNqQixRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsNkJBQTZCO1NBQ3pDO0tBQ0o7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSwwQkFBMEI7U0FDdEM7S0FDSjtJQUNELGlCQUFpQixFQUFFO1FBQ2YsUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLDJCQUEyQjtTQUN2QztLQUNKO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsMEJBQTBCO1NBQ3RDO0tBQ0o7SUFDRCxjQUFjLEVBQUU7UUFDWixRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsZ0JBQWdCO1NBQzVCO0tBQ0o7SUFDRCxHQUFHLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsTUFBTTtTQUNsQjtLQUNKO0lBQ0QsTUFBTSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLG1CQUFtQjtTQUMvQjtLQUNKO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLGdCQUFnQjtTQUM1QjtLQUNKO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLEtBQUs7U0FDakI7S0FDSjtJQUNELElBQUksRUFBRTtRQUNGLFFBQVEsRUFBRTtZQUNOLE9BQU8sRUFBRSxNQUFNO1NBQ2xCO0tBQ0o7SUFDRCxFQUFFLEVBQUU7UUFDQSxRQUFRLEVBQUU7WUFDTixPQUFPLEVBQUUsZUFBZTtTQUMzQjtLQUNKO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsUUFBUSxFQUFFO1lBQ04sT0FBTyxFQUFFLGlCQUFpQjtTQUM3QjtLQUNKO0NBQ0osQ0FBQyJ9