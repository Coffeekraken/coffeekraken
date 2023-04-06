import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
export default class SSpecsEditorComponentImageWidget {
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
        return html `
            <div class="${this._component.utils.cls('_image-widget')}">
                <label
                    class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                    @click=${(e) => e.preventDefault()}
                >
                    ${this._component.renderLabel(propObj, path)}
                </label>

                <div class="_drop">
                    ${!values.url
            ? html `
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
            : html `
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
        return html `
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
                        ${unsafeHTML(this._component.props.icons.delete)}
                    </button>
                </div>
            </li>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBSTNELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0NBQWdDO0lBS2pELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDZixXQUFXO1lBQ1gsc0JBQXNCO1lBQ3RCLEtBQUs7U0FDUjtJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtRQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNmO1FBQ0QsTUFBTSxHQUFnQixNQUFNLENBQUM7UUFFN0IsT0FBTyxJQUFJLENBQUE7MEJBQ08sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQzs7NkJBRXZDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs2QkFDUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRTs7c0JBRWhDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7Ozs7c0JBSTFDLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDVCxDQUFDLENBQUMsSUFBSSxDQUFBOzs7OztxREFLdUIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDckIsa0JBQWtCO2dCQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7b0JBQzNCLEdBQUcsRUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7aUJBQ3BDLENBQUMsQ0FBQztnQkFDSCxJQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQzVCLElBQUksQ0FDUDtvQkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxFQUNsQztvQkFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FDcEIsQ0FBQyxHQUFHLElBQUksRUFBRSxLQUFLLENBQUMsRUFDSCxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFDNUI7d0JBQ0ksY0FBYyxFQUFFLElBQUk7cUJBQ3ZCLENBQ0osQ0FBQztpQkFDTDtnQkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLENBQUM7OzJCQUVSO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQTs7MkNBRWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixTQUFTLENBQ1o7O29DQUVDLElBQUksQ0FBQyxZQUFZLENBQ2YsTUFBTSxDQUFDLEdBQUcsRUFDVixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQzNCLElBQUksQ0FDUDs7MkJBRVI7OztTQUdsQixDQUFDO0lBQ04sQ0FBQztJQUNELFlBQVksQ0FBQyxHQUFXLEVBQUUsS0FBYSxFQUFFLElBQWM7UUFDbkQsT0FBTyxJQUFJLENBQUE7OztnREFHNkIsR0FBRzs7cUNBRWQsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUU7OztzQkFHbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FDOUIsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUUsRUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzNDOzs7cUNBR2dCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCO2dCQUFFLE9BQU87WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO2dCQUM3QixLQUFLO2FBQ1IsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDOzs7MEJBR0MsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Ozs7U0FJL0QsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9