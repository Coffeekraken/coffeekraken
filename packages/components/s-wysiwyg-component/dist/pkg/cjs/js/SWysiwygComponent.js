"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
const SWysiwygComponentInterface_1 = __importDefault(require("./interface/SWysiwygComponentInterface"));
const s_i18n_1 = require("@coffeekraken/s-i18n");
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const dom_1 = require("@coffeekraken/sugar/dom");
const dom_2 = require("@coffeekraken/sugar/dom");
const editorjs_1 = __importDefault(require("@editorjs/editorjs"));
// @ts-ignore
const s_wysiwyg_component_css_1 = __importDefault(require("../../../../src/css/s-wysiwyg-component.css")); // relative to /dist/pkg/esm/js
class SWysiwygComponent extends s_lit_component_1.default {
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SWysiwygComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(`
                ${s_wysiwyg_component_css_1.default}
            `)}
        `;
    }
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-wysiwyg',
            interface: SWysiwygComponentInterface_1.default,
        }));
        (0, dom_1.__querySelectorLive)('.ce-block__content', ($elm) => {
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
                this._frontspec = new s_frontspec_1.default();
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
            this._editorJs = new editorjs_1.default({
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
                        dom_2.__htmlTagToHtmlClassMap[typo] !== undefined;
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
                    $div.setAttribute('placeholder', (0, s_i18n_1.__i18n)('Enter / to start...', {
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
                        dom_2.__htmlTagToHtmlClassMap[typo] !== undefined;
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
                        const style = s_theme_1.default.jsObjectToCssProperties((_d = (_c = typoObj.button) === null || _c === void 0 ? void 0 : _c.style) !== null && _d !== void 0 ? _d : {});
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
        return (0, lit_1.html) ` <div class="${this.utils.cls('_editor')}"></div> `;
    }
}
exports.default = SWysiwygComponent;
/**
 * @name            webcomponent
 * @type            Function
 *
 * This function allows you to define (register) your webcomponent with some default
 * props if needed.
 *
 * @param           {any}           [props={}]              Some default props you want to set for your webcomponent
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function define(props = {}, tagName = 's-wysiwyg') {
    s_lit_component_1.default.define(tagName, SWysiwygComponent, props);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFFdUM7QUFDdkMsdURBQXlEO0FBQ3pELDZCQUEyQztBQUMzQyx3R0FBa0Y7QUFJbEYsaURBQThDO0FBRTlDLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsaURBQThEO0FBRTlELGlEQUFrRTtBQUVsRSxrRUFBNEM7QUFFNUMsYUFBYTtBQUNiLDBHQUFnRSxDQUFDLCtCQUErQjtBQThDaEcsTUFBcUIsaUJBQWtCLFNBQVEseUJBQWU7SUFDMUQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0Ysb0NBQTRCLENBQy9CLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLElBQUEsU0FBRyxFQUFBO2NBQ0osSUFBQSxlQUFTLEVBQUM7a0JBQ04saUNBQUs7YUFDVixDQUFDO1NBQ0wsQ0FBQztJQUNOLENBQUM7SUFPRDtRQUNJLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQUM7WUFDUixJQUFJLEVBQUUsV0FBVztZQUNqQixTQUFTLEVBQUUsb0NBQTRCO1NBQzFDLENBQUMsQ0FDTCxDQUFDO1FBRUYsSUFBQSx5QkFBbUIsRUFDZixvQkFBb0IsRUFDcEIsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3pELENBQUMsRUFDRDtZQUNJLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFDSyxZQUFZOzs7WUFDZCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7WUFFakIsSUFBSSxZQUFZLENBQUM7WUFFakIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtn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