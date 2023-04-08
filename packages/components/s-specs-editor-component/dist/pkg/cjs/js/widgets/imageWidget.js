"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentImageWidget extends SSpecsEditorWidget_1.default {
    static isActive() {
        return true;
    }
    constructor(deps) {
        super(deps);
    }
    // validate({ values }) {}
    render() {
        const values = this.values;
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_image-widget')}">
                <label
                    class="${this.editor.utils.cls('_label', 's-label s-label--block')}"
                    @click=${(e) => e.preventDefault()}
                >
                    ${this.editor.renderLabel(this.propObj, this.path)}
                </label>

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
                //   // responsive item
                //   this.editor.setValue(path, {
                //       url: <ISImageData>e.detail[0].url,
                //   });
                //   if (
                //       this.editor.isPathResponsive(path) &&
                //       this.editor.isDefaultMedia()
                //   ) {
                //       this.editor.setValue(
                //           [...path, 'url'],
                //           <ISImageData>e.detail[0].url,
                //           {
                //               noneResponsive: true,
                //           },
                //       );
                //   }
                this.editor.apply();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBQzNCLGtFQUEyRDtBQUszRCwrRUFBeUQ7QUFFekQsTUFBcUIsZ0NBQWlDLFNBQVEsNEJBQW9CO0lBQzlFLE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRCwwQkFBMEI7SUFFMUIsTUFBTTtRQUNGLE1BQU0sTUFBTSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXhDLE9BQU8sSUFBQSxVQUFJLEVBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQzs7NkJBRW5DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDMUIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs2QkFDUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRTs7c0JBRWhDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztzQkFJaEQsQ0FBQyxNQUFNLENBQUMsR0FBRztZQUNULENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozs7cURBS3VCLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1YsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRztpQkFDdkIsQ0FBQyxDQUFDO2dCQUVILHVCQUF1QjtnQkFDdkIsaUNBQWlDO2dCQUNqQywyQ0FBMkM7Z0JBQzNDLFFBQVE7Z0JBQ1IsU0FBUztnQkFDVCw4Q0FBOEM7Z0JBQzlDLHFDQUFxQztnQkFDckMsUUFBUTtnQkFDUiw4QkFBOEI7Z0JBQzlCLDhCQUE4QjtnQkFDOUIsMENBQTBDO2dCQUMxQyxjQUFjO2dCQUNkLHNDQUFzQztnQkFDdEMsZUFBZTtnQkFDZixXQUFXO2dCQUNYLE1BQU07Z0JBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QixDQUFDOzsyQkFFUjtZQUNILENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTsyQ0FDYSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO29DQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7OzJCQUV0Qzs7O1NBR2xCLENBQUM7SUFDTixDQUFDO0lBQ0QsWUFBWSxDQUFDLEdBQVc7UUFDcEIsT0FBTyxJQUFBLFVBQUksRUFBQTs7O2dEQUc2QixHQUFHOztxQ0FFZCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRTs7O3NCQUduQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUMxQixHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRSxFQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDdkM7OztxQ0FHZ0IsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0I7Z0JBQUUsT0FBTztZQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUM5QixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSzthQUNqQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLENBQUM7OzswQkFHQyxJQUFBLDJCQUFVLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs7OztTQUkzRCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBakdELG1EQWlHQyJ9