// @ts-nocheck
/**
 * @name            buildInNodeModules
 * @namespace            node.module
 * @type            Object
 * @platform        ts
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
export default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRJbk5vZGVNb2R1bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGRJbk5vZGVNb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsZUFBZTtJQUNiLE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxRQUFRO1NBQ2xCO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsUUFBUTtTQUNsQjtLQUNGO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLG9CQUFvQjtTQUM5QjtLQUNGO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLHNCQUFzQjtTQUNoQztLQUNGO0lBQ0QsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLG1CQUFtQjtTQUM3QjtLQUNGO0lBQ0QsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLGdCQUFnQjtTQUMxQjtLQUNGO0lBQ0QsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLFFBQVE7U0FDbEI7S0FDRjtJQUNELElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxhQUFhO1NBQ3ZCO0tBQ0Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsa0JBQWtCO1NBQzVCO0tBQ0Y7SUFDRCxFQUFFLEVBQUU7UUFDRixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsdUJBQXVCO1NBQ2pDO0tBQ0Y7SUFDRCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsaUJBQWlCO1NBQzNCO0tBQ0Y7SUFDRCxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsVUFBVTtTQUNwQjtLQUNGO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLGlCQUFpQjtTQUMzQjtLQUNGO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLGlCQUFpQjtTQUMzQjtLQUNGO0lBQ0QsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLG1CQUFtQjtTQUM3QjtLQUNGO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLHdCQUF3QjtTQUNsQztLQUNGO0lBQ0QsbUJBQW1CLEVBQUU7UUFDbkIsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLDZCQUE2QjtTQUN2QztLQUNGO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDaEIsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLDBCQUEwQjtTQUNwQztLQUNGO0lBQ0QsaUJBQWlCLEVBQUU7UUFDakIsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLDJCQUEyQjtTQUNyQztLQUNGO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDaEIsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLDBCQUEwQjtTQUNwQztLQUNGO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLGdCQUFnQjtTQUMxQjtLQUNGO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLE1BQU07U0FDaEI7S0FDRjtJQUNELE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxtQkFBbUI7U0FDN0I7S0FDRjtJQUNELEdBQUcsRUFBRTtRQUNILFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxnQkFBZ0I7U0FDMUI7S0FDRjtJQUNELEdBQUcsRUFBRTtRQUNILFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7S0FDRjtJQUNELElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxNQUFNO1NBQ2hCO0tBQ0Y7SUFDRCxFQUFFLEVBQUU7UUFDRixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsZUFBZTtTQUN6QjtLQUNGO0lBQ0QsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLGlCQUFpQjtTQUMzQjtLQUNGO0NBQ0YsQ0FBQyJ9