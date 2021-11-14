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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLE1BQU0sTUFBTSx1QkFBdUIsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RCxPQUFPLFNBQVMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RCxPQUFPLGdCQUFnQixNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sU0FBUyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZELE9BQU8sVUFBVSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hFLE9BQU8sb0JBQW9CLE1BQU0sZ0RBQWdELENBQUM7QUFDbEYsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLDJCQUEyQixDQUFDO0FBQzlDLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFFMUYsYUFBYTtBQUNiLE9BQU8sVUFBVSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JELGFBQWE7QUFDYixPQUFPLFlBQVksTUFBTSwrQkFBK0IsQ0FBQztBQUN6RCxhQUFhO0FBQ2IsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsYUFBYTtBQUNiLE9BQU8sYUFBYSxNQUFNLGlDQUFpQyxDQUFDO0FBRTVELGdCQUFnQixF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