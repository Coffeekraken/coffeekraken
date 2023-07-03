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
import { __cursorToEnd } from '@coffeekraken/sugar/dom';
import { __escapeQueue } from '@coffeekraken/sugar/keyboard';
import { __distanceFromElementTopToViewportBottom, __distanceFromElementTopToViewportTop, __getStyleProperty, __onScrollEnd, __stripTags, } from '@coffeekraken/sugar/dom';
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
 * import { __define as __SFiltrableInputComponentDefine } from '@coffeekraken/s-filtrable-input-component';
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
                    this.state.items = yield this.props.items({});
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
                this.open();
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
            // this.prepend(this.$input);
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
        if (!item.preventSelect) {
            this.utils.dispatchEvent('select', {
                detail: {
                    item: this.selectedItems[0],
                    items: this.selectedItems,
                    $elm: $selectedItem,
                },
            });
        }
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
    open() {
        __escapeQueue(() => {
            if (!this.utils.isActive())
                return;
            this.close();
        });
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
                            const reg = new RegExp(`${searchValue}`.split(' ').join('|'), 'gi');
                            if (propValue.match(reg)) {
                                matchFilter = true;
                                // if (searchValue && searchValue !== '') {
                                //     const reg = new RegExp(
                                //         searchValue.split(' ').join('|'),
                                //         'gi',
                                //     );
                                //     const finalString = propValue.replace(
                                //         reg,
                                //         (str) => {
                                //             return `<span class="${this.utils.cls(
                                //                 '_list-item-highlight',
                                //             )} s-highlight"
                                //                         >${str}</span>`;
                                //         },
                                //     );
                                //     item[propName] = finalString;
                                // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sbUNBQW1DLE1BQU0sK0NBQStDLENBQUM7QUFFaEcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXhELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUU3RCxPQUFPLEVBQ0gsd0NBQXdDLEVBQ3hDLHFDQUFxQyxFQUNyQyxrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLFdBQVcsR0FDZCxNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV4RCxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMkNBQTJDLENBQUMsQ0FBQywrQkFBK0I7QUE2QjlGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRGRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsZUFBZTtJQUNqRSxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8s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