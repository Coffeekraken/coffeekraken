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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
            uploadPercent: 0,
            uploadTotalPercent: 0,
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
                this.requestUpdate();
            }
        });
    }
    /**
     * Clear files
     */
    clear(dispatchEvent = true) {
        // reset input
        (0, dom_1.__resetFileInput)(this._$input);
        // reset files
        this.state.files = [];
        // remove classname
        this.classList.remove(this.componentUtils.className('--over'));
        this.classList.remove(this.componentUtils.className('--files'));
        // dispatch an update
        if (dispatchEvent) {
            this.componentUtils.dispatchEvent('clear', {
                detail: [...this.state.files],
            });
        }
    }
    /**
     * Upload a file
     */
    _uploadFile(file) {
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData();
            formData.append('file', file);
            const request = new XMLHttpRequest();
            request.open('POST', this.props.uploadUrl);
            // update status
            this.state.status = 'upload';
            // track upload progress
            request.upload.addEventListener('progress', function (e) {
                emit('progress', {
                    value: (e.loaded / e.total) * 100,
                });
            });
            // wait for upload complition
            request.addEventListener('load', (e) => {
                const data = JSON.parse(request.response);
                // resolve with the server response
                resolve(data);
                // dispatch an "file" event
                this.componentUtils.dispatchEvent('file', {
                    detail: data,
                });
                // update status
                this.state.status = 'idle';
            });
            // send the file
            request.send(formData);
        }));
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
        // clear the input
        this.clear(false);
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
     * Handle the upload if needed
     */
    _handleUpload(files) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const uploadedFilesResults = [];
            // reset the uploadTotalPercent
            this.state.uploadTotalPercent = 0;
            //  put the component in "upload" state
            this.classList.add(this.componentUtils.className('--upload'));
            for (let [idx, file] of files.entries()) {
                const uploadResultPromise = this._uploadFile(file);
                uploadResultPromise.on('progress', (data) => {
                    // calculate the total uploaded percentage
                    this.state.uploadPercent = Math.round((100 / (files.length * 100)) * (idx * 100 + data.value));
                    // update ui
                    // this.requestUpdate();
                    this.style.setProperty('--s-dropzone-upload-percent', `${this.state.uploadPercent}%`);
                    this.setAttribute('upload-percent', `${this.state.uploadPercent}%`);
                });
                const uploadResult = yield uploadResultPromise;
                uploadedFilesResults.push(uploadResult);
            }
            // put the component in "upload" state
            this.classList.remove(this.componentUtils.className('--upload'));
            // resolve the upload process with all the uploaded files
            resolve(uploadedFilesResults);
        }));
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
                    if (idx >= this.props.maxFiles) {
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
            // handle upload
            this._handleUpload(files);
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
                              ${this.state.status !== 'upload'
                ? (0, lit_1.html) `
                                        <button
                                            class="${this.componentUtils.className('__clear-btn', 's-btn s-color s-color--error')}"
                                            @click=${() => this.clear()}
                                        >
                                            ${this.props.i18n.clear}
                                        </button>
                                    `
                : ''}
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
                              ?multiple=${this.props.maxFiles > 1}
                          />
                      `
            : ''}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx3RUFBaUQ7QUFDakQsaURBQTZFO0FBQzdFLCtDQUFzRDtBQUN0RCx1REFBeUQ7QUFDekQsNkJBQTJDO0FBQzNDLGtFQUEyRDtBQUMzRCwwR0FBb0Y7QUFFcEYsYUFBYTtBQUNiLHdGQUF1RCxDQUFDLCtCQUErQjtBQUV2RixzREFBZ0M7QUF5ZlgsaUJBemZkLGdCQUFRLENBeWZZO0FBMWIzQixNQUFxQixrQkFBbUIsU0FBUSx5QkFBZTtJQXNCM0Q7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLFlBQVk7WUFDbEIsU0FBUyxFQUFFLHFDQUE2QjtTQUMzQyxDQUFDLENBQ0wsQ0FBQztRQWROLFVBQUssR0FBRztZQUNKLEtBQUssRUFBRSxFQUFFO1lBQ1QsYUFBYSxFQUFFLENBQUM7WUFDaEIsa0JBQWtCLEVBQUUsQ0FBQztTQUN4QixDQUFDO0lBV0YsQ0FBQztJQTVCRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixxQ0FBNkIsQ0FDaEMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQyx3QkFBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBbUJLLFlBQVk7O1lBQ2Qsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3hELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xCLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQzlC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