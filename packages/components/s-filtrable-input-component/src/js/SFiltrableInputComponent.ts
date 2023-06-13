import __SLitComponent from '@coffeekraken/s-lit-component';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __isFocusWithin } from '@coffeekraken/sugar/dom';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SFiltrableInputComponentInterface from './interface/SFiltrableInputComponentInterface';

import { __cursorToEnd } from '@coffeekraken/sugar/dom';

import {
    __distanceFromElementTopToViewportBottom,
    __distanceFromElementTopToViewportTop,
    __getStyleProperty,
    __onScrollEnd,
} from '@coffeekraken/sugar/dom';
import { __stripTags } from '@coffeekraken/sugar/dom';
import { __hotkey } from '@coffeekraken/sugar/keyboard';

// @ts-ignore
import __css from '../../../../src/css/s-filtrable-input.css'; // relative to /dist/pkg/esm/js

export interface ISFiltrableInputComponentProps {
    items: any[];
    value: string;
    label: string;
    showKeywords: boolean;
    emptyText: string;
    loadingText: string;
    searchValuePreprocess: Function;
    filterItems: Function;
    filtrable: string[];
    templates: Record<string, Function>;
    closeTimeout: number;
    interactive: boolean;
    closeOnSelect: boolean;
    resetOnSelect: boolean;
    notSelectable: boolean;
    maxItems: number;
    classes: Record<string, string>;
    inline: boolean;
}

export interface ISFiltrableInputState {
    displayedMaxItems: number;
    value: string;
    isLoading: boolean;
}

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
        return css`
            ${unsafeCSS(__css)}
        `;
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SFiltrableInputComponentInterface,
        );
    }

    static get state() {
        return {
            displayedMaxItems: 0,
            searchValue: '',
            items: [],
        };
    }

    // @ts-ignore
    $container: HTMLElement;
    // @ts-ignore
    $list: HTMLElement;
    // @ts-ignore
    $dropdown: HTMLElement;
    // @ts-ignore
    $input: HTMLInputElement;
    // @ts-ignore
    $form: HTMLFormElement;
    // public properties
    preselectedItems;
    selectedItems;
    filteredItems;

    // private properties
    _templatesFromHtml;
    _baseTemplates;
    _items;
    _isLoading: boolean = false;

    constructor() {
        super(
            __deepMerge({
                name: 's-filtrable-input',
                interface: __SFiltrableInputComponentInterface,
            }),
        );
        this.preselectedItems = [];
        this.selectedItems = [];
        this.filteredItems = [];
        this._templatesFromHtml = {};
        this._baseTemplates = {};
    }
    async mount() {
        this.state.displayedMaxItems = this.props.maxItems;

        if (this.props.items) {
            if (typeof this.props.items === 'string') {
                try {
                    this.state.items = JSON.parse(this.props.items);
                } catch (e) {
                    const $itemsElm = document.querySelector(this.props.items);
                    if ($itemsElm) {
                        this.state.items = JSON.parse(
                            $itemsElm.innerHTML.trim(),
                        );
                    }
                }
            } else if (typeof this.props.items === 'function') {
                this.state.items = await this.props.items({});
            } else {
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
                    return html`
                        <div class="${this.utils.cls('_item')}">
                            ${unsafeHTML(
                                typeof this.props.label === 'function'
                                    ? this.props.label({ item })
                                    : item[this.props.label],
                            )}
                        </div>
                    `;
                    break;
                case 'empty':
                    return html`
                        <div class="${this.utils.cls('_empty')}">
                            ${this.props.emptyText}
                        </div>
                    `;
                    break;
                case 'loading':
                    return html`
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
    }

    async firstUpdated() {
        // input
        this.$input =
            <any>this.querySelector('input') ?? document.createElement('input');
        if (!this.$input?.parentElement) {
            this.appendChild(this.$input);
        }
        this.$input.setAttribute('autocomplete', 'off');

        // @ts-ignore
        this.$form = this.$input.form;
        // prevent from sending form if search is opened
        this.$form?.addEventListener('submit', (e) => {
            if (!this.utils.isActive()) {
                e.preventDefault();
            }
        });

        // grab templates
        this._grabTemplates();

        if (!this.props.bare) {
            // @ts-ignore
            this.$input.classList?.add('s-input');
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

        // this.prepend(this.$input);
        this.filterItems();

        document.addEventListener('scroll', () => {
            this._updateListSizeAndPosition();
        });
        this._updateListSizeAndPosition();

        __onScrollEnd(this.$list, () => {
            this.state.displayedMaxItems =
                (this.state.displayedMaxItems ?? 0) + this.props.maxItems;
            this.filterItems(false);
        });

        __hotkey('escape').on('press', (e) => {
            e.preventDefault();
            if (!this.utils.isActive()) return;
            this.close();
        });
        __hotkey('up').on('press', async (e) => {
            e.preventDefault();

            await __wait();

            if (!this.utils.isActive()) return;
            if (!this.filteredItems.length) return;

            if (!this.preselectedItems.length) {
                this.preselectedItems.push(
                    this.filteredItems[this.filteredItems.length - 1],
                );
            } else {
                const currentIdx = this.filteredItems.indexOf(
                    this.preselectedItems[0],
                );
                if (currentIdx === -1) {
                    return;
                }
                const newIdx = currentIdx - 1;
                if (newIdx < 0) return;
                this.preselectedItems = [];
                this.preselectedItems.push(this.filteredItems[newIdx]);
            }
            this.requestUpdate();

            const $item =
                this.$list.children[
                    this.filteredItems.indexOf(this.preselectedItems[0])
                ];
            // @ts-ignore
            $item.focus();
        });
        __hotkey('down').on('press', async (e) => {
            e.preventDefault();

            await __wait();

            if (!this.utils.isActive()) return;
            if (!this.filteredItems.length) return;

            if (!this.preselectedItems.length) {
                this.preselectedItems.push(this.filteredItems[0]);
            } else {
                const currentIdx = this.filteredItems.indexOf(
                    this.preselectedItems[0],
                );
                if (currentIdx === -1) {
                    return;
                }
                const newIdx = currentIdx + 1;
                if (newIdx > this.filteredItems.length - 1) return;
                this.preselectedItems = [];
                this.preselectedItems.push(this.filteredItems[newIdx]);
            }

            this.requestUpdate();

            const $item =
                this.$list.children[
                    this.filteredItems.indexOf(this.preselectedItems[0])
                ];
            // @ts-ignore
            $item.focus();
        });
        __hotkey('return').on('press', (e) => {
            // protect agains actions when not focus
            if (!this.utils.isActive()) return;
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
    }

    _grabTemplates() {
        this.querySelectorAll('template').forEach(($template) => {
            if (!$template.hasAttribute('type')) return;
            // @ts-ignore
            this._templatesFromHtml[$template.getAttribute('type')] =
                $template.innerHTML;
        });
    }

    _getTemplate(type: string) {
        if (this.props.templates) {
            const res = this.props.templates({
                type,
                html,
            });
            if (res) return res;
        }
        // from template tags
        if (this._templatesFromHtml[type]) {
            return html` ${unsafeHTML(this._templatesFromHtml[type])} `;
        }
        // @ts-ignore
        return this._baseTemplates({
            type,
            html,
        });
    }
    validate() {
        this.selectedItems = this.preselectedItems;
        this.preselectedItems = [];

        // protect against not selected item
        if (!this.selectedItems.length) return;

        // temp thing cause we need to support multiple items selected at once
        const item = this.selectedItems[0];

        // set the value in the input
        const itemProps: Partial<ISFiltrableInputComponentProps> = __deepMerge(
            Object.assign({}, this.props),
            item.props ?? {},
        );

        if (!item.preventSet) {
            if (typeof itemProps.value === 'string' && item[itemProps.value]) {
                (<HTMLInputElement>this.$input).value = __stripTags(
                    // @ts-ignore
                    item[itemProps.value],
                );
            } else if (typeof itemProps.value === 'function') {
                // @ts-ignore
                const v = itemProps.value({
                    items: [item],
                });
                if (typeof v !== 'string') {
                    throw new Error(
                        `<red>[s-filtrable-input]</red> Sorry but the returned value "<yellow>${v}</yellow>" has to be a string...`,
                    );
                }
                (<HTMLInputElement>this.$input).value = __stripTags(v);
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
    close() {
        __cursorToEnd(this.$input);
        this.$input.blur();
    }
    async refreshItems() {
        if (typeof this.props.items === 'function') {
            this._isLoading = true;
            this.requestUpdate();
            const items = await this.props.items({
                value: (<HTMLInputElement>this.$input).value,
            });
            if (__isPlainObject(items)) {
                this.state.items = Object.values(items);
            } else if (Array.isArray(items)) {
                // @ts-ignore
                this.state.items = items;
            } else {
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
    }
    async filterItems(needUpdate = true) {
        if (needUpdate) await this.refreshItems();

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
            filteredItems = await this.props.filter(
                filteredItems,
                searchValue,
                this.state,
            );
        } else {
            let matchedItemsCount = 0;
            filteredItems = filteredItems.filter((item) => {
                if (matchedItemsCount >= this.state.displayedMaxItems)
                    return false;

                if (!this.props.filtrable.length) return true;

                let matchFilter = false;
                for (let i = 0; i < Object.keys(item).length; i++) {
                    const propName = Object.keys(item)[i],
                        propValue = item[propName];

                    // prevent not string value
                    if (typeof propValue !== 'string') continue;

                    // check if the current propName is specified in the filtrable list
                    if (this.props.filtrable.indexOf(propName) !== -1) {
                        const reg = new RegExp(
                            `${searchValue}`.split(' ').join('|'),
                            'gi',
                        );

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
        if (this.props.notSelectable) return;
        !this.preselectedItems.includes(item) &&
            this.preselectedItems.push(item);
        // @ts-ignore
        this.requestUpdate();
    }
    _updateListSizeAndPosition() {
        //   if (!__isFocus(this.$input)) return;
        if (!this.utils.isActive() || this.props.inline) return;

        const marginTop = __getStyleProperty(this.$dropdown, 'marginTop'),
            // marginLeft = __getStyleProperty(this.$dropdown, 'marginLeft'),
            // marginRight = __getStyleProperty(this.$dropdown, 'marginRight'),
            marginBottom = __getStyleProperty(this.$dropdown, 'marginBottom');
        const distanceTop = __distanceFromElementTopToViewportTop(this.$input);
        const distanceBottom =
            __distanceFromElementTopToViewportBottom(this.$input) -
            this.$input.clientHeight;
        let maxHeight;

        if (distanceTop > distanceBottom) {
            this.$container.classList.add('s-filtrable-input--top');
            this.$dropdown.style.top = `auto`;
            this.$dropdown.style.bottom = `calc(100% - ${marginBottom})`;
            maxHeight = distanceTop - parseInt(marginTop);
        } else {
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
    _removeKeyword(keyword: string): void {
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
        return html`
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
                    ? html`
                          <div
                              tabindex="-1"
                              class="${this.utils.cls('_keywords')} ${this.props
                                  .classes.keywords}"
                          >
                              ${this.$input.value
                                  .split(' ')
                                  .filter((s) => s !== '')
                                  .map(
                                      (keyword) => html`
                                          <span
                                              tabindex="-1"
                                              @click=${() =>
                                                  this._removeKeyword(keyword)}
                                              class="${this.utils.cls(
                                                  '_keyword',
                                                  's-badge',
                                              )}"
                                              >${keyword}</span
                                          >
                                      `,
                                  )}
                          </div>
                      `
                    : ''}
                <ul
                    class="${this.utils.cls('_list')} ${this.props.classes
                        .list}"
                >
                    ${this._isLoading
                        ? html`
                              <li
                                  class="${this.utils.cls('_list-item')} ${this
                                      .props.classes.listItem} ${this.utils.cls(
                                      '_list-loading',
                                  )}"
                              >
                                  ${this.props.templates?.({
                                      type: 'loading',
                                      html,
                                  }) ??
                                  // @ts-ignore
                                  this._baseTemplates({
                                      type: 'loading',
                                      html,
                                  })}
                              </li>
                          `
                        : !this._isLoading && this.filteredItems.length <= 0
                        ? html`
                              <li
                                  class="${this.utils.cls('_list-item')} ${this
                                      .props.classes.listItem} ${this.utils.cls(
                                      '_list-no-item',
                                  )}"
                              >
                                  ${this.props.templates?.({
                                      type: 'empty',
                                      html,
                                  }) ??
                                  // @ts-ignore
                                  this._baseTemplates({
                                      type: 'empty',
                                      html,
                                  })}
                              </li>
                          `
                        : !this._isLoading && this.filteredItems.length
                        ? this.filteredItems.map((item, idx) =>
                              idx < this.state.displayedMaxItems
                                  ? html`
                                        <li
                                            @click=${() =>
                                                this.preselectAndValidate(item)}
                                            @dblclick=${() =>
                                                this.preselectValidateAndClose(
                                                    item,
                                                )}
                                            @focus=${() =>
                                                this._setPreselectedItem(item)}
                                            style="z-index: ${999999999 - idx}"
                                            tabindex="-1"
                                            class="${this.utils.cls(
                                                '_list-item',
                                            )} ${this.props.classes
                                                .listItem} ${this.selectedItems.includes(
                                                item,
                                            )
                                                ? 'active'
                                                : ''}"
                                            hoverable
                                        >
                                            ${this.props.templates?.({
                                                type: 'item',
                                                html,
                                                unsafeHTML,
                                                item,
                                                idx,
                                            }) ??
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
                                  : '',
                          )
                        : ''}
                </ul>
                <div
                    class="${this.utils.cls('_after')} ${this.props.classes
                        .after}"
                    tabindex="-1"
                >
                    ${this.props.templates?.({
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
export function define(
    props: Partial<ISFiltrableInputComponentProps> = {},
    tagName = 's-filtrable-input',
) {
    __SLitComponent.define(tagName, SFiltrableInputComponent, props);
}
