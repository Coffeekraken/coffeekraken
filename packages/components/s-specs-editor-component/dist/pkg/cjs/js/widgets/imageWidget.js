"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
class SSpecsEditorComponentImageWidget {
    static isActive() {
        return true;
    }
    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }
    validate({ values }) {
        if (!values.urlee) {
            // return {
            //     error: 'hello',
            // };
        }
    }
    render({ propObj, values, path }) {
        if (!values) {
            values = {};
        }
        values = values;
        return (0, lit_1.html) `
            <div class="${this._component.utils.cls('_image-widget')}">
                <label
                    class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                    @click=${(e) => e.preventDefault()}
                >
                    ${this._component.renderLabel(propObj, path)}
                </label>

                <div class="_drop">
                    ${!values.url
            ? (0, lit_1.html) `
                              <s-dropzone
                                  accept="image/*"
                                  upload
                                  class="s-bare"
                                  @s-dropzone.file=${(e) => {
                // responsive item
                this._component.setValue(path, {
                    url: e.detail[0].url,
                });
                if (this._component.isPathResponsive(path) &&
                    this._component.isDefaultMedia()) {
                    this._component.setValue([...path, 'url'], e.detail[0].url, {
                        noneResponsive: true,
                    });
                }
                this._component.apply();
            }}
                              ></s-dropzone>
                          `
            : (0, lit_1.html) `
                              <ul
                                  class="${this._component.utils.cls('_images')}"
                              >
                                  ${this._renderImage(values.url, this._component.props.media, path)}
                              </ul>
                          `}
                </div>
            </div>
        `;
    }
    _renderImage(url, media, path) {
        return (0, lit_1.html) `
            <li class="_image">
                <figure class="_preview s-media-container">
                    <img class="s-media" src="${url}" />
                </figure>
                <div class="_name">${url.split('/').pop()}</div>
                <div class="_spacer"></div>
                <div class="_actions">
                    ${this._component.renderCopyButton(`${document.location.origin}/${url}`, this._component.props.i18n.image.copyUrl)}
                    <button
                        class="_delete"
                        @pointerup=${(e) => {
            if (e.currentTarget.needConfirmation)
                return;
            this._component.clearValue(path, {
                media,
            });
            this._component.apply();
        }}
                        confirm="Confirm?"
                    >
                        ${(0, unsafe_html_js_1.unsafeHTML)(this._component.props.icons.delete)}
                    </button>
                </div>
            </li>
        `;
    }
}
exports.default = SSpecsEditorComponentImageWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBQzNCLGtFQUEyRDtBQUkzRCxNQUFxQixnQ0FBZ0M7SUFLakQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxRQUFRLENBQUMsRUFBRSxNQUFNLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNmLFdBQVc7WUFDWCxzQkFBc0I7WUFDdEIsS0FBSztTQUNSO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1FBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ2Y7UUFDRCxNQUFNLEdBQWdCLE1BQU0sQ0FBQztRQUU3QixPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7OzZCQUV2QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7NkJBQ1EsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUU7O3NCQUVoQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7O3NCQUkxQyxDQUFDLE1BQU0sQ0FBQyxHQUFHO1lBQ1QsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzs7OztxREFLdUIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDckIsa0JBQWtCO2dCQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7b0JBQzNCLEdBQUcsRUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7aUJBQ3BDLENBQUMsQ0FBQztnQkFDSCxJQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQzVCLElBQUksQ0FDUDtvQkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxFQUNsQztvQkFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FDcEIsQ0FBQyxHQUFHLElBQUksRUFBRSxLQUFLLENBQUMsRUFDSCxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFDNUI7d0JBQ0ksY0FBYyxFQUFFLElBQUk7cUJBQ3ZCLENBQ0osQ0FBQztpQkFDTDtnQkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLENBQUM7OzJCQUVSO1lBQ0gsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzsyQ0FFYSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFNBQVMsQ0FDWjs7b0NBRUMsSUFBSSxDQUFDLFlBQVksQ0FDZixNQUFNLENBQUMsR0FBRyxFQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDM0IsSUFBSSxDQUNQOzsyQkFFUjs7O1NBR2xCLENBQUM7SUFDTixDQUFDO0lBQ0QsWUFBWSxDQUFDLEdBQVcsRUFBRSxLQUFhLEVBQUUsSUFBYztRQUNuRCxPQUFPLElBQUEsVUFBSSxFQUFBOzs7Z0RBRzZCLEdBQUc7O3FDQUVkLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFOzs7c0JBR25DLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQzlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLEVBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUMzQzs7O3FDQUdnQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLGdCQUFnQjtnQkFBRSxPQUFPO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTtnQkFDN0IsS0FBSzthQUNSLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsQ0FBQzs7OzBCQUdDLElBQUEsMkJBQVUsRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7O1NBSS9ELENBQUM7SUFDTixDQUFDO0NBQ0o7QUF0SEQsbURBc0hDIn0=