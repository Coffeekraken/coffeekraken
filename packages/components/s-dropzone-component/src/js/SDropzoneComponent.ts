import __SLitComponent from '@coffeekraken/s-lit-component';

import __SPromise from '@coffeekraken/s-promise';
import { __isFileAccepted, __resetFileInput } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SDropzoneComponentInterface from './interface/SDropzoneComponentInterface';

// @ts-ignore
import __css from '../../../../src/css/s-dropzone.css'; // relative to /dist/pkg/esm/js

import __define from './define';

export interface ISDropzoneComponentProps {
    maxFiles: number;
    maxSize: number;
    multiple: boolean;
    input: boolean;
    name: string;
    upload: boolean;
    uploadUrl: string;
    errorTimeout: Number;
    dropFileIcon: string;
    helpIcon: string;
    i18n: Record<string, string>;
}

export interface ISDropzoneComponentUploadResult {
    url: string;
}

/**
 * @name                SDropzoneComponent
 * @as                  Asset picker
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SDropzoneComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-dropzone
 * @platform            html
 * @status              beta
 *
 * This component allows you to drop files on it and handle upload for you easily.
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @event       s-dropzone.change           Dispatched when some file(s) have been droped/selected
 * @event       s-dropzone.clear            Dispatched when the user has cleared the dropzone
 * @event       s-dropzone                  Dispatched for every events of the dropzone. Check the eventType property in the detail for the exact event type
 *
 * @icon            drop-file           Icon displayed when the dropzone wait for files
 *
 * @import      import { define as __SDropzoneComponentDefine } from '@coffeekraken/s-dropzone-component';
 *
 * @snippet         __SDropzoneComponentDefine($1)
 *
 * @install           shell
 * npm i @coffeekraken/s-dropzone-component
 *
 * @install           js
 * import { define as __SDropzoneComponentDefine } from '@coffeekraken/s-dropzone-component';
 * __SDropzoneComponentDefine();
 *
 * @example         html        Copy from an input
 * <s-dropzone action="/upload"></s-dropzone>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISDropzoneFile {
    type: string;
    src?: string;
    alt?: string;
}

export default class SDropzoneComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SDropzoneComponentInterface,
        );
    }

    static get styles() {
        return css`
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

    _$input;

    constructor() {
        super(
            __deepMerge({
                name: 's-dropzone',
                interface: __SDropzoneComponentInterface,
            }),
        );
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
        //     _console.log('drop', e);
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
    _uploadFile(file: File): Promise<ISDropzoneComponentUploadResult> {
        return new __SPromise(async ({ resolve, reject, emit }) => {
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
        });
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
        const files: any[] = [];
        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...e.dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === 'file') {
                    files.push(item.getAsFile());
                }
            });
        } else {
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
        this._handleDropedFiles(
            [...e.currentTarget.files],
            e.currentTarget.files,
        );
    }

    /**
     * Handle the upload if needed
     */
    _handleUpload(files: File[]): Promise<ISDropzoneComponentUploadResult[]> {
        return new Promise(async (resolve, reject) => {
            const uploadedFilesResults: ISDropzoneComponentUploadResult[] = [];

            // reset the uploadTotalPercent
            this.state.uploadTotalPercent = 0;

            //  put the component in "upload" state
            this.classList.add('upload');

            for (let [idx, file] of files.entries()) {
                const uploadResultPromise = this._uploadFile(file);
                uploadResultPromise.on('progress', (data) => {
                    // calculate the total uploaded percentage
                    this.state.uploadPercent = Math.round(
                        (100 / (files.length * 100)) * (idx * 100 + data.value),
                    );
                    // update ui
                    // this.requestUpdate();
                    this.style.setProperty(
                        '--s-dropzone-upload-percent',
                        `${this.state.uploadPercent}%`,
                    );
                    this.setAttribute(
                        'upload-percent',
                        `${this.state.uploadPercent}%`,
                    );
                });
                const uploadResult = await uploadResultPromise;
                uploadedFilesResults.push(uploadResult);
            }

            // put the component in "upload" state
            this.classList.remove('upload');

            // resolve the upload process with all the uploaded files
            resolve(uploadedFilesResults);
        });
    }

    /**
     * Handle droped file(s)
     */
    async _handleDropedFiles(files: any[], filesList: FileList): Promise<void> {
        // reset files list in state
        this.state.files = [];

        // remove classname
        this.classList.remove('dragover', 'error');
        this.classList.add('loading');

        // wait until all the file(s) have been processed
        await new Promise((resolve, reject) => {
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
                if (
                    this.props.accept &&
                    !__isFileAccepted(file, this.props.accept)
                ) {
                    // mark the file as processed
                    fileProcessed();
                    // next file please!
                    continue;
                }

                // preview only images
                if (file.type?.match?.(/^image\//)) {
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
                } else {
                    this.state.files.push({
                        type: file.type,
                    });

                    // mark the file as processed
                    fileProcessed();
                }
            }
        });

        // handle upload
        await this._handleUpload(files);

        // remove the loading class
        this.classList.remove('loading');

        if (this.state.files.length) {
            // set the files in the input field
            this._$input.files = filesList;

            // dispatch an update
            this.utils.dispatchEvent('change', {
                detail: [...this.state.files],
            });
        } else {
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
    }

    render() {
        return html`
            <div
                class="_root"
                @click=${(e) => {
                    this.clear(false);
                    this._$input.click();
                }}
            >
                <label class="_label">${this.props.i18n.clickOrDrag}</label>
                ${this.props.input
                    ? html`
                          <input
                              @change=${(e) => this._onInputChange(e)}
                              type="file"
                              id="${this.props.name}"
                              name="${this.props.name}[]"
                              accept=${this.props.accept ?? '*'}
                              hidden
                              ?multiple=${this.props.multiple ??
                              this.props.maxFiles > 1}
                          />
                      `
                    : ''}
            </div>
        `;
    }
}

export { __define as define };
