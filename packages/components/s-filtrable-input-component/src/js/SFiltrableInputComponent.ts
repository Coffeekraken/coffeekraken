import { html, css, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SFiltrableInputComponentInterface from './interface/SFiltrableInputComponentInterface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __copy from '@coffeekraken/sugar/js/clipboard/copy';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';

import __cursorToEnd from '@coffeekraken/sugar/js/dom/input/cursorToEnd';

import __clone from '@coffeekraken/sugar/shared/object/clone';
import __SComponent from '@coffeekraken/s-lit-component';
import __distanceFromElementTopToViewportBottom from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportBottom';
import __getStyleProperty from '@coffeekraken/sugar/js/dom/style/getStyleProperty';
import __distanceFromElementTopToViewportTop from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportTop';
import __isFocus from '@coffeekraken/sugar/js/dom/is/focus';
import __isFocusWithin from '@coffeekraken/sugar/js/dom/is/focusWithin';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __stripTags from '@coffeekraken/sugar/js/dom/manipulate/stripTags';
import __onScrollEnd from '@coffeekraken/sugar/js/dom/detect/onScrollEnd';

// @ts-ignore
import __css from '../css/s-filtrable-input.css';

export interface ISFiltrableInputComponentProps {
    items: any[];
    value: string;
    label: string;
    emptyText: string;
    loadingText: string;
    searchValudPreprocess: Function;
    filterItems: Function;
    filtrable: string[];
    templates: Record<string, Function>;
    closeTimeout: number;
    interactive: boolean;
    closeOnSelect: boolean;
    notSelectable: boolean;
    maxItems: number;
}

export interface ISFiltrableInputState {
    baseTemplates: Record<string, Function>;
    preselectedItem: any;
    preselectedItemIdx: number;
    selectedItem: any;
    selectedItemIdx:number;
    displayedMaxItems: number;
    value: string;
    isActive: boolean;
    isLoading: boolean;
    items: any[];
    filteredItems: any[];
}

export default class SFiltrableInput extends __SLitComponent {
    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
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

    _templatesFromHtml: any = {};


    state: ISFiltrableInputState = {
        baseTemplates: {},
        preselectedItem: {},
        preselectedItemIdx: -1,
        selectedItemIdx: -1,
        selectedItem: {},
        displayedMaxItems: 0,
        value: '',
        isActive: false,
        isLoading: false,
        items: [],
        filteredItems: [],
    };

    constructor() {
        super(
            __deepMerge({
                litComponent: {
                    shadowDom: false,
                },
                componentUtils: {
                    interface: __SFiltrableInputComponentInterface,
                },
            }),
        );

        this.state.displayedMaxItems = this.props.maxItems;

        if (this.props.items && typeof this.props.items === 'string') {
            const $itemsElm = document.querySelector(this.props.items);
            if ($itemsElm) {
                this.state.items = JSON.parse($itemsElm.innerHTML);
                this.requestUpdate();
            }
        }

        // @ts-ignore
        this.state.baseTemplates = ({ type, item, html }) => {
            switch (type) {
                case 'item':
                    return html`
                        <div class="${this.componentUtils.className('__item')}">
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
                        <div
                            class="${this.componentUtils.className('__empty')}"
                        >
                            ${this.props.emptyText}
                        </div>
                    `;
                    break;
                case 'loading':
                    return html`
                        <div
                            class="${this.componentUtils.className(
                                '__loading',
                            )}"
                        >
                            ${this.props.loadingText}
                        </div>
                    `;
                    break;
            }
        };
    }

    async firstUpdated() {

        // input
        this.$input = <any>this.querySelector('input');
        this.$input.setAttribute('autocomplete', 'off');

        // @ts-ignore
        this.$form = this.$input.form;
        // prevent from sending form if search is opened
        this.$form.addEventListener('submit', e => {
            if (this.state.isActive) {
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
        this.$input.classList.add(this.componentUtils.className('__input'));

        this.$container = this;
        this.$container.classList.add('s-filtrable-input');
        this.$container.classList.add(this.componentUtils.className());
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
            this.state.displayedMaxItems =
                (this.state.displayedMaxItems ?? 0) + this.props.maxItems;
            this.filterItems(false);
        });

        __hotkey('escape').on('press', (e) => {
            e.preventDefault();
            if (!this.state.isActive) return;
            this.close();
        });
        __hotkey('up').on('press', (e) => {
            e.preventDefault();
            if (!this.state.isActive) return;
            this.state.preselectedItemIdx =
                this.state.preselectedItemIdx > 0
                    ? this.state.preselectedItemIdx - 1
                    : 0;
            this.requestUpdate();
            const $item = this.$list.children[this.state.preselectedItemIdx];
            // @ts-ignore
            $item.focus();
        });
        __hotkey('down').on('press', (e) => {
            e.preventDefault();
            if (!this.state.isActive) return;
            this.state.preselectedItemIdx =
                this.state.preselectedItemIdx >=
                this.state.filteredItems.length - 1
                    ? this.state.filteredItems.length - 1
                    : this.state.preselectedItemIdx + 1;
            this.requestUpdate();
            const $item = this.$list.children[this.state.preselectedItemIdx];
            // @ts-ignore
            $item.focus();
        });
        __hotkey('return').on('press', (e) => {
            // protect agains actions when not focus
            if (!this.state.isActive) return;
            this.validateAndClose();
        });

        // open if a value exists
        if (this.$input.value) {
            this.state.value = this.$input.value;
            __cursorToEnd(this.$input);
            this.filterItems(true);
        }

    }

    _grabTemplates() {
        this.querySelectorAll('template').forEach($template => {
            if (!$template.hasAttribute('type')) return;
            // @ts-ignore
            this._templatesFromHtml[$template.getAttribute('type')] = $template.innerHTML;
        });
    }

    _getTemplate(type: string) {
        if (this.props.templates) {
            const res = this.props.templates({
                type,
                html
            });
            if (res) return res;
        }
        // from template tags
        if (this._templatesFromHtml[type]) {
            return html`
                ${unsafeHTML(this._templatesFromHtml[type])}
            `;
        }
        // @ts-ignore
        return this.state.baseTemplates({
            type,
            html
        });
    }

    get selectedItem() {
        if (this.state.selectedItemIdx === -1) return;
        return this.state.filteredItems[this.state.selectedItemIdx];
    }
    get preselectedItem() {
        if (this.state.preselectedItemIdx === -1) return;
        return this.state.filteredItems[this.state.preselectedItemIdx];
    }
    validate() {
        // protect against not selected item
        if (this.state.preselectedItemIdx === -1) return;
        // set the value in the input
        if (this.preselectedItem) {

            const itemProps: Partial<ISFiltrableInputComponentProps> = __deepMerge(Object.assign({}, this.props), this.state.preselectedItem.props ?? {});

            if (
                typeof itemProps.value === 'string' &&
                this.preselectedItem?.[itemProps.value]
            ) {
                (<HTMLInputElement>this.$input).value = __stripTags(
                    // @ts-ignore
                    this.preselectedItem[itemProps.value],
                );
            } else if (typeof itemProps.value === 'function') {
                // @ts-ignore
                const v = itemProps.value({
                    item: this.state.filteredItems[
                        this.state.preselectedItemIdx
                    ],
                });
                if (typeof v !== 'string') {
                    throw new Error(
                        `<red>[s-filtrable-input]</red> Sorry but the returned value "<yellow>${v}</yellow>" has to be a string...`,
                    );
                }
                (<HTMLInputElement>this.$input).value = __stripTags(v);
            }
        }
        this.state.selectedItemIdx = this.state.preselectedItemIdx;

        const $selectedItem = this.$list.children[this.state.selectedItemIdx];

        // dispatch an event
        const event = new CustomEvent('selectItem', {
            bubbles: true,
            detail: {
                item: this.selectedItem,
                $elm: $selectedItem
            }
        });
        // @ts-ignore
        this.dispatchEvent(event);
        // @ts-ignore
        this.state.value = this.$input.value;
        this.requestUpdate();
        // close on select if needed
        if (this.props.closeOnSelect) {
            // reset
            this.reset();
            this.filterItems();
            this.close();
        }
    }
    validateAndClose() {
        this.validate();
        setTimeout(() => {
            this.close();
        }, this.props.closeTimeout);
    }
    resetSelected() {
        this.state.preselectedItemIdx = -1;
        this.state.preselectedItem = {};
        this.state.selectedItemIdx = -1;
        this.state.selectedItem = {};
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
    async refreshItems() {
        if (typeof this.props.items === 'function') {
            this.state.isLoading = true;
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
        }
    }
    async filterItems(needUpdate = true) {

        if (needUpdate) await this.refreshItems();

        // reset selected
        this.resetSelected();

        let items = this.state.items;

        let searchValue = this.state.value;
        if (this.props.searchValuePreprocess) {
            searchValue = this.props.searchValuePreprocess(searchValue);
        }

        let filteredItems = items.map(item => __clone(item));

        // custom function
        if (this.props.filterItems) {
            filteredItems = await this.props.filterItems(filteredItems, searchValue, this.state);
        } else {
            let matchedItemsCount = 0;
            filteredItems = filteredItems
                .filter((item) => {
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
                                searchValue.split(' ').join('|'),
                                'gi',
                            );
                            if (propValue.match(reg)) {
                                matchFilter = true;
                                if (searchValue && searchValue !== '') {
                                    const reg = new RegExp(
                                        searchValue.split(' ').join('|'),
                                        'gi',
                                    );
                                    const finalString = propValue.replace(
                                        reg,
                                        (str) => {
                                            return `<span class="${this.componentUtils.className(
                                                '__list-item-highlight',
                                            )} s-highlight"
                                                    >${str}</span>`;
                                        },
                                    );
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
        this.state.filteredItems = filteredItems;
        this.state.isLoading = false;
        this.requestUpdate();
    }
    select(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
    }
    preselectAndValidate(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
        // validate
        this.validate();
    }
    preselectValidateAndClose(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
        // validate
        this.validateAndClose();
    }
    _setSelectedItemByIdx(idx) {
        // check if the component is in not selectable mode
        if (this.props.notSelectable) return;
        this.state.selectedItemIdx = idx;
        this.state.selectedItem = this.selectedItem;
        this.requestUpdate();
    }
    _setPreselectedItemByIdx(idx) {
        // check if the component is in not selectable mode
        if (this.props.notSelectable) return;
        this.state.preselectedItemIdx = idx;
        this.state.preselectedItem = this.preselectedItem;
        this.requestUpdate();
    }
    _updateListSizeAndPosition() {
        //   if (!__isFocus(this.$input)) return;
        if (!this.state.isActive) return;

        const marginTop = __getStyleProperty(this.$dropdown, 'marginTop'),
            marginLeft = __getStyleProperty(this.$dropdown, 'marginLeft'),
            marginRight = __getStyleProperty(this.$dropdown, 'marginRight'),
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

    render() {
        return html`
            <div class="s-filtrable-input__dropdown">
                <div class="s-filtrable-input__before" tabindex="0">
                    ${this._getTemplate('before')}
                </div>
                <ul class="s-filtrable-input__list">
                    ${this.state.isLoading
                        ? html`
                            <li
                                class="s-filtrable-input__list-item s-filtrable-input__list-loading"
                            >
                                ${this.props.templates?.({
                                    type: 'loading',
                                    html,
                                }) ??
                                // @ts-ignore
                                this.state.baseTemplates({
                                    type: 'loading',
                                    html,
                                })}
                            </li>
                        `
                        : !this.state.isLoading &&
                        this.state.filteredItems.length <= 0
                        ? html`
                            <li
                                class="s-filtrable-input__list-item s-filtrable-input__list-no-item"
                            >
                                ${this.props.templates?.({
                                    type: 'empty',
                                    html,
                                }) ??
                                // @ts-ignore
                                this.state.baseTemplates({
                                    type: 'empty',
                                    html,
                                })}
                            </li>
                        `
                        : !this.state.isLoading && this.state.filteredItems.length
                        ? this.state.filteredItems.map((item, idx) =>
                            idx < this.state.displayedMaxItems
                                ? html`
                                        <li
                                            @click=${() =>
                                                this.preselectAndValidate(idx)}
                                            @dblclick=${() =>
                                                this.preselectValidateAndClose(idx)}
                                            @focus=${() =>
                                                this._setPreselectedItemByIdx(idx)}
                                            style="z-index: ${999999999 - idx}"
                                            tabindex="0"
                                            class="s-filtrable-input__list-item ${(this.state.selectedItemIdx === idx
                                                ? 'active'
                                                : '')}"
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
                                            this.state.baseTemplates({
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
                <div class="s-filtrable-input__after" tabindex="0">
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
 * @param           {String}        [tagName='s-filtrable-input']       The tagName associated to this custom element
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export function define(
    props: Partial<ISFiltrableInputComponentProps> = {},
    tagName = 's-filtrable-input',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    // @ts-ignore
    customElements.define(tagName, SFiltrableInput);
}
