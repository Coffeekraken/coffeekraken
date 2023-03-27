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
import __SPromise from '@coffeekraken/s-promise';
import { __isFileAccepted, __resetFileInput } from '@coffeekraken/sugar/dom';
import { __isImageUrl } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SDropzoneComponentInterface from './interface/SDropzoneComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-dropzone.css'; // relative to /dist/pkg/esm/js
import __define from './define';
export default class SDropzoneComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SDropzoneComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    static get state() {
        return {
            files: [],
            uploadPercent: 0,
            uploadTotalPercent: 0,
        };
    }
    constructor() {
        super(__deepMerge({
            name: 's-dropzone',
            interface: __SDropzoneComponentInterface,
        }));
    }
    firstUpdated() {
        // select the file input
        this._$input = this.querySelector('input');
        if (this.props.files.length) {
            for (let url of this.props.files) {
                this.state.files.push({
                    type: 'url',
                    src: url,
                });
            }
            // dispatch an update
            // this.utils.dispatchEvent('change', {
            //     detail: [...this.state.files],
            // });
            this.requestUpdate();
        }
        else {
            this.state.files = [];
        }
    }
    /**
     * Clear files
     */
    clear(dispatchEvent = true) {
        // reset input
        __resetFileInput(this._$input);
        // reset files
        this.state.files = [];
        // remove classname
        this.classList.remove(this.utils.cls('--over'));
        this.classList.remove(this.utils.cls('--files'));
        // dispatch an update
        if (dispatchEvent) {
            this.utils.dispatchEvent('clear', {
                detail: [...this.state.files],
            });
        }
    }
    /**
     * Upload a file
     */
    _uploadFile(file) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
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
                this.utils.dispatchEvent('file', {
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
        this.classList.add(this.utils.cls('--over'));
    }
    /**
     * When drag out
     */
    _onDragleave(e) {
        // prevent default open behavior
        e.preventDefault();
        // remove classname
        this.classList.remove(this.utils.cls('--over'));
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
            this.classList.add(this.utils.cls('--upload'));
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
            this.classList.remove(this.utils.cls('--upload'));
            // resolve the upload process with all the uploaded files
            resolve(uploadedFilesResults);
        }));
    }
    /**
     * Handle droped file(s)
     */
    _handleDropedFiles(files, filesList) {
        return __awaiter(this, void 0, void 0, function* () {
            // reset files list in state
            this.state.files = [];
            // remove classname
            this.classList.remove(this.utils.cls('--over'));
            this.classList.add(this.utils.cls('--loading'));
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
                        !__isFileAccepted(file, this.props.accept)) {
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
                this.classList.add(this.utils.cls('--files'));
                // dispatch an update
                this.utils.dispatchEvent('change', {
                    detail: [...this.state.files],
                });
            }
            else {
                // add error class
                this.classList.add(this.utils.cls('--error'));
                setTimeout(() => {
                    this.classList.remove(this.utils.cls('--error'));
                }, this.props.errorTimeout);
                // dispatch an error
                this.utils.dispatchEvent('error', {
                    detail: [...this.state.files],
                });
            }
        });
    }
    render() {
        var _a, _b, _c;
        return html `
            <div
                class="${this.utils.cls('_root')}"
                @dragover=${(e) => this._onDragover(e)}
                @dragleave=${(e) => this._onDragleave(e)}
                @drop=${(e) => this._onDrop(e)}
            >
                ${!this.state.files.length
            ? html `
                          <label
                              @click=${(e) => {
                this.clear(false);
                this._$input.click();
            }}
                              class="${this.utils.cls('_drop')}"
                          >
                              ${unsafeHTML(this.props.dropFileIcon)}
                              <p class="${this.utils.cls('_text')}">
                                  ${this.props.i18n.clickOrDrag}
                              </p>
                          </label>
                      `
            : html `
                          <div class="${this.utils.cls('_droped')}">
                              <div class="${this.utils.cls('_files')}">
                                  ${this.state.files.map((file) => {
                var _a, _b, _c, _d, _e;
                return html `
                                          <div
                                              class="${this.utils.cls(`__file __file--image __file--${(_c = (_b = (_a = file.type) === null || _a === void 0 ? void 0 : _a.replace) === null || _b === void 0 ? void 0 : _b.call(_a, '/', '-')) !== null && _c !== void 0 ? _c : 'unknown'}`)}"
                                          >
                                              ${((_e = (_d = file.type) === null || _d === void 0 ? void 0 : _d.match) === null || _e === void 0 ? void 0 : _e.call(_d, /^image\//))
                    ? html `
                                                        <img
                                                            src="${file.src}"
                                                            alt="${file.alt}"
                                                        />
                                                    `
                    : file.type === 'url' &&
                        __isImageUrl(file.src)
                        ? html `
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
                ? html `
                                        <button
                                            class="${this.utils.cls('_clear-btn', 's-btn s-color s-color--error')}"
                                            @click=${() => this.clear()}
                                        >
                                            ${this.props.i18n.clear}
                                        </button>
                                    `
                : ''}
                          </div>
                      `}
                ${this.props.input
            ? html `
                          <input
                              @change=${(e) => this._onInputChange(e)}
                              type="file"
                              id="${this.props.name}"
                              name="${this.props.name}[]"
                              accept=${(_a = this.props.accept) !== null && _a !== void 0 ? _a : '*'}
                              hidden
                              ?multiple=${this.props.maxFiles > 1}
                          />
                      `
            : ''}
                ${((_b = this.props.accept) !== null && _b !== void 0 ? _b : this.props.help)
            ? html `
                          <div
                              class="${this.utils.cls('_help', 's-tooltip-container')}"
                          >
                              ${unsafeHTML(this.props.helpIcon)}
                              <div
                                  class="${this.utils.cls('_tooltip', 's-tooltip s-tooltip--left s-color s-color--accent')}"
                              >
                                  ${(_c = this.props.help) !== null && _c !== void 0 ? _c : unsafeHTML(this.props.accept.join('<br />'))}
                                  <div></div>
                              </div>
                          </div>
                      `
            : ''}
            </div>
        `;
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLDZCQUE2QixNQUFNLHlDQUF5QyxDQUFDO0FBRXBGLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxvQ0FBb0MsQ0FBQyxDQUFDLCtCQUErQjtBQUV2RixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFtRWhDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQW1CLFNBQVEsZUFBZTtJQUMzRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLDZCQUE2QixDQUNoQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPO1lBQ0gsS0FBSyxFQUFFLEVBQUU7WUFDVCxhQUFhLEVBQUUsQ0FBQztZQUNoQixrQkFBa0IsRUFBRSxDQUFDO1NBQ3hCLENBQUM7SUFDTixDQUFDO0lBSUQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxD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