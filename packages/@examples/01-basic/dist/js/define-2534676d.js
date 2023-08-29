import { _ as __querySelectorLive, a as __fastdom, b as __wait, c as __deepMerge, d as commonjsGlobal, S as SInterface, e as SFeature, f as __clearTransmations } from "./index.esm.js";
function __expandPleasantCssClassname(classesStr) {
  var _a, _b;
  let classesArray = [];
  const classNames = classesStr.split(/\s+/);
  let currentMedia = "";
  classNames.forEach((className) => {
    if (className.slice(0, 1) == "@") {
      currentMedia = className.replace("@", "_");
      return;
    }
    const parts = className.split(":");
    if (parts.length === 1) {
      let name = className;
      if (currentMedia !== "")
        name = className + currentMedia;
      classesArray.push(name);
    } else {
      const firstClass = parts[0];
      let name = firstClass;
      if (currentMedia !== "")
        name = firstClass + currentMedia;
      classesArray.push(name);
      parts.forEach((part, i) => {
        if (i > 0) {
          name = firstClass + "-" + part;
          if (currentMedia !== "")
            name = name + currentMedia;
          classesArray.push(name);
        }
      });
    }
  });
  if ((_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.classmap) {
    classesArray = classesArray.map((cls) => document.env.SUGAR.classmap.resolve(cls));
  }
  return classesArray.join(" ");
}
function __expandPleasantCssClassnamesLive(settings) {
  settings = Object.assign({ afterFirst: void 0, rootNode: document }, settings);
  __querySelectorLive('[class*=":"]:not(code [class*=":"]):not(template [class*=":"]),[class*="@"]:not(code [class*="@"]):not(template [class*="@"])', ($elm) => {
    const classesStr = $elm.getAttribute("class");
    const newClassesStr = __expandPleasantCssClassname(classesStr);
    __fastdom.mutate(() => {
      $elm.setAttribute("class", newClassesStr);
    });
  }, {
    afterFirst: settings.afterFirst,
    rootNode: settings === null || settings === void 0 ? void 0 : settings.rootNode
  });
}
function __viewportEvents($elm, settings) {
  let observer, status = "out";
  if ($elm._viewportEventsInited) {
    return $elm;
  }
  $elm._viewportEventsInited = true;
  settings = Object.assign({ offset: "25px", once: false }, settings !== null && settings !== void 0 ? settings : {});
  observer = new IntersectionObserver((entries, observer2) => {
    if (!entries.length)
      return;
    const entry = entries.pop();
    if (entry.intersectionRatio > 0) {
      if (status === "in") {
        return;
      }
      status = "in";
      $elm.dispatchEvent(new CustomEvent("viewport.in", {
        bubbles: true
      }));
      if (settings === null || settings === void 0 ? void 0 : settings.once) {
        observer2.disconnect();
      }
    } else {
      if (status === "out") {
        return;
      }
      status = "out";
      $elm.dispatchEvent(new CustomEvent("viewport.out", {
        bubbles: true
      }));
    }
  }, {
    root: null,
    rootMargin: settings.offset,
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
  });
  observer.observe($elm);
  return $elm;
}
function autoResize($textarea) {
  $textarea.style.boxSizing = "border-box";
  var offset = $textarea.offsetHeight - $textarea.clientHeight;
  $textarea.addEventListener("input", function(event) {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + offset + "px";
  });
}
function __preventScrollRestoration() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}
function autoFocusFeature() {
  __querySelectorLive("[autofocus]", ($elm) => {
    var _a, _b;
    (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
    setTimeout(() => {
      $elm.focus();
    });
  });
}
var __awaiter$2 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function autoResizeFeature() {
  __querySelectorLive("[auto-resize]", ($elm) => __awaiter$2(this, void 0, void 0, function* () {
    autoResize($elm);
  }));
}
var __awaiter$1 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function confirmButtonFeature() {
  __querySelectorLive("[confirm]", ($btn) => __awaiter$1(this, void 0, void 0, function* () {
    if ($btn.needConfirmation !== void 0) {
      return;
    }
    $btn._isConfirmedStatus = void 0;
    $btn.needConfirmation = true;
    yield __wait(100);
    const buttonElmStyle = window.getComputedStyle($btn), buttonWidth = buttonElmStyle.width, confirmElmStyle = window.getComputedStyle($btn, ":after"), confirmWidth = `${parseInt(confirmElmStyle.width) + 10}px`;
    $btn.style.setProperty("--s-btn-confirm-width", buttonWidth);
    $btn.addEventListener("pointerdown", (e) => {
      if ($btn._isConfirmedStatus === void 0) {
        $btn._isConfirmedStatus = false;
        $btn.style.setProperty("--s-btn-confirm-width", confirmWidth);
      } else if ($btn._isConfirmedStatus === false) {
        setTimeout(() => {
          $btn.style.setProperty("--s-btn-confirm-width", buttonWidth);
        }, 100);
        $btn._isConfirmedStatus = true;
        $btn.needConfirmation = false;
      }
    });
    $btn.addEventListener("blur", (e) => {
      setTimeout(() => {
        $btn.style.setProperty("--s-btn-confirm-width", buttonWidth);
      }, 100);
      $btn._isConfirmedStatus = void 0;
    });
    $btn.addEventListener("pointerup", (e) => {
      setTimeout(() => {
        if ($btn._isConfirmedStatus === true) {
          $btn.blur();
          $btn._isConfirmedStatus = void 0;
          $btn.needConfirmation = true;
        }
      });
    });
  }));
}
function __inputAdditionalAttributes(settings = {}) {
  settings = Object.assign({ empty: true, hasValue: true, dirty: true }, settings);
  function handleInputAttributes(eOrElm) {
    const field = eOrElm.target ? eOrElm.target : eOrElm;
    if (!field || !field.tagName)
      return;
    switch (field.tagName) {
      case "INPUT":
      case "TEXTAREA":
      case "SELECT":
        if (field.type && (field.type === "checkbox" || field.type === "radio")) {
          return;
        }
        __fastdom.mutate(() => {
          if (field.value && !field.hasAttribute("has-value")) {
            if (settings.hasValue) {
              field.setAttribute("has-value", true);
            }
            if (settings.empty) {
              field.removeAttribute("empty");
            }
          } else if (field.value === void 0 || field.value === null || field.value === "") {
            if (settings.hasValue) {
              field.removeAttribute("has-value");
            }
            field.removeAttribute("value");
            if (settings.empty) {
              if (!field.hasAttribute("empty")) {
                field.setAttribute("empty", true);
              }
            }
          }
          if (settings.dirty) {
            if (!field.hasAttribute("dirty") && field.value) {
              field.setAttribute("dirty", true);
            }
          }
        });
        break;
    }
  }
  function handleFormSubmitOrReset(e) {
    [].forEach.call(e.target.elements, (field) => {
      handleInputAttributes(field);
      if (e.type === "submit")
        return;
      field.removeAttribute("dirty");
    });
  }
  __querySelectorLive('select, textarea, input:not([type="submit"])', (elm) => {
    handleInputAttributes(elm);
  });
  document.addEventListener("change", handleInputAttributes);
  document.addEventListener("keyup", handleInputAttributes);
  document.addEventListener("reset", handleFormSubmitOrReset);
  document.addEventListener("submit", handleFormSubmitOrReset);
}
function __linksStateAttributes(settings = {}) {
  settings = __deepMerge({}, settings);
  function handleLink($linkElm) {
    if (!$linkElm) {
      return;
    }
    __fastdom.mutate(() => {
      if ($linkElm.getAttribute("href") === document.location.pathname) {
        $linkElm.setAttribute("actual", true);
        $linkElm.parentNode.setAttribute("actual-parent", true);
        $linkElm.dispatchEvent(new CustomEvent("actual", {
          bubbles: true
        }));
      } else if (document.location.pathname !== "/" && $linkElm.getAttribute("href").startsWith(document.location.pathname)) {
        $linkElm.removeAttribute("actual");
        $linkElm.setAttribute("actual-child", true);
        $linkElm.dispatchEvent(new CustomEvent("actual", {
          bubbles: true
        }));
      } else {
        $linkElm.removeAttribute("actual");
        $linkElm.removeAttribute("actual-child");
        $linkElm.parentNode.removeAttribute("actual-parent");
      }
    });
  }
  __querySelectorLive(`a[href]`, ($linkElm) => {
    handleLink($linkElm);
    setTimeout(() => {
      handleLink($linkElm);
    }, 500);
  });
  window.addEventListener("locationchange", () => {
    Array.from(document.querySelectorAll("a[href]")).forEach(($linkElm) => {
      handleLink($linkElm);
    });
  });
  window.addEventListener("popstate", () => {
    Array.from(document.querySelectorAll("a[href]")).forEach(($linkElm) => {
      handleLink($linkElm);
    });
  });
  window.addEventListener("pushstate", () => {
    Array.from(document.querySelectorAll("a[href]")).forEach(($linkElm) => {
      handleLink($linkElm);
    });
  });
}
var requiresPort = function required(port2, protocol) {
  protocol = protocol.split(":")[0];
  port2 = +port2;
  if (!port2)
    return false;
  switch (protocol) {
    case "http":
    case "ws":
      return port2 !== 80;
    case "https":
    case "wss":
      return port2 !== 443;
    case "ftp":
      return port2 !== 21;
    case "gopher":
      return port2 !== 70;
    case "file":
      return false;
  }
  return port2 !== 0;
};
var querystringify$1 = {};
var has = Object.prototype.hasOwnProperty, undef;
function decode(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, " "));
  } catch (e) {
    return null;
  }
}
function encode(input) {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
}
function querystring(query) {
  var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
  while (part = parser.exec(query)) {
    var key = decode(part[1]), value = decode(part[2]);
    if (key === null || value === null || key in result)
      continue;
    result[key] = value;
  }
  return result;
}
function querystringify(obj, prefix) {
  prefix = prefix || "";
  var pairs = [], value, key;
  if ("string" !== typeof prefix)
    prefix = "?";
  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = "";
      }
      key = encode(key);
      value = encode(value);
      if (key === null || value === null)
        continue;
      pairs.push(key + "=" + value);
    }
  }
  return pairs.length ? prefix + pairs.join("&") : "";
}
querystringify$1.stringify = querystringify;
querystringify$1.parse = querystring;
var required2 = requiresPort, qs = querystringify$1, controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, CRHTLF = /[\n\r\t]/g, slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, port = /:\d+$/, protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, windowsDriveLetter = /^[a-zA-Z]:/;
function trimLeft(str) {
  return (str ? str : "").toString().replace(controlOrWhitespace, "");
}
var rules = [
  ["#", "hash"],
  // Extract from the back.
  ["?", "query"],
  // Extract from the back.
  function sanitize(address, url) {
    return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
  },
  ["/", "pathname"],
  // Extract from the back.
  ["@", "auth", 1],
  // Extract from the front.
  [NaN, "host", void 0, 1, 1],
  // Set left over value.
  [/:(\d*)$/, "port", void 0, 1],
  // RegExp the back.
  [NaN, "hostname", void 0, 1, 1]
  // Set left over.
];
var ignore = { hash: 1, query: 1 };
function lolcation(loc) {
  var globalVar;
  if (typeof window !== "undefined")
    globalVar = window;
  else if (typeof commonjsGlobal !== "undefined")
    globalVar = commonjsGlobal;
  else if (typeof self !== "undefined")
    globalVar = self;
  else
    globalVar = {};
  var location = globalVar.location || {};
  loc = loc || location;
  var finaldestination = {}, type = typeof loc, key;
  if ("blob:" === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ("string" === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore)
      delete finaldestination[key];
  } else if ("object" === type) {
    for (key in loc) {
      if (key in ignore)
        continue;
      finaldestination[key] = loc[key];
    }
    if (finaldestination.slashes === void 0) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }
  return finaldestination;
}
function isSpecial(scheme) {
  return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
}
function extractProtocol(address, location) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, "");
  location = location || {};
  var match = protocolre.exec(address);
  var protocol = match[1] ? match[1].toLowerCase() : "";
  var forwardSlashes = !!match[2];
  var otherSlashes = !!match[3];
  var slashesCount = 0;
  var rest;
  if (forwardSlashes) {
    if (otherSlashes) {
      rest = match[2] + match[3] + match[4];
      slashesCount = match[2].length + match[3].length;
    } else {
      rest = match[2] + match[4];
      slashesCount = match[2].length;
    }
  } else {
    if (otherSlashes) {
      rest = match[3] + match[4];
      slashesCount = match[3].length;
    } else {
      rest = match[4];
    }
  }
  if (protocol === "file:") {
    if (slashesCount >= 2) {
      rest = rest.slice(2);
    }
  } else if (isSpecial(protocol)) {
    rest = match[4];
  } else if (protocol) {
    if (forwardSlashes) {
      rest = rest.slice(2);
    }
  } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
    rest = match[4];
  }
  return {
    protocol,
    slashes: forwardSlashes || isSpecial(protocol),
    slashesCount,
    rest
  };
}
function resolve(relative, base) {
  if (relative === "")
    return base;
  var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path.length, last = path[i - 1], unshift = false, up = 0;
  while (i--) {
    if (path[i] === ".") {
      path.splice(i, 1);
    } else if (path[i] === "..") {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0)
        unshift = true;
      path.splice(i, 1);
      up--;
    }
  }
  if (unshift)
    path.unshift("");
  if (last === "." || last === "..")
    path.push("");
  return path.join("/");
}
function Url(address, location, parser) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, "");
  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }
  var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i = 0;
  if ("object" !== type && "string" !== type) {
    parser = location;
    location = null;
  }
  if (parser && "function" !== typeof parser)
    parser = qs.parse;
  location = lolcation(location);
  extracted = extractProtocol(address || "", location);
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || "";
  address = extracted.rest;
  if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
    instructions[3] = [/(.*)/, "pathname"];
  }
  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    if (typeof instruction === "function") {
      address = instruction(address, url);
      continue;
    }
    parse = instruction[0];
    key = instruction[1];
    if (parse !== parse) {
      url[key] = address;
    } else if ("string" === typeof parse) {
      index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
      if (~index) {
        if ("number" === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if (index = parse.exec(address)) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }
    url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
    if (instruction[4])
      url[key] = url[key].toLowerCase();
  }
  if (parser)
    url.query = parser(url.query);
  if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
    url.pathname = resolve(url.pathname, location.pathname);
  }
  if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
    url.pathname = "/" + url.pathname;
  }
  if (!required2(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = "";
  }
  url.username = url.password = "";
  if (url.auth) {
    index = url.auth.indexOf(":");
    if (~index) {
      url.username = url.auth.slice(0, index);
      url.username = encodeURIComponent(decodeURIComponent(url.username));
      url.password = url.auth.slice(index + 1);
      url.password = encodeURIComponent(decodeURIComponent(url.password));
    } else {
      url.username = encodeURIComponent(decodeURIComponent(url.auth));
    }
    url.auth = url.password ? url.username + ":" + url.password : url.username;
  }
  url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
  url.href = url.toString();
}
function set(part, value, fn) {
  var url = this;
  switch (part) {
    case "query":
      if ("string" === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }
      url[part] = value;
      break;
    case "port":
      url[part] = value;
      if (!required2(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = "";
      } else if (value) {
        url.host = url.hostname + ":" + value;
      }
      break;
    case "hostname":
      url[part] = value;
      if (url.port)
        value += ":" + url.port;
      url.host = value;
      break;
    case "host":
      url[part] = value;
      if (port.test(value)) {
        value = value.split(":");
        url.port = value.pop();
        url.hostname = value.join(":");
      } else {
        url.hostname = value;
        url.port = "";
      }
      break;
    case "protocol":
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;
    case "pathname":
    case "hash":
      if (value) {
        var char = part === "pathname" ? "/" : "#";
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;
    case "username":
    case "password":
      url[part] = encodeURIComponent(value);
      break;
    case "auth":
      var index = value.indexOf(":");
      if (~index) {
        url.username = value.slice(0, index);
        url.username = encodeURIComponent(decodeURIComponent(url.username));
        url.password = value.slice(index + 1);
        url.password = encodeURIComponent(decodeURIComponent(url.password));
      } else {
        url.username = encodeURIComponent(decodeURIComponent(value));
      }
  }
  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];
    if (ins[4])
      url[ins[1]] = url[ins[1]].toLowerCase();
  }
  url.auth = url.password ? url.username + ":" + url.password : url.username;
  url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
  url.href = url.toString();
  return url;
}
function toString(stringify) {
  if (!stringify || "function" !== typeof stringify)
    stringify = qs.stringify;
  var query, url = this, host = url.host, protocol = url.protocol;
  if (protocol && protocol.charAt(protocol.length - 1) !== ":")
    protocol += ":";
  var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
  if (url.username) {
    result += url.username;
    if (url.password)
      result += ":" + url.password;
    result += "@";
  } else if (url.password) {
    result += ":" + url.password;
    result += "@";
  } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
    result += "@";
  }
  if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
    host += ":";
  }
  result += host + url.pathname;
  query = "object" === typeof url.query ? stringify(url.query) : url.query;
  if (query)
    result += "?" !== query.charAt(0) ? "?" + query : query;
  if (url.hash)
    result += url.hash;
  return result;
}
Url.prototype = { set, toString };
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.trimLeft = trimLeft;
Url.qs = qs;
class SSugarFeatureInterface extends SInterface {
  static get _definition() {
    return {
      pleasantCss: {
        description: 'Specify if you want the "pleasant css" syntax in your pages',
        type: "Boolean",
        default: true
      },
      autofocus: {
        description: 'Specify if you want the "autofocus" to work on your page',
        type: "Boolean",
        default: true
      },
      viewportAware: {
        description: 'Specify if you want the "viewport-aware" attribute to be enabled or not. If true, the elements that have this attribute will dispatch the "viewport.enter" and "viewport.exit" events as well as have the "in-viewport" class and attribute',
        type: "Boolean",
        default: true
      },
      containerQuery: {
        description: "Specify if you want support for container queries in your css or not",
        type: "Boolean",
        default: true
      },
      scrollClasses: {
        description: "Specify if you want the scroll classes to be applied on the `body` element when the page has been scrolled",
        type: "Boolean",
        default: true
      },
      scrolledDelta: {
        description: "Specify after how many scroll the scrolled class will be applied",
        type: "Number",
        default: 200
      },
      vhvar: {
        description: "Specify if you want the `--vh` css variable to be computed and available",
        type: "Boolean",
        default: true
      },
      autoResize: {
        description: "Specify if you want the auto resize to be enabled",
        type: "Boolean",
        default: true
      },
      confirmBtn: {
        description: 'Specify if you want the "confirm button" feature to be enabled',
        type: "Boolean",
        default: true
      },
      inputAdditionalAttributes: {
        description: 'Specify if you want to have the additional attributes on inputs like "has-value", "empty" and "dirty" or not',
        type: "Boolean",
        default: true
      },
      resizeTransmations: {
        description: "Specify if you want all the transitions and animations cleared during window resize",
        type: "Boolean",
        default: true
      },
      linksStateAttributes: {
        description: 'Specify if you want to have the state attributes on links like "actual" and "actual-child" or not',
        type: "Boolean",
        default: true
      },
      preventScrollRestoration: {
        description: "Specify if you want to prevent the scroll restoration behavior on chrome that can usually be anoying",
        type: "Boolean",
        default: true
      },
      env: {
        description: "Specify if you want to display the current environment at start",
        type: "Boolean",
        default: true
      }
    };
  }
}
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var _wr = function(type) {
  var orig = history[type];
  return function(...args) {
    var rv = orig.apply(this, arguments);
    var e = new CustomEvent(type.toLowerCase(), {
      bubbles: true,
      detail: args[0]
    });
    window.dispatchEvent(e);
    return rv;
  };
};
history.pushState = _wr("pushState");
class SSugarFeature extends SFeature {
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      name: "s-sugar",
      interface: SSugarFeatureInterface
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._isResizing = false;
  }
  mount() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.props.pleasantCss)
        this._pleasantCss();
      if (this.props.autofocus)
        this._autofocus();
      if (this.props.viewportAware)
        this._viewportAware();
      if (this.props.scrollClasses)
        this._scrollClasses();
      if (this.props.vhvar)
        this._vhvar();
      if (this.props.autoResize)
        this._autoResize();
      if (this.props.confirmBtn)
        this._confirmBtn();
      if (this.props.resizeTransmations)
        this._clearTransmationsOnResize();
      if (this.props.inputAdditionalAttributes)
        __inputAdditionalAttributes();
      if (this.props.linksStateAttributes)
        __linksStateAttributes();
      if (this.props.preventScrollRestoration)
        __preventScrollRestoration();
      if (document.readyState !== "complete") {
        document.addEventListener("readystatechange", () => {
          if (document.readyState === "complete") {
            document.body.classList.remove("initial-loading");
            document.body.classList.remove("loading");
          }
        });
      } else {
        document.body.classList.remove("initial-loading");
        document.body.classList.remove("loading");
      }
    });
  }
  _clearTransmationsOnResize() {
    let resetFn;
    window.addEventListener("resize", () => {
      if (!this._isResizing) {
        resetFn = __clearTransmations();
      }
      this._isResizing = true;
      clearTimeout(this._clearTransmationsOnResizeTimeout);
      this._clearTransmationsOnResizeTimeout = setTimeout(() => {
        this._isResizing = false;
        resetFn === null || resetFn === void 0 ? void 0 : resetFn();
      }, 100);
    });
  }
  _pleasantCss() {
    __expandPleasantCssClassnamesLive({
      afterFirst() {
        setTimeout(() => {
          document.body.classList.remove("initial-loading");
          document.body.classList.remove("loading");
        }, 500);
      }
    });
  }
  _viewportAware() {
    __querySelectorLive("[viewport-aware]", ($elm) => {
      __viewportEvents($elm);
      $elm.addEventListener("viewport.enter", () => {
        $elm.setAttribute("in-viewport", "true");
        $elm.classList.add("in-viewport");
      });
      $elm.addEventListener("viewport.exit", () => {
        $elm.removeAttribute("in-viewport");
        $elm.classList.remove("in-viewport");
      });
    });
  }
  _autofocus() {
    autoFocusFeature();
  }
  _scrollClasses() {
    let previousX = 0, previousY = 0;
    let directionX, directionY;
    document.addEventListener("scroll", (e) => {
      if (window.scrollY >= this.props.scrolledDelta) {
        if (!document.body.classList.contains("scrolled")) {
          document.body.classList.add("scrolled");
        }
      } else {
        if (document.body.classList.contains("scrolled")) {
          document.body.classList.remove("scrolled");
        }
      }
      if (window.scrollY > previousY) {
        directionY = "down";
      } else {
        directionY = "up";
      }
      if (window.scrollX > previousX) {
        directionX = "right";
      } else if (window.scrollX <= previousX) {
        directionX = "left";
      }
      previousX = window.scrollX;
      previousY = window.scrollY;
      if (directionY === "up") {
        document.body.classList.remove("scroll-down");
        document.body.classList.add("scroll-up");
      } else {
        document.body.classList.remove("scroll-up");
        document.body.classList.add("scroll-down");
      }
      if (directionX === "left") {
        document.body.classList.remove("scroll-right");
        document.body.classList.add("scroll-left");
      } else if (directionX === "right") {
        document.body.classList.remove("scroll-left");
        document.body.classList.add("scroll-right");
      }
    });
  }
  _vhvar() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }
  _autoResize() {
    autoResizeFeature();
  }
  _confirmBtn() {
    confirmButtonFeature();
  }
}
function define(props = {}, name = "s-sugar") {
  SSugarFeature.define(name, SSugarFeature, Object.assign({ mountWhen: "direct" }, props));
}
export {
  define as default
};
