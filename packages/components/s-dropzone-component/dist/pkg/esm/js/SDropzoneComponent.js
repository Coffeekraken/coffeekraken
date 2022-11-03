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
    constructor() {
        super(__deepMerge({
            name: 's-dropzone',
            interface: __SDropzoneComponentInterface,
        }));
        this.state = {
            files: [],
        };
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SDropzoneComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
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
        return html `
            <div
                class="${this.componentUtils.className('__root')}"
                @dragover=${(e) => this._onDragover(e)}
                @dragleave=${(e) => this._onDragleave(e)}
                @drop=${(e) => this._onDrop(e)}
            >
                ${!this.state.files.length
            ? html `
                          <label
                              for="${this.props.name}"
                              class="${this.componentUtils.className('__drop')}"
                          >
                              ${unsafeHTML(this.props.dropFileIcon)}
                              <p
                                  class="${this.componentUtils.className('__text')}"
                              >
                                  ${this.props.i18n.clickOrDrag}
                              </p>
                          </label>
                      `
            : html `
                          <div
                              class="${this.componentUtils.className('__droped')}"
                          >
                              <div
                                  class="${this.componentUtils.className('__files')}"
                              >
                                  ${this.state.files.map((file) => {
                var _a, _b, _c, _d, _e;
                return html `
                                          <div
                                              class="${this.componentUtils.className(`__file __file--image __file--${(_c = (_b = (_a = file.type) === null || _a === void 0 ? void 0 : _a.replace) === null || _b === void 0 ? void 0 : _b.call(_a, '/', '-')) !== null && _c !== void 0 ? _c : 'unknown'}`)}"
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
                              <button
                                  class="${this.componentUtils.className('__reset-btn', 's-btn s-color s-color--error')}"
                                  @click=${() => this.reset()}
                              >
                                  ${this.props.i18n.reset}
                              </button>
                          </div>
                      `}
                ${this.props.input
            ? html `
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
                ${this.state.files.map((file) => html `
                        ${file.type === 'url'
            ? html `
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
            ? html `
                          <div
                              class="${this.componentUtils.className('__help', 's-tooltip-container')}"
                          >
                              ${unsafeHTML(this.props.helpIcon)}
                              <div
                                  class="${this.componentUtils.className('__tooltip', 's-tooltip:left s-color s-color--accent')}"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLDZCQUE2QixNQUFNLHlDQUF5QyxDQUFDO0FBRXBGLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxvQ0FBb0MsQ0FBQyxDQUFDLCtCQUErQjtBQUV2RixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUF3RGhDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQW1CLFNBQVEsZUFBZTtJQW9CM0Q7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLFlBQVk7WUFDbEIsU0FBUyxFQUFFLDZCQUE2QjtTQUMzQyxDQUFDLENBQ0wsQ0FBQztRQVpOLFVBQUssR0FBRztZQUNKLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQztJQVdGLENBQUM7SUExQkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRiw2QkFBNkIsQ0FDaEMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQWlCSyxZQUFZOztZQUNkLHdCQUF3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