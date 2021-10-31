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
import { property, query, queryAssignedNodes } from 'lit/decorators.js';
import __decodeHtmlEntities from '@coffeekraken/sugar/js/html/decodeHtmlEntities';
// @ts-ignore
import __css from '../css/s-code-example.css';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface';
import __prettier from 'prettier/esm/standalone.mjs';
import __prettierJs from 'prettier/esm/parser-babel.mjs';
import __prettierHtml from 'prettier/esm/parser-html.mjs';
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
        var _a, _b, _c;
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
                let rawCode = __decodeHtmlEntities($template.innerHTML);
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
            yield __wait(500);
            this._$content = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.s-code-example__content');
            this._$pre = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.s-code-example__code');
            this._$root = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('.s-code-example');
            return true;
        });
    }
    setActiveTabByTab(e) {
        this.setActiveTab(e.target.id);
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
            yield __wait(500);
            if (this._more) {
                this._$root.classList.add('s-code-example--more');
            }
            else {
                this._$root.classList.remove('s-code-example--more');
            }
        });
    }
    toggleMore() {
        this._more = !this._more;
        this.setMoreClass();
    }
    initPrismOnTab(id) {
        var _a;
        const $content = ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`pre#${id} code`));
        if ($content.hasAttribute('inited')) {
            this.setMoreClass();
            return;
        }
        $content.setAttribute('inited', 'true');
        __hljs.highlightElement($content);
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
        return html `
            <div
                class="${this.componentUtils.className()} ${this.props.more ? this.componentUtils.className('more') : ''}"
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
                    <ol class="${this.componentUtils.className('__tabs', 's-tabs')}">
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
            item.code.trim()}</code>
                        </pre>
                        `;
        })}
                    <div class="${this.componentUtils.className('__more-bar')}">
                        ${
        // @ts-ignore
        this._moreAction === 'toggle'
            ? html `
                                      <a
                                          class="${this.componentUtils.className('__more-button', 's-btn')}"
                                          @click="${this.toggleMore}"
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
            this._moreAction}"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLE1BQU0sTUFBTSx1QkFBdUIsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RCxPQUFPLFNBQVMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RCxPQUFPLGdCQUFnQixNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sU0FBUyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZELE9BQU8sVUFBVSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hFLE9BQU8sb0JBQW9CLE1BQU0sZ0RBQWdELENBQUM7QUFDbEYsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLDJCQUEyQixDQUFDO0FBQzlDLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFFMUYsT0FBTyxVQUFVLE1BQU0sNkJBQTZCLENBQUM7QUFDckQsT0FBTyxZQUFZLE1BQU0sK0JBQStCLENBQUM7QUFDekQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxhQUFhLE1BQU0saUNBQWlDLENBQUM7QUFFNUQsZ0JBQWdCLEVBQUUsQ0FBQztBQWNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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