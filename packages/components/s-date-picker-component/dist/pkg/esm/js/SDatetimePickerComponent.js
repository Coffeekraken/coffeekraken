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
import { format as __formatDate, parse as __parseDate } from 'date-format-parse';
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
 * This component specify a datetime picker. It make uses of (this package)[https://www.npmjs.com/package/date-format-parse] behind the scene to
 * parse and format dates.
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
 *      <s-datetime-picker calendar placeholder="Choose a date">
 *          <input type="text" class="s-input" placeholder="Choose a date" />
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            With a calendar
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker calendar placeholder="Choose a date">
 *          <input type="text" class="s-input" placeholder="Choose a date" />
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            With a backdrop
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker calendar backdrop placeholder="Choose a date">
 *          <input type="text" class="s-input" placeholder="Choose a date" />
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            With a different format and a calendar
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker calendar format="yyyy-mm-dd:HH:MM" placeholder="Choose a date">
 *          <input type="text" class="s-input" placeholder="Choose a date" />
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            Just a button with disabled weekend
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker calendar disable="weekend">
 *          <button class="s-btn">Choose a date</button>
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            Disabled
 * <label class="s-label:responsive s-color:accent">
 *      <span>Choose a date</span>
 *      <s-datetime-picker>
 *          <input type="text" disabled class="s-input" placeholder="Choose a date" />
 *      </s-datetime-picker>
 * </label>
 *
 * @example         html            RTL Support
 * <label class="s-label:responsive s-color:accent" dir="rtl">
 *      <span>Choose a date</span>
 *      <s-datetime-picker placeholder="Choose a date" dir="rtl">
 *          <input type="text" class="s-input" placeholder="Choose a date" />
 *      </s-datetime-picker>
 * </label>
 *
 * @see         https://www.npmjs.com/package/date-format-parse
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDatetimePickerComponent extends __SLitComponent {
    constructor() {
        var _a;
        super(__deepMerge({
            name: 's-datetime-picker',
            interface: __SDatetimePickerComponentInterface,
        }));
        this._originalState = {};
        this._hasInput = false;
        this._hasButton = false;
        this._isInInteraction = false;
        this._$input = this.querySelector('input');
        this._hasInput = this._$input !== null;
        this._$button = this.querySelector('button');
        (_a = this._$button) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => e.preventDefault());
        this._hasButton = this._$button !== null;
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SDatetimePickerComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }
    static get state() {
        return {
            year: 0,
            month: 0,
            day: 0,
            hour: 12,
            minutes: 0,
            displayedYear: 0,
            displayedMonth: 0,
            format: undefined,
        };
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // restore state
            this._restoreState();
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            // save the original state
            Object.assign(this._originalState, this.state);
            this._$root = this.querySelector(`.${this.utils.uCls('_root')}`);
            this._$picker = this.querySelector(`.${this.utils.uCls('_picker')}`);
            // input
            if (!this._$input) {
                this._$input = this.querySelector('input');
            }
            else {
                // this._$root.append(this._$input);
            }
            // some dom mutation
            this.utils.fastdom.mutate(() => {
                var _a, _b, _c, _d, _e, _f;
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
            });
            // selectors
            this._$days = this.querySelector('.s-datetime-picker_days');
            this._$months = this.querySelector('.s-datetime-picker_months');
            this._$years = this.querySelector('.s-datetime-picker_years');
            this._$hours = this.querySelector('.s-datetime-picker_hours');
            this._$minutes = this.querySelector('.s-datetime-picker_minutes');
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
        return this.props.format.match(/(d{1,4}|D{1,2}|M{1,4}|Y{2,4})/);
    }
    _isTimeNeeded() {
        return this.props.format.match(/(h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3})/);
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
        this._$input.value = __formatDate(new Date(this.state.year, this.state.month, this.state.day, this.state.hour, this.state.minutes, 0), this.props.format);
        // if (this._$input && this._$input.value !== this.state.value) {
        //     this._$input.value = this.state.value;
        // }
        // dispatch a "change" event
        if (step !== 'init') {
            this.utils.dispatchEvent('change', {
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
                date = __parseDate(this._$input.value, this.props.format, {
                    backupDate: new Date(),
                });
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
        var _a, _b, _c;
        let firstDayOfTheMonth = new Date(this.state.displayedYear, this.state.displayedMonth).getDay();
        let daysInMonth = 32 -
            new Date(this.state.displayedYear, this.state.displayedMonth, 32).getDate();
        const today = new Date();
        let date = 1;
        return html `
            <div
                class="${this.utils.cls('_root')} ${this.utils.cls('')}--${this
            .props.floatSettings.position} ${this._isInInteraction
            ? 'is-interacting'
            : ''}"
            >
                ${this.props.backdrop
            ? html `
                          <div
                              class="${this.utils.cls('_backdrop')} ${this.props
                .backdropClass}"
                          ></div>
                      `
            : ''}
                <div class="${this.utils.cls('_picker')}" tabindex="-1">
                    <div
                        class="${this.utils.cls('_calendar')} ${this._isDateNeeded() && this.props.calendar
            ? 'active'
            : ''}"
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div
                                            class="${this.utils.cls('_calendar-day')}"
                                        >
                                            Mon
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.utils.cls('_calendar-day')}"
                                        >
                                            Tue
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.utils.cls('_calendar-day')}"
                                        >
                                            Wed
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.utils.cls('_calendar-day')}"
                                        >
                                            Thu
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.utils.cls('_calendar-day')}"
                                        >
                                            Fri
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.utils.cls('_calendar-day')}"
                                        >
                                            Sat
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.utils.cls('_calendar-day')}"
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
                                                                      class="${this.utils.cls('_calendar-item')} ${date ===
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
                        : ''} ${this.utils.cls('_calendar-item')} ${date ===
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
                        class="${this.utils.cls('_date-selectors')} ${this._isDateNeeded() ? 'active' : ''}"
                    >
                        <div
                            class="${this.utils.cls('_selector')} ${this.utils.cls('_days')}"
                        >
                            ${this._getDays().map((i) => html `
                                    <div
                                        @click=${() => this._setDay(i + 1)}
                                        class="${this.utils.cls('_selector-item')} ${this.utils.cls('_day')} ${this
            .state.day ===
            i + 1
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
                            class="${this.utils.cls('_selector')} ${this.utils.cls('_months')}"
                        >
                            ${this._getMonths().map((month, i) => html `
                                    <div
                                        @click=${() => this._setMonth(i)}
                                        class="${this.utils.cls('_selector-item')} ${this.utils.cls('_month')} ${this
            .state.displayedMonth === i
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
                            class="${this.utils.cls('_selector')} ${this.utils.cls('_years')}"
                        >
                            ${this._getYears().map((year, j) => html `
                                    <div
                                        @click=${() => this._setYear(year)}
                                        class="${this.utils.cls('_selector-item')} ${this.utils.cls('_year')} ${this
            .state.displayedYear === year
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
                        class="${this.utils.cls('_time-selectors')} ${this._isTimeNeeded() ? 'active' : ''}"
                    >
                        <div
                            class="${this.utils.cls('_selector')} ${this.utils.cls('_hours')}"
                        >
                            ${this._getHours().map((hour) => html `
                                    <div
                                        @click=${() => this._setHour(hour)}
                                        class="${this.utils.cls('_selector-item')} ${this.utils.cls('_hour')} ${this
            .state.hour === hour
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
                            class="${this.utils.cls('_selector')} ${this.utils.cls('_minutes')}"
                        >
                            ${this._getMinutes().map((minute, i) => html `
                                    <div
                                        @click=${() => this._setMinutes(minute)}
                                        class="${this.utils.cls('_selector-item')} ${this.utils.cls('_minutes')} ${this
            .state.minutes === minute
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
                              <div class="${this.utils.cls('_actions')}">
                                  ${this.props.actions.includes('clear')
                ? html `
                                            <button
                                                class="${this.utils.cls('_clear', 's-btn s-color--error')}"
                                                @click=${(e) => {
                    e.preventDefault();
                    this._clear();
                }}
                                            >
                                                ${(_a = this.props.i18n.clear) !== null && _a !== void 0 ? _a : 'Clear'}
                                            </button>
                                        `
                : ''}
                                  ${this.props.actions.includes('reset')
                ? html `
                                            <button
                                                class="${this.utils.cls('_reset', 's-btn s-color--complementary')}"
                                                @click=${(e) => {
                    e.preventDefault();
                    this._reset();
                }}
                                            >
                                                ${(_b = this.props.i18n.reset) !== null && _b !== void 0 ? _b : 'Reset'}
                                            </button>
                                        `
                : ''}
                                  ${this.props.actions.includes('validate')
                ? html `
                                            <button
                                                ?disabled=${!this._isSelectedDatetimeValid()}
                                                class="${this.utils.cls('_validate', 's-btn s-color--accent')}"
                                                @click=${(e) => {
                    e.preventDefault();
                    this._validate();
                }}
                                            >
                                                ${(_c = this.props.i18n.validate) !== null && _c !== void 0 ? _c : 'Validate'}
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
    __SLitComponent.define(tagName, SDatetimePickerComponent, props);
    // __SLitComponent.setDefaultProps(tagName, props);
    // customElements.define(tagName, SDatetimePicker);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFLekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFDSCxNQUFNLElBQUksWUFBWSxFQUN0QixLQUFLLElBQUksV0FBVyxFQUN2QixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLG1DQUFtQyxNQUFNLCtDQUErQyxDQUFDO0FBRWhHLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwyQ0FBMkMsQ0FBQyxDQUFDLCtCQUErQjtBQStCOUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUZHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyx3QkFBeUIsU0FBUSxlQUFlO0lBaURqRTs7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixTQUFTLEVBQUUsbUNBQW1DO1NBQ2pELENBQUMsQ0FDTCxDQUFDO1FBMUJOLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBSXBCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQWFuQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFTckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxTQUFT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