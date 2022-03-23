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
var SDatePickerComponent_exports = {};
__export(SDatePickerComponent_exports, {
  default: () => SDatePicker,
  define: () => define
});
module.exports = __toCommonJS(SDatePickerComponent_exports);
var import_lit = require("lit");
var import_static_html = require("lit/static-html.js");
var import_SDatePickerComponentInterface = __toESM(require("./interface/SDatePickerComponentInterface"), 1);
var import_pikaday = __toESM(require("pikaday"), 1);
var import_whenInteract = __toESM(require("@coffeekraken/sugar/js/dom/detect/whenInteract"), 1);
var import_moment = __toESM(require("moment"), 1);
var import_s_date_picker = __toESM(require("../css/s-date-picker.css"), 1);
var import_s_date_picker_theme = __toESM(require("../css/s-date-picker-theme.css"), 1);
var import_pikaday2 = __toESM(require("pikaday/css/pikaday.css"), 1);
var import_s_lit_component2 = __toESM(require("@coffeekraken/s-lit-component"), 1);
class SDatePicker extends import_s_lit_component2.default {
  constructor() {
    super({
      litComponent: {
        shadowDom: false
      },
      componentUtils: {
        interface: import_SDatePickerComponentInterface.default
      }
    });
    this._hasInput = false;
    this._hasButton = false;
    this._$input = this.querySelector("input");
    this._hasInput = this._$input !== null;
    this._$button = this.querySelector("button");
    this._hasButton = this._$button !== null;
  }
  static get properties() {
    return import_s_lit_component2.default.properties({}, import_SDatePickerComponentInterface.default);
  }
  static get styles() {
    return import_lit.css`
            ${(0, import_lit.unsafeCSS)(`
                ${import_pikaday2.default}
                ${import_s_date_picker.default}
                ${import_s_date_picker_theme.default}
            `)}
        `;
  }
  async firstUpdated() {
    var _a, _b, _c, _d, _e, _f;
    this._$root = this.querySelector(`.${this.componentUtils.className("")}`);
    if (!this._$input) {
      this._$input = this.querySelector("input");
    } else {
      this._$root.append(this._$input);
    }
    if (!((_a = this._$input) == null ? void 0 : _a.hasAttribute("name"))) {
      (_b = this._$input) == null ? void 0 : _b.setAttribute("name", this.props.name);
    }
    if (!((_c = this._$input) == null ? void 0 : _c.hasAttribute("placeholder"))) {
      (_d = this._$input) == null ? void 0 : _d.setAttribute("placeholder", this.props.placeholder);
    }
    if (!((_e = this._$input) == null ? void 0 : _e.hasAttribute("autocomplete"))) {
      (_f = this._$input) == null ? void 0 : _f.setAttribute("autocomplete", "off");
    }
    if (!this._$button) {
      this._$button = this.querySelector("button");
    } else {
      this._$root.append(this._$button);
    }
    if (this._$button) {
      this._$button.classList.add(this.componentUtils.className("__button"));
    }
    await (0, import_whenInteract.default)(this);
    const _this = this;
    this._picker = new import_pikaday.default({
      field: this._$input,
      format: this.props.format,
      trigger: this._$button,
      firstDay: this.props.firstDay,
      minDate: this.parseDate(this.props.minDate),
      maxDate: this.parseDate(this.props.maxDate),
      disableWeekends: this.props.disableWeekends,
      yearRange: this.props.yearRange,
      container: this,
      position: this.props.rtl ? "bottom right" : "bottom left",
      reposition: true,
      isRTL: this.props.rtl,
      i18n: this.props.i18n,
      numberOfMonths: this.props.numberOfMonths,
      events: this.props.events,
      defaultDate: this.props.value,
      theme: !this.props.bare ? "s-pikaday" : "",
      toString(date, format) {
        return _this.dateToString(date, format);
      },
      parse(dateString, format) {
        return _this.parseDate(dateString, format);
      },
      onSelect: () => {
        this._dispatchEvent("select");
      },
      onOpen: () => {
        this._dispatchEvent("open");
      },
      onClose: () => {
        this._dispatchEvent("close");
      },
      onDraw: () => {
        this._dispatchEvent("draw");
      }
    });
    Array.from(this.classList).forEach((cls) => {
      if (cls.match(/^s-cs/))
        this._picker.el.classList.add(cls);
    });
    [
      "toString",
      "getDate",
      "setDate",
      "getMoment",
      "clear",
      "gotoDate",
      "gotoToday",
      "gotoMonth",
      "nextMonth",
      "prevMonth",
      "gotoYear",
      "setMinDate",
      "setMaxDate",
      "setStartRange",
      "setEndRange",
      "isVisible",
      "show",
      "adjustPosition",
      "hide",
      "destroy"
    ].forEach((key) => {
      this[key] = this._picker[key].bind(this._picker);
    });
  }
  parseDate(dateString, format = this.props.format) {
    return (0, import_moment.default)(dateString, format).toDate();
  }
  dateToString(date, format = this.props.format) {
    return (0, import_moment.default)(date).format(format);
  }
  _dispatchEvent(eventName) {
    const event = new CustomEvent(eventName, {
      detail: {
        dateStr: this._picker.toString(),
        date: this._picker.getDate()
      }
    });
    this.dispatchEvent(event);
  }
  render() {
    return import_lit.html`
            <div class="${this.componentUtils.className("")}" ${this.props.rtl ? 'dir="rtl"' : ""}>
                ${!this._hasInput && this.props.input ? import_lit.html`
                    <input ?disabled=${this.props.disabled} type="text" autocomplete="off" name="${this.props.name}" value="${this.props.value}" placeholder="${this.props.placeholder}" class="${this.componentUtils.className("__input", "s-input")}" />
                ` : !this._hasInput ? import_lit.html`
                    <input ?disabled=${this.props.disabled} type="hidden" name="${this.props.name}" value="${this.props.value}" />
                ` : ``}
                ${!this._hasButton && this.props.button ? import_lit.html`
                          <button
                                ?disabled=${this.props.disabled}
                              onclick="return false"
                              class="${this.componentUtils.className("__button", "s-btn")}"
                          >
                              ${this.calendarIcon ? import_lit.html`
                                ${(0, import_static_html.html)(this.calendarIcon)}
                              ` : import_lit.html`
                                <i class="s-icon s-icon--calendar"></i>
                              `}
                          </button>
                      ` : ""}
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-date-picker") {
  import_s_lit_component2.default.setDefaultProps(tagName, props);
  customElements.define(tagName, SDatePicker);
}
