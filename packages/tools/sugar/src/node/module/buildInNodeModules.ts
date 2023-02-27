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
