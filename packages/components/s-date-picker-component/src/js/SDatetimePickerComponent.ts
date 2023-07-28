// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import type { IFloatApi, IFloatSettings } from '@coffeekraken/sugar/dom';
import { __isUserScrolling, __makeFloat } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import {
    format as __formatDate,
    parse as __parseDate,
} from 'date-format-parse';
import { css, html, unsafeCSS } from 'lit';
import __SDatetimePickerComponentInterface from './interface/SDatetimePickerComponentInterface.js';

import type { __ISDatetime } from '@coffeekraken/sugar';

import { __SDatetime } from '@specim3n/types/utils';

// @ts-ignore
import __css from '../../../../src/css/s-datetime-picker.css'; // relative to /dist/pkg/esm/js
// import __css from '../css/s-datetime-picker.css'; // for dev

export interface ISDatetimePickerComponentProps {
    name: string;
    value: string;
    placeholder: string;
    updateInput: (
        | 'pointerdown'
        | 'pointerup'
        | 'pointermove'
        | 'input'
        | 'validate'
        | 'close'
    )[];
    format: string;
    inline: boolean;
    calendar: boolean;
    floatSettings: Partial<IFloatSettings>;
    copyIconClass: string;
    copiedIconClass: string;
    buttonIconClass: string;
    backdropClass: string;
    actions: ('reset' | 'validate')[];
    position: 'top' | 'bottom';
    backdrop: boolean;
    disabled: boolean;
    fromYear: number;
    toYear: number;
}

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
 * @event           s-datetime-picker.change                                  Dispatched when the datepicker change value with an __ISDatetime object in detail
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
        return __SLitComponent.propertiesFromInterface(
            {},
            __SDatetimePickerComponentInterface,
        );
    }

    static get styles() {
        return css`
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

    _originalState = {};

    _floatApi: IFloatApi;

    _hasInput = false;
    _hasButton = false;
    _$input;
    _$button;
    _$root;
    _$picker;
    _$days;
    _$months;
    _$years;
    _$hours;
    _$minutes;

    _date;

    _isInInteraction = false;

    constructor() {
        super(
            __deepMerge({
                name: 's-datetime-picker',
                interface: __SDatetimePickerComponentInterface,
            }),
        );
        this._$input = this.querySelector('input');
        this._hasInput = this._$input !== null;
        this._$button = this.querySelector('button');
        this._$button?.addEventListener('click', (e) => e.preventDefault());
        this._hasButton = this._$button !== null;
    }
    async mount() {
        // restore state
        this._restoreState();
    }
    async firstUpdated() {
        // save the original state
        Object.assign(this._originalState, this.state);

        this._$root = this.querySelector(`.${this.utils.uCls('_root')}`);

        this._$picker = this.querySelector(`.${this.utils.uCls('_picker')}`);

        // input
        if (!this._$input) {
            this._$input = this.querySelector('input');
        } else {
            // this._$root.append(this._$input);
        }

        // some dom mutation
        this.utils.fastdom.mutate(() => {
            if (!this._$input?.hasAttribute('name')) {
                this._$input?.setAttribute('name', this.props.name);
            }
            if (!this._$input?.hasAttribute('placeholder')) {
                this._$input?.setAttribute(
                    'placeholder',
                    this.props.placeholder,
                );
            }
            if (!this._$input?.hasAttribute('autocomplete')) {
                this._$input?.setAttribute('autocomplete', 'off');
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
            this._floatApi?.update();
        });

        // first input update
        this._updateInput('init');

        // make the panel float
        if (!this.props.inline) {
            this._floatApi = __makeFloat(this._$picker, this._$root, {
                ...this.props.floatSettings,
            });
        }

        // scroll all the selectors to the best item
        this._scrollSelectorsToStateValues('initial');

        // init interactions
        this._initInteractions();
    }

    _isSelectedDatetimeValid(): boolean {
        return !this._isDateDisabled(
            this.state.day,
            this.state.month,
            this.state.year,
        );
    }

    _isDateDisabled(
        date: number,
        month: number = this.state.displayedMonth,
        year: number = this.state.displayedYear,
    ): boolean {
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
        if (
            this.props.disable.includes('week') &&
            dayInWeek > 1 &&
            dayInWeek <= 5
        ) {
            return true;
        }
        if (
            this.props.disable.includes('weekend') &&
            (dayInWeek === 0 || dayInWeek === 6)
        ) {
            return true;
        }
    }

    _setDay(day: number, delay: getHourboolean = false): void {
        this.state.day = day;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$days, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }
    _setMonth(month: number, delay: getHourboolean = false): void {
        this.state.month = month;
        this.state.displayedMonth = month;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$months, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }
    _setYear(year: number, delay: getHourboolean = false): void {
        this.state.year = year;
        this.state.displayedYear = year;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$years, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }
    _setHour(hour: number, delay: getHourboolean = false): void {
        this.state.hour = hour;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$hours, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }
    _setMinutes(minutes: number, delay: getHourboolean = false): void {
        this.state.minutes = minutes;
        setTimeout(() => {
            this._scrollSelectorToActiveItem(this._$minutes, true, delay);
        });
        // update input on select
        this._updateInput('select');
    }

    _initInteractions() {
        let daysTimeout,
            monthsTimeout,
            yearsTimeout,
            hoursTimeout,
            minutesTimeout;

        // years
        this._$years.addEventListener('scroll', (e) => {
            if (!__isUserScrolling(this._$years)) {
                return;
            }
            clearTimeout(yearsTimeout);
            this._$years.classList.add('scrolling');
            yearsTimeout = setTimeout(() => {
                const idx = this._getSelectedIdxFromSelector(this._$years);
                this._setYear(
                    parseInt(this._$years.children[idx - 1].innerText),
                );
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
                this._setHour(
                    parseInt(this._$hours.children[idx - 1].innerText),
                );
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
                this._setMinutes(
                    parseInt(this._$minutes.children[idx - 1].innerText),
                );
                this._$minutes.classList.remove('scrolling');
            }, 400);
        });
    }

    _getSelectedIdxFromSelector($selector: HTMLElement): number {
        const bounds = $selector.getBoundingClientRect();
        const scrollTop = $selector.scrollTop + bounds.height / 2;
        const count = $selector.children.length;
        const itemsHeight = Array.from($selector.children).reduce(
            (current, $a) => {
                const bounds = $a.getBoundingClientRect();
                return current + bounds.height;
            },
            0,
        );
        return Math.round((count / itemsHeight) * scrollTop);
    }

    _scrollSelectorsToStateValues(step: 'initial' | string) {
        const smooth = step !== 'initial';
        this._scrollSelectorToActiveItem(this._$years, smooth);
        this._scrollSelectorToActiveItem(this._$months, smooth);
        this._scrollSelectorToActiveItem(this._$days, smooth);
        this._scrollSelectorToActiveItem(this._$hours, smooth);
        this._scrollSelectorToActiveItem(this._$minutes, smooth);
    }
    _scrollSelectorToActiveItem(
        $selector: HTMLElement,
        smooth: boolean = true,
        delay: boolean = false,
    ) {
        const $activeElement = $selector.querySelector('.active');
        if ($activeElement) {
            const bounds = $activeElement.getBoundingClientRect();
            $selector.scrollTo({
                top:
                    bounds.height *
                    Array.from($selector.children).indexOf($activeElement),
                left: 0,
                behavior: smooth ? 'smooth' : 'instant',
            });
        }
    }

    _updateInput(step: 'init' | 'validate' | 'reset' | 'close') {
        if (step !== 'init' && !this.props.updateInput.includes(step)) {
            return;
        }

        const date = new Date(
            this.state.year,
            this.state.month,
            this.state.day,
            this.state.hour,
            this.state.minutes,
            0,
        );

        this._$input.value = __formatDate(date, this.props.format);

        // dispatch a "change" event
        if (step !== 'init') {
            this.utils.dispatchEvent(step === 'validate' ? 'change' : step, {
                detail: <__ISDatetime>{
                    iso: date.toISOString(),
                    value: this._$input.value,
                    format: this.props.format,
                },
            });
        }

        this.requestUpdate();
    }

    _restoreState() {
        if (
            false &&
            this.state.day !== undefined &&
            this.state.hours !== undefined
        ) {
        } else {
            this.state.value = undefined;

            let date = new Date();
            if (this._$input?.value) {
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
        this._updateInput('validate');
        document.activeElement?.blur?.();
    }
    _reset() {
        Object.assign(this.state, this._originalState);
        this._updateInput('reset');
    }

    _copy() {
        const originalClass = this.props.copyIconClass;
        this.props.copyIconClass = this.props.copiedIconClass;
        setTimeout(() => {
            this.props.copyIconClass = originalClass;
        }, 1000);
    }

    _getDisableDateFromDate(date: number): string {
        return `${this.state.displayedYear}-${String(
            this.state.displayedMonth + 1,
        ).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    }

    _getMinutes(): number[] {
        return this.props.minutes;
    }
    _getHours(): number[] {
        return this.props.hours;
    }
    _getDaysInMonth(year: number, month: number): number {
        return new Date(year, month + 1, 0).getDate();
    }
    _getDays(): number[] {
        const daysInMonth = this._getDaysInMonth(
            this.state.displayedYear,
            this.state.displayedMonth,
        );
        let days = Array.from(Array(daysInMonth).keys());
        return days;
    }
    _getMonths(): string[] {
        return this.props.i18n.months.filter((month, i) => {
            return true;
            return !this._isDateDisabled(10, i);
        });
    }
    _getYears(): number[] {
        let i = this.props.fromYear;
        const years: number[] = [];
        for (let j = i; j <= this.props.toYear; j++) {
            years.push(j);
        }
        return years;
    }

    render() {
        let firstDayOfTheMonth = new Date(
            this.state.displayedYear,
            this.state.displayedMonth,
        ).getDay();
        let daysInMonth =
            32 -
            new Date(
                this.state.displayedYear,
                this.state.displayedMonth,
                32,
            ).getDate();
        const today = new Date();
        let date = 1;

        return html`
            <div
                class="${this.utils.cls('_root')} ${this.utils.cls('')}--${this
                    .props.floatSettings.position} ${this._isInInteraction
                    ? 'is-interacting'
                    : ''}"
            >
                ${this.props.backdrop
                    ? html`
                          <div
                              class="${this.utils.cls('_backdrop')} ${this.props
                                  .backdropClass}"
                          ></div>
                      `
                    : ''}
                <div class="${this.utils.cls('_picker')}" tabindex="-1">
                    <div
                        class="${this.utils.cls(
                            '_calendar',
                        )} ${__SDatetime.isDateNeeded(this.props.format) &&
                        this.props.calendar
                            ? 'active'
                            : ''}"
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div
                                            class="${this.utils.cls(
                                                '_calendar-day',
                                            )}"
                                        >
                                            Mon
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.utils.cls(
                                                '_calendar-day',
                                            )}"
                                        >
                                            Tue
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.utils.cls(
                                                '_calendar-day',
                                            )}"
                                        >
                                            Wed
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.utils.cls(
                                                '_calendar-day',
                                            )}"
                                        >
                                            Thu
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.utils.cls(
                                                '_calendar-day',
                                            )}"
                                        >
                                            Fri
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.utils.cls(
                                                '_calendar-day',
                                            )}"
                                        >
                                            Sat
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.utils.cls(
                                                '_calendar-day',
                                            )}"
                                        >
                                            Sun
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            ${Array.from(Array(6).keys()).map(
                                (i) => html`
                                    <tr>
                                        ${Array.from(Array(7).keys()).map(
                                            (j) => {
                                                const day = date;
                                                const res = html`
                                                    ${i === 0 &&
                                                    j < firstDayOfTheMonth - 1
                                                        ? html` <td></td>`
                                                        : date > daysInMonth
                                                        ? html`<td></td>`
                                                        : html`
                                                              <td>
                                                                  <div
                                                                      @click=${(
                                                                          e,
                                                                      ) =>
                                                                          this._setDay(
                                                                              day,
                                                                          )}
                                                                      class="${this.utils.cls(
                                                                          '_calendar-item',
                                                                      )} ${date ===
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
                                                                          : ''} ${this.utils.cls(
                                                                          '_calendar-item',
                                                                      )} ${date ===
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
                                                                          : ''} ${this._isDateDisabled(
                                                                          date,
                                                                      )
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
                                                if (
                                                    i === 0 &&
                                                    j < firstDayOfTheMonth - 1
                                                ) {
                                                } else {
                                                    date++;
                                                }
                                                return res;
                                            },
                                        )}
                                    </tr>
                                `,
                            )}
                        </table>
                    </div>
                    <div
                        class="${this.utils.cls(
                            '_date-selectors',
                        )} ${__SDatetime.isDateNeeded(this.props.format)
                            ? 'active'
                            : ''}"
                    >
                        <div
                            class="${this.utils.cls(
                                '_selector',
                            )} ${this.utils.cls('_days')}"
                        >
                            ${this._getDays().map(
                                (i) => html`
                                    <div
                                        @click=${() => this._setDay(i + 1)}
                                        class="${this.utils.cls(
                                            '_selector-item',
                                        )} ${this.utils.cls('_day')} ${this
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
                                `,
                            )}
                        </div>
                        <div
                            class="${this.utils.cls(
                                '_selector',
                            )} ${this.utils.cls('_months')}"
                        >
                            ${this._getMonths().map(
                                (month, i) => html`
                                    <div
                                        @click=${() => this._setMonth(i)}
                                        class="${this.utils.cls(
                                            '_selector-item',
                                        )} ${this.utils.cls('_month')} ${this
                                            .state.displayedMonth === i
                                            ? 'active'
                                            : ''} ${this._isDateDisabled(-1, i)
                                            ? 'disabled'
                                            : ''}"
                                    >
                                        <span> ${month} </span>
                                    </div>
                                `,
                            )}
                        </div>
                        <div
                            class="${this.utils.cls(
                                '_selector',
                            )} ${this.utils.cls('_years')}"
                        >
                            ${this._getYears().map(
                                (year, j) => html`
                                    <div
                                        @click=${() => this._setYear(year)}
                                        class="${this.utils.cls(
                                            '_selector-item',
                                        )} ${this.utils.cls('_year')} ${this
                                            .state.displayedYear === year
                                            ? 'active'
                                            : ''} ${this._isDateDisabled(
                                            -1,
                                            -1,
                                            year,
                                        )
                                            ? 'disabled'
                                            : ''}"
                                    >
                                        <span> ${year} </span>
                                    </div>
                                `,
                            )}
                        </div>
                    </div>
                    <div
                        class="${this.utils.cls(
                            '_time-selectors',
                        )} ${__SDatetime.isTimeNeeded(this.props.format)
                            ? 'active'
                            : ''}"
                    >
                        <div
                            class="${this.utils.cls(
                                '_selector',
                            )} ${this.utils.cls('_hours')}"
                        >
                            ${this._getHours().map(
                                (hour) => html`
                                    <div
                                        @click=${() => this._setHour(hour)}
                                        class="${this.utils.cls(
                                            '_selector-item',
                                        )} ${this.utils.cls('_hour')} ${this
                                            .state.hour === hour
                                            ? 'active'
                                            : ''}"
                                    >
                                        <span>
                                            ${String(hour).padStart(2, '0')}
                                        </span>
                                    </div>
                                `,
                            )}
                        </div>
                        <div
                            class="${this.utils.cls(
                                '_selector',
                            )} ${this.utils.cls('_minutes')}"
                        >
                            ${this._getMinutes().map(
                                (minute, i) => html`
                                    <div
                                        @click=${() => this._setMinutes(minute)}
                                        class="${this.utils.cls(
                                            '_selector-item',
                                        )} ${this.utils.cls('_minutes')} ${this
                                            .state.minutes === minute
                                            ? 'active'
                                            : ''}"
                                    >
                                        <span>
                                            ${String(minute).padStart(2, '0')}
                                        </span>
                                    </div>
                                `,
                            )}
                        </div>
                    </div>
                    ${this.props.actions.length
                        ? html`
                              <div class="${this.utils.cls('_actions')}">
                                  ${this.props.actions.includes('reset')
                                      ? html`
                                            <button
                                                class="${this.utils.cls(
                                                    '_reset',
                                                    's-btn s-color--complementary',
                                                )}"
                                                @click=${(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    this._reset();
                                                }}
                                            >
                                                ${this.props.i18n.reset ??
                                                'Reset'}
                                            </button>
                                        `
                                      : ''}
                                  ${this.props.actions.includes('validate')
                                      ? html`
                                            <button
                                                ?disabled=${!this._isSelectedDatetimeValid()}
                                                class="${this.utils.cls(
                                                    '_validate',
                                                    's-btn s-color--accent',
                                                )}"
                                                @click=${(e) => {
                                                    e.preventDefault();
                                                    this._validate();
                                                }}
                                            >
                                                ${this.props.i18n.validate ??
                                                'Validate'}
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
