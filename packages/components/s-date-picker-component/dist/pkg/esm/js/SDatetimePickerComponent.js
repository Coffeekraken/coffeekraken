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
 * @import          import { define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
 *
 * @snippet         __SDatetimePickerComponentDefine($1)
 *
 * @install         bash
 * npm i @coffeekraken/s-datetime-picker-component
 *
 * @install         js
 * import { define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
 * __SDatetimePickerComponentDefine();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFLekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFDSCxNQUFNLElBQUksWUFBWSxFQUN0QixLQUFLLElBQUksV0FBVyxFQUN2QixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLG1DQUFtQyxNQUFNLCtDQUErQyxDQUFDO0FBRWhHLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwyQ0FBMkMsQ0FBQyxDQUFDLCtCQUErQjtBQStCOUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZGRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsZUFBZTtJQUNqRSxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLG1DQUFtQyxDQUN0QyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUM7a0JBQ04sS0FBSzthQUNWLENBQUM7U0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxLQUFLO1FBQ1osT0FBTztZQUNILElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLENBQUM7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNO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