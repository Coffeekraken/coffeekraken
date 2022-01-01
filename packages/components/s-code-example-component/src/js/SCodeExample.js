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
import __langCss from 'highlight.js/lib/languages/css';
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
// @ts-ignore
import __prettier from 'prettier/esm/standalone.mjs';
// @ts-ignore
import __prettierJs from 'prettier/esm/parser-babel.mjs';
// @ts-ignore
import __prettierHtml from 'prettier/esm/parser-html.mjs';
// @ts-ignore
import __prettierCss from 'prettier/esm/parser-postcss.mjs';
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
        const languages = Object.assign({ html: __langHtml, javascript: __langJavascript, js: __langJavascript, php: __langPhp, bash: __langBash, shell: __langBash, css: __langCss }, ((_a = this.props.languages) !== null && _a !== void 0 ? _a : {}));
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
                    case 'postcss':
                        parser = 'postcss';
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
                        plugins: [__prettierCss, __prettierHtml, __prettierJs],
                    });
                }
                catch (e) { }
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
        this._more = !this._more;
        this.setMoreClass();
    }
    initPrismOnTab(id) {
        var _a;
        const $content = ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`pre#${id} code`));
        const item = this._items.find((i) => i.id === id);
        if ($content.hasAttribute('inited')) {
            this.setMoreClass();
            return;
        }
        $content.setAttribute('inited', 'true');
        const code = __hljs.highlight($content.innerHTML.replace(/<!--\?lit.*-->/, ''), {
            language: $content.getAttribute('lang'),
        });
        item.highlightedCode = __decodeHtmlEntities(code.value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLE1BQU0sTUFBTSx1QkFBdUIsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RCxPQUFPLFNBQVMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RCxPQUFPLGdCQUFnQixNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sU0FBUyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZELE9BQU8sVUFBVSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RSxPQUFPLG9CQUFvQixNQUFNLGdEQUFnRCxDQUFDO0FBQ2xGLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwyQkFBMkIsQ0FBQztBQUM5QyxPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBRTFGLGFBQWE7QUFDYixPQUFPLFVBQVUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRCxhQUFhO0FBQ2IsT0FBTyxZQUFZLE1BQU0sK0JBQStCLENBQUM7QUFDekQsYUFBYTtBQUNiLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELGFBQWE7QUFD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