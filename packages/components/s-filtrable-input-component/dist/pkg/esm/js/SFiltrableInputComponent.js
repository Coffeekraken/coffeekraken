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
import { __wait } from '@coffeekraken/sugar/datetime';
import { __isFocusWithin } from '@coffeekraken/sugar/dom';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SFiltrableInputComponentInterface from './interface/SFiltrableInputComponentInterface';
import __cursorToEnd from '@coffeekraken/sugar/js/dom/input/cursorToEnd';
import { __distanceFromElementTopToViewportBottom, __distanceFromElementTopToViewportTop, __getStyleProperty, __onScrollEnd, } from '@coffeekraken/sugar/dom';
import __stripTags from '@coffeekraken/sugar/js/dom/manipulate/stripTags';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
// @ts-ignore
import __css from '../../../../src/css/s-filtrable-input.css'; // relative to /dist/pkg/esm/js
/**
 * @name                SFiltrableInputComponent
 * @as                  Filtrable input
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SFiltrableInputComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-filtrable-einput
 * @platform            html
 * @status              beta
 *
 * This component represent a filtrable input to display and filter a list of items easily.
 *
 * @feature           Framework agnostic. Simply webcomponent.
 * @feature           Fully customizable
 * @feature           Built-in search
 *
 * @event           s-filtrable-input.items              Dispatched when the items are setted of updated
 * @event           s-filtrable-input.select                Dispatched when an item has been selected
 * @event           s-filtrable-input                       Dispatched for every events of this component. Check the detail.eventType prop for event type
 *
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @import          import { define as __SFiltrableInputComponentDefine } from '@coffeekraken/s-filtrable-input-component';
 *
 * @snippet         __SFiltrableInputComponentDefine($1)
 *
 * @install           shell
 * npm i @coffeekraken/s-filtrable-input-component
 *
 * @install           js
 * import { define as __SFiltrableInputComponentDefine } from '@coffeekraken/s-filtrable-input-component';
 * __SFiltrableInputComponentDefine();
 *
 * @example         html            Simple example
 * <template id="items">
 *   [{"title":"Hello","value":"hello"},{"title":"world","value":"world"}]
 * </template>
 * <s-filtrable-input items="#items" label="title" filtrable="title">
 *   <input type="text" class="s-input" placeholder="Type something..." />
 * </s-filtrable-input>
 *
 * @example         js
 * import { define } from '@coffeekraken/s-filtrable-input-component';
 * define();
 *
 * @example         html        Custom templates and items
 * <my-cool-filtrable-input>
 *    <input type="text" class="s-input" placeholder="Type something..." />
 * </my-cool-filtrable-input>
 *
 * @example         js
 * import { define } from '@coffeekraken/s-filtrable-input-component';
 * define({
 *     items: async () => {
 *         // you can get your items however you want
 *         // const request = await fetch('...');
 *         // const items = await request.json();
 *         return [{title: 'Hello', value: 'World'},{title: 'Plop', value:'Yop}];
 *     },
 *     templates: ({ type, html }) => {
 *         switch (type) {
 *             case 'item':
 *                 return html`
 *                     <li class="_item">
 *                         My title: ${item.title}
 *                     </li>
 *                 `;
 *                 break;
 *             case 'loading':
 *                 return html`
 *                     <li class="_loading">
 *                         Loading, please wait...
 *                     </li>
 *                 `;
 *                 break;
 *             case 'empty':
 *                 return html`
 *                     <li class="_empty">
 *                         No items found...
 *                     </li>
 *                 `;
 *                 break;
 *         }
 *     },
 * }, 'my-cool-filtrable-input');
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFiltrableInputComponent extends __SLitComponent {
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SFiltrableInputComponentInterface);
    }
    static get state() {
        return {
            displayedMaxItems: 0,
            searchValue: '',
            items: [],
        };
    }
    constructor() {
        super(__deepMerge({
            name: 's-filtrable-input',
            interface: __SFiltrableInputComponentInterface,
        }));
        this._isLoading = false;
        this.preselectedItems = [];
        this.selectedItems = [];
        this.filteredItems = [];
        this._templatesFromHtml = {};
        this._baseTemplates = {};
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.state.displayedMaxItems = this.props.maxItems;
            if (this.props.items) {
                if (typeof this.props.items === 'string') {
                    try {
                        this.state.items = JSON.parse(this.props.items);
                    }
                    catch (e) {
                        const $itemsElm = document.querySelector(this.props.items);
                        if ($itemsElm) {
                            this.state.items = JSON.parse($itemsElm.innerHTML.trim());
                        }
                    }
                }
                else if (typeof this.props.items === 'function') {
                    this.state.items = yield this.props.items();
                }
                else {
                    this.state.items = this.props.items;
                }
                this.requestUpdate();
                this.utils.dispatchEvent('items', {
                    detail: {
                        items: this.state.items,
                    },
                });
            }
            // @ts-ignore
            this._baseTemplates = ({ type, item, html }) => {
                switch (type) {
                    case 'item':
                        return html `
                        <div class="${this.utils.cls('_item')}">
                            ${unsafeHTML(typeof this.props.label === 'function'
                            ? this.props.label({ item })
                            : item[this.props.label])}
                        </div>
                    `;
                        break;
                    case 'empty':
                        return html `
                        <div class="${this.utils.cls('_empty')}">
                            ${this.props.emptyText}
                        </div>
                    `;
                        break;
                    case 'loading':
                        return html `
                        <div class="${this.utils.cls('_loading')}">
                            ${this.props.loadingText}
                        </div>
                    `;
                        break;
                }
            };
            // if we have the focus in the
            if (__isFocusWithin(this)) {
                setTimeout(() => {
                    this.$input.focus();
                });
            }
        });
    }
    firstUpdated() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            // input
            this.$input =
                (_a = this.querySelector('input')) !== null && _a !== void 0 ? _a : document.createElement('input');
            if (!((_b = this.$input) === null || _b === void 0 ? void 0 : _b.parentElement)) {
                this.appendChild(this.$input);
            }
            this.$input.setAttribute('autocomplete', 'off');
            // @ts-ignore
            this.$form = this.$input.form;
            // prevent from sending form if search is opened
            (_c = this.$form) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', (e) => {
                if (!this.utils.isActive()) {
                    e.preventDefault();
                }
            });
            // grab templates
            this._grabTemplates();
            if (!this.props.bare) {
                // @ts-ignore
                (_d = this.$input.classList) === null || _d === void 0 ? void 0 : _d.add('s-input');
            }
            // @ts-ignore
            this.$input.addEventListener('keyup', (e) => {
                if (!this.utils.isActive()) {
                    return;
                }
                // @ts-ignore
                const value = e.target.value;
                this.state.searchValue = value;
                this.state.displayedMaxItems = this.props.maxItems;
                this.filterItems();
            });
            this.$input.addEventListener('focus', (e) => {
                if (!this.utils.isActive()) {
                    return;
                }
                // @ts-ignore
                const value = e.target.value;
                this.state.searchValue = value;
                this.filterItems();
                this._updateListSizeAndPosition();
            });
            // @ts-ignore
            this.$input.classList.add(...this.utils.cls('_input').split(' '));
            if (this.props.classes.input) {
                this.$input.classList.add(this.props.classes.input);
            }
            this.$container = this;
            this.$container.classList.add('s-filtrable-input');
            this.$container.classList.add(...this.utils.cls().split(' '));
            if (this.props.classes.container) {
                this.$container.classList.add(this.props.classes.container);
            }
            // @ts-ignore
            this.$list = this.querySelector('ul');
            // @ts-ignore
            this.$dropdown = this.querySelector(`.s-filtrable-input_dropdown`);
            this.prepend(this.$input);
            this.filterItems();
            document.addEventListener('scroll', () => {
                this._updateListSizeAndPosition();
            });
            this._updateListSizeAndPosition();
            __onScrollEnd(this.$list, () => {
                var _a;
                this.state.displayedMaxItems =
                    ((_a = this.state.displayedMaxItems) !== null && _a !== void 0 ? _a : 0) + this.props.maxItems;
                this.filterItems(false);
            });
            __hotkey('escape').on('press', (e) => {
                e.preventDefault();
                if (!this.utils.isActive())
                    return;
                this.close();
            });
            __hotkey('up').on('press', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                yield __wait();
                if (!this.utils.isActive())
                    return;
                if (!this.filteredItems.length)
                    return;
                if (!this.preselectedItems.length) {
                    this.preselectedItems.push(this.filteredItems[this.filteredItems.length - 1]);
                }
                else {
                    const currentIdx = this.filteredItems.indexOf(this.preselectedItems[0]);
                    if (currentIdx === -1) {
                        return;
                    }
                    const newIdx = currentIdx - 1;
                    if (newIdx < 0)
                        return;
                    this.preselectedItems = [];
                    this.preselectedItems.push(this.filteredItems[newIdx]);
                }
                this.requestUpdate();
                const $item = this.$list.children[this.filteredItems.indexOf(this.preselectedItems[0])];
                // @ts-ignore
                $item.focus();
            }));
            __hotkey('down').on('press', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                yield __wait();
                if (!this.utils.isActive())
                    return;
                if (!this.filteredItems.length)
                    return;
                if (!this.preselectedItems.length) {
                    this.preselectedItems.push(this.filteredItems[0]);
                }
                else {
                    const currentIdx = this.filteredItems.indexOf(this.preselectedItems[0]);
                    if (currentIdx === -1) {
                        return;
                    }
                    const newIdx = currentIdx + 1;
                    if (newIdx > this.filteredItems.length - 1)
                        return;
                    this.preselectedItems = [];
                    this.preselectedItems.push(this.filteredItems[newIdx]);
                }
                this.requestUpdate();
                const $item = this.$list.children[this.filteredItems.indexOf(this.preselectedItems[0])];
                // @ts-ignore
                $item.focus();
            }));
            __hotkey('return').on('press', (e) => {
                // protect agains actions when not focus
                if (!this.utils.isActive())
                    return;
                this.validateAndClose();
            });
            // restore value from state
            if (this.state.searchValue) {
                this.$input.value = this.state.searchValue;
            }
            // open if a value exists
            if (this.$input.value) {
                this.state.searchValue = this.$input.value;
                // __cursorToEnd(this.$input);
                this.filterItems(true);
            }
        });
    }
    _grabTemplates() {
        this.querySelectorAll('template').forEach(($template) => {
            if (!$template.hasAttribute('type'))
                return;
            // @ts-ignore
            this._templatesFromHtml[$template.getAttribute('type')] =
                $template.innerHTML;
        });
    }
    _getTemplate(type) {
        if (this.props.templates) {
            const res = this.props.templates({
                type,
                html,
            });
            if (res)
                return res;
        }
        // from template tags
        if (this._templatesFromHtml[type]) {
            return html ` ${unsafeHTML(this._templatesFromHtml[type])} `;
        }
        // @ts-ignore
        return this._baseTemplates({
            type,
            html,
        });
    }
    validate() {
        var _a;
        this.selectedItems = this.preselectedItems;
        this.preselectedItems = [];
        // protect against not selected item
        if (!this.selectedItems.length)
            return;
        // temp thing cause we need to support multiple items selected at once
        const item = this.selectedItems[0];
        // set the value in the input
        const itemProps = __deepMerge(Object.assign({}, this.props), (_a = item.props) !== null && _a !== void 0 ? _a : {});
        if (!item.preventSet) {
            if (typeof itemProps.value === 'string' && item[itemProps.value]) {
                this.$input.value = __stripTags(
                // @ts-ignore
                item[itemProps.value]);
            }
            else if (typeof itemProps.value === 'function') {
                // @ts-ignore
                const v = itemProps.value({
                    items: [item],
                });
                if (typeof v !== 'string') {
                    throw new Error(`<red>[s-filtrable-input]</red> Sorry but the returned value "<yellow>${v}</yellow>" has to be a string...`);
                }
                this.$input.value = __stripTags(v);
            }
        }
        let selectedItemItem = 0;
        for (let i = 0; i < this.filteredItems.length; i++) {
            const itemObj = this.filteredItems[i];
            if (itemObj.id === item.id) {
                selectedItemItem = i;
                break;
            }
        }
        const $selectedItem = this.$list.children[selectedItemItem];
        // dispatch an event
        this.utils.dispatchEvent('select', {
            detail: {
                item: this.selectedItems[0],
                items: this.selectedItems,
                $elm: $selectedItem,
            },
        });
        // @ts-ignore
        this.state.searchValue = this.$input.value;
        // @ts-ignore
        this.requestUpdate();
        // close on select if needed
        if (this.props.closeOnSelect && !item.preventClose) {
            this.close();
        }
        // reset on select
        if (this.props.resetOnSelect && !item.preventReset) {
            this.reset();
        }
    }
    validateAndClose() {
        this.validate();
        setTimeout(() => {
            this.close();
        }, this.props.closeTimeout);
    }
    resetSelected() {
        this.preselectedItems = [];
        this.selectedItems = [];
    }
    reset() {
        this.resetSelected();
        this.$input.value = '';
        this.state.searchValue = '';
        this.filterItems();
    }
    close() {
        __cursorToEnd(this.$input);
        this.$input.blur();
    }
    refreshItems() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.props.items === 'function') {
                this._isLoading = true;
                this.requestUpdate();
                const items = yield this.props.items({
                    value: this.$input.value,
                });
                if (__isPlainObject(items)) {
                    this.state.items = Object.values(items);
                }
                else if (Array.isArray(items)) {
                    // @ts-ignore
                    this.state.items = items;
                }
                else {
                    throw new Error(`Sorry but the "items" MUST be an Array...`);
                }
                this.requestUpdate();
                // @ts-ignore
                this.utils.dispatchEvent('items', {
                    detail: {
                        items: this.state.items,
                    },
                });
            }
        });
    }
    filterItems(needUpdate = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (needUpdate)
                yield this.refreshItems();
            // reset selected
            this.resetSelected();
            let items = this.state.items;
            let searchValue = this.state.searchValue;
            if (this.props.searchValuePreprocess) {
                searchValue = this.props.searchValuePreprocess(searchValue);
            }
            // let filteredItems = items.map((item) => __clone(item));
            let filteredItems = items;
            // custom function
            if (this.props.filter) {
                filteredItems = yield this.props.filter(filteredItems, searchValue, this.state);
            }
            else {
                let matchedItemsCount = 0;
                filteredItems = filteredItems.filter((item) => {
                    if (matchedItemsCount >= this.state.displayedMaxItems)
                        return false;
                    if (!this.props.filtrable.length)
                        return true;
                    let matchFilter = false;
                    for (let i = 0; i < Object.keys(item).length; i++) {
                        const propName = Object.keys(item)[i], propValue = item[propName];
                        // prevent not string value
                        if (typeof propValue !== 'string')
                            continue;
                        // check if the current propName is specified in the filtrable list
                        if (this.props.filtrable.indexOf(propName) !== -1) {
                            const reg = new RegExp(searchValue.split(' ').join('|'), 'gi');
                            if (propValue.match(reg)) {
                                matchFilter = true;
                                if (searchValue && searchValue !== '') {
                                    const reg = new RegExp(searchValue.split(' ').join('|'), 'gi');
                                    const finalString = propValue.replace(reg, (str) => {
                                        return `<span class="${this.utils.cls('_list-item-highlight')} s-highlight"
                                                    >${str}</span>`;
                                    });
                                    item[propName] = finalString;
                                }
                            }
                        }
                    }
                    if (matchFilter) {
                        matchedItemsCount++;
                    }
                    return matchFilter;
                });
            }
            // @ts-ignore
            this.filteredItems = filteredItems;
            this._isLoading = false;
            // @ts-ignore
            this.requestUpdate();
        });
    }
    preselectAndValidate(item) {
        this._setPreselectedItem(item);
        // validate
        this.validate();
    }
    preselectValidateAndClose(item) {
        // set the selected idx
        this._setPreselectedItem(item);
        // validate
        this.validateAndClose();
    }
    _setPreselectedItem(item) {
        // check if the component is in not selectable mode
        if (this.props.notSelectable)
            return;
        !this.preselectedItems.includes(item) &&
            this.preselectedItems.push(item);
        // @ts-ignore
        this.requestUpdate();
    }
    _updateListSizeAndPosition() {
        //   if (!__isFocus(this.$input)) return;
        if (!this.utils.isActive() || this.props.inline)
            return;
        const marginTop = __getStyleProperty(this.$dropdown, 'marginTop'), 
        // marginLeft = __getStyleProperty(this.$dropdown, 'marginLeft'),
        // marginRight = __getStyleProperty(this.$dropdown, 'marginRight'),
        marginBottom = __getStyleProperty(this.$dropdown, 'marginBottom');
        const distanceTop = __distanceFromElementTopToViewportTop(this.$input);
        const distanceBottom = __distanceFromElementTopToViewportBottom(this.$input) -
            this.$input.clientHeight;
        let maxHeight;
        if (distanceTop > distanceBottom) {
            this.$container.classList.add('s-filtrable-input--top');
            this.$dropdown.style.top = `auto`;
            this.$dropdown.style.bottom = `calc(100% - ${marginBottom})`;
            maxHeight = distanceTop - parseInt(marginTop);
        }
        else {
            this.$container.classList.remove('s-filtrable-input--top');
            this.$dropdown.style.bottom = `auto`;
            this.$dropdown.style.top = `calc(100% - ${marginTop})`;
            maxHeight = distanceBottom - parseInt(marginBottom);
        }
        this.$dropdown.style.maxHeight = `${maxHeight}px`;
    }
    /**
     * This function just remove a keyword from the input and filter the items again
     */
    _removeKeyword(keyword) {
        const newValue = this.state.searchValue
            .split(' ')
            .filter((k) => k !== keyword)
            .join(' ');
        this.$input.value = newValue;
        this.state.searchValue = newValue;
        this.filterItems();
        __cursorToEnd(this.$input);
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return html `
            <div
                class="${this.utils.cls('_dropdown')} ${this.props.classes
            .dropdown}"
            >
                <div
                    class="${this.utils.cls('_before')} ${this.props.classes
            .before}"
                    tabindex="-1"
                >
                    ${this._getTemplate('before')}
                </div>
                ${this.$input && this.$input.value && this.props.showKeywords
            ? html `
                          <div
                              tabindex="-1"
                              class="${this.utils.cls('_keywords')} ${this.props
                .classes.keywords}"
                          >
                              ${this.$input.value
                .split(' ')
                .filter((s) => s !== '')
                .map((keyword) => html `
                                          <span
                                              tabindex="-1"
                                              @click=${() => this._removeKeyword(keyword)}
                                              class="${this.utils.cls('_keyword', 's-badge')}"
                                              >${keyword}</span
                                          >
                                      `)}
                          </div>
                      `
            : ''}
                <ul
                    class="${this.utils.cls('_list')} ${this.props.classes
            .list}"
                >
                    ${this._isLoading
            ? html `
                              <li
                                  class="${this.utils.cls('_list-item')} ${this
                .props.classes.listItem} ${this.utils.cls('_list-loading')}"
                              >
                                  ${(_c = (_b = (_a = this.props).templates) === null || _b === void 0 ? void 0 : _b.call(_a, {
                type: 'loading',
                html,
            })) !== null && _c !== void 0 ? _c : 
            // @ts-ignore
            this._baseTemplates({
                type: 'loading',
                html,
            })}
                              </li>
                          `
            : !this._isLoading && this.filteredItems.length <= 0
                ? html `
                              <li
                                  class="${this.utils.cls('_list-item')} ${this
                    .props.classes.listItem} ${this.utils.cls('_list-no-item')}"
                              >
                                  ${(_f = (_e = (_d = this.props).templates) === null || _e === void 0 ? void 0 : _e.call(_d, {
                    type: 'empty',
                    html,
                })) !== null && _f !== void 0 ? _f : 
                // @ts-ignore
                this._baseTemplates({
                    type: 'empty',
                    html,
                })}
                              </li>
                          `
                : !this._isLoading && this.filteredItems.length
                    ? this.filteredItems.map((item, idx) => {
                        var _a, _b, _c;
                        return idx < this.state.displayedMaxItems
                            ? html `
                                        <li
                                            @click=${() => this.preselectAndValidate(item)}
                                            @dblclick=${() => this.preselectValidateAndClose(item)}
                                            @focus=${() => this._setPreselectedItem(item)}
                                            style="z-index: ${999999999 - idx}"
                                            tabindex="-1"
                                            class="${this.utils.cls('_list-item')} ${this.props.classes
                                .listItem} ${this.selectedItems.includes(item)
                                ? 'active'
                                : ''}"
                                            hoverable
                                        >
                                            ${(_c = (_b = (_a = this.props).templates) === null || _b === void 0 ? void 0 : _b.call(_a, {
                                type: 'item',
                                html,
                                unsafeHTML,
                                item,
                                idx,
                            })) !== null && _c !== void 0 ? _c : 
                            // @ts-ignore
                            this._baseTemplates({
                                type: 'item',
                                html,
                                unsafeHTML,
                                item,
                                idx,
                            })}
                                        </li>
                                    `
                            : '';
                    })
                    : ''}
                </ul>
                <div
                    class="${this.utils.cls('_after')} ${this.props.classes
            .after}"
                    tabindex="-1"
                >
                    ${(_h = (_g = this.props).templates) === null || _h === void 0 ? void 0 : _h.call(_g, {
            type: 'after',
            html,
        })}
                </div>
            </div>
        `;
    }
}
/**
 * @name            define
 * @type            Function
 *
 * This function allows you to define (register) your custom element with some default
 * props if needed.
 *
 * @param           {any}           [props={}]              Some default props you want to set for your custom element
 * @param           {String}        [tagName='s-filtrable-input']       The tagName associated to this custom element
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export function define(props = {}, tagName = 's-filtrable-input') {
    __SLitComponent.define(tagName, SFiltrableInputComponent, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sbUNBQW1DLE1BQU0sK0NBQStDLENBQUM7QUFFaEcsT0FBTyxhQUFhLE1BQU0sOENBQThDLENBQUM7QUFFekUsT0FBTyxFQUNILHdDQUF3QyxFQUN4QyxxQ0FBcUMsRUFDckMsa0JBQWtCLEVBQ2xCLGFBQWEsR0FDaEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLFdBQVcsTUFBTSxpREFBaUQsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFeEQsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLDJDQUEyQyxDQUFDLENBQUMsK0JBQStCO0FBNkI5Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Rkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLHdCQUF5QixTQUFRLGVBQWU7SUFDakUsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFDRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLG1DQUFtQyxDQUN0QyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxLQUFLO1FBQ1osT0FBTztZQUNILGlCQUFpQixFQUFFLENBQUM7WUFDcEIsV0FBVyxFQUFFLEVBQUU7WUFDZixLQUFLLEVBQUUsRUFBRTtTQUNaLENBQUM7SUFDTixDQUFDO0lBdUJEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLElBQUksRUFBRSxtQkFBbUI7WUFDekIsU0FBUyxFQUFFLG1DQUFtQztTQUNqRCxDQUFDLENBQ0wsQ0FBQztRQVJOLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFTeEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDSyxLQUFLOztZQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFFbkQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDbEIsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDdEMsSUFBSTt3QkFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ25EO29CQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNSLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDM0QsSUFBSSxTQUFTLEVBQUU7NEJBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDekIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FDN0IsQ0FBQzt5QkFDTDtxQkFDSjtpQkFDSjtxQkFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO29CQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQy9DO3FCQUFNO29CQUNILElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUN2QztnQkFFRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtvQkFDOUIsTUFBTSxFQUFFO3dCQUNKLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7cUJBQzFCO2lCQUNKLENBQUMsQ0FBQzthQUNOO1lBRUQsYUFBYTtZQUNiLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtnQkFDM0MsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxNQUFNO3dCQUNQLE9BQU8sSUFBSSxDQUFBO3NDQUNPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQzs4QkFDL0IsVUFBVSxDQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssVUFBVTs0QkFDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUM7NEJBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FDL0I7O3FCQUVSLENBQUM7d0JBQ0YsTUFBTTtvQkFDVixLQUFLLE9BQU87d0JBQ1IsT0FBTyxJQUFJLENBQUE7c0NBQ08sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDOzhCQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7O3FCQUU3QixDQUFDO3dCQUNGLE1BQU07b0JBQ1YsS0FBSyxTQUFTO3dCQUNWLE9BQU8sSUFBSSxDQUFBO3NDQUNPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQzs4QkFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXOztxQkFFL0IsQ0FBQzt3QkFDRixNQUFNO2lCQUNiO1lBQ0wsQ0FBQyxDQUFDO1lBRUYsOEJBQThCO1lBQzlCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN2QixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDO0tBQUE7SUFFSyxZQUFZOzs7WUFDZCxRQUFRO1lBQ1IsSUFBSSxDQUFDLE1BQU07Z0JBQ1AsTUFBSyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxtQ0FBSSxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsYUFBYSxDQUFBLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRWhELGFBQWE7WUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzlCLGdEQUFnRDtZQUNoRCxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDeEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUN0QjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUV0QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xCLGFBQWE7Z0JBQ2IsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsMENBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3pDO1lBRUQsYUFBYTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUN4QixPQUFPO2lCQUNWO2dCQUNELGFBQWE7Z0JBQ2IsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQ3hCLE9BQU87aUJBQ1Y7Z0JBQ0QsYUFBYTtnQkFDYixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUMvQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1lBRUgsYUFBYTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkQ7WUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDL0Q7WUFDRCxhQUFhO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLGFBQWE7WUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUVuRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFbkIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFFbEMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFOztnQkFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7b0JBQ3hCLENBQUMsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixtQ0FBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO29CQUFFLE9BQU87Z0JBQ25DLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQU8sQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFbkIsTUFBTSxNQUFNLEVBQUUsQ0FBQztnQkFFZixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7b0JBQUUsT0FBTztnQkFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTtvQkFBRSxPQUFPO2dCQUV2QyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtvQkFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FDcEQsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUMzQixDQUFDO29CQUNGLElBQUksVUFBVSxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUNuQixPQUFPO3FCQUNWO29CQUNELE1BQU0sTUFBTSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUM7b0JBQzlCLElBQUksTUFBTSxHQUFHLENBQUM7d0JBQUUsT0FBTztvQkFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQzFEO2dCQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFckIsTUFBTSxLQUFLLEdBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3ZELENBQUM7Z0JBQ04sYUFBYTtnQkFDYixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQU8sQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFbkIsTUFBTSxNQUFNLEVBQUUsQ0FBQztnQkFFZixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7b0JBQUUsT0FBTztnQkFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTtvQkFBRSxPQUFPO2dCQUV2QyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtvQkFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3JEO3FCQUFNO29CQUNILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQzNCLENBQUM7b0JBQ0YsSUFBSSxVQUFVLEtBQUssQ0FBQyxDQUFDLEVBQUU7d0JBQ25CLE9BQU87cUJBQ1Y7b0JBQ0QsTUFBTSxNQUFNLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQzt3QkFBRSxPQUFPO29CQUNuRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO29CQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztpQkFDMUQ7Z0JBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUVyQixNQUFNLEtBQUssR0FDUCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDZixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDdkQsQ0FBQztnQkFDTixhQUFhO2dCQUNiLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO1lBQ0gsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDakMsd0NBQXdDO2dCQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7b0JBQUUsT0FBTztnQkFDbkMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7WUFFSCwyQkFBMkI7WUFDM0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7YUFDOUM7WUFFRCx5QkFBeUI7WUFDekIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQzNDLDhCQUE4QjtnQkFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxQjs7S0FDSjtJQUVELGNBQWM7UUFDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO2dCQUFFLE9BQU87WUFDNUMsYUFBYTtZQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRCxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFZO1FBQ3JCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7Z0JBQzdCLElBQUk7Z0JBQ0osSUFBSTthQUNQLENBQUMsQ0FBQztZQUNILElBQUksR0FBRztnQkFBRSxPQUFPLEdBQUcsQ0FBQztTQUN2QjtRQUNELHFCQUFxQjtRQUNyQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQy9EO1FBQ0QsYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUN2QixJQUFJO1lBQ0osSUFBSTtTQUNQLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxRQUFROztRQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQzNDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFFM0Isb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU07WUFBRSxPQUFPO1FBRXZDLHNFQUFzRTtRQUN0RSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5DLDZCQUE2QjtRQUM3QixNQUFNLFNBQVMsR0FBNEMsV0FBVyxDQUNsRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQzdCLE1BQUEsSUFBSSxDQUFDLEtBQUssbUNBQUksRUFBRSxDQUNuQixDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsSUFBSSxPQUFPLFNBQVMsQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxNQUFPLENBQUMsS0FBSyxHQUFHLFdBQVc7Z0JBQy9DLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FDeEIsQ0FBQzthQUNMO2lCQUFNLElBQUksT0FBTyxTQUFTLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFBRTtnQkFDOUMsYUFBYTtnQkFDYixNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO29CQUN0QixLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUM7aUJBQ2hCLENBQUMsQ0FBQztnQkFDSCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDdkIsTUFBTSxJQUFJLEtBQUssQ0FDWCx3RUFBd0UsQ0FBQyxrQ0FBa0MsQ0FDOUcsQ0FBQztpQkFDTDtnQkFDa0IsSUFBSSxDQUFDLE1BQU8sQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFEO1NBQ0o7UUFFRCxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztRQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLE9BQU8sQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixNQUFNO2FBQ1Q7U0FDSjtRQUVELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFNUQsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRTtZQUMvQixNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWE7Z0JBQ3pCLElBQUksRUFBRSxhQUFhO2FBQ3RCO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsYUFBYTtRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzNDLGFBQWE7UUFDYixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsNEJBQTRCO1FBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2hELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjtRQUNELGtCQUFrQjtRQUNsQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNoRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBQ0QsZ0JBQWdCO1FBQ1osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNELGFBQWE7UUFDVCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxLQUFLO1FBQ0QsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDSyxZQUFZOztZQUNkLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQ2pDLEtBQUssRUFBcUIsSUFBSSxDQUFDLE1BQU8sQ0FBQyxLQUFLO2lCQUMvQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzNDO3FCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDN0IsYUFBYTtvQkFDYixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7aUJBQzVCO3FCQUFNO29CQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztpQkFDaEU7Z0JBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQixhQUFhO2dCQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtvQkFDOUIsTUFBTSxFQUFFO3dCQUNKLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7cUJBQzFCO2lCQUNKLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQztLQUFBO0lBQ0ssV0FBVyxDQUFDLFVBQVUsR0FBRyxJQUFJOztZQUMvQixJQUFJLFVBQVU7Z0JBQUUsTUFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFMUMsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVyQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUU3QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUN6QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUU7Z0JBQ2xDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQy9EO1lBRUQsMERBQTBEO1lBQzFELElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztZQUUxQixrQkFBa0I7WUFDbEIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDbkIsYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ25DLGFBQWEsRUFDYixXQUFXLEVBQ1gsSUFBSSxDQUFDLEtBQUssQ0FDYixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLGFBQWEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQzFDLElBQUksaUJBQWlCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7d0JBQ2pELE9BQU8sS0FBSyxDQUFDO29CQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTt3QkFBRSxPQUFPLElBQUksQ0FBQztvQkFFOUMsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQy9DLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBRS9CLDJCQUEyQjt3QkFDM0IsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFROzRCQUFFLFNBQVM7d0JBRTVDLG1FQUFtRTt3QkFDbkUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7NEJBQy9DLE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUNsQixXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDaEMsSUFBSSxDQUNQLENBQUM7NEJBQ0YsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dDQUN0QixXQUFXLEdBQUcsSUFBSSxDQUFDO2dDQUNuQixJQUFJLFdBQVcsSUFBSSxXQUFXLEtBQUssRUFBRSxFQUFFO29DQUNuQyxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FDbEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ2hDLElBQUksQ0FDUCxDQUFDO29DQUNGLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQ2pDLEdBQUcsRUFDSCxDQUFDLEdBQUcsRUFBRSxFQUFFO3dDQUNKLE9BQU8sZ0JBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNqQyxzQkFBc0IsQ0FDekI7dURBQ2MsR0FBRyxTQUFTLENBQUM7b0NBQ2hDLENBQUMsQ0FDSixDQUFDO29DQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLENBQUM7aUNBQ2hDOzZCQUNKO3lCQUNKO3FCQUNKO29CQUNELElBQUksV0FBVyxFQUFFO3dCQUNiLGlCQUFpQixFQUFFLENBQUM7cUJBQ3ZCO29CQUNELE9BQU8sV0FBVyxDQUFDO2dCQUN2QixDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsYUFBYTtZQUNiLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLGFBQWE7WUFDYixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBQ0Qsb0JBQW9CLENBQUMsSUFBSTtRQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsV0FBVztRQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0QseUJBQXlCLENBQUMsSUFBSTtRQUMxQix1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLFdBQVc7UUFDWCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0QsbUJBQW1CLENBQUMsSUFBSTtRQUNwQixtREFBbUQ7UUFDbkQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWE7WUFBRSxPQUFPO1FBQ3JDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxhQUFhO1FBQ2IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDRCwwQkFBMEI7UUFDdEIseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFeEQsTUFBTSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7UUFDN0QsaUVBQWlFO1FBQ2pFLG1FQUFtRTtRQUNuRSxZQUFZLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN0RSxNQUFNLFdBQVcsR0FBRyxxQ0FBcUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkUsTUFBTSxjQUFjLEdBQ2hCLHdDQUF3QyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDN0IsSUFBSSxTQUFTLENBQUM7UUFFZCxJQUFJLFdBQVcsR0FBRyxjQUFjLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsZUFBZSxZQUFZLEdBQUcsQ0FBQztZQUM3RCxTQUFTLEdBQUcsV0FBVyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsZUFBZSxTQUFTLEdBQUcsQ0FBQztZQUN2RCxTQUFTLEdBQUcsY0FBYyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN2RDtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLFNBQVMsSUFBSSxDQUFDO0lBQ3RELENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWMsQ0FBQyxPQUFlO1FBQzFCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVzthQUNsQyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDO2FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELE1BQU07O1FBQ0YsT0FBTyxJQUFJLENBQUE7O3lCQUVNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzthQUNyRCxRQUFROzs7NkJBR0EsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO2FBQ25ELE1BQU07OztzQkFHVCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQzs7a0JBRS9CLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO1lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUE7Ozt1Q0FHYSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSztpQkFDN0MsT0FBTyxDQUFDLFFBQVE7O2dDQUVuQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7aUJBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3ZCLEdBQUcsQ0FDQSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzs7dURBR0EsR0FBRyxFQUFFLENBQ1YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7dURBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixVQUFVLEVBQ1YsU0FBUyxDQUNaO2lEQUNFLE9BQU87O3VDQUVqQixDQUNKOzt1QkFFWjtZQUNILENBQUMsQ0FBQyxFQUFFOzs2QkFFSyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87YUFDakQsSUFBSTs7c0JBRVAsSUFBSSxDQUFDLFVBQVU7WUFDYixDQUFDLENBQUMsSUFBSSxDQUFBOzsyQ0FFYSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJO2lCQUN4QyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDekMsZUFBZSxDQUNsQjs7b0NBRUMsTUFBQSxNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssRUFBQyxTQUFTLG1EQUFHO2dCQUNyQixJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJO2FBQ1AsQ0FBQztZQUNGLGFBQWE7WUFDYixJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUNoQixJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJO2FBQ1AsQ0FBQzs7MkJBRVQ7WUFDSCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUM7Z0JBQ3BELENBQUMsQ0FBQyxJQUFJLENBQUE7OzJDQUVhLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUk7cUJBQ3hDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN6QyxlQUFlLENBQ2xCOztvQ0FFQyxNQUFBLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxFQUFDLFNBQVMsbURBQUc7b0JBQ3JCLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUk7aUJBQ1AsQ0FBQztnQkFDRixhQUFhO2dCQUNiLElBQUksQ0FBQyxjQUFjLENBQUM7b0JBQ2hCLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUk7aUJBQ1AsQ0FBQzs7MkJBRVQ7Z0JBQ0gsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU07b0JBQy9DLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTs7d0JBQ2pDLE9BQUEsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCOzRCQUM5QixDQUFDLENBQUMsSUFBSSxDQUFBOztxREFFYSxHQUFHLEVBQUUsQ0FDVixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDO3dEQUN2QixHQUFHLEVBQUUsQ0FDYixJQUFJLENBQUMseUJBQXlCLENBQzFCLElBQUksQ0FDUDtxREFDSSxHQUFHLEVBQUUsQ0FDVixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDOzhEQUNoQixTQUFTLEdBQUcsR0FBRzs7cURBRXhCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixZQUFZLENBQ2YsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87aUNBQ2xCLFFBQVEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FDeEMsSUFBSSxDQUNQO2dDQUNHLENBQUMsQ0FBQyxRQUFRO2dDQUNWLENBQUMsQ0FBQyxFQUFFOzs7OENBR04sTUFBQSxNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssRUFBQyxTQUFTLG1EQUFHO2dDQUNyQixJQUFJLEVBQUUsTUFBTTtnQ0FDWixJQUFJO2dDQUNKLFVBQVU7Z0NBQ1YsSUFBSTtnQ0FDSixHQUFHOzZCQUNOLENBQUM7NEJBQ0YsYUFBYTs0QkFDYixJQUFJLENBQUMsY0FBYyxDQUFDO2dDQUNoQixJQUFJLEVBQUUsTUFBTTtnQ0FDWixJQUFJO2dDQUNKLFVBQVU7Z0NBQ1YsSUFBSTtnQ0FDSixHQUFHOzZCQUNOLENBQUM7O3FDQUVUOzRCQUNILENBQUMsQ0FBQyxFQUFFLENBQUE7cUJBQUEsQ0FDWDtvQkFDSCxDQUFDLENBQUMsRUFBRTs7OzZCQUdDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzthQUNsRCxLQUFLOzs7c0JBR1IsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLEVBQUMsU0FBUyxtREFBRztZQUNyQixJQUFJLEVBQUUsT0FBTztZQUNiLElBQUk7U0FDUCxDQUFDOzs7U0FHYixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQ7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxVQUFVLE1BQU0sQ0FDbEIsUUFBaUQsRUFBRSxFQUNuRCxPQUFPLEdBQUcsbUJBQW1CO0lBRTdCLGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3JFLENBQUMifQ==