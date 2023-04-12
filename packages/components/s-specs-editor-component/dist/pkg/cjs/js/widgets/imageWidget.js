"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
const s_i18n_1 = require("@coffeekraken/s-i18n");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentImageWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        super(deps);
    }
    render() {
        const values = this.values;
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_image-widget')}">
                ${this.renderLabel()}
                <div class="_drop">
                    ${!values.url
            ? (0, lit_1.html) `
                              <s-dropzone
                                  accept="image/*"
                                  upload
                                  class="s-bare"
                                  @s-dropzone.file=${(e) => {
                this.setValue({
                    url: e.detail[0].url,
                });
                //   if (
                //       this.isResponsive() &&
                //       this.editor.isDefaultMedia()
                //   ) {
                //       _console.log('SET');
                //       this.setValue(
                //           <ISImageData>e.detail[0].url,
                //           {
                //               path: 'url',
                //               noneResponsive: true,
                //           },
                //       );
                //   }
            }}
                              ></s-dropzone>
                          `
            : (0, lit_1.html) `
                              <ul class="${this.editor.utils.cls('_images')}">
                                  ${this._renderImage(values.url)}
                              </ul>
                          `}
                </div>
                ${this.propObj.alt
            ? this.renderInlineInput({
                label: 'Alt',
                description: '',
                placeholder: (0, s_i18n_1.__i18n)('Image alternative text', {
                    id: 'global.image.alt',
                }),
                value: this.noneResponsiveValue.alt,
                onChange: (e) => {
                    this.mergeValue({ alt: e.target.value }, {
                        noneResponsive: true,
                    });
                },
            })
            : ''}
                <!-- ${this.propObj.title
            ? this.renderInlineInput({
                label: 'Title',
                description: '',
                placeholder: (0, s_i18n_1.__i18n)('Image title', {
                    id: 'global.image.title',
                }),
                value: this.noneResponsiveValue.title,
                onChange: (e) => {
                    this.mergeValue({ title: e.target.value }, {
                        noneResponsive: true,
                    });
                },
            })
            : ''} -->
            </div>
        `;
    }
    _renderImage(url) {
        return (0, lit_1.html) `
            <li class="_image">
                <figure class="_preview s-media-container">
                    <img class="s-media" src="${url}" />
                </figure>
                <div class="_name">${url.split('/').pop()}</div>
                <div class="_spacer"></div>
                <div class="_actions">
                    ${this.editor.renderCopyButton(`${document.location.origin}/${url}`, this.editor.props.i18n.image.copyUrl)}
                    <button
                        class="_delete"
                        @pointerup=${(e) => {
            if (e.currentTarget.needConfirmation)
                return;
            this.editor.clearValue(this.path, {
                media: this.editor.props.media,
            });
            this.editor.apply();
        }}
                        confirm="Confirm?"
                    >
                        ${(0, unsafe_html_js_1.unsafeHTML)(this.editor.props.icons.delete)}
                    </button>
                </div>
            </li>
        `;
    }
}
exports.default = SSpecsEditorComponentImageWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBQzNCLGtFQUEyRDtBQUUzRCxpREFBOEM7QUFLOUMsK0VBQXlEO0FBRXpELE1BQXFCLGdDQUFpQyxTQUFRLDRCQUFvQjtJQUM5RSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sTUFBTSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXhDLE9BQU8sSUFBQSxVQUFJLEVBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztrQkFDOUMsSUFBSSxDQUFDLFdBQVcsRUFBRTs7c0JBRWQsQ0FBQyxNQUFNLENBQUMsR0FBRztZQUNULENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozs7cURBS3VCLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1YsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRztpQkFDdkIsQ0FBQyxDQUFDO2dCQUVILFNBQVM7Z0JBQ1QsK0JBQStCO2dCQUMvQixxQ0FBcUM7Z0JBQ3JDLFFBQVE7Z0JBQ1IsNkJBQTZCO2dCQUM3Qix1QkFBdUI7Z0JBQ3ZCLDBDQUEwQztnQkFDMUMsY0FBYztnQkFDZCw2QkFBNkI7Z0JBQzdCLHNDQUFzQztnQkFDdEMsZUFBZTtnQkFDZixXQUFXO2dCQUNYLE1BQU07WUFDVixDQUFDOzsyQkFFUjtZQUNILENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTsyQ0FDYSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO29DQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENB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