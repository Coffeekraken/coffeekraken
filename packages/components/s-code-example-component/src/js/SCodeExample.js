var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { define as __SClipboardCopy } from '@coffeekraken/s-clipboard-copy-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __hljs from 'highlight.js/lib/core';
import __langBash from 'highlight.js/lib/languages/bash';
import __langCss from './languages/css';
// import __langCss from 'highlight.js/lib/languages/css';
import __langJavascript from 'highlight.js/lib/languages/javascript';
import __langPhp from 'highlight.js/lib/languages/php';
import __langHtml from 'highlight.js/lib/languages/xml';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property, query, queryAssignedNodes } from 'lit/decorators.js';
import __decodeHtmlEntities from '@coffeekraken/sugar/js/html/decodeHtmlEntities';
// @ts-ignore
import __css from '../css/s-code-example.css';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface';
import __scrollTo from '@coffeekraken/sugar/js/dom/scroll/scrollTo';
// // @ts-ignore
import __prettier from 'prettier/esm/standalone.mjs';
// @ts-ignore
import __prettierJs from 'prettier/esm/parser-babel.mjs';
// @ts-ignore
import __prettierHtml from 'prettier/esm/parser-html.mjs';
// @ts-ignore
import __prettierCss from 'prettier/esm/parser-postcss.mjs';
import __prettierPhp from '@prettier/plugin-php/standalone';
__SClipboardCopy();
/**
 * @name                Code Example
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SCodeExampleComponentInterface.js
 * @menu                Styleguide / UI              /styleguide/ui/s-code-example
 * @install             npm i @coffeekraken/s-code-example-component
 * @platform            html
 * @status              beta
 *
 * This component represent a code example that make sure your passed code(s) is displayed well using under the hood the AMAZING [highlightjs](https://highlightjs.org/) library.
 *
 * @feature           Can display out of the bos codes like `bash`, `shell`, `css`, `js`, `php` and `html`
 * @feature           Possibility to add some languages through the property `languages`
 * @feature           Full support for sugar theming system for easy integration
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @example         html
 * <s-code-example>
 *      <template lang="js">
 * function $initHighlight(block, cls) {
 * try {
 *   if (cls.search(/\bno\-highlight\b/) != -1)
 *     return process(block, true, 0x0F) +
 *            ` class="${cls}"`;
 * } catch (e) {
 * }
 * for (var i = 0 / 2; i < classes.length; i++) {
 *   if (checkCondition(classes[i]) === undefined)
 *     console.log('undefined');
 * }
 *      </template>
 * </s-code-example>
 *
 * @example         js
 * import { define } from '@coffeekraken/s-code-example-component';
 * define();
 *
 * @see             https://highlightjs.org/
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SCodeExample extends __SLitComponent {
    constructor() {
        var _a;
        super(__deepMerge({
            componentUtils: {
                interface: __SCodeExampleComponentInterface,
            },
        }));
        this._$copy = undefined;
        this._items = [];
        this._activeTabId = undefined;
        const languages = Object.assign({ html: __langHtml, javascript: __langJavascript, js: __langJavascript, php: __langPhp, bash: __langBash, shell: __langBash, css: __langCss, scss: __langCss }, ((_a = this.props.languages) !== null && _a !== void 0 ? _a : {}));
        Object.keys(languages).forEach((lang) => {
            __hljs.registerLanguage(lang, languages[lang]);
        });
    }
    static get properties() {
        return __SLitComponent.properties({}, __SCodeExampleComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    firstUpdated() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.$templates.forEach(($template) => {
                var _a, _b, _c, _d, _e, _f, _g;
                if (!$template.getAttribute)
                    return;
                let parser = 'babel';
                switch ((_b = (_a = $template.getAttribute('id')) !== null && _a !== void 0 ? _a : $template.getAttribute('language')) !== null && _b !== void 0 ? _b : $template.getAttribute('lang')) {
                    case 'html':
                    case 'xml':
                        parser = 'html';
                        break;
                    case 'css':
                    case 'scss':
                    case 'postcss':
                        parser = 'css';
                        break;
                }
                let rawCode = __decodeHtmlEntities($template.tagName.toLowerCase() === 'textarea' &&
                    // @ts-ignore
                    $template.value
                    ? // @ts-ignore
                        $template.value
                    : $template.innerHTML);
                let formatedCode = rawCode;
                try {
                    formatedCode = __prettier.format(rawCode, {
                        parser,
                        plugins: [
                            __prettierCss,
                            __prettierHtml,
                            __prettierJs,
                            __prettierPhp
                        ],
                    });
                }
                catch (e) {
                }
                this._items = [
                    ...this._items,
                    {
                        id: (_e = (_d = (_c = $template.getAttribute('id')) !== null && _c !== void 0 ? _c : $template.getAttribute('language')) !== null && _d !== void 0 ? _d : $template.getAttribute('lang')) !== null && _e !== void 0 ? _e : 'html',
                        lang: (_g = (_f = $template.getAttribute('language')) !== null && _f !== void 0 ? _f : $template.getAttribute('lang')) !== null && _g !== void 0 ? _g : 'html',
                        // @ts-ignore
                        code: formatedCode,
                        lines: formatedCode.trim().split('\n').length,
                    },
                ];
                $template.remove();
            });
            // active idx
            if (this.active) {
                this.setActiveTab(this.active);
            }
            else {
                if (this._items[0]) {
                    this.setActiveTab(this._items[0].id);
                }
            }
            // await __wait(500);
            // this._$content = this.shadowRoot?.querySelector(
            //     '.s-code-example__content',
            // );
            this._$pre = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.s-code-example__code');
            this._$root = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.s-code-example');
            return true;
        });
    }
    setActiveTabByTab(e) {
        this.setActiveTab(e.target.id);
    }
    get currentItem() {
        if (!this._activeTabId)
            return {};
        return this._items.find((i) => i.id === this._activeTabId);
    }
    setActiveTab(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __wait();
            this._activeTabId = id;
            this.initPrismOnTab(id);
        });
    }
    setMoreClass() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._more) {
                this._$root.classList.add('s-code-example--more');
            }
            else {
                this._$root.classList.remove('s-code-example--more');
            }
            this.requestUpdate();
        });
    }
    toggleMore() {
        var _a;
        this._more = !this._more;
        this.setMoreClass();
        __scrollTo(this, Object.assign({}, (_a = this.props.scrollToSettings) !== null && _a !== void 0 ? _a : {}));
    }
    initPrismOnTab(id) {
        var _a, _b;
        const $content = ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`pre#${id} code`));
        const item = this._items.find((i) => i.id === id);
        if ($content.hasAttribute('inited')) {
            this.setMoreClass();
            return;
        }
        $content.setAttribute('inited', 'true');
        let code;
        try {
            const codeToHighlight = __decodeHtmlEntities($content.innerHTML.replace(/<!--\?lit.*-->/, ''));
            code = __hljs.highlight(codeToHighlight, {
                language: $content.getAttribute('lang'),
            });
        }
        catch (e) {
            // console.log(e);
        }
        // @ts-ignore
        item.highlightedCode = (_b = code === null || code === void 0 ? void 0 : code.value) !== null && _b !== void 0 ? _b : '';
        this.setMoreClass();
    }
    copy() {
        const id = this._activeTabId;
        const item = this._items.filter((i) => i.id === id)[0];
        // @ts-ignore
        this.$copy.copy(item.code);
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        const currentItem = this.currentItem;
        return html `
            <div
                class="${this.componentUtils.className()} ${this.props.more
            ? this.componentUtils.className('more')
            : ''}"
                ?lines="${
        // @ts-ignore
        this.lines}"
                ?mounted="${
        // @ts-ignore
        this.mounted}"
                ?bare="${
        // @ts-ignore
        this.bare}"
                toolbar-position="${
        // @ts-ignore
        this.toolbarPosition}"
            >
                <div class="templates">
                    <slot></slot>
                </div>

                <header class="${this.componentUtils.className('__nav')}">
                    <ol
                        class="${this.componentUtils.className('__tabs', 's-tabs')}"
                    >
                        ${((_a = this._items) !== null && _a !== void 0 ? _a : []).map((item) => html `
                                <li
                                    class="${this.componentUtils.className('__tab')}"
                                    id="${item.id}"
                                    ?active="${this._activeTabId === item.id}"
                                    @click="${this.setActiveTabByTab}"
                                >
                                    ${item.lang}
                                </li>
                            `)}
                    </ol>
                    ${
        // @ts-ignore
        this.toolbarPosition === 'nav'
            ? html `
                                  <div
                                      class="${this.componentUtils.className('__toolbar')}"
                                  >
                                      <s-clipboard-copy
                                          @click="${this.copy}"
                                      ></s-clipboard-copy>
                                  </div>
                              `
            : ''}
                </header>
                <div
                    class="${this.componentUtils.className('__content')}"
                    style="--max-lines: ${(_b = this.props.lines) !== null && _b !== void 0 ? _b : 99999999};"
                >
                    ${
        // @ts-ignore
        this.toolbarPosition !== 'nav'
            ? html `
                                  <div
                                      class="${this.componentUtils.className('__toolbar')}"
                                  >
                                      <s-clipboard-copy
                                          @click="${this.copy}"
                                      ></s-clipboard-copy>
                                  </div>
                              `
            : ''}
                    ${((_c = this._items) !== null && _c !== void 0 ? _c : []).map((item) => {
            var _a, _b, _c;
            return html `
                            <pre
                                class="${this.componentUtils.className('__code')}"
                                style="line-height:0;"
                                id="${(_a = item.id) !== null && _a !== void 0 ? _a : item.lang}"
                                ?active="${this._activeTabId ===
                ((_b = item.id) !== null && _b !== void 0 ? _b : item.lang)}"
                            >
                            <code lang="${(_c = item.lang) !== null && _c !== void 0 ? _c : item.id}" class="language-${item.lang} ${item.lang} ${this
                .props.bare
                ? ''
                : 'hljs'}">${
            // @ts-ignore
            item.highlightedCode
                ? unsafeHTML(item.highlightedCode)
                : item.code.trim()}</code>
                        </pre>
                        `;
        })}
                    ${this.props.lines && currentItem.lines > this.lines
            ? html `
                        <div class="${this.componentUtils.className('__more-bar')}">
                            ${
            // @ts-ignore
            this.moreAction === 'toggle'
                ? html `
                                          <a
                                              class="${this.componentUtils.className('__more-button', 's-btn')}"
                                              @click="${() => this.toggleMore()}"
                                          >
                                              ${
                // @ts-ignore
                this._more
                    ? html `
                                                            ${(_d = this.props
                        .lessLabel) !== null && _d !== void 0 ? _d : 'Show less'}
                                                        `
                    : html `
                                                            ${(_e = this.props
                        .moreLabel) !== null && _e !== void 0 ? _e : 'Show more'}
                                                        `}
                                          </a>
                                      `
                : html `
                                          <a
                                              class="${this.componentUtils.className('__more-button', 's-btn s-color--accent')}"
                                              href="${
                // @ts-ignore
                this.moreAction}"
                                          >
                                              ${
                // @ts-ignore
                this._more
                    ? html `
                                                            ${(_f = this.props
                        .lessLabel) !== null && _f !== void 0 ? _f : 'Show less'}
                                                        `
                    : html `
                                                            ${(_g = this.props
                        .moreLabel) !== null && _g !== void 0 ? _g : 'Show more'}
                                                        `}
                                          </a>
                                      `}                        
                            </a>
                        </div>
                    `
            : ''}
                </div>
            </div>
        `;
    }
}
__decorate([
    property()
], SCodeExample.prototype, "_items", void 0);
__decorate([
    property()
], SCodeExample.prototype, "_activeTabId", void 0);
__decorate([
    property({
        type: String,
    })
], SCodeExample.prototype, "active", void 0);
__decorate([
    property()
], SCodeExample.prototype, "props", void 0);
__decorate([
    query('s-clipboard-copy')
], SCodeExample.prototype, "$copy", void 0);
__decorate([
    query('.templates')
], SCodeExample.prototype, "$templatesContainer", void 0);
__decorate([
    queryAssignedNodes()
], SCodeExample.prototype, "$templates", void 0);
export function define(props = {}, tagName = 's-code-example') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SCodeExample);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLE1BQU0sTUFBTSx1QkFBdUIsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RCxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QywwREFBMEQ7QUFDMUQsT0FBTyxnQkFBZ0IsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLFNBQVMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RCxPQUFPLFVBQVUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDeEUsT0FBTyxvQkFBb0IsTUFBTSxnREFBZ0QsQ0FBQztBQUNsRixhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMkJBQTJCLENBQUM7QUFDOUMsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQUMxRixPQUFPLFVBQWlDLE1BQU0sNENBQTRDLENBQUM7QUFFM0YsZ0JBQWdCO0FBQ2hCLE9BQU8sVUFBVSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JELGFBQWE7QUFDYixPQUFPLFlBQVksTUFBTSwrQkFBK0IsQ0FBQztBQUN6RCxhQUFhO0FBQ2IsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsYUFBYTtBQUNiLE9BQU8sYUFBYSxNQUFNLGlDQUFpQyxDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLGlDQUFpQyxDQUFDO0FBRTVELGdCQUFnQixFQUFFLENBQUM7QUFnQm5COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Q0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxlQUFlO0lBd0NyRDs7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsY0FBYyxFQUFFO2dCQUNaLFNBQVMsRUFBRSxnQ0FBZ0M7YUFDOUM7U0FDSixDQUFDLENBQ0wsQ0FBQztRQXBDTixXQUFNLEdBQUcsU0FBUyxDQUFDO1FBT25CLFdBQU0sR0FBa0IsRUFBRSxDQUFDO1FBRzNCLGlCQUFZLEdBQUcsU0FBUyxDQUFDO1FBNEJyQixNQUFNLFNBQVMsbUJBQ1gsSUFBSSxFQUFFLFVBQVUsRUFDaEIsVUFBVSxFQUFFLGdCQUFnQixFQUM1QixFQUFFLEVBQUUsZ0JBQWdCLEVBQ3BCLEdBQUcsRUFBRSxTQUFTLEVBQ2QsSUFBSSxFQUFFLFVBQVUsRUFDaEIsS0FBSyxFQUFFLFVBQVUsRUFDakIsR0FBRyxFQUFFLFNBQVMsRUFDZCxJQUFJLEVBQUUsU0FBUyxJQUNaLENBQUMsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsbUNBQUksRUFBRSxDQUFDLENBQ2xDLENBQUM7UUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBL0RELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUF3REssWUFBWTs7O1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFzQixFQUFFLEVBQUU7O2dCQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVk7b0JBQUUsT0FBTztnQkFDcEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDO2dCQUNyQixRQUNJLE1BQUEsTUFBQSxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxtQ0FDNUIsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsbUNBQ2xDLFNBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQ2hDO29CQUNFLEtBQUssTUFBTSxDQUFDO29CQUNaLEtBQUssS0FBSzt3QkFDTixNQUFNLEdBQUcsTUFBTSxDQUFDO3dCQUNoQixNQUFNO29CQUNWLEtBQUssS0FBSyxDQUFDO29CQUNYLEtBQUssTUFBTSxDQUFDO29CQUNaLEtBQUssU0FBUzt3QkFDVixNQUFNLEdBQUcsS0FBSyxDQUFDO3dCQUNmLE1BQU07aUJBQ2I7Z0JBQ0QsSUFBSSxPQUFPLEdBQUcsb0JBQW9CLENBQzlCLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssVUFBVTtvQkFDMUMsYUFBYTtvQkFDYixTQUFTLENBQUMsS0FBSztvQkFDZixDQUFDLENBQUMsYUFBYTt3QkFDYixTQUFTLENBQUMsS0FBSztvQkFDakIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQzVCLENBQUM7Z0JBQ0YsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDO2dCQUMzQixJQUFJO29CQUNBLFlBQVksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTt3QkFDdEMsTUFBTTt3QkFDTixPQUFPLEVBQUU7NEJBQ0wsYUFBYTs0QkFDYixjQUFjOzRCQUNkLFlBQVk7NEJBQ1osYUFBYTt5QkFDaEI7cUJBQ0osQ0FBQyxDQUFDO2lCQUNOO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO2lCQUNYO2dCQUNELElBQUksQ0FBQyxNQUFNLEdBQUc7b0JBQ1YsR0FBRyxJQUFJLENBQUMsTUFBTTtvQkFDZDt3QkFDSSxFQUFFLEVBQ0UsTUFBQSxNQUFBLE1BQUEsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsbUNBQzVCLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLG1DQUNsQyxTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxtQ0FDOUIsTUFBTTt3QkFDVixJQUFJLEVBQ0EsTUFBQSxNQUFBLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLG1DQUNsQyxTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxtQ0FDOUIsTUFBTTt3QkFDVixhQUFhO3dCQUNiLElBQUksRUFBRSxZQUFZO3dCQUNsQixLQUFLLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNO3FCQUNoRDtpQkFDSixDQUFDO2dCQUNGLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUVILGFBQWE7WUFDYixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbEM7aUJBQU07Z0JBQ0gsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3hDO2FBQ0o7WUFFRCxxQkFBcUI7WUFDckIsbURBQW1EO1lBQ25ELGtDQUFrQztZQUNsQyxLQUFLO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFBLElBQUksQ0FBQyxVQUFVLDBDQUFFLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBQSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNoRSxPQUFPLElBQUksQ0FBQzs7S0FDZjtJQUNELGlCQUFpQixDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELElBQUksV0FBVztRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFDSyxZQUFZLENBQUMsRUFBRTs7WUFDakIsTUFBTSxNQUFNLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUIsQ0FBQztLQUFBO0lBQ0ssWUFBWTs7WUFDZCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDeEQ7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBQ0QsVUFBVTs7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsVUFBVSxDQUFDLElBQUksb0JBQ1IsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixtQ0FBSSxFQUFFLEVBQ3RDLENBQUM7SUFDUCxDQUFDO0lBQ0QsY0FBYyxDQUFDLEVBQUU7O1FBQ2IsTUFBTSxRQUFRLEdBQWdCLENBQzFCLE1BQUEsSUFBSSxDQUFDLFVBQVUsMENBQUUsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FDbkQsQ0FBQztRQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRWxELElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsT0FBTztTQUNWO1FBQ0QsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBSSxJQUFJLENBQUM7UUFDVCxJQUFJO1lBQ0EsTUFBTSxlQUFlLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvRixJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FDbkIsZUFBZSxFQUNmO2dCQUNJLFFBQVEsRUFBVSxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQzthQUNsRCxDQUNKLENBQUM7U0FDTDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1Isa0JBQWtCO1NBQ3JCO1FBQ0QsYUFBYTtRQUNiLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsS0FBSyxtQ0FBSSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJO1FBQ0EsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxhQUFhO1FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxNQUFNOztRQUNGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUE7O3lCQUVNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQ3ZELENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDdkMsQ0FBQyxDQUFDLEVBQUU7MEJBQ0U7UUFDTixhQUFhO1FBQ2IsSUFBSSxDQUFDLEtBQ1Q7NEJBQ1k7UUFDUixhQUFhO1FBQ2IsSUFBSSxDQUFDLE9BQ1Q7eUJBQ1M7UUFDTCxhQUFhO1FBQ2IsSUFBSSxDQUFDLElBQ1Q7b0NBQ29CO1FBQ2hCLGFBQWE7UUFDYixJQUFJLENBQUMsZUFDVDs7Ozs7O2lDQU1pQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7O2lDQUV0QyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDbEMsUUFBUSxFQUNSLFFBQVEsQ0FDWDs7MEJBRUMsQ0FBQyxNQUFBLElBQUksQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDckIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTs7NkNBRUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLE9BQU8sQ0FDVjswQ0FDSyxJQUFJLENBQUMsRUFBRTsrQ0FDRixJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxFQUFFOzhDQUM5QixJQUFJLENBQUMsaUJBQWlCOztzQ0FFOUIsSUFBSSxDQUFDLElBQUk7OzZCQUVsQixDQUNKOztzQkFFSDtRQUNFLGFBQWE7UUFDYixJQUFJLENBQUMsZUFBZSxLQUFLLEtBQUs7WUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQTs7K0NBRWEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFdBQVcsQ0FDZDs7O29EQUdhLElBQUksQ0FBQyxJQUFJOzs7K0JBRzlCO1lBQ0gsQ0FBQyxDQUFDLEVBQ1Y7Ozs2QkFHUyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7MENBQzdCLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLG1DQUFJLFFBQVE7O3NCQUVoRDtRQUNFLGFBQWE7UUFDYixJQUFJLENBQUMsZUFBZSxLQUFLLEtBQUs7WUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQTs7K0NBRWEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFdBQVcsQ0FDZDs7O29EQUdhLElBQUksQ0FBQyxJQUFJOzs7K0JBRzlCO1lBQ0gsQ0FBQyxDQUFDLEVBQ1Y7c0JBQ0UsQ0FBQyxNQUFBLElBQUksQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDckIsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7WUFBQyxPQUFBLElBQUksQ0FBQTs7eUNBRUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFFBQVEsQ0FDWDs7c0NBRUssTUFBQSxJQUFJLENBQUMsRUFBRSxtQ0FBSSxJQUFJLENBQUMsSUFBSTsyQ0FDZixJQUFJLENBQUMsWUFBWTtnQkFDNUIsQ0FBQyxNQUFBLElBQUksQ0FBQyxFQUFFLG1DQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7OzBDQUVaLE1BQUEsSUFBSSxDQUFDLElBQUksbUNBQ3ZCLElBQUksQ0FBQyxFQUFFLHFCQUFxQixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSTtpQkFDckQsS0FBSyxDQUFDLElBQUk7Z0JBQ1gsQ0FBQyxDQUFDLEVBQUU7Z0JBQ0osQ0FBQyxDQUFDLE1BQU0sS0FBSztZQUNiLGFBQWE7WUFDYixJQUFJLENBQUMsZUFBZTtnQkFDaEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2dCQUNsQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQ3hCOzt5QkFFSCxDQUFBO1NBQUEsQ0FDSjtzQkFDQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLO1lBQ2hELENBQUMsQ0FBQyxJQUFJLENBQUE7c0NBQ1EsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ3ZDLFlBQVksQ0FDZjs4QkFDSztZQUNFLGFBQWE7WUFDYixJQUFJLENBQUMsVUFBVSxLQUFLLFFBQVE7Z0JBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUE7O3VEQUVhLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxlQUFlLEVBQ2YsT0FBTyxDQUNWO3dEQUNTLEdBQUcsRUFBRSxDQUNYLElBQUksQ0FBQyxVQUFVLEVBQUU7O2dEQUVuQjtnQkFDRSxhQUFhO2dCQUNiLElBQUksQ0FBQyxLQUFLO29CQUNOLENBQUMsQ0FBQyxJQUFJLENBQUE7OERBQ0UsTUFBQSxJQUFJLENBQUMsS0FBSzt5QkFDUCxTQUFTLG1DQUNkLFdBQVc7eURBQ2Q7b0JBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQTs4REFDRSxNQUFBLElBQUksQ0FBQyxLQUFLO3lCQUNQLFNBQVMsbUNBQ2QsV0FBVzt5REFFekI7O3VDQUVQO2dCQUNILENBQUMsQ0FBQyxJQUFJLENBQUE7O3VEQUVhLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxlQUFlLEVBQ2YsdUJBQXVCLENBQzFCO3NEQUNPO2dCQUNKLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLFVBQ1Q7O2dEQUVFO2dCQUNFLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLEtBQUs7b0JBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQTs4REFDRSxNQUFBLElBQUksQ0FBQyxLQUFLO3lCQUNQLFNBQVMsbUNBQ2QsV0FBVzt5REFDZDtvQkFDSCxDQUFDLENBQUMsSUFBSSxDQUFBOzhEQUNFLE1BQUEsSUFBSSxDQUFDLEtBQUs7eUJBQ1AsU0FBUyxtQ0FDZCxXQUFXO3lEQUV6Qjs7dUNBR2xCOzs7cUJBR1A7WUFDRyxDQUFDLENBQUMsRUFBRTs7O1NBR25CLENBQUM7SUFDTixDQUFDO0NBQ0o7QUE3V0c7SUFEQyxRQUFRLEVBQUU7NENBQ2dCO0FBRzNCO0lBREMsUUFBUSxFQUFFO2tEQUNjO0FBS3pCO0lBSEMsUUFBUSxDQUFDO1FBQ04sSUFBSSxFQUFFLE1BQU07S0FDZixDQUFDOzRDQUNLO0FBR1A7SUFEQyxRQUFRLEVBQUU7MkNBQ0w7QUFHTjtJQURDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQzsyQ0FDcEI7QUFHTjtJQURDLEtBQUssQ0FBQyxZQUFZLENBQUM7eURBQ0E7QUFHcEI7SUFEQyxrQkFBa0IsRUFBRTtnREFDVjtBQTJWZixNQUFNLFVBQVUsTUFBTSxDQUNsQixRQUE4QyxFQUFFLEVBQ2hELE9BQU8sR0FBRyxnQkFBZ0I7SUFFMUIsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDakQsQ0FBQyJ9