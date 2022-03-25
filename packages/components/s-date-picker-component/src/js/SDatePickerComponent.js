import { html, css, unsafeCSS } from "lit";
import { html as staticHTML } from "lit/static-html.js";
import __SDatePickerComponentInterface from "./interface/SDatePickerComponentInterface";
import __pikaday from "pikaday";
import __whenInteract from "@coffeekraken/sugar/js/dom/detect/whenInteract";
import __moment from "moment";
import __css from "../css/s-date-picker.css";
import __themeCss from "../css/s-date-picker-theme.css";
import __baseCss from "pikaday/css/pikaday.css";
import __SLitComponent from "@coffeekraken/s-lit-component";
class SDatePicker extends __SLitComponent {
  constructor() {
    super({
      litComponent: {
        shadowDom: false
      },
      componentUtils: {
        interface: __SDatePickerComponentInterface
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
    return __SLitComponent.properties({}, __SDatePickerComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(`
                ${__baseCss}
                ${__css}
                ${__themeCss}
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
    await __whenInteract(this);
    const _this = this;
    this._picker = new __pikaday({
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
    return __moment(dateString, format).toDate();
  }
  dateToString(date, format = this.props.format) {
    return __moment(date).format(format);
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
    return html`
            <div class="${this.componentUtils.className("")}" ${this.props.rtl ? 'dir="rtl"' : ""}>
                ${!this._hasInput && this.props.input ? html`
                    <input ?disabled=${this.props.disabled} type="text" autocomplete="off" name="${this.props.name}" value="${this.props.value}" placeholder="${this.props.placeholder}" class="${this.componentUtils.className("__input", "s-input")}" />
                ` : !this._hasInput ? html`
                    <input ?disabled=${this.props.disabled} type="hidden" name="${this.props.name}" value="${this.props.value}" />
                ` : ``}
                ${!this._hasButton && this.props.button ? html`
                          <button
                                ?disabled=${this.props.disabled}
                              onclick="return false"
                              class="${this.componentUtils.className("__button", "s-btn")}"
                          >
                              ${this.calendarIcon ? html`
                                ${staticHTML(this.calendarIcon)}
                              ` : html`
                                <i class="s-icon s-icon--calendar"></i>
                              `}
                          </button>
                      ` : ""}
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-date-picker") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, SDatePicker);
}
export {
  SDatePicker as default,
  define
};
