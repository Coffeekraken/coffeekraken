"use strict";
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
const lit_1 = require("lit");
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const dom_1 = require("@coffeekraken/sugar/dom");
const editorjs_1 = __importDefault(require("@editorjs/editorjs"));
class SSpecsEditorComponentWysiwygWidget {
    static isActive() {
        return true;
    }
    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
        (0, dom_1.__querySelectorLive)('.ce-block__content', ($elm) => {
            $elm.classList.add('s-rhythm', 's-rhythm--vertical');
        });
    }
    firstUpdated() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const tools = {};
            if (this._propObj.frontspec) {
                this._frontspec = new s_frontspec_1.default();
                for (let [typo, typoObj] of Object.entries((_a = this._frontspec.get('typo')) !== null && _a !== void 0 ? _a : {})) {
                    tools[typo] = {
                        inlineToolbar: true,
                        class: this._createEditorJsBlockClass(typo, typoObj),
                    };
                }
            }
            this._editorJs = new editorjs_1.default({
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
                        dom_1.__htmlTagToHtmlClassMap[typo] !== undefined
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
                        const style = s_theme_1.default.jsObjectToCssProperties((_e = (_d = typoObj.button) === null || _d === void 0 ? void 0 : _d.style) !== null && _e !== void 0 ? _e : {});
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
                    const isTypoATag = dom_1.__htmlTagToHtmlClassMap[typo] !== undefined;
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
            html: (0, lit_1.html) `
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
exports.default = SSpecsEditorComponentWysiwygWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkJBQTJCO0FBRTNCLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFJN0MsaURBR2lDO0FBRWpDLGtFQUE0QztBQUU1QyxNQUFxQixrQ0FBa0M7SUFVbkQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUEseUJBQW1CLEVBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFSyxZQUFZOzs7WUFDZCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7WUFFakIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQztnQkFFckMsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ3RDLE1BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLG1DQUFJLEVBQUUsQ0FDcEMsRUFBRTtvQkFDQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUc7d0JBQ1YsYUFBYSxFQUFFLElBQUk7d0JBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMseUJBQXlCLENB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