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
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const dom_1 = require("@coffeekraken/sugar/dom");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
const SDropzoneComponentInterface_1 = __importDefault(require("./interface/SDropzoneComponentInterface"));
// @ts-ignore
const s_dropzone_css_1 = __importDefault(require("../../../../src/css/s-dropzone.css")); // relative to /dist/pkg/esm/js
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
class SDropzoneComponent extends s_lit_component_1.default {
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-dropzone',
            interface: SDropzoneComponentInterface_1.default,
        }));
        this.state = {
            files: [],
        };
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SDropzoneComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_dropzone_css_1.default)}
        `;
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            // select the file input
            this._$input = this.querySelector('input[type="file"]');
            if (this.props.files) {
                for (let url of this.props.files) {
                    this.state.files.push({
                        type: 'url',
                        src: url,
                    });
                }
                // dispatch an update
                this.componentUtils.dispatchEvent('change', {
                    detail: [...this.state.files],
                });
            }
        });
    }
    /**
     * Clear files
     */
    reset() {
        // reset input
        (0, dom_1.__resetFileInput)(this._$input);
        // reset files
        this.state.files = [];
        // remove classname
        this.classList.remove(this.componentUtils.className('--over'));
        this.classList.remove(this.componentUtils.className('--files'));
        // dispatch an update
        this.componentUtils.dispatchEvent('reset', {
            detail: [...this.state.files],
        });
    }
    /**
     * When drag over
     */
    _onDragover(e) {
        // prevent default open behavior
        e.preventDefault();
        // add classname
        this.classList.add(this.componentUtils.className('--over'));
    }
    /**
     * When drag out
     */
    _onDragleave(e) {
        // prevent default open behavior
        e.preventDefault();
        // remove classname
        this.classList.remove(this.componentUtils.className('--over'));
    }
    /**
     * When drop
     */
    _onDrop(e) {
        // prevent default open behavior
        e.preventDefault();
        // get the droped files
        const files = [];
        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...e.dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === 'file') {
                    files.push(item.getAsFile());
                }
            });
        }
        else {
            // Use DataTransfer interface to access the file(s)
            [...e.dataTransfer.files].forEach((file, i) => {
                files.push(file);
            });
        }
        // handle droped file(s)
        this._handleDropedFiles(files, e.dataTransfer.files);
    }
    /**
     * When the file input change
     */
    _onInputChange(e) {
        this._handleDropedFiles([...e.currentTarget.files], e.currentTarget.files);
    }
    /**
     * Handle droped file(s)
     */
    _handleDropedFiles(files, filesList) {
        return __awaiter(this, void 0, void 0, function* () {
            // remove classname
            this.classList.remove(this.componentUtils.className('--over'));
            // add the loading classname
            this.classList.add(this.componentUtils.className('--loading'));
            // wait until all the file(s) have been processed
            yield new Promise((resolve, reject) => {
                var _a, _b;
                let processedFilesCount = 0;
                const fileProcessed = () => {
                    // update processed files count
                    // and resolve the loading promise when done correctly
                    processedFilesCount++;
                    if (processedFilesCount >= this.state.files.length) {
                        resolve(null);
                    }
                };
                // loop on every files in the list
                for (let [idx, file] of files.entries()) {
                    // handle maximum files
                    if (idx >= this.props.max) {
                        break;
                    }
                    // check if the file pass the "accept" test
                    if (this.props.accept &&
                        !(0, dom_1.__isFileAccepted)(file, this.props.accept)) {
                        // mark the file as processed
                        fileProcessed();
                        // next file please!
                        continue;
                    }
                    // preview only images
                    if ((_b = (_a = file.type) === null || _a === void 0 ? void 0 : _a.match) === null || _b === void 0 ? void 0 : _b.call(_a, /^image\//)) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const fileData = e.target.result;
                            const fileName = file.name;
                            if (fileData.startsWith('data:image')) {
                                const image = new Image();
                                // @ts-ignore
                                image.src = fileData;
                                image.onload = () => {
                                    // add the file to the stack
                                    this.state.files.push({
                                        type: file.type,
                                        src: image.src,
                                        alt: fileName,
                                    });
                                    // mark the file as processed
                                    fileProcessed();
                                    // update UI
                                    this.requestUpdate();
                                };
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                    else {
                        this.state.files.push({
                            type: file.type,
                        });
                        // mark the file as processed
                        fileProcessed();
                    }
                }
            });
            if (this.state.files.length) {
                // set the files in the input field
                this._$input.files = filesList;
                // add classname
                this.classList.add(this.componentUtils.className('--files'));
                // dispatch an update
                this.componentUtils.dispatchEvent('change', {
                    detail: [...this.state.files],
                });
            }
            else {
                // add error class
                this.classList.add(this.componentUtils.className('--error'));
                setTimeout(() => {
                    this.classList.remove(this.componentUtils.className('--error'));
                }, this.props.errorTimeout);
                // dispatch an error
                this.componentUtils.dispatchEvent('error', {
                    detail: [...this.state.files],
                });
            }
        });
    }
    render() {
        var _a, _b, _c;
        return (0, lit_1.html) `
            <div
                class="${this.componentUtils.className('__root')}"
                @dragover=${(e) => this._onDragover(e)}
                @dragleave=${(e) => this._onDragleave(e)}
                @drop=${(e) => this._onDrop(e)}
            >
                ${!this.state.files.length
            ? (0, lit_1.html) `
                          <label
                              for="${this.props.name}"
                              class="${this.componentUtils.className('__drop')}"
                          >
                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.dropFileIcon)}
                              <p
                                  class="${this.componentUtils.className('__text')}"
                              >
                                  ${this.props.i18n.clickOrDrag}
                              </p>
                          </label>
                      `
            : (0, lit_1.html) `
                          <div
                              class="${this.componentUtils.className('__droped')}"
                          >
                              <div
                                  class="${this.componentUtils.className('__files')}"
                              >
                                  ${this.state.files.map((file) => {
                var _a, _b, _c, _d, _e;
                return (0, lit_1.html) `
                                          <div
                                              class="${this.componentUtils.className(`__file __file--image __file--${(_c = (_b = (_a = file.type) === null || _a === void 0 ? void 0 : _a.replace) === null || _b === void 0 ? void 0 : _b.call(_a, '/', '-')) !== null && _c !== void 0 ? _c : 'unknown'}`)}"
                                          >
                                              ${((_e = (_d = file.type) === null || _d === void 0 ? void 0 : _d.match) === null || _e === void 0 ? void 0 : _e.call(_d, /^image\//))
                    ? (0, lit_1.html) `
                                                        <img
                                                            src="${file.src}"
                                                            alt="${file.alt}"
                                                        />
                                                    `
                    : file.type === 'url' &&
                        (0, is_1.__isImageUrl)(file.src)
                        ? (0, lit_1.html) `
                                                        <img
                                                            src="${file.src}"
                                                        />
                                                    `
                        : ``}
                                          </div>
                                      `;
            })}
                              </div>
                              <button
                                  class="${this.componentUtils.className('__reset-btn', 's-btn s-color s-color--error')}"
                                  @click=${() => this.reset()}
                              >
                                  ${this.props.i18n.reset}
                              </button>
                          </div>
                      `}
                ${this.props.input
            ? (0, lit_1.html) `
                          <input
                              @change=${(e) => this._onInputChange(e)}
                              type="file"
                              id="${this.props.name}"
                              name="${this.props.name}[]"
                              hidden
                              accept=${(_a = this.props.accept) !== null && _a !== void 0 ? _a : '*'}
                              ?multiple=${this.props.max > 1}
                          />
                      `
            : ''}
                ${this.state.files.map((file) => (0, lit_1.html) `
                        ${file.type === 'url'
            ? (0, lit_1.html) `
                                  <input
                                      type="text"
                                      name="${this.props.name}[]"
                                      value="${file.src}"
                                      hidden
                                  />
                              `
            : ''}
                    `)}
                ${((_b = this.props.accept) !== null && _b !== void 0 ? _b : this.props.help)
            ? (0, lit_1.html) `
                          <div
                              class="${this.componentUtils.className('__help', 's-tooltip-container')}"
                          >
                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.helpIcon)}
                              <div
                                  class="${this.componentUtils.className('__tooltip', 's-tooltip:left s-color s-color--accent')}"
                              >
                                  ${(_c = this.props.help) !== null && _c !== void 0 ? _c : (0, unsafe_html_js_1.unsafeHTML)(this.props.accept.join('<br />'))}
                                  <div></div>
                              </div>
                          </div>
                      `
            : ''}
            </div>
        `;
    }
}
exports.default = SDropzoneComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCxpREFBNkU7QUFDN0UsK0NBQXNEO0FBQ3RELHVEQUF5RDtBQUN6RCw2QkFBMkM7QUFDM0Msa0VBQTJEO0FBQzNELDBHQUFvRjtBQUVwRixhQUFhO0FBQ2Isd0ZBQXVELENBQUMsK0JBQStCO0FBRXZGLHNEQUFnQztBQTZaWCxpQkE3WmQsZ0JBQVEsQ0E2Wlk7QUFyVzNCLE1BQXFCLGtCQUFtQixTQUFRLHlCQUFlO0lBb0IzRDtRQUNJLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQUM7WUFDUixJQUFJLEVBQUUsWUFBWTtZQUNsQixTQUFTLEVBQUUscUNBQTZCO1NBQzNDLENBQUMsQ0FDTCxDQUFDO1FBWk4sVUFBSyxHQUFHO1lBQ0osS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDO0lBV0YsQ0FBQztJQTFCRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixxQ0FBNkIsQ0FDaEMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQyx3QkFBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBaUJLLFlBQVk7O1lBQ2Qsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBRXhELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xCLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDbEIsSUFBSSxFQUFF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