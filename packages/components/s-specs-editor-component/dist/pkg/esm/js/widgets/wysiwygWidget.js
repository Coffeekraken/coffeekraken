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
                tools,
            });
            yield this._editorJs.isReady;
        });
    }
    _createEditorJsBlockClass(typo, typoObj) {
        var _a;
        if (((_a = typoObj.style) === null || _a === void 0 ? void 0 : _a.display) === 'block') {
            return class EditorJsBlockClass {
                static get toolbox() {
                    return {
                        title: typo,
                        //   icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
                    };
                }
                constructor() {
                    this._tag = 'span';
                    this._tag =
                        __htmlTagToHtmlClassMap[typo] !== undefined
                            ? typo
                            : 'span';
                }
                render() {
                    const $input = document.createElement('input');
                    $input.classList.add(`s-typo`, `s-typo--${typo}`, typo);
                    return $input;
                }
                save(blockContent) {
                    return {
                        value: blockContent.value,
                    };
                }
            };
        }
        else {
            return class EditorJsInlineClass {
                static get isInline() {
                    return true;
                }
                save(blockContent) {
                    return {
                        value: blockContent.value,
                    };
                }
                render() {
                    var _a, _b, _c, _d, _e;
                    const $button = document.createElement('button');
                    $button.type = 'button';
                    if (typoObj.type === 'color') {
                        $button.classList.add('_color');
                        $button.style.backgroundColor =
                            (_a = typoObj.style.backgroundImage) !== null && _a !== void 0 ? _a : typoObj.style.color;
                    }
                    else {
                        const label = (_c = (_b = typoObj.button) === null || _b === void 0 ? void 0 : _b.label) !== null && _c !== void 0 ? _c : typo;
                        if (label.match(/^\<[a-zA-Z0-9]/)) {
                            $button.innerHTML = label;
                        }
                        else {
                            $button.textContent = label;
                        }
                        const style = __STheme.jsObjectToCssProperties((_e = (_d = typoObj.button) === null || _d === void 0 ? void 0 : _d.style) !== null && _e !== void 0 ? _e : {});
                        $button.style = style;
                    }
                    return $button;
                }
                surround(range) {
                    if (this.state) {
                        // If highlights is already applied, do nothing for now
                        return;
                    }
                    const selectedText = range.extractContents();
                    const isTypoATag = __htmlTagToHtmlClassMap[typo] !== undefined;
                    _console.log('a', typo, isTypoATag);
                    // Create MARK element
                    const $tag = document.createElement('span');
                    $tag.classList.add(`s-typo`, `s-typo--${typo}`);
                    // Append to the MARK element selected TextNode
                    $tag.appendChild(selectedText);
                    // Insert new element
                    range.insertNode($tag);
                }
                checkState(selection) {
                    const text = selection.anchorNode;
                    if (!text) {
                        return;
                    }
                    const anchorElement = text instanceof Element ? text : text.parentElement;
                    this.state = !!anchorElement.closest('MARK');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFJN0MsT0FBTyxFQUNILHVCQUF1QixFQUN2QixtQkFBbUIsR0FDdEIsTUFBTSx5QkFBeUIsQ0FBQztBQUVqQyxPQUFPLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QyxNQUFNLENBQUMsT0FBTyxPQUFPLGtDQUFrQztJQVVuRCxNQUFNLENBQUMsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsbUJBQW1CLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFSyxZQUFZOzs7WUFDZCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7WUFFakIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO2dCQUVyQyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDdEMsTUFBQSxJQUFJLENBQUMsVUFB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