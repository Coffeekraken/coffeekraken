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
        _console.log('Val', this.noneResponsiveValue);
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
                ${this.renderInlineInput({
            label: 'Alt',
            description: '',
            placeholder: (0, s_i18n_1.__i18n)('Image alternative text', {
                id: 'global.image.alt',
            }),
            value: this.noneResponsiveValue.alt,
            onChange: (e) => {
                this.mergeValue({
                    alt: e.target.value,
                }, {
                    noneResponsive: true,
                });
            },
        })}
                ${this.renderInlineInput({
            label: 'Title',
            description: '',
            placeholder: (0, s_i18n_1.__i18n)('Image title', {
                id: 'global.image.title',
            }),
            value: this.noneResponsiveValue.title,
            onChange: (e) => {
                this.mergeValue({
                    title: e.target.value,
                }, {
                    noneResponsive: true,
                });
            },
        })}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBQzNCLGtFQUEyRDtBQUkzRCxpREFBOEM7QUFFOUMsK0VBQXlEO0FBRXpELE1BQXFCLGdDQUFpQyxTQUFRLDRCQUFvQjtJQUM5RSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sTUFBTSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXhDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRTlDLE9BQU8sSUFBQSxVQUFJLEVBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztrQkFDOUMsSUFBSSxDQUFDLFdBQVcsRUFBRTs7c0JBRWQsQ0FBQyxNQUFNLENBQUMsR0FBRztZQUNULENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozs7cURBS3VCLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1YsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRztpQkFDdkIsQ0FBQyxDQUFDO2dCQUVILFNBQVM7Z0JBQ1QsK0JBQStCO2dCQUMvQixxQ0FBcUM7Z0JBQ3JDLFFBQVE7Z0JBQ1IsNkJBQTZCO2dCQUM3Qix1QkFBdUI7Z0JBQ3ZCLDBDQUEwQztnQkFDMUMsY0FBYztnQkFDZCw2QkFBNkI7Z0JBQzdCLHNDQUFzQztnQkFDdEMsZUFBZTtnQkFDZixXQUFXO2dCQUNYLE1BQU07WUFDVixDQUFDOzsyQkFFUjtZQUNILENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTsyQ0FDYSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO29DQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7OzJCQUV0Qzs7a0JBRVQsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ3JCLEtBQUssRUFBRSxLQUFLO1lBQ1osV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUUsSUFBQSxlQUFNLEVBQUMsd0JBQXdCLEVBQUU7Z0JBQzFDLEVBQUUsRUFBRSxrQkFBa0I7YUFDekIsQ0FBQztZQUNGLEtBQUssRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRztZQUNuQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDWixJQUFJLENBQUMsVUFBVSxDQUNYO29CQUNJLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7aUJBQ3RCLEVBQ0Q7b0JBQ0ksY0FBYyxFQUFFLElBQUk7aUJBQ3ZCLENBQ0osQ0FBQztZQUNOLENBQUM7U0FDSixDQUFDO2tCQUNBLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNyQixLQUFLLEVBQUUsT0FBTztZQUNkLFdBQVcsRUFBRSxFQUFFO1lBQ2YsV0FBVyxFQUFFLElBQUEsZUFBTSxFQUFDLGFBQWEsRUFBRTtnQkFDL0IsRUFBRSxFQUFFLG9CQUFvQjthQUMzQixDQUFDO1lBQ0YsS0FBSyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLO1lBQ3JDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNaLElBQUksQ0FBQyxVQUFVLENBQ1g7b0JBQ0ksS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztpQkFDeEIsRUFDRDtvQkFDSSxjQUFjLEVBQUUsSUFBSTtpQkFDdkIsQ0FDSixDQUFDO1lBQ04sQ0FBQztTQUNKLENBQUM7O1NBRVQsQ0FBQztJQUNOLENBQUM7SUFDRCxZQUFZLENBQUMsR0FBVztRQUNwQixPQUFPLElBQUEsVUFBSSxFQUFBOzs7Z0RBRzZCLEdBQUc7O3FDQUVkLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFOzs7c0JBR25DLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQzFCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLEVBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUN2Qzs7O3FDQUdnQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLGdCQUFnQjtnQkFBRSxPQUFPO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQzlCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLO2FBQ2pDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7OzBCQUdDLElBQUEsMkJBQVUsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7O1NBSTNELENBQUM7SUFDTixDQUFDO0NBQ0o7QUFwSEQsbURBb0hDIn0=