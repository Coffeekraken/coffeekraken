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
        (0, dom_1.__querySelectorLive)('.ce-block__content textarea', ($textarea) => {
            $textarea.addEventListener('keyup', (e) => { });
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
                        dom_1.__htmlTagToHtmlClassMap[typo] !== undefined;
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
                        dom_1.__htmlTagToHtmlClassMap[typo] !== undefined;
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
                        const style = s_theme_1.default.jsObjectToCssProperties((_d = (_c = typoObj.button) === null || _c === void 0 ? void 0 : _c.style) !== null && _d !== void 0 ? _d : {});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkJBQTJCO0FBRTNCLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFJN0MsaURBR2lDO0FBRWpDLGtFQUE0QztBQUU1QyxNQUFxQixrQ0FBa0M7SUFVbkQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUEseUJBQW1CLEVBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUEseUJBQW1CLEVBQUMsNkJBQTZCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM3RCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFSyxZQUFZOzs7WUFDZCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7WUFFakIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQztnQkFFckMsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ3RDLE1BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLG1DQUFJLEVBQUUsQ0FDcEMsRUFBRTtvQkFDQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUc7d0JBQ1YsYUFBYSxFQUFFLElBQUk7d0JBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztxQkFDdkQsQ0FBQztpQkFDTDthQUNKO1lBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGtCQUFVLENBQUM7Z0JBQzVCLE1BQU0sRUFBRSxhQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQyxRQUFRLEVBQUUsQ0FBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQzNCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDM0MsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzlCLHlDQUF5QztvQkFDekMsZ0NBQWdDO2dCQUNwQyxDQUFDLENBQUE7Z0JBQ0QsS0FBSzthQUNSLENBQUMsQ0FBQztZQUNILE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7O0tBQ2hDO0lBRUQseUJBQXlCLENBQUMsSUFBWSxFQUFFLE9BQVk7O1FBQ2hELElBQUksQ0FBQSxNQUFBLE9BQU8sQ0FBQyxLQUFLLDBDQUFFLE9BQU8sTUFBSyxPQUFPLEVBQUU7WUFDcEMsT0FBTyxNQUFNLGtCQUFrQjtnQkFDM0IsTUFBTSxLQUFLLFFBQVE7b0JBQ2YsT0FBTyxLQUFLLENBQUM7Z0JBQ2pCLENBQUM7Z0JBRUQsTUFBTSxLQUFLLE9BQU87b0JBQ2QsT0FBTzt3QkFDSCxLQUFLLEVBQUUsSUFBSTt3QkFDWCxnV0FBZ1c7cUJBQ25XLENBQUM7Z0JBQ04sQ0FBQztnQkFRRCxZQUFZLEVBQUUsR0FBRyxFQUFFO29CQU5uQixlQUFVLEdBQUcsS0FBSyxDQUFDO29CQUNuQixTQUFJLEdBQUcsTUFBTSxDQUFDO29CQUVkLFVBQUssR0FBRyxLQUFLLENBQUM7b0JBSVYsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7b0JBQ2YsSUFBSSxDQUFDLFVBQVU7d0JBQ1gsNkJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxDQUFDO29CQUNoRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVO3dCQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3BCLENBQUM7Z0JBRUQsTUFBTTtvQkFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7b0JBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO29CQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDaEQsT0FBTyxJQUFJLENBQUM7b0JBRVosdUJBQXVCO29CQUV2QixrREFBa0Q7b0JBQ2xELDJEQUEyRDtvQkFDM0QsMkJBQTJCO29CQUMzQixpQkFBaUI7Z0JBQ3JCLENBQUM7Z0JBRUQsSUFBSSxDQUFDLFlBQVk7b0JBQ2IsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7d0JBQ2pELFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNsQyxDQUFDLENBQUMsQ0FBQztvQkFFSCxPQUFPO3dCQUNILEtBQUssRUFBRSxZQUFZO3FCQUN0QixDQUFDO2dCQUNOLENBQUM7YUFDSixDQUFDO1NBQ0w7YUFBTTtZQUNILE9BQU8sTUFBTSxtQkFBbUI7Z0JBQzVCLE1BQU0sS0FBSyxRQUFRO29CQUNmLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQVFELFlBQVksRUFBRSxHQUFHLEVBQUU7b0JBTm5CLGVBQVUsR0FBRyxLQUFLLENBQUM7b0JBQ25CLFNBQUksR0FBRyxNQUFNLENBQUM7b0JBRWQsVUFBSyxHQUFHLEtBQUssQ0FBQztvQkFJVixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztvQkFDZixJQUFJLENBQUMsVUFBVTt3QkFDWCw2QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLENBQUM7b0JBQ2hELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVU7d0JBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO3dCQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDcEIsQ0FBQztnQkFFRCx1QkFBdUI7Z0JBQ3ZCLDZDQUE2QztnQkFDN0MsZUFBZTtnQkFDZixxQ0FBcUM7Z0JBQ3JDLFNBQVM7Z0JBQ1QsSUFBSTtnQkFFSixNQUFNOztvQkFDRixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNqRCxPQUFPLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztvQkFFeEIsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTt3QkFDMUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ2hDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO3dCQUMzQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUNuRCxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FDckIsbUJBQW1CLEVBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUN0QixDQUFDO3dCQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQzt3QkFDbEMsd0JBQXdCO3dCQUN4Qix1Q0FBdUM7d0JBQ3ZDLDJCQUEyQjtxQkFDOUI7eUJBQU07d0JBQ0gsTUFBTSxLQUFLLEdBQUcsTUFBQSxNQUFBLE9BQU8sQ0FBQyxNQUFNLDBDQUFFLEtBQUssbUNBQUksSUFBSSxDQUFDO3dCQUM1QyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRTs0QkFDL0IsT0FBTyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7eUJBQzdCOzZCQUFNOzRCQUNILE9BQU8sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO3lCQUMvQjt3QkFDRCxNQUFNLEtBQUssR0FBRyxpQkFBUSxDQUFDLHVCQUF1QixDQUMxQyxNQUFBLE1BQUEsT0FBTyxDQUFDLE1BQU0sMENBQUUsS0FBSyxtQ0FBSSxFQUFFLENBQzlCLENBQUM7d0JBQ0YsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7cUJBQ3pCO29CQUVELE9BQU8sT0FBTyxDQUFDO2dCQUNuQixDQUFDO2dCQUVELFFBQVEsQ0FBQyxLQUFLO29CQUNWLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsT0FBTztxQkFDVjtvQkFFRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQzlDLElBQUksQ0FBQyxJQUFJLENBQ1osQ0FBQztvQkFFRixRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFFckMsSUFBSSxXQUFXLEVBQUU7d0JBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDNUI7eUJBQU07d0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDcEI7Z0JBQ0wsQ0FBQztnQkFFRCxJQUFJLENBQUMsS0FBSztvQkFDTixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztvQkFDMUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO2dCQUVELE1BQU0sQ0FBQyxXQUFXO29CQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFFNUMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNoQyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUU5QixJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFFL0MsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBRWhELEtBQUssQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFFbkMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN0QixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QixDQUFDO2dCQUVEOzttQkFFRztnQkFDSCxVQUFVO29CQUNOLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUU1QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUU1RCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBRXZCLG9FQUFvRTtnQkFDeEUsQ0FBQzthQUNKLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtRQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFrQjtnQkFDcEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2FBQ3pCLENBQUM7U0FDTDtRQUVELE9BQU87WUFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFBLFVBQUksRUFBQTs4QkFDUSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7O2lDQUV6QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OzBCQUVDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7O3lEQUVYLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzthQUUxRDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUEvUEQscURBK1BDIn0=