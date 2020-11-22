"use strict";
/**
 * @name            buildInNodeModules
 * @namespace       sugar.node.module
 * @type            Object
 *
 * This object store the list of built-in node module
 * with a polyfill property for each that point to some
 * polyfill depending on the context wanted. It can be "browser"
 * or some others to come depending on the needs...
 *
 * @example             js
 * const builtInNodeModules = require('@coffeekraken/sugar/node/module/builtInNodeModules');
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
module.exports = {
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
