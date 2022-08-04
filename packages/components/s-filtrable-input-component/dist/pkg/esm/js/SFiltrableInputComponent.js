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
import __onScrollEnd from '@coffeekraken/sugar/js/dom/detect/onScrollEnd';
import __distanceFromElementTopToViewportBottom from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportBottom';
import __distanceFromElementTopToViewportTop from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportTop';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxtQ0FBbUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUVoRyxPQUFPLGFBQWEsTUFBTSw4Q0FBOEMsQ0FBQztBQUV6RSxPQUFPLGFBQWEsTUFBTSwrQ0FBK0MsQ0FBQztBQUMxRSxPQUFPLHdDQUF3QyxNQUFNLG9FQUFvRSxDQUFDO0FBQzFILE9BQU8scUNBQXFDLE1BQU0saUVBQWlFLENBQUM7QUFDcEgsT0FBTyxXQUFXLE1BQU0saURBQWlELENBQUM7QUFDMUUsT0FBTyxrQkFBa0IsTUFBTSxtREFBbUQsQ0FBQztBQUNuRixPQUFPLFFBQVEsTUFBTSx3Q0FBd0MsQ0FBQztBQUU5RCxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMkNBQTJDLENBQUMsQ0FBQywrQkFBK0I7QUE4QjlGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0ZHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLGVBQWU7SUF5Q3hEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLElBQUksRUFBRSxtQkFBbUI7WUFDekIsU0FBUyxFQUFFLG1DQUFtQztTQUNqRCxDQUFDLENBQ0ws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