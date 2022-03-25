var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var buildInNodeModules_exports = {};
__export(buildInNodeModules_exports, {
  default: () => buildInNodeModules_default
});
module.exports = __toCommonJS(buildInNodeModules_exports);
var buildInNodeModules_default = {
  assert: {
    polyfill: {
      browser: "assert"
    }
  },
  buffer: {
    polyfill: {
      browser: "buffer"
    }
  },
  console: {
    polyfill: {
      browser: "console-browserify"
    }
  },
  constants: {
    polyfill: {
      browser: "constants-browserify"
    }
  },
  crypto: {
    polyfill: {
      browser: "crypto-browserify"
    }
  },
  domain: {
    polyfill: {
      browser: "domain-browser"
    }
  },
  events: {
    polyfill: {
      browser: "events"
    }
  },
  http: {
    polyfill: {
      browser: "stream-http"
    }
  },
  https: {
    polyfill: {
      browser: "https-browserify"
    }
  },
  os: {
    polyfill: {
      browser: "os-browserify/browser"
    }
  },
  path: {
    polyfill: {
      browser: "path-browserify"
    }
  },
  punycode: {
    polyfill: {
      browser: "punycode"
    }
  },
  process: {
    polyfill: {
      browser: "process/browser"
    }
  },
  querystring: {
    polyfill: {
      browser: "querystring-es3"
    }
  },
  stream: {
    polyfill: {
      browser: "stream-browserify"
    }
  },
  _stream_duplex: {
    polyfill: {
      browser: "readable-stream/duplex"
    }
  },
  _stream_passthrough: {
    polyfill: {
      browser: "readable-stream/passthrough"
    }
  },
  _stream_readable: {
    polyfill: {
      browser: "readable-stream/readable"
    }
  },
  _stream_transform: {
    polyfill: {
      browser: "readable-stream/transform"
    }
  },
  _stream_writable: {
    polyfill: {
      browser: "readable-stream/writable"
    }
  },
  string_decoder: {
    polyfill: {
      browser: "string_decoder"
    }
  },
  sys: {
    polyfill: {
      browser: "util"
    }
  },
  timers: {
    polyfill: {
      browser: "timers-browserify"
    }
  },
  tty: {
    polyfill: {
      browser: "tty-browserify"
    }
  },
  url: {
    polyfill: {
      browser: "url"
    }
  },
  util: {
    polyfill: {
      browser: "util"
    }
  },
  vm: {
    polyfill: {
      browser: "vm-browserify"
    }
  },
  zlib: {
    polyfill: {
      browser: "browserify-zlib"
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
