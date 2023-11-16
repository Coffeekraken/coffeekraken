// @ts-nocheck
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
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SWysiwygComponentInterface from './interface/SWysiwygComponentInterface.js';
import { __i18n } from '@coffeekraken/s-i18n';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __STheme from '@coffeekraken/s-theme';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import { __htmlTagToHtmlClassMap } from '@coffeekraken/sugar/dom';
import __EditorJS from '@editorjs/editorjs';
// @ts-ignore
import __css from '../../../../src/css/s-wysiwyg-component.css'; // relative to /dist/pkg/esm/js
export default class SWysiwygComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SWysiwygComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }
    constructor() {
        super(__deepMerge({
            name: 's-wysiwyg',
            interface: __SWysiwygComponentInterface,
        }));
        __querySelectorLive('.ce-block__content', ($elm) => {
            $elm.classList.add('s-rhythm', 's-rhythm--vertical');
        }, {
            rootNode: this,
        });
    }
    firstUpdated() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const tools = {};
            let defaultBlock;
            if (this.props.frontspec) {
                this._frontspec = new __SFrontspec();
                for (let [typo, typoObj] of Object.entries((_a = this._frontspec.get('typo')) !== null && _a !== void 0 ? _a : {})) {
                    tools[typo] = {
                        inlineToolbar: true,
                        class: this._createEditorJsBlockClass(typo, typoObj),
                    };
                    // default tool
                    if (typoObj.default) {
                        defaultBlock = typo;
                    }
                }
            }
            this._$editor = this.querySelector(`.${this.utils.cls('_editor')}`);
            let _isFirstChange = true;
            this._editorJs = new __EditorJS({
                holder: this._$editor,
                onChange: (api, event) => __awaiter(this, void 0, void 0, function* () {
                    // avoid first change event
                    if (_isFirstChange) {
                        _isFirstChange = false;
                        return;
                    }
                    const result = yield this._editorJs.save();
                    const finalData = {
                        type: 'root',
                        nodes: [],
                    };
                    result.blocks.forEach((block) => {
                        finalData.nodes.push(block.data.data);
                    });
                    // dispatch the change event
                    this.utils.dispatchEvent('change', {
                        bubbles: true,
                        detail: {
                            value: finalData,
                        },
                    });
                }),
                // @ts-ignore
                logLevel: 'ERROR',
                tools,
                defaultBlock,
            });
            yield this._editorJs.isReady;
            this._$add = this._$editor.querySelector('.ce-toolbar__plus');
        });
    }
    _createEditorJsBlockClass(typo, typoObj) {
        var _a;
        const _this = this;
        if (((_a = typoObj.style) === null || _a === void 0 ? void 0 : _a.display) === 'block') {
            return class EditorJsBlockClass {
                static get isInline() {
                    return false;
                }
                static get toolbox() {
                    return {
                        title: typo,
                        //   icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
                    };
                }
                constructor({ api }) {
                    this._isTypoTag = false;
                    this._tag = 'SPAN';
                    this.api = api;
                    this._isTypoTag =
                        __htmlTagToHtmlClassMap[typo] !== undefined;
                    this._tag = this._isTypoTag
                        ? typo.toUpperCase()
                        : this._tag;
                }
                render() {
                    const $div = document.createElement(this._tag);
                    // @ts-ignore
                    $div.contentEditable = true;
                    $div.innerHTML = '';
                    $div.setAttribute('wysiwyg-typo', typo);
                    $div.setAttribute('placeholder', __i18n('Enter / to start...', {
                        id: 's-wysiwyg.start',
                    }));
                    $div.addEventListener('keyup', (e) => {
                        var _a, _b;
                        if (e.target.innerText.trim() === '/') {
                            e.target.innerText = '';
                            _this._$add.click();
                        }
                        else {
                            const $active = document.activeElement;
                            (_a = $active === null || $active === void 0 ? void 0 : $active.blur) === null || _a === void 0 ? void 0 : _a.call($active);
                            (_b = $active === null || $active === void 0 ? void 0 : $active.focus) === null || _b === void 0 ? void 0 : _b.call($active);
                        }
                    });
                    $div.classList.add('s-typo', `s-typo--${typo}`);
                    return $div;
                }
                save(blockContent) {
                    const data = {
                        type: typo,
                        block: true,
                        nodes: [],
                    };
                    let currentData = data;
                    function traverseTree($from) {
                        Array.from($from.childNodes).forEach(($node) => {
                            if ($node.nodeType === Node.TEXT_NODE) {
                                currentData.nodes.push({
                                    type: 'text',
                                    text: $node.data,
                                });
                            }
                            else if ($node.tagName === 'BR') {
                                currentData.nodes.push({
                                    type: 'br',
                                });
                            }
                            else {
                                const newNode = {
                                    type: $node.getAttribute('wysiwyg-type'),
                                    nodes: [],
                                };
                                const oldData = currentData;
                                currentData.nodes.push(newNode);
                                currentData = newNode;
                                traverseTree($node);
                                currentData = oldData;
                            }
                        });
                    }
                    traverseTree(blockContent);
                    return {
                        data,
                    };
                }
            };
        }
        else {
            return class EditorJsInlineClass {
                static get isInline() {
                    return true;
                }
                constructor({ api }) {
                    this._isTypoTag = false;
                    this._tag = 'SPAN';
                    this.state = false;
                    this.api = api;
                    this._isTypoTag =
                        __htmlTagToHtmlClassMap[typo] !== undefined;
                    this._tag = this._isTypoTag
                        ? typo.toUpperCase()
                        : this._tag;
                }
                render() {
                    var _a, _b, _c, _d;
                    const $button = document.createElement('button');
                    $button.type = 'button';
                    this._$button = $button;
                    if (typoObj.type === 'color') {
                        $button.classList.add('_color');
                        $button.textContent = 'Ab';
                        $button.classList.add('s-typo', `s-typo--${typo}`);
                        $button.style.setProperty('--s-wysiwyg-color', typoObj.style.color);
                        $button.style.fontWeight = 'bold';
                    }
                    else {
                        const label = (_b = (_a = typoObj.button) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : typo;
                        if (label.match(/^\<[a-zA-Z0-9]/)) {
                            $button.innerHTML = label;
                        }
                        else {
                            $button.textContent = label;
                        }
                        const style = __STheme.current.jsObjectToCssProperties((_d = (_c = typoObj.button) === null || _c === void 0 ? void 0 : _c.style) !== null && _d !== void 0 ? _d : {});
                        $button.style = style;
                    }
                    return $button;
                }
                surround(range) {
                    var _a;
                    const selectedText = range.extractContents();
                    const text = (_a = this._selection) === null || _a === void 0 ? void 0 : _a.anchorNode, $encloser = text instanceof Element ? text : text.parentElement;
                    const $wrapper = $encloser.closest(`[wysiwyg-type="${typo}"]`);
                    if ($wrapper) {
                        $wrapper.parentNode.removeChild($wrapper);
                        range.insertNode(selectedText);
                    }
                    else {
                        const mark = document.createElement(this._tag);
                        mark.classList.add('s-typo', `s-typo--${typo}`);
                        mark.setAttribute('wysiwyg-type', typo);
                        mark.appendChild(selectedText);
                        range.insertNode(mark);
                        this.api.selection.expandToTag(mark);
                    }
                }
                checkState(selection) {
                    var _a, _b;
                    this._selection = selection;
                    const text = selection.anchorNode;
                    if (!text) {
                        return;
                    }
                    const $encloser = text instanceof Element ? text : text.parentElement;
                    this.state = !!$encloser.closest(`[wysiwyg-type="${typo}"]`);
                    if (this.state) {
                        (_a = this._$button) === null || _a === void 0 ? void 0 : _a.classList.add('active');
                    }
                    else {
                        (_b = this._$button) === null || _b === void 0 ? void 0 : _b.classList.remove('active');
                    }
                }
            };
        }
    }
    render() {
        return html ` <div class="${this.utils.cls('_editor')}"></div> `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBRU4sTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sNEJBQTRCLE1BQU0sMkNBQTJDLENBQUM7QUFJckYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWxFLE9BQU8sVUFBVSxNQUFNLG9CQUFvQixDQUFDO0FBRTVDLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSw2Q0FBNkMsQ0FBQyxDQUFDLCtCQUErQjtBQThDaEcsTUFBTSxDQUFDLE9BQU8sT0FBTyxpQkFBa0IsU0FBUSxlQUFlO0lBQzFELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsNEJBQTRCLENBQy9CLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQztrQkFDTixLQUFLO2FBQ1YsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBT0Q7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLFdBQVc7WUFDakIsU0FBUyxFQUFFLDRCQUE0QjtTQUMxQyxDQUFDLENBQ0wsQ0FBQztR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