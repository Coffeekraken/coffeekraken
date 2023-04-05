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
    render({ propObj, values, path }) {
        if (!values) {
            values = {};
        }
        return {
            error: this._error,
            warning: this._warning,
            html: (0, lit_1.html) `
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
            `,
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBQzNCLGtFQUEyRDtBQUkzRCxNQUFxQixnQ0FBZ0M7SUFPakQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtRQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNmO1FBRUQsT0FBTztZQUNILEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdEIsSUFBSSxFQUFFLElBQUEsVUFBSSxFQUFBOzhCQUNRLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7O2lDQUV2QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7aUNBQ1EsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUU7OzBCQUVoQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7OzBCQUkxQyxDQUFDLE1BQU0sQ0FBQyxHQUFHO2dCQUNULENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozs7eURBS3VCLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ3JCLGtCQUFrQjtvQkFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO3dCQUMzQixHQUFHLEVBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHO3FCQUNoQyxDQUFDLENBQUM7b0JBQ0gsSUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUM1QixJQUFJLENBQ1A7d0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsRUFDbEM7d0JBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQ3BCLENBQUMsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQ1AsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQ3hCOzRCQUNJLGNBQWMsRUFBRSxJQUFJO3lCQUN2QixDQUNKLENBQUM7cUJBQ0w7b0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQzs7K0JBRVI7Z0JBQ0gsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzsrQ0FFYSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFNBQVMsQ0FDWjs7d0NBRUMsSUFBSSxDQUFDLFlBQVksQ0FDZixNQUFNLENBQUMsR0FBRyxFQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDM0IsSUFBSSxDQUNQOzsrQkFFUjs7O2FBR2xCO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFDRCxZQUFZLENBQUMsR0FBVyxFQUFFLEtBQWEsRUFBRSxJQUFjO1FBQ25ELE9BQU8sSUFBQSxVQUFJLEVBQUE7OztnREFHNkIsR0FBRzs7cUNBRWQsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUU7Ozs7O3FDQUtwQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLGdCQUFnQjtnQkFBRSxPQUFPO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTtnQkFDN0IsS0FBSzthQUNSLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsQ0FBQzs7OzBCQUdDLElBQUEsMkJBQVUsRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7O1NBSS9ELENBQUM7SUFDTixDQUFDO0NBQ0o7QUEvR0QsbURBK0dDIn0=