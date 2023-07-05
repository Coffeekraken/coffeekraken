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
import { __define as __SClipboardCopy } from '@coffeekraken/s-clipboard-copy-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __hljs from 'highlight.js/lib/core';
import __langBash from 'highlight.js/lib/languages/bash';
import __langTwig from 'highlight.js/lib/languages/twig';
import __langCss from './languages/css';
import { __scrollTo } from '@coffeekraken/sugar/dom';
import { __decodeHtmlEntities } from '@coffeekraken/sugar/string';
import __langJavascript from 'highlight.js/lib/languages/javascript';
import __langPhp from 'highlight.js/lib/languages/php';
import __langHtml from 'highlight.js/lib/languages/xml';
import { css, html, unsafeCSS } from 'lit';
import { query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface';
// // // @ts-ignore
// import __prettier from 'prettier/esm/standalone.mjs';
// // @ts-ignore
// import __prettierJs from 'prettier/esm/parser-babel.mjs';
// // @ts-ignore
// import __prettierHtml from 'prettier/esm/parser-html.mjs';
// // @ts-ignore
// import __prettierPhp from '@prettier/plugin-php/standalone';
// import __prettierCss from 'prettier/esm/parser-postcss.mjs';
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
 * import { __define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
 * __SCodeExampleComponentDefine();
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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const languages = Object.assign({ html: __langHtml, twig: __langTwig, javascript: __langJavascript, js: __langJavascript, php: __langPhp, bash: __langBash, shell: __langBash, css: __langCss, scss: __langCss }, ((_a = this.props.languages) !== null && _a !== void 0 ? _a : {}));
            Object.keys(languages).forEach((lang) => {
                __hljs.registerLanguage(lang, languages[lang]);
            });
            // @ts-ignore
            this.$templates = this.querySelectorAll('template,code');
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
                    // formatedCode = __prettier.format(rawCode, {
                    //     parser,
                    //     plugins: [
                    //         __prettierCss,
                    //         __prettierHtml,
                    //         __prettierJs,
                    //         __prettierPhp,
                    //     ],
                    // });
                }
                catch (e) { }
                this.props.items = [
                    ...this.props.items,
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
        var _a;
        const $content = this.querySelector(`pre#${id} code`);
        const item = this.props.items.find((i) => i.id === id);
        if ($content.hasAttribute('inited')) {
            this.setMoreClass();
            return;
        }
        $content.setAttribute('inited', 'true');
        let code;
        try {
            const codeToHighlight = __decodeHtmlEntities($content.innerHTML.replace(/(<|&lt;)!\s?--\?lit.*--\s?(>|&gt;)/, ''));
            code = __hljs.highlight(codeToHighlight, {
                language: $content.getAttribute('lang'),
            });
        }
        catch (e) {
            console.log(e);
        }
        // @ts-ignore
        item.highlightedCode = (_a = code === null || code === void 0 ? void 0 : code.value) !== null && _a !== void 0 ? _a : '';
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
                        ${((_a = this.props.items) !== null && _a !== void 0 ? _a : []).map((item) => html `
                                <div
                                    class="${this.utils.cls('_tab')} ${this
            .state.activeTabId === item.id
            ? 'active'
            : ''}"
                                    ?active="${this.state.activeTabId ===
            item.id}"
                                    @click="${this.setActiveTabByTab}"
                                >
                                    ${item.lang}
                                </div>
                            `)}
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
            var _a, _b, _c;
            return html `
                            <pre
                                class="${this.utils.cls('_code')}"
                                style="line-height:0;"
                                id="${(_a = item.id) !== null && _a !== void 0 ? _a : item.lang}"
                                ?active="${this.state.activeTabId ===
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
                    ${this.props.lines && currentItem.lines > this.props.lines
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLElBQUksZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sTUFBTSxNQUFNLHVCQUF1QixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pELE9BQU8sVUFBVSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pELE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDO0FBR3hDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRSxPQUFPLGdCQUFnQixNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sU0FBUyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZELE9BQU8sVUFBVSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFFMUYsbUJBQW1CO0FBQ25CLHdEQUF3RDtBQUN4RCxnQkFBZ0I7QUFDaEIsNERBQTREO0FBQzVELGdCQUFnQjtBQUNoQiw2REFBNkQ7QUFDN0QsZ0JBQWdCO0FBQ2hCLCtEQUErRDtBQUMvRCwrREFB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