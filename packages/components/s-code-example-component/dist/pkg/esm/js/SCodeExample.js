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
import { __wait } from '@coffeekraken/sugar/datetime';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __hljs from 'highlight.js/lib/core';
import __langBash from 'highlight.js/lib/languages/bash';
import __langTwig from 'highlight.js/lib/languages/twig';
import __langCss from './languages/css.js';
import { __scrollTo } from '@coffeekraken/sugar/dom';
import { __decodeHtmlEntities } from '@coffeekraken/sugar/string';
import __langJavascript from 'highlight.js/lib/languages/javascript';
import __langPhp from 'highlight.js/lib/languages/php';
import __langHtml from 'highlight.js/lib/languages/xml';
import { css, html, unsafeCSS } from 'lit';
import { query } from 'lit/decorators.js';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface.js';
// // @ts-ignore
import __prettier from 'prettier/esm/standalone.mjs';
// @ts-ignore
import __prettierJs from 'prettier/esm/parser-babel.mjs';
// @ts-ignore
import __prettierHtml from 'prettier/esm/parser-html.mjs';
// @ts-ignore
import __prettierPhp from '@prettier/plugin-php/standalone';
import __prettierCss from 'prettier/esm/parser-postcss.mjs';
// @ts-ignore
import __css from '../../../../src/css/s-code-example.css'; // relative to /dist/pkg/esm/js
__SClipboardCopy();
/**
 * @name                SCodeExampleComponent
 * @as                  Code example
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SCodeExampleComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-code-example
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
 * @snippet         __SCodeExampleComponentDefine($1)
 *
 * @import      import { define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
 *
 * @install           shell
 * npm i @coffeekraken/s-code-example-component
 *
 * @install           js
 * import { define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
 * __SCodeExampleComponentDefine();
 *
 * @example         html
 * <s-code-example>
 *      <template language="js">
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCodeExample extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SCodeExampleComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    constructor() {
        super(__deepMerge({
            name: 's-code-example',
            interface: __SCodeExampleComponentInterface,
        }));
        this._$copy = undefined;
        this.state = {
            activeTabId: undefined,
            more: false,
        };
    }
    mount() {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const languages = Object.assign({ html: __langHtml, twig: __langTwig, javascript: __langJavascript, js: __langJavascript, php: __langPhp, bash: __langBash, shell: __langBash, css: __langCss, scss: __langCss }, ((_a = this.props.languages) !== null && _a !== void 0 ? _a : {}));
            Object.keys(languages).forEach((lang) => {
                __hljs.registerLanguage(lang, languages[lang]);
            });
            // @ts-ignore
            this.$templates = this.querySelectorAll('template,code');
            for (let [idx, $template] of Object.entries(this.$templates)) {
                if (!$template.getAttribute)
                    return;
                let parser = 'babel';
                switch ((_b = $template.getAttribute('language')) !== null && _b !== void 0 ? _b : $template.getAttribute('id')) {
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
                let formatedCode = rawCode.replace(/\<\!\-\-\?lit\$[a-zA-Z0-9]+\$\-\-\>/gm, '');
                try {
                    formatedCode = yield __prettier.format(formatedCode, {
                        parser,
                        plugins: [
                            __prettierCss,
                            __prettierHtml,
                            __prettierJs,
                            __prettierPhp,
                        ],
                    });
                }
                catch (e) {
                    console.log('prettier error', e);
                }
                this.props.items = [
                    ...this.props.items,
                    {
                        id: (_d = (_c = $template.getAttribute('id')) !== null && _c !== void 0 ? _c : $template.getAttribute('language')) !== null && _d !== void 0 ? _d : 'html',
                        language: (_e = $template.getAttribute('language')) !== null && _e !== void 0 ? _e : 'html',
                        code: formatedCode,
                        highlightedCode: '',
                        lines: formatedCode.trim().split('\n').length,
                    },
                ];
                $template.remove();
            }
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            // active idx
            if (this.props.active) {
                this.setActiveTab(this.props.active);
            }
            else {
                if (this.props.items[0]) {
                    this.setActiveTab(this.props.items[0].id);
                }
            }
            // await __wait(500);
            // this._$content = this.shadowRoot?.querySelector(
            //     '.s-code-example_content',
            // );
            this._$pre = this.querySelector('.s-code-example_code');
            this._$root = this.querySelector('.s-code-example_root');
            return true;
        });
    }
    setActiveTabByTab(e) {
        this.setActiveTab(e.target.id);
    }
    get currentItem() {
        if (!this.state.activeTabId)
            return {};
        return this.props.items.find((i) => i.id === this.state.activeTabId);
    }
    setActiveTab(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __wait();
            this.state.activeTabId = id;
            this.highlight(id);
            this.requestUpdate();
        });
    }
    setMoreClass() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.more) {
                this._$root.classList.add('s-code-example--more');
            }
            else {
                this._$root.classList.remove('s-code-example--more');
            }
        });
    }
    toggleMore() {
        var _a;
        this.state.more = !this.state.more;
        this.setMoreClass();
        __scrollTo(this, Object.assign({}, ((_a = this.props.scrollToSettings) !== null && _a !== void 0 ? _a : {})));
    }
    highlight(id) {
        var _a, _b, _c, _d;
        const $content = this.querySelector(`pre#${id} code`);
        const item = this.props.items.find((i) => i.id === id);
        if ($content.hasAttribute('inited')) {
            this.setMoreClass();
            return;
        }
        $content.setAttribute('inited', 'true');
        let code;
        try {
            const codeToHighlight = (_b = (_a = item.code) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
            code = __hljs.highlight(codeToHighlight, {
                language: item.language,
                ignoreIllegals: true,
            });
        }
        catch (e) {
            console.log('highlight.js error', e);
        }
        // @ts-ignore
        item.highlightedCode = (_d = (_c = code === null || code === void 0 ? void 0 : code.value) !== null && _c !== void 0 ? _c : code) !== null && _d !== void 0 ? _d : '';
        this.setMoreClass();
    }
    copy() {
        const id = this.state.activeTabId;
        const item = this.props.items.filter((i) => i.id === id)[0];
        // @ts-ignore
        this.$copy.copy(item.code);
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        const currentItem = this.currentItem;
        return html `
            <div
                class="${this.utils.cls('_root')} ${this.props.more
            ? this.utils.cls('more')
            : ''}"
                ?lines="${
        // @ts-ignore
        this.props.lines}"
                ?bare="${
        // @ts-ignore
        this.props.bare}"
                toolbar-position="${
        // @ts-ignore
        this.props.toolbarPosition}"
            >
                <div class="templates"></div>

                <header class="${this.utils.cls('_nav')}">
                    <div class="${this.utils.cls('_tabs', 's-tabs')}">
                        ${((_a = this.props.items) !== null && _a !== void 0 ? _a : []).map((item) => {
            var _a;
            return html `
                                <div
                                    id="${(_a = item.id) !== null && _a !== void 0 ? _a : item.language}"
                                    class="${this.utils.cls('_tab')} ${this
                .state.activeTabId === item.id
                ? 'active'
                : ''}"
                                    ?active="${this.state.activeTabId ===
                item.id}"
                                    @click="${this.setActiveTabByTab}"
                                >
                                    ${item.language}
                                </div>
                            `;
        })}
                    </div>
                    ${
        // @ts-ignore
        this.toolbarPosition === 'nav'
            ? html `
                                  <div class="${this.utils.cls('_toolbar')}">
                                      <s-clipboard-copy
                                          @click="${this.copy}"
                                      ></s-clipboard-copy>
                                  </div>
                              `
            : ''}
                </header>
                <div
                    class="${this.utils.cls('_content')}"
                    style="--max-lines: ${(_b = this.props.lines) !== null && _b !== void 0 ? _b : 99999999};"
                >
                    ${
        // @ts-ignore
        this.toolbarPosition !== 'nav'
            ? html `
                                  <div class="${this.utils.cls('_toolbar')}">
                                      <s-clipboard-copy
                                          @click="${this.copy}"
                                      ></s-clipboard-copy>
                                  </div>
                              `
            : ''}
                    ${((_c = this.props.items) !== null && _c !== void 0 ? _c : []).map((item) => {
            var _a, _b, _c, _d;
            return html `
                            <pre
                                class="${this.utils.cls('_code')}"
                                style="line-height:0;"
                                id="${(_a = item.id) !== null && _a !== void 0 ? _a : item.language}"
                                ?active="${this.state.activeTabId ===
                ((_b = item.id) !== null && _b !== void 0 ? _b : item.language)}"
                            >
                            <code language="${(_c = item.language) !== null && _c !== void 0 ? _c : item.id}" class="language-${item.language} ${item.language} ${this
                .props.bare
                ? ''
                : 'hljs'}"
                                .innerHTML=${(_d = item.highlightedCode) !== null && _d !== void 0 ? _d : ''}></code>
                        </pre>
                        `;
        })}
                    ${this.props.more &&
            this.props.lines &&
            currentItem.lines > this.props.lines
            ? html `
                        <div class="${this.utils.cls('_more-bar')}">
                            ${
            // @ts-ignore
            this.moreAction === 'toggle'
                ? html `
                                          <button
                                              class="${this.utils.cls('_more-button', 's-btn')}"
                                              aria-label="${this.state.more
                    ? 'Show less'
                    : 'Show more'}"
                                              @click="${() => this.toggleMore()}"
                                          >
                                              ${
                // @ts-ignore
                this.state.more
                    ? html `
                                                            ${(_d = this.props
                        .lessLabel) !== null && _d !== void 0 ? _d : 'Show less'}
                                                        `
                    : html `
                                                            ${(_e = this.props
                        .moreLabel) !== null && _e !== void 0 ? _e : 'Show more'}
                                                        `}
                                          </button>
                                      `
                : html `
                                          <a
                                              class="${this.utils.cls('_more-button', 's-btn s-color--accent')}"
                                              href="${
                // @ts-ignore
                this.moreAction}"
                                              title="${this.state.more
                    ? 'Show less'
                    : 'Show more'}"
                                          >
                                              ${
                // @ts-ignore
                this.state.more
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
    query('s-clipboard-copy')
], SCodeExample.prototype, "$copy", void 0);
__decorate([
    query('.templates')
], SCodeExample.prototype, "$templatesContainer", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sTUFBTSxNQUFNLHVCQUF1QixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pELE9BQU8sVUFBVSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pELE9BQU8sU0FBUyxNQUFNLG9CQUFvQixDQUFDO0FBRzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRSxPQUFPLGdCQUFnQixNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sU0FBUyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZELE9BQU8sVUFBVSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFMUMsT0FBTyxnQ0FBZ0MsTUFBTSwrQ0FBK0MsQ0FBQztBQUU3RixnQkFBZ0I7QUFDaEIsT0FBTyxVQUFVLE1BQU0sNkJBQTZCLENBQUM7QUFDckQsYUFBYTtBQUNiLE9BQU8sWUFBWSxNQUFNLCtCQUErQixDQUFDO0FBQ3pELGFBQWE7QUFDYixPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxhQUFhO0FBQ2IsT0FBTyxhQUFh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