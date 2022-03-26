var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SBlessedNotification_exports = {};
__export(SBlessedNotification_exports, {
  default: () => SBlessedNotification
});
module.exports = __toCommonJS(SBlessedNotification_exports);
var import_deepMerge = __toESM(require("../../../shared/object/deepMerge"), 1);
var import_parseHtml = __toESM(require("../../../shared/console/parseHtml"), 1);
var import_SBlessedComponent = __toESM(require("../SBlessedComponent"), 1);
const _SBlessedNotification = class extends import_SBlessedComponent.default {
  static update() {
    let top = 1, bottom = 1;
    const left = 2;
    const right = 2;
    _SBlessedNotification.displayStacks.tl.forEach(($notif) => {
      $notif.top = top;
      $notif.left = left;
      top += $notif.height + 1;
    });
    top = 1;
    _SBlessedNotification.displayStacks.tr.forEach(($notif) => {
      $notif.top = top;
      $notif.right = right;
      top += $notif.height + 1;
    });
    _SBlessedNotification.displayStacks.bl.forEach(($notif) => {
      $notif.bottom = bottom;
      $notif.left = left;
      bottom += $notif.height + 1;
    });
    bottom = 1;
    _SBlessedNotification.displayStacks.br.forEach(($notif) => {
      $notif.bottom = bottom;
      $notif.right = right;
      bottom += $notif.height + 1;
    });
  }
  constructor(title, body, settings = {}) {
    settings = (0, import_deepMerge.default)({
      onClick: null,
      onTimeout: null,
      position: "tr",
      timeout: 5e3,
      type: "default",
      blessed: {
        style: {
          bg: "cyan",
          fg: "white"
        }
      }
    }, settings);
    switch (settings.type) {
      case "success":
        settings.blessed.style.bg = "green";
        settings.blessed.style.fg = "white";
        break;
      case "warning":
        settings.blessed.style.bg = "yellow";
        settings.blessed.style.fg = "black";
        break;
      case "error":
      case "kill":
      case "killed":
        settings.blessed.style.bg = "red";
        settings.blessed.style.fg = "white";
        break;
    }
    const position = settings.position;
    delete settings.position;
    super((0, import_deepMerge.default)({
      blessed: {
        width: 30,
        height: 4,
        style: {
          bg: settings.blessed.style.bg,
          fg: settings.blessed.style.fg
        },
        padding: {
          top: 1,
          left: 2,
          right: 2,
          bottom: 0
        },
        clickable: settings.onClick !== null,
        content: (0, import_parseHtml.default)([`<bold>${title}</bold>`, `${body}`, ""].join("\n"))
      }
    }, settings.blessed));
    this.on("attach", () => {
      const stack = _SBlessedNotification.displayStacks[position];
      if (stack.indexOf(this) === -1) {
        stack.push(this);
      }
    });
    this.on("detach", () => {
      const stack = _SBlessedNotification.displayStacks[position];
      const idx = stack.indexOf(this);
      if (idx === -1)
        return;
      stack.splice(idx, 1);
      _SBlessedNotification.update();
    });
    if (settings.onClick) {
      this.on("click", () => {
        settings.onClick();
        this.destroy();
      });
    }
    if (settings.timeout !== -1) {
      setTimeout(() => {
        if (this.isDestroyed())
          return;
        settings.onTimeout && settings.onTimeout();
        this.destroy();
      }, settings.timeout);
    }
  }
  update() {
    _SBlessedNotification.update();
    super.update();
  }
};
let SBlessedNotification = _SBlessedNotification;
SBlessedNotification.displayStacks = {
  tl: [],
  tr: [],
  bl: [],
  br: []
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
