// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __isUserScrolling, __makeFloat } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __dateFormat from 'dateformat';
import { css, html, unsafeCSS } from 'lit';
import __SDatetimePickerComponentInterface from './interface/SDatetimePickerComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-datetime-picker.css'; // relative to /dist/pkg/esm/js
/**
 * @name                SDatetimePickerComponent
 * @as                  Datetime Picker
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SDatetimePickerComponentInterface.ts
 * @menu                Styleguide / Forms              /styleguide/form/s-datetime-picker
 * @platform            html
 * @status              beta
 *
 * This component specify a datetime picker.
 *
 * @feature           Full support for sugar theming system for easy integration
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @event           s-datetime-picker.change                                  Dispatched when the datepicker change value
 * @event           s-datetime-picker                       Dispatched for every events of this component. Check the detail.eventType prop for event type
 *
 * @install         bash
 * npm i @coffeekraken/s-datetime-picker-component
 *
 * @install         js
 * import { define } from '@coffeekraken/s-datetime-picker-component';
 * define();
 *
 * @example         html            Simple input
 * <label class="s-label:responsive s-color:accent">
 *     <span>Choose a date</span>
 *      <s-datetime-picker calendar placeholder="Choose a date" input></s-datetime-picker>
 * </label>
 *
 * @example         html            With a calendar
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker calendar placeholder="Choose a date" input></s-datetime-picker>
 * </label>
 *
 * @example         html            With a backdrop
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker calendar backdrop placeholder="Choose a date" input></s-datetime-picker>
 * </label>
 *
 * @example         html            With an input and a button
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker placeholder="Choose a date" input button></s-datetime-picker>
 * </label>
 *
 * @example         html            With a different format and a calendar
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker calendar format="yyyy-mm-dd:HH:MM" placeholder="Choose a date" input button></s-datetime-picker>
 * </label>
 *
 * @example         html            Just a button with disabled weekend
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker calendar disable="weekend" button></s-datetime-picker>
 * </label>
 *
 * @example         html            With a custom input
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker>
 *          <input type="text" class="s-input" placeholder="Choose a date" />
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            With a custom button
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker>
 *          <button class="s-btn s-color:error">Choose a date</button>
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            With a custom input and button
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker>
 *          <div class="s-group">
 *              <input type="text" class="s-input" placeholder="Choose a date" />
 *              <button class="s-btn s-color:error">Choose a date</button>
 *          </div>
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            Disabled
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker disabled input button></s-datetime-picker>
 * </label>
 *
 * @example         html            RTL Support
 * <label class="s-label:responsive s-color:accent" dir="rtl">
 *      <span>Choose a date</span>
 *      <s-datetime-picker placeholder="Choose a date" input button dir="rtl"></s-datetime-picker>
 * </label>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDatetimePicker extends __SLitComponent {
    constructor() {
        var _a;
        super(__deepMerge({
            name: 's-datetime-picker',
            interface: __SDatetimePickerComponentInterface,
        }));
        this.state = {
            year: 0,
            month: 0,
            day: 0,
            hour: 12,
            minutes: 0,
            displayedYear: 0,
            displayedMonth: 0,
            format: undefined,
        };
        this._originalState = {};
        this._hasInput = false;
        this._hasButton = false;
        this._isInInteraction = false;
        this._$input = this.querySelector('input');
        this._hasInput = this._$input !== null;
        this._$button = this.querySelector('button');
        (_a = this._$button) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => e.preventDefault());
        this._hasButton = this._$button !== null;
        // restore state
        this._restoreState();
    }
    static get properties() {
        return __SLitComponent.createProperties({}, __SDatetimePickerComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // save the original state
            Object.assign(this._originalState, this.state);
        });
    }
    firstUpdated() {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            this._$root = this.querySelector(`.${this.componentUtils.className('__root')}`);
            this._$picker = this.querySelector(`.${this.componentUtils.className('__picker')}`);
            // input
            if (!this._$input) {
                this._$input = this.querySelector('input');
            }
            else {
                // this._$root.append(this._$input);
            }
            if (!((_a = this._$input) === null || _a === void 0 ? void 0 : _a.hasAttribute('name'))) {
                (_b = this._$input) === null || _b === void 0 ? void 0 : _b.setAttribute('name', this.props.name);
            }
            if (!((_c = this._$input) === null || _c === void 0 ? void 0 : _c.hasAttribute('placeholder'))) {
                (_d = this._$input) === null || _d === void 0 ? void 0 : _d.setAttribute('placeholder', this.props.placeholder);
            }
            if (!((_e = this._$input) === null || _e === void 0 ? void 0 : _e.hasAttribute('autocomplete'))) {
                (_f = this._$input) === null || _f === void 0 ? void 0 : _f.setAttribute('autocomplete', 'off');
            }
            this._$input.setAttribute('readonly', true);
            // selectors
            this._$days = this.querySelector('.s-datetime-picker__days');
            this._$months = this.querySelector('.s-datetime-picker__months');
            this._$years = this.querySelector('.s-datetime-picker__years');
            this._$hours = this.querySelector('.s-datetime-picker__hours');
            this._$minutes = this.querySelector('.s-datetime-picker__minutes');
            // update float on focus
            this.addEventListener('focusin', (e) => {
                var _a;
                (_a = this._floatApi) === null || _a === void 0 ? void 0 : _a.update();
            });
            // first input update
            this._updateInput('init');
            // make the panel float
            if (!this.props.inline) {
                this._floatApi = __makeFloat(this._$picker, this._$root, Object.assign({}, this.props.floatSettings));
            }
            // scroll all the selectors to the best item
            this._scrollSelectorsToStateValues('initial');
            // init interactions
            this._initInteractions();
        });
    }
    _isDateNeeded() {
        return this.props.format.match(/(d{1,4}|D{3,4}|m{1,4}|yy|yyyy)/);
    }
    _isTimeNeeded() {
        return this.props.format.match(/(h{1,2}|H{1,2}|M{1,2})/);
    }
    _isSelectedDatetimeValid() {
        return !this._isDateDisabled(this.state.day, this.state.month, this.state.year);
    }
    _isDateDisabled(date, month = this.state.displayedMonth, year = this.state.displayedYear) {
        if (year !== -1) {
            if (this.props.disable.includes(String(year))) {
                return true;
            }
        }
        if (month !== -1) {
            // month
            const months = [
                'january',
                'february',
                'march',
                'april',
                'may',
                'june',
                'july',
                'august',
                'september',
                'october',
                'november',
                'december',
            ];
            for (let i = 0; i < months.length; i++) {
                const currentMonth = months[i];
                if (this.props.disable.includes(currentMonth) && month === i) {
                    return true;
                }
            }
        }
        if (date === -1) {
            return false;
        }
        const dayInWeek = new Date(year, month, date).getDay();
        // days
        const days = [
            'sunday',
            'monday',
            'thuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
        ];
        for (let i = 0; i < days.length; i++) {
            const currentDay = days[i];
            if (this.props.disable.includes(currentDay) && dayInWeek === i) {
                return true;
            }
        }
        // specific dates
        if (this.props.disable.includes(this._getDisableDateFromDate(date))) {
            return true;
        }
        // week and weekend
        if (this.props.disable.includes('week') &&
            dayInWeek > 1 &&
            dayInWeek <= 5) {
            return true;
        }
        if (this.props.disable.includes('weekend') &&
            (dayInWeek === 0 || dayInWeek === 6)) {
            return true;
        }
    }
    _setDay(day, delay = false) {
        this.state.day = day;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$days, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }
    _setMonth(month, delay = false) {
        this.state.month = month;
        this.state.displayedMonth = month;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$months, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }
    _setYear(year, delay = false) {
        this.state.year = year;
        this.state.displayedYear = year;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$years, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }
    _setHour(hour, delay = false) {
        this.state.hour = hour;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$hours, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }
    _setMinutes(minutes, delay = false) {
        this.state.minutes = minutes;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$minutes, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }
    _initInteractions() {
        let daysTimeout, monthsTimeout, yearsTimeout, hoursTimeout, minutesTimeout;
        // years
        this._$years.addEventListener('scroll', (e) => {
            if (!__isUserScrolling(this._$years)) {
                return;
            }
            clearTimeout(yearsTimeout);
            this._$years.classList.add('scrolling');
            yearsTimeout = setTimeout(() => {
                const idx = this._getSelectedIdxFromSelector(this._$years);
                this._setYear(parseInt(this._$years.children[idx - 1].innerText));
                this._$years.classList.remove('scrolling');
            }, 400);
        });
        // months
        this._$months.addEventListener('scroll', (e) => {
            if (!__isUserScrolling(this._$months)) {
                return;
            }
            clearTimeout(monthsTimeout);
            this._$months.classList.add('scrolling');
            monthsTimeout = setTimeout(() => {
                const idx = this._getSelectedIdxFromSelector(this._$months);
                this._setMonth(idx - 1);
                this._$months.classList.remove('scrolling');
            }, 400);
        });
        // days
        this._$days.addEventListener('scroll', (e) => {
            if (!__isUserScrolling(this._$days)) {
                return;
            }
            clearTimeout(daysTimeout);
            this._$days.classList.add('scrolling');
            daysTimeout = setTimeout(() => {
                const idx = this._getSelectedIdxFromSelector(this._$days);
                this._setDay(idx);
                this._$days.classList.remove('scrolling');
            }, 400);
        });
        // hour
        this._$hours.addEventListener('scroll', (e) => {
            if (!__isUserScrolling(this._$hours)) {
                return;
            }
            clearTimeout(hoursTimeout);
            this._$hours.classList.add('scrolling');
            hoursTimeout = setTimeout(() => {
                const idx = this._getSelectedIdxFromSelector(this._$hours);
                this._setHour(parseInt(this._$hours.children[idx - 1].innerText));
                this._$hours.classList.remove('scrolling');
            }, 400);
        });
        // minutes
        this._$minutes.addEventListener('scroll', (e) => {
            if (!__isUserScrolling(this._$minutes)) {
                return;
            }
            clearTimeout(minutesTimeout);
            this._$minutes.classList.add('scrolling');
            minutesTimeout = setTimeout(() => {
                const idx = this._getSelectedIdxFromSelector(this._$minutes);
                this._setMinutes(parseInt(this._$minutes.children[idx - 1].innerText));
                this._$minutes.classList.remove('scrolling');
            }, 400);
        });
    }
    _getSelectedIdxFromSelector($selector) {
        const bounds = $selector.getBoundingClientRect();
        const scrollTop = $selector.scrollTop + bounds.height / 2;
        const count = $selector.children.length;
        const itemsHeight = Array.from($selector.children).reduce((current, $a) => {
            const bounds = $a.getBoundingClientRect();
            return current + bounds.height;
        }, 0);
        return Math.round((count / itemsHeight) * scrollTop);
    }
    _scrollSelectorsToStateValues(step) {
        const smooth = step !== 'initial';
        this._scrollSelectorToActiveItem(this._$years, smooth);
        this._scrollSelectorToActiveItem(this._$months, smooth);
        this._scrollSelectorToActiveItem(this._$days, smooth);
        this._scrollSelectorToActiveItem(this._$hours, smooth);
        this._scrollSelectorToActiveItem(this._$minutes, smooth);
    }
    _scrollSelectorToActiveItem($selector, smooth = true, delay = false) {
        const $activeElement = $selector.querySelector('.active');
        if ($activeElement) {
            const bounds = $activeElement.getBoundingClientRect();
            $selector.scrollTo({
                top: bounds.height *
                    Array.from($selector.children).indexOf($activeElement),
                left: 0,
                behavior: smooth ? 'smooth' : 'instant',
            });
        }
    }
    _updateInput(step) {
        if (step !== 'init' && !this.props.updateInput.includes(step)) {
            return;
        }
        this._$input.value = __dateFormat(new Date(this.state.year, this.state.month, this.state.day, this.state.hour, this.state.minutes, 0), this.props.format);
        // if (this._$input && this._$input.value !== this.state.value) {
        //     this._$input.value = this.state.value;
        // }
        // dispatch a "change" event
        if (step !== 'init') {
            this.componentUtils.dispatchEvent('change', {
                detail: {
                // something...
                },
            });
        }
        this.requestUpdate();
    }
    _restoreState() {
        var _a;
        if (false &&
            this.state.day !== undefined &&
            this.state.hours !== undefined) {
        }
        else {
            this.state.value = undefined;
            let date = new Date();
            if ((_a = this._$input) === null || _a === void 0 ? void 0 : _a.value) {
                date = new Date(this._$input.valud);
            }
            this.state.year = date.getFullYear();
            this.state.month = date.getMonth();
            this.state.day = date.getDate();
            // this.state.hours = date.getUTCHours();
            // this.state.minutes = date.getMinutes();
            this.state.displayedYear = this.state.year;
            this.state.displayedMonth = this.state.month;
        }
    }
    _validate() {
        var _a, _b;
        this._updateInput('validate');
        (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    _clear() {
        // if (this._inputColor) {
        //     this._setAlpha(this._inputColor.a);
        //     this._setHue(this._inputColor.h);
        //     this._setShade(this._inputColor.s, this._inputColor.l);
        // } else {
        //     this._setAlpha(1);
        //     this._setHue(0);
        //     this._setShade(0, 0);
        // }
        this._updateInput('clear');
    }
    _reset() {
        // this._setAlpha(this._originalState.a);
        // this._setHue(this._originalState.h);
        // this._setShade(this._originalState.s, this._originalState.l);
        this._updateInput('reset');
    }
    _copy() {
        const originalClass = this.props.copyIconClass;
        this.props.copyIconClass = this.props.copiedIconClass;
        setTimeout(() => {
            this.props.copyIconClass = originalClass;
        }, 1000);
    }
    _getDisableDateFromDate(date) {
        return `${this.state.displayedYear}-${String(this.state.displayedMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    }
    _getMinutes() {
        return this.props.minutes;
    }
    _getHours() {
        return this.props.hours;
    }
    _getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
    _getDays() {
        const daysInMonth = this._getDaysInMonth(this.state.displayedYear, this.state.displayedMonth);
        let days = Array.from(Array(daysInMonth).keys());
        return days;
    }
    _getMonths() {
        return this.props.i18n.months.filter((month, i) => {
            return true;
            return !this._isDateDisabled(10, i);
        });
    }
    _getYears() {
        let i = this.props.fromYear;
        const years = [];
        for (let j = i; j <= this.props.toYear; j++) {
            years.push(j);
        }
        return years;
    }
    render() {
        var _a, _b, _c, _d, _e;
        let firstDayOfTheMonth = new Date(this.state.displayedYear, this.state.displayedMonth).getDay();
        let daysInMonth = 32 -
            new Date(this.state.displayedYear, this.state.displayedMonth, 32).getDate();
        const today = new Date();
        let date = 1;
        return html `
            <div
                class="${this.componentUtils.className('__root')} ${this.componentUtils.className('')}--${this.props
            .floatSettings.position} ${this._isInInteraction
            ? 'is-interacting'
            : ''}"
            >
                ${!this._hasInput && !this.props.input
            ? html `
                          <input
                              ?disabled=${this.props.disabled}
                              type="hidden"
                              name="${this.props.name}"
                              value="${(_a = this.state.value) !== null && _a !== void 0 ? _a : this.props.value}"
                          />
                      `
            : ''}

                <div
                    class="${this.componentUtils.className('__injected', 's-group')}"
                >
                    ${!this._hasInput && this.props.input
            ? html `
                              <input
                                  ?disabled=${this.props.disabled}
                                  type="text"
                                  autocomplete="off"
                                  name="${this.props.name}"
                                  value="${(_b = this.state.value) !== null && _b !== void 0 ? _b : this.props.value}"
                                  placeholder="${this.props.placeholder}"
                                  class="${this.componentUtils.className('__input', 's-input')}"
                              />
                          `
            : !this._hasInput
                ? ''
                : ``}
                    ${!this._hasButton && this.props.button
            ? html `
                              <button
                                  ?disabled=${this.props.disabled}
                                  onclick="return false"
                                  class="${this.componentUtils.className('__button', 's-btn')}"
                              >
                                  ${this.props.buttonIconClass
                ? html `
                                            <i
                                                class="${this.props
                    .buttonIconClass}"
                                            ></i>
                                        `
                : ''}
                              </button>
                          `
            : ''}
                </div>
                ${this.props.backdrop
            ? html `
                          <div
                              class="${this.componentUtils.className('__backdrop')} ${this.props.backdropClass}"
                          ></div>
                      `
            : ''}
                <div
                    class="${this.componentUtils.className('__picker')}"
                    tabindex="-1"
                >
                    <div
                        class="${this.componentUtils.className('__calendar')} ${this._isDateNeeded() && this.props.calendar
            ? 'active'
            : ''}"
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className('__calendar-day')}"
                                        >
                                            Mon
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className('__calendar-day')}"
                                        >
                                            Tue
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className('__calendar-day')}"
                                        >
                                            Wed
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className('__calendar-day')}"
                                        >
                                            Thu
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className('__calendar-day')}"
                                        >
                                            Fri
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className('__calendar-day')}"
                                        >
                                            Sat
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className('__calendar-day')}"
                                        >
                                            Sun
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            ${Array.from(Array(6).keys()).map((i) => html `
                                    <tr>
                                        ${Array.from(Array(7).keys()).map((j) => {
            const day = date;
            const res = html `
                                                    ${i === 0 &&
                j < firstDayOfTheMonth - 1
                ? html ` <td></td>`
                : date > daysInMonth
                    ? html `<td></td>`
                    : html `
                                                              <td>
                                                                  <div
                                                                      @click=${(e) => this._setDay(day)}
                                                                      class="${this.componentUtils.className('__calendar-item')} ${date ===
                        today.getDate() &&
                        today.getMonth() ===
                            this
                                .state
                                .displayedMonth &&
                        today.getFullYear() ===
                            this
                                .state
                                .displayedYear
                        ? 'today'
                        : ''} ${this.componentUtils.className('__calendar-item')} ${date ===
                        this
                            .state
                            .day &&
                        this.state
                            .month ===
                            this
                                .state
                                .displayedMonth &&
                        this.state
                            .year ===
                            this
                                .state
                                .displayedYear
                        ? 'active'
                        : ''} ${this._isDateDisabled(date)
                        ? 'disabled'
                        : ''}"
                                                                  >
                                                                      <span
                                                                          >${date}</span
                                                                      >
                                                                  </div>
                                                              </td>
                                                          `}
                                                `;
            if (i === 0 &&
                j < firstDayOfTheMonth - 1) {
            }
            else {
                date++;
            }
            return res;
        })}
                                    </tr>
                                `)}
                        </table>
                    </div>
                    <div
                        class="${this.componentUtils.className('__date-selectors')} ${this._isDateNeeded() ? 'active' : ''}"
                    >
                        <div
                            class="${this.componentUtils.className('__selector')} ${this.componentUtils.className('__days')}"
                        >
                            ${this._getDays().map((i) => html `
                                    <div
                                        @click=${() => this._setDay(i + 1)}
                                        class="${this.componentUtils.className('__selector-item')} ${this.componentUtils.className('__day')} ${this.state.day === i + 1
            ? 'active'
            : ''} ${this._isDateDisabled(i + 1)
            ? 'disabled'
            : ''}"
                                    >
                                        <span>
                                            ${String(i + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className('__selector')} ${this.componentUtils.className('__months')}"
                        >
                            ${this._getMonths().map((month, i) => html `
                                    <div
                                        @click=${() => this._setMonth(i)}
                                        class="${this.componentUtils.className('__selector-item')} ${this.componentUtils.className('__month')} ${this.state.displayedMonth === i
            ? 'active'
            : ''} ${this._isDateDisabled(-1, i)
            ? 'disabled'
            : ''}"
                                    >
                                        <span> ${month} </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className('__selector')} ${this.componentUtils.className('__years')}"
                        >
                            ${this._getYears().map((year, j) => html `
                                    <div
                                        @click=${() => this._setYear(year)}
                                        class="${this.componentUtils.className('__selector-item')} ${this.componentUtils.className('__year')} ${this.state.displayedYear === year
            ? 'active'
            : ''} ${this._isDateDisabled(-1, -1, year)
            ? 'disabled'
            : ''}"
                                    >
                                        <span> ${year} </span>
                                    </div>
                                `)}
                        </div>
                    </div>
                    <div
                        class="${this.componentUtils.className('__time-selectors')} ${this._isTimeNeeded() ? 'active' : ''}"
                    >
                        <div
                            class="${this.componentUtils.className('__selector')} ${this.componentUtils.className('__hours')}"
                        >
                            ${this._getHours().map((hour) => html `
                                    <div
                                        @click=${() => this._setHour(hour)}
                                        class="${this.componentUtils.className('__selector-item')} ${this.componentUtils.className('__hour')} ${this.state.hour === hour
            ? 'active'
            : ''}"
                                    >
                                        <span>
                                            ${String(hour).padStart(2, '0')}
                                        </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className('__selector')} ${this.componentUtils.className('__minutes')}"
                        >
                            ${this._getMinutes().map((minute, i) => html `
                                    <div
                                        @click=${() => this._setMinutes(minute)}
                                        class="${this.componentUtils.className('__selector-item')} ${this.componentUtils.className('__minutes')} ${this.state.minutes === minute
            ? 'active'
            : ''}"
                                    >
                                        <span>
                                            ${String(minute).padStart(2, '0')}
                                        </span>
                                    </div>
                                `)}
                        </div>
                    </div>
                    ${this.props.actions.length
            ? html `
                              <div
                                  class="${this.componentUtils.className('__actions')}"
                              >
                                  ${this.props.actions.includes('clear')
                ? html `
                                            <button
                                                class="${this.componentUtils.className('__clear', 's-btn s-color--error')}"
                                                @click=${(e) => {
                    e.preventDefault();
                    this._clear();
                }}
                                            >
                                                ${(_c = this.props.i18n.clear) !== null && _c !== void 0 ? _c : 'Clear'}
                                            </button>
                                        `
                : ''}
                                  ${this.props.actions.includes('reset')
                ? html `
                                            <button
                                                class="${this.componentUtils.className('__reset', 's-btn s-color--complementary')}"
                                                @click=${(e) => {
                    e.preventDefault();
                    this._reset();
                }}
                                            >
                                                ${(_d = this.props.i18n.reset) !== null && _d !== void 0 ? _d : 'Reset'}
                                            </button>
                                        `
                : ''}
                                  ${this.props.actions.includes('validate')
                ? html `
                                            <button
                                                ?disabled=${!this._isSelectedDatetimeValid()}
                                                class="${this.componentUtils.className('__validate', 's-btn s-color--accent')}"
                                                @click=${(e) => {
                    e.preventDefault();
                    this._validate();
                }}
                                            >
                                                ${(_e = this.props.i18n.validate) !== null && _e !== void 0 ? _e : 'Validate'}
                                            </button>
                                        `
                : ''}
                              </div>
                          `
            : ''}
                </div>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 's-datetime-picker') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDatetimePicker);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFLekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxtQ0FBbUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUVoRyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMkNBQTJDLENBQUMsQ0FBQywrQkFBK0I7QUFpQzlGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEdHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLGVBQWU7SUE4Q3hEOztRQUNJLEtBQUssQ0FDRCxXQUFXLENBQUM7WUFDUixJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLFNBQVMsRUFBRSxtQ0FBbUM7U0FDakQsQ0FBQyxDQUNMLENBQUM7UUFwQ04sVUFBSyxHQUFHO1lBQ0osSUFBSSxFQUFFLENBQUM7WUFDUCxLQUFLLEVBQUUsQ0FBQztZQUNSLEdBQUcsRUFBRSxDQUFDO1lBQ04sSUFBSSxFQUFFLEVBQUU7WUFDUixPQUFPLEVBQUUsQ0FBQztZQUNWLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLGNBQWMsRUFBRSxDQUFDO1lBQ2pCLE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7UUFDRixtQkFBYyxHQUFHLEVBQUUsQ0FBQztR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