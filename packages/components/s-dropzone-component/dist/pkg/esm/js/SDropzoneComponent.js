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
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SDropzoneComponentInterface from './interface/SDropzoneComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-dropzone.css'; // relative to /dist/pkg/esm/js
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
            uploadPercent: 0,
            uploadTotalPercent: 0,
            isDrag: false,
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
        // const from = window.top?.document.body ?? document.body;
        // from.addEventListener('dragenter', (e) => {
        //     setTimeout(() => {
        //         this.classList.add('drag');
        //     });
        // });
        // from.addEventListener('dragleave', (e) => {
        //     this.classList.remove('drag');
        // });
        // from.addEventListener('dragover', (e) => {
        //     e.preventDefault();
        // });
        // from.addEventListener('drop', (e) => {
        //     e.preventDefault();
        // });
        this.addEventListener('dragenter', (e) => {
            this._onDragenter(e);
        });
        this.addEventListener('dragleave', (e) => {
            this._onDragleave(e);
        });
        this.addEventListener('dragover', (e) => e.preventDefault());
        this.addEventListener('drop', (e) => {
            this._onDrop(e);
        });
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
    _onDragenter(e) {
        // prevent default open behavior
        e.preventDefault();
        // add classname
        this.classList.add('dragover');
    }
    /**
     * When drag out
     */
    _onDragleave(e) {
        // prevent default open behavior
        e.preventDefault();
        // remove classname
        this.classList.remove('dragover');
    }
    /**
     * When drop
     */
    _onDrop(e) {
        // prevent default open behavior
        e.preventDefault();
        this.classList.remove('drag', 'dragover');
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
            this.classList.add('upload');
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
            this.classList.remove('upload');
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
            this.classList.remove('dragover', 'error');
            this.classList.add('loading');
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
            yield this._handleUpload(files);
            // remove the loading class
            this.classList.remove('loading');
            if (this.state.files.length) {
                // set the files in the input field
                this._$input.files = filesList;
                // dispatch an update
                this.utils.dispatchEvent('change', {
                    detail: [...this.state.files],
                });
            }
            else {
                // add error class
                this.classList.add('error');
                setTimeout(() => {
                    this.classList.remove('error');
                }, this.props.errorTimeout);
                // dispatch an error
                this.utils.dispatchEvent('error', {
                    detail: [...this.state.files],
                });
            }
        });
    }
    render() {
        var _a, _b;
        return html `
            <div
                class="_root"
                @click=${(e) => {
            this.clear(false);
            this._$input.click();
        }}
            >
                <label class="_label">${this.props.i18n.clickOrDrag}</label>
                ${this.props.input
            ? html `
                          <input
                              @change=${(e) => this._onInputChange(e)}
                              type="file"
                              id="${this.props.name}"
                              name="${this.props.name}[]"
                              accept=${(_a = this.props.accept) !== null && _a !== void 0 ? _a : '*'}
                              hidden
                              ?multiple=${(_b = this.props.multiple) !== null && _b !== void 0 ? _b : this.props.maxFiles > 1}
                          />
                      `
            : ''}
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyw2QkFBNkIsTUFBTSx5Q0FBeUMsQ0FBQztBQUVwRixhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sb0NBQW9DLENBQUMsQ0FBQywrQkFBK0I7QUFtRXZGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQW1CLFNBQVEsZUFBZTtJQUMzRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLDZCQUE2QixDQUNoQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPO1lBQ0gsYUFBYSxFQUFFLENBQUM7WUFDaEIsa0JBQWtCLEVBQUUsQ0FBQztZQUNyQixNQUFNLEVBQUUsS0FBSztTQUNoQixDQUFDO0lBQ04sQ0FBQztJQUlEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLElBQUksRUFBRSxZQUFZO1lBQ2xCLFNBQVMsRUFBRSw2QkFBNkI7U0FDM0MsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsWUFBWTtRQUNSLHdCQUF3QjtRQUN4QixJQUFJLENBQUMs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