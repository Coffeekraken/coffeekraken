import __SLitComponent from '@coffeekraken/s-lit-component';

import { __isFileAccepted, __resetFileInput } from '@coffeekraken/sugar/dom';
import { __isImageUrl } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SDropzoneComponentInterface from './interface/SDropzoneComponentInterface';

// @ts-ignore
import __css from '../../../../src/css/s-dropzone.css'; // relative to /dist/pkg/esm/js

import __define from './define';

export interface ISDropzoneComponentProps {
    max: number;
    files: string[];
    input: boolean;
    name: string;
    errorTimeout: Number;
    dropFileIcon: string;
    helpIcon: string;
    i18n: Record<string, string>;
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
 * @event       s-dropzone.reset            Dispatched when the user has reseted the dropzone
 * @event       s-dropzone                  Dispatched for every events of the dropzone. Check the eventType property in the detail for the exact event type
 *
 * @icon            drop-file           Icon displayed when the dropzone wait for files
 *
 * @install           shell
 * npm i @coffeekraken/s-dropzone-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-dropzone-component';
 * define();
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

    state = {
        files: [],
    };

    _$input;

    constructor() {
        super(
            __deepMerge({
                name: 's-dropzone',
                interface: __SDropzoneComponentInterface,
            }),
        );
    }

    async firstUpdated() {
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
    }

    /**
     * Clear files
     */
    reset() {
        // reset input
        __resetFileInput(this._$input);
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
     * Handle droped file(s)
     */
    async _handleDropedFiles(files: any[], filesList: FileList): Promise<void> {
        // remove classname
        this.classList.remove(this.componentUtils.className('--over'));

        // add the loading classname
        this.classList.add(this.componentUtils.className('--loading'));

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
                if (idx >= this.props.max) {
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

        if (this.state.files.length) {
            // set the files in the input field
            this._$input.files = filesList;
            // add classname
            this.classList.add(this.componentUtils.className('--files'));

            // dispatch an update
            this.componentUtils.dispatchEvent('change', {
                detail: [...this.state.files],
            });
        } else {
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
    }

    render() {
        return html`
            <div
                class="${this.componentUtils.className('__root')}"
                @dragover=${(e) => this._onDragover(e)}
                @dragleave=${(e) => this._onDragleave(e)}
                @drop=${(e) => this._onDrop(e)}
            >
                ${!this.state.files.length
                    ? html`
                          <label
                              for="${this.props.name}"
                              class="${this.componentUtils.className('__drop')}"
                          >
                              ${unsafeHTML(this.props.dropFileIcon)}
                              <p
                                  class="${this.componentUtils.className(
                                      '__text',
                                  )}"
                              >
                                  ${this.props.i18n.clickOrDrag}
                              </p>
                          </label>
                      `
                    : html`
                          <div
                              class="${this.componentUtils.className(
                                  '__droped',
                              )}"
                          >
                              <div
                                  class="${this.componentUtils.className(
                                      '__files',
                                  )}"
                              >
                                  ${this.state.files.map(
                                      (file) => html`
                                          <div
                                              class="${this.componentUtils.className(
                                                  `__file __file--image __file--${
                                                      file.type?.replace?.(
                                                          '/',
                                                          '-',
                                                      ) ?? 'unknown'
                                                  }`,
                                              )}"
                                          >
                                              ${file.type?.match?.(/^image\//)
                                                  ? html`
                                                        <img
                                                            src="${file.src}"
                                                            alt="${file.alt}"
                                                        />
                                                    `
                                                  : file.type === 'url' &&
                                                    __isImageUrl(file.src)
                                                  ? html`
                                                        <img
                                                            src="${file.src}"
                                                        />
                                                    `
                                                  : ``}
                                          </div>
                                      `,
                                  )}
                              </div>
                              <button
                                  class="${this.componentUtils.className(
                                      '__reset-btn',
                                      's-btn s-color s-color--error',
                                  )}"
                                  @click=${() => this.reset()}
                              >
                                  ${this.props.i18n.reset}
                              </button>
                          </div>
                      `}
                ${this.props.input
                    ? html`
                          <input
                              @change=${(e) => this._onInputChange(e)}
                              type="file"
                              id="${this.props.name}"
                              name="${this.props.name}[]"
                              hidden
                              accept=${this.props.accept ?? '*'}
                              ?multiple=${this.props.max > 1}
                          />
                      `
                    : ''}
                ${this.state.files.map(
                    (file) => html`
                        ${file.type === 'url'
                            ? html`
                                  <input
                                      type="text"
                                      name="${this.props.name}[]"
                                      value="${file.src}"
                                      hidden
                                  />
                              `
                            : ''}
                    `,
                )}
                ${this.props.accept ?? this.props.help
                    ? html`
                          <div
                              class="${this.componentUtils.className(
                                  '__help',
                                  's-tooltip-container',
                              )}"
                          >
                              ${unsafeHTML(this.props.helpIcon)}
                              <div
                                  class="${this.componentUtils.className(
                                      '__tooltip',
                                      's-tooltip:left s-color s-color--accent',
                                  )}"
                              >
                                  ${this.props.help ??
                                  unsafeHTML(this.props.accept.join('<br />'))}
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
