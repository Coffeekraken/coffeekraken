var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { html } from 'lit';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __STheme from '@coffeekraken/s-theme';
import { __htmlTagToHtmlClassMap, __querySelectorLive, } from '@coffeekraken/sugar/dom';
import __EditorJS from '@editorjs/editorjs';
export default class SSpecsEditorComponentWysiwygWidget {
    static isActive() {
        return true;
    }
    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
        __querySelectorLive('.ce-block__content', ($elm) => {
            $elm.classList.add('s-rhythm', 's-rhythm--vertical');
        });
        __querySelectorLive('.ce-block__content textarea', ($textarea) => {
            $textarea.addEventListener('keyup', (e) => { });
        });
    }
    firstUpdated() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const tools = {};
            if (this._propObj.frontspec) {
                this._frontspec = new __SFrontspec();
                for (let [typo, typoObj] of Object.entries((_a = this._frontspec.get('typo')) !== null && _a !== void 0 ? _a : {})) {
                    tools[typo] = {
                        inlineToolbar: true,
                        class: this._createEditorJsBlockClass(typo, typoObj),
                    };
                }
            }
            this._editorJs = new __EditorJS({
                holder: `editor-js-${this._path.join('-')}`,
                onChange: (api, event) => __awaiter(this, void 0, void 0, function* () {
                    const result = yield this._editorJs.save();
                    _console.log('SAVED', result);
                    // const result = await api.saver.save();
                    // _console.log('SAVC', result);
                }),
                tools,
            });
            yield this._editorJs.isReady;
        });
    }
    _createEditorJsBlockClass(typo, typoObj) {
        var _a;
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
                    this.state = false;
                    this.api = api;
                    this._isTypoTag =
                        __htmlTagToHtmlClassMap[typo] !== undefined;
                    this._tag = this._isTypoTag
                        ? typo.toUpperCase()
                        : this._tag;
                }
                render() {
                    const $div = document.createElement(this._tag);
                    $div.contentEditable = true;
                    $div.innerHTML = '';
                    $div.setAttribute('wysiwyg-typo', typo);
                    $div.classList.add('s-typo', `s-typo--${typo}`);
                    return $div;
                    // return this.wrapper;
                    // const $input = document.createElement('input');
                    // $input.classList.add(`s-typo`, `s-typo--${typo}`, typo);
                    // // __autoResize($input);
                    // return $input;
                }
                save(blockContent) {
                    Array.from(blockContent.children).forEach(($child) => {
                        _console.log('Chilf', $child);
                    });
                    return {
                        value: blockContent,
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
                // save(blockContent) {
                //     _console.log('COntent', blockContent);
                //     return {
                //         value: blockContent.value,
                //     };
                // }
                render() {
                    var _a, _b, _c, _d;
                    const $button = document.createElement('button');
                    $button.type = 'button';
                    if (typoObj.type === 'color') {
                        $button.classList.add('_color');
                        $button.textContent = 'Ab';
                        $button.classList.add('s-typo', `s-typo--${typo}`);
                        $button.style.setProperty('--s-wysiwyg-color', typoObj.style.color);
                        $button.style.fontWeight = 'bold';
                        // $button.style.color =
                        //     typoObj.style.backgroundImage ??
                        //     typoObj.style.color;
                    }
                    else {
                        const label = (_b = (_a = typoObj.button) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : typo;
                        if (label.match(/^\<[a-zA-Z0-9]/)) {
                            $button.innerHTML = label;
                        }
                        else {
                            $button.textContent = label;
                        }
                        const style = __STheme.jsObjectToCssProperties((_d = (_c = typoObj.button) === null || _c === void 0 ? void 0 : _c.style) !== null && _d !== void 0 ? _d : {});
                        $button.style = style;
                    }
                    return $button;
                }
                surround(range) {
                    if (!range) {
                        return;
                    }
                    let termWrapper = this.api.selection.findParentTag(this._tag);
                    _console.log('Wrapper', termWrapper);
                    if (termWrapper) {
                        this.unwrap(termWrapper);
                    }
                    else {
                        this.wrap(range);
                    }
                }
                wrap(range) {
                    let span = document.createElement(this._tag);
                    span.classList.add('s-typo', `s-typo--${typo}`);
                    span.appendChild(range.extractContents());
                    range.insertNode(span);
                    this.api.selection.expandToTag(span);
                }
                unwrap(termWrapper) {
                    this.api.selection.expandToTag(termWrapper);
                    let sel = window.getSelection();
                    let range = sel.getRangeAt(0);
                    let unwrappedContent = range.extractContents();
                    termWrapper.parentNode.removeChild(termWrapper);
                    range.insertNode(unwrappedContent);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
                /**
                 * Check and change Term's state for current selection
                 */
                checkState() {
                    _console.log('Check', typo);
                    const termTag = this.api.selection.findParentTag(this._tag);
                    this.state = !!termTag;
                    // this.button.classList.toggle(this.iconClasses.active, !!termTag);
                }
            };
        }
    }
    render({ propObj, values, path }) {
        if (!values) {
            values = {
                value: propObj.default,
            };
        }
        return {
            error: this._error,
            warning: this._warning,
            html: html `
                <div class="${this._component.utils.cls('_wysiwyg-widget')}">
                    <label
                        class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                    >
                        ${this._component.renderLabel(propObj, path)}
                    </label>
                    <div class="_editor" id="editor-js-${path.join('-')}"></div>
                </div>
            `,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFJN0MsT0FBTyxFQUNILHVCQUF1QixFQUN2QixtQkFBbUIsR0FDdEIsTUFBTSx5QkFBeUIsQ0FBQztBQUVqQyxPQUFPLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QyxNQUFNLENBQUMsT0FBTyxPQUFPLGtDQUFrQztJQVVuRCxNQUFNLENBQUMsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsbUJBQW1CLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztRQUVILG1CQUFtQixDQUFDLDZCQUE2QixFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDN0QsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUssWUFBWTs7O1lBQ2QsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBRWpCLElBQUksSUFBSSxDQUFDLFFBQVEs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