"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBQzNCLGtFQUEyRDtBQUszRCwrRUFBeUQ7QUFFekQsTUFBcUIsZ0NBQWlDLFNBQVEsNEJBQW9CO0lBQzlFLFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFeEMsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2tCQUM5QyxJQUFJLENBQUMsV0FBVyxFQUFFOztzQkFFZCxDQUFDLE1BQU0sQ0FBQyxHQUFHO1lBQ1QsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzs7OztxREFLdUIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDVixHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHO2lCQUN2QixDQUFDLENBQUM7Z0JBRUgsU0FBUztnQkFDVCwrQkFBK0I7Z0JBQy9CLHFDQUFxQztnQkFDckMsUUFBUTtnQkFDUiw2QkFBNkI7Z0JBQzdCLHVCQUF1QjtnQkFDdkIsMENBQTBDO2dCQUMxQyxjQUFjO2dCQUNkLDZCQUE2QjtnQkFDN0Isc0NBQXNDO2dCQUN0QyxlQUFlO2dCQUNmLFdBQVc7Z0JBQ1gsTUFBTTtZQUNWLENBQUM7OzJCQUVSO1lBQ0gsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzJDQUNhLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7b0NBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzs7MkJBRXRDOzs7U0FHbEIsQ0FBQztJQUNOLENBQUM7SUFDRCxZQUFZLENBQUMsR0FBVztRQUNwQixPQUFPLElBQUEsVUFBSSxFQUFBOzs7Z0RBRzZCLEdBQUc7O3FDQUVkLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFOzs7c0JBR25DLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQzFCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLEVBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUN2Qzs7O3FDQUdnQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLGdCQUFnQjtnQkFBRSxPQUFPO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQzlCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLO2FBQ2pDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7OzBCQUdDLElBQUEsMkJBQVUsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7O1NBSTNELENBQUM7SUFDTixDQUFDO0NBQ0o7QUE5RUQsbURBOEVDIn0=