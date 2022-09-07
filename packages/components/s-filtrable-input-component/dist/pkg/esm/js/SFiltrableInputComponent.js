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
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SFiltrableInputComponentInterface from './interface/SFiltrableInputComponentInterface';
import __cursorToEnd from '@coffeekraken/sugar/js/dom/input/cursorToEnd';
import { __onScrollEnd } from '@coffeekraken/sugar/dom';
import { __distanceFromElementTopToViewportBottom, __distanceFromElementTopToViewportTop, } from '@coffeekraken/sugar/dom';
import __stripTags from '@coffeekraken/sugar/js/dom/manipulate/stripTags';
import __getStyleProperty from '@coffeekraken/sugar/js/dom/style/getStyleProperty';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
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
 * @install           shell
 * npm i @coffeekraken/s-filtrable-input-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-filtrable-input-component';
 * define();
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
 *                     <li class="__item">
 *                         My title: ${item.title}
 *                     </li>
 *                 `;
 *                 break;
 *             case 'loading':
 *                 return html`
 *                     <li class="__loading">
 *                         Loading, please wait...
 *                     </li>
 *                 `;
 *                 break;
 *             case 'empty':
 *                 return html`
 *                     <li class="__empty">
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
export default class SFiltrableInput extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            name: 's-filtrable-input',
            interface: __SFiltrableInputComponentInterface,
        }));
        // state
        this.state = {
            displayedMaxItems: 0,
            value: '',
            isActive: false,
            isLoading: false,
        };
        // public properties
        this.preselectedItems = [];
        this.selectedItems = [];
        this.filteredItems = [];
        // private properties
        this._templatesFromHtml = {};
        this._baseTemplates = {};
        this._items = [];
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    static get properties() {
        return __SLitComponent.createProperties({}, __SFiltrableInputComponentInterface);
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.state.displayedMaxItems = this.props.maxItems;
            if (this.props.items && typeof this.props.items === 'string') {
                try {
                    this._items = JSON.parse(this.props.items);
                }
                catch (e) {
                    const $itemsElm = document.querySelector(this.props.items);
                    if ($itemsElm) {
                        this._items = JSON.parse($itemsElm.innerHTML.trim());
                    }
                }
                this.requestUpdate();
                this.componentUtils.dispatchEvent('items', {
                    detail: {
                        items: this._items,
                    },
                });
            }
            // @ts-ignore
            this._baseTemplates = ({ type, item, html }) => {
                switch (type) {
                    case 'item':
                        return html `
                        <div class="${this.componentUtils.className('__item')}">
                            ${unsafeHTML(typeof this.props.label === 'function'
                            ? this.props.label({ item })
                            : item[this.props.label])}
                        </div>
                    `;
                        break;
                    case 'empty':
                        return html `
                        <div
                            class="${this.componentUtils.className('__empty')}"
                        >
                            ${this.props.emptyText}
                        </div>
                    `;
                        break;
                    case 'loading':
                        return html `
                        <div
                            class="${this.componentUtils.className('__loading')}"
                        >
                            ${this.props.loadingText}
                        </div>
                    `;
                        break;
                }
            };
        });
    }
    firstUpdated() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // input
            this.$input = this.querySelector('input');
            this.$input.setAttribute('autocomplete', 'off');
            // @ts-ignore
            this.$form = this.$input.form;
            // prevent from sending form if search is opened
            (_a = this.$form) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => {
                if (this.state.isActive) {
                    e.preventDefault();
                }
            });
            // grab templates
            this._grabTemplates();
            if (!this.props.bare) {
                // @ts-ignore
                (_b = this.$input.classList) === null || _b === void 0 ? void 0 : _b.add('s-input');
            }
            // @ts-ignore
            this.$input.addEventListener('keyup', (e) => {
                this.state.isActive = true;
                // @ts-ignore
                const value = e.target.value;
                this.state.value = value;
                this.state.displayedMaxItems = this.props.maxItems;
                this.filterItems();
            });
            this.$input.addEventListener('focus', (e) => {
                // @ts-ignore
                const value = e.target.value;
                this.state.value = value;
                this.state.isActive = true;
                this.filterItems();
                this._updateListSizeAndPosition();
            });
            // @ts-ignore
            this.$input.classList.add(...this.componentUtils.className('__input').split(' '));
            if (this.props.classes.input) {
                this.$input.classList.add(this.props.classes.input);
            }
            this.$container = this;
            this.$container.classList.add('s-filtrable-input');
            this.$container.classList.add(...this.componentUtils.className().split(' '));
            if (this.props.classes.container) {
                this.$container.classList.add(this.props.classes.container);
            }
            // @ts-ignore
            this.$list = this.querySelector('ul');
            // @ts-ignore
            this.$dropdown = this.querySelector(`.s-filtrable-input__dropdown`);
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
                if (!this.state.isActive)
                    return;
                this.close();
            });
            __hotkey('up').on('press', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                yield __wait();
                if (!this.state.isActive)
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
                if (!this.state.isActive)
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
                if (!this.state.isActive)
                    return;
                this.validateAndClose();
            });
            // restore value from state
            if (this.state.value) {
                this.$input.value = this.state.value;
            }
            // open if a value exists
            if (this.$input.value) {
                this.state.value = this.$input.value;
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
        this.componentUtils.dispatchEvent('select', {
            detail: {
                item: this.selectedItems[0],
                items: this.selectedItems,
                $elm: $selectedItem,
            },
        });
        // @ts-ignore
        this.state.value = this.$input.value;
        // @ts-ignore
        this.requestUpdate();
        // close on select if needed
        if (this.props.closeOnSelect && !item.preventClose) {
            this.close();
        }
        // reset on select
        if (this.props.resetOnSelect && !item.preventReset) {
            this.reset();
            this.filterItems();
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
    }
    close() {
        __cursorToEnd(this.$input);
        this.$input.blur();
        this.state.isActive = false;
    }
    refreshItems() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.props.items === 'function') {
                this.state.isLoading = true;
                this.requestUpdate();
                const items = yield this.props.items({
                    value: this.$input.value,
                });
                if (__isPlainObject(items)) {
                    this._items = Object.values(items);
                }
                else if (Array.isArray(items)) {
                    // @ts-ignore
                    this._items = items;
                }
                else {
                    throw new Error(`Sorry but the "items" MUST be an Array...`);
                }
                this.requestUpdate();
                // @ts-ignore
                this.componentUtils.dispatchEvent('items', {
                    detail: {
                        items: this._items,
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
            let items = this._items;
            let searchValue = this.state.value;
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
                                        return `<span class="${this.componentUtils.className('__list-item-highlight')} s-highlight"
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
            this.state.isLoading = false;
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
        if (!this.state.isActive || this.props.inline)
            return;
        const marginTop = __getStyleProperty(this.$dropdown, 'marginTop'), marginLeft = __getStyleProperty(this.$dropdown, 'marginLeft'), marginRight = __getStyleProperty(this.$dropdown, 'marginRight'), marginBottom = __getStyleProperty(this.$dropdown, 'marginBottom');
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
        const newValue = this.state.value
            .split(' ')
            .filter((k) => k !== keyword)
            .join(' ');
        this.$input.value = newValue;
        this.state.value = newValue;
        this.filterItems();
        __cursorToEnd(this.$input);
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return html `
            <div class="${this.componentUtils.className('')}">
                <div
                    class="${this.componentUtils.className('__dropdown')} ${this
            .props.classes.dropdown}"
                >
                    <div
                        class="${this.componentUtils.className('__before')} ${this.props.classes.before}"
                        tabindex="-1"
                    >
                        ${this._getTemplate('before')}
                    </div>
                    ${this.$input &&
            this.$input.value &&
            this.props.showKeywords
            ? html `
                              <div
                                  tabindex="-1"
                                  class="${this.componentUtils.className('__keywords')} ${this.props.classes.keywords}"
                              >
                                  ${this.$input.value
                .split(' ')
                .filter((s) => s !== '')
                .map((keyword) => html `
                                              <span
                                                  tabindex="-1"
                                                  @click=${() => this._removeKeyword(keyword)}
                                                  class="${this.componentUtils.className('__keyword', 's-badge')}"
                                                  >${keyword}</span
                                              >
                                          `)}
                              </div>
                          `
            : ''}
                    <ul
                        class="${this.componentUtils.className('__list')} ${this
            .props.classes.list}"
                    >
                        ${this.state.isLoading
            ? html `
                                  <li
                                      class="${this.componentUtils.className('__list-item')} ${this.props.classes
                .listItem} ${this.componentUtils.className('__list-loading')}"
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
            : !this.state.isLoading &&
                this.filteredItems.length <= 0
                ? html `
                                  <li
                                      class="${this.componentUtils.className('__list-item')} ${this.props.classes
                    .listItem} ${this.componentUtils.className('__list-no-item')}"
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
                : !this.state.isLoading && this.filteredItems.length
                    ? this.filteredItems.map((item, idx) => {
                        var _a, _b, _c;
                        return idx < this.state.displayedMaxItems
                            ? html `
                                            <li
                                                @click=${() => this.preselectAndValidate(item)}
                                                @dblclick=${() => this.preselectValidateAndClose(item)}
                                                @focus=${() => this._setPreselectedItem(item)}
                                                style="z-index: ${999999999 -
                                idx}"
                                                tabindex="-1"
                                                class="${this.componentUtils.className('__list-item')} ${this.props.classes
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
                        class="${this.componentUtils.className('__after')} ${this.props.classes.after}"
                        tabindex="-1"
                    >
                        ${(_h = (_g = this.props).templates) === null || _h === void 0 ? void 0 : _h.call(_g, {
            type: 'after',
            html,
        })}
                    </div>
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
    __SLitComponent.setDefaultProps(tagName, props);
    if (!customElements.get(tagName)) {
        class SFiltrableInputComponent extends SFiltrableInput {
        }
        // @ts-ignore
        customElements.define(tagName, SFiltrableInputComponent);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxtQ0FBbUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUVoRyxPQUFPLGFBQWEsTUFBTSw4Q0FBOEMsQ0FBQztBQUV6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUNILHdDQUF3QyxFQUN4QyxxQ0FBcUMsR0FDeEMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLFdBQVcsTUFBTSxpREFBaUQsQ0FBQztBQUMxRSxPQUFPLGtCQUFrQixNQUFNLG1EQUFtRCxDQUFDO0FBQ25GLE9BQU8sUUFBUSxNQUFNLHdDQUF3QyxDQUFDO0FBRTlELGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwyQ0FBMkMsQ0FBQyxDQUFDLCtCQUErQjtBQThCOUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Rkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsZUFBZTtJQXlDeEQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixTQUFTLEVBQUUsbUNBQW1DO1NBQ2pELENBQUMsQ0FDTCxD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