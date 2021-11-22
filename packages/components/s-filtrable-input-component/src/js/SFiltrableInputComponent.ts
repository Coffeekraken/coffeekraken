import { html, css, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property } from 'lit/decorators.js';
import __SFiltrableInputComponentInterface from './interface/SFiltrableInputComponentInterface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __copy from '@coffeekraken/sugar/js/clipboard/copy';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';

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

export interface ISFiltrableInputComponentProps {}

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
    $input: HTMLElement;
    // @ts-ignore
    $itemTemplateElm: HTMLElement;
    // @ts-ignore
    $noItemTemplateElm: HTMLElement;
    // @ts-ignore
    $loadingTemplateElm: HTMLElement;

    state = {
        baseTemplates: undefined,
        preselectedItem: undefined,
        preselectedItemIdx: -1,
        selectedItemIdx: -1,
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
        this.$input = <any>this.querySelector('input');
        this.$input.setAttribute('autocomplete', 'off');

        if (!this.props.bare) {
            // @ts-ignore
            this.$input.classList?.add('s-input');
        }

        // @ts-ignore
        this.$input.addEventListener('keyup', (e) => {
            // @ts-ignore
            const value = e.target.value;
            this.state.value = value;
            this.state.displayedMaxItems = this.props.maxItems;
            this.filterItems();
        });

        // @ts-ignore
        this.$input.classList.add(this.componentUtils.className('__input'));

        this.$container = this;
        this.$container.classList.add('s-filtrable-input');
        this.$container.classList.add(this.componentUtils.className());
        // @ts-ignore
        this.$list = this.querySelector('ul');

        this.prepend(this.$input);
        this.filterItems();

        document.addEventListener('scroll', () => {
            this._updateListSizeAndPosition();
        });
        this.$input.addEventListener('focus', (e) => {
            this.state.isActive = true;
            this.filterItems();
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
        if (!this.state.preselectedItem) return;
        // set the value in the input
        if (this.state.preselectedItem) {
            if (
                typeof this.props.value === 'string' &&
                this.state.preselectedItem?.[this.props.value]
            ) {
                (<HTMLInputElement>this.$input).value = __stripTags(
                    // @ts-ignore
                    this.state.preselectedItem[this.props.value],
                );
            } else if (typeof this.props.value === 'function') {
                const v = this.props.value({
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
        // @ts-ignore
        this.state.value = this.$input.value;
        this.requestUpdate();
        // dispatch an event
        const event = new CustomEvent('select', {
            bubbles: true,
            detail: this.selectedItem,
        });
        // @ts-ignore
        this.dispatchEvent(event);
    }
    validateAndClose() {
        this.validate();
        setTimeout(() => {
            this.close();
        }, this.props.closeTimeout);
    }
    close() {
        this.$input.focus();
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

        let items = this.state.items;

        let matchedItemsCount = 0;
        const filteredItems = items
            .map((item) => __clone(item))
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
                            this.state.value.split(' ').join('|'),
                            'gi',
                        );
                        if (propValue.match(reg)) {
                            matchFilter = true;
                            if (this.state.value && this.state.value !== '') {
                                const reg = new RegExp(
                                    this.state.value.split(' ').join('|'),
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

        // @ts-ignore
        this.state.filteredItems = filteredItems;
        this.state.isLoading = false;
        this.requestUpdate();
    }
    select(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
    }
    selectAndValidate(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
        // validate
        this.validate();
    }
    selectValidateAndClose(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
        // validate
        this.validateAndClose();
    }
    _setPreselectedItemByIdx(idx) {
        // check if the component is in not selectable mode
        if (this.props.notSelectable) return;
        this.state.preselectedItemIdx = idx;
        this.state.preselectedItem = this.state.items[idx];
        this.requestUpdate();
    }
    _updateListSizeAndPosition() {
        //   if (!__isFocus(this.$input)) return;
        if (!this.state.isActive) return;

        const marginTop = __getStyleProperty(this.$list, 'marginTop'),
            marginLeft = __getStyleProperty(this.$list, 'marginLeft'),
            marginRight = __getStyleProperty(this.$list, 'marginRight'),
            marginBottom = __getStyleProperty(this.$list, 'marginBottom');
        const distanceTop = __distanceFromElementTopToViewportTop(this.$input);
        const distanceBottom =
            __distanceFromElementTopToViewportBottom(this.$input) -
            this.$input.clientHeight;
        let maxHeight;

        if (distanceTop > distanceBottom) {
            this.$container.classList.add('s-filtrable-input--top');
            this.$list.style.top = `auto`;
            this.$list.style.bottom = `calc(100% - ${marginBottom})`;
            maxHeight = distanceTop - parseInt(marginTop);
        } else {
            this.$container.classList.remove('s-filtrable-input--top');
            this.$list.style.bottom = `auto`;
            this.$list.style.top = `calc(100% - ${marginTop})`;
            maxHeight = distanceBottom - parseInt(marginBottom);
        }

        this.$list.style.maxHeight = `${maxHeight}px`;
    }

    render() {
        return html`
            <ul
                class="s-filtrable-input__list ${this.componentUtils.className(
                    '__list',
                )}"
            >
                ${this.state.isLoading
                    ? html`
                          <li
                              class="s-filtrable-input__list-item s-filtrable-input__list-loading ${this.componentUtils.className(
                                  '__list-item __list-loading',
                              )}"
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
                              class="s-filtrable-input__list-item s-filtrable-input__list-no-item  ${this.componentUtils.className(
                                  '__list-item __list-no-item',
                              )}"
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
                                            this.selectAndValidate(idx)}
                                        @dblclick=${() =>
                                            this.selectValidateAndClose(idx)}
                                        @focus=${() =>
                                            this._setPreselectedItemByIdx(idx)}
                                        style="z-index: ${999999999 - idx}"
                                        tabindex="0"
                                        class="s-filtrable-input__list-item ${this.componentUtils.className(
                                            '__list-item',
                                        ) +
                                        ' ' +
                                        (this.state.selectedItemIdx === idx
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
