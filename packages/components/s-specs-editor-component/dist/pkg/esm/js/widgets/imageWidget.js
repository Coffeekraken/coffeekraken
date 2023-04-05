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
    render({ propObj, values, path }) {
        if (!values) {
            values = {};
        }
        return {
            error: this._error,
            warning: this._warning,
            html: html `
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
            `,
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBSTNELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0NBQWdDO0lBT2pELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBRyxFQUFFLENBQUM7U0FDZjtRQUVELE9BQU87WUFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFJLENBQUE7OEJBQ1EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQzs7aUNBRXZDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjtpQ0FDUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRTs7MEJBRWhDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7Ozs7MEJBSTFDLENBQUMsTUFBTSxDQUFDLEdBQUc7Z0JBQ1QsQ0FBQyxDQUFDLElBQUksQ0FBQTs7Ozs7eURBS3VCLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ3JCLGtCQUFrQjtvQkFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO3dCQUMzQixHQUFHLEVBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHO3FCQUNoQyxDQUFDLENBQUM7b0JBQ0gsSUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUM1QixJQUFJLENBQ1A7d0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsRUFDbEM7d0JBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQ3BCLENBQUMsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQ1AsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQ3hCOzRCQUNJLGNBQWMsRUFBRSxJQUFJO3lCQUN2QixDQUNKLENBQUM7cUJBQ0w7b0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQzs7K0JBRVI7Z0JBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQTs7K0NBRWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixTQUFTLENBQ1o7O3dDQUVDLElBQUksQ0FBQyxZQUFZLENBQ2YsTUFBTSxDQUFDLEdBQUcsRUFDVixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQzNCLElBQUksQ0FDUDs7K0JBRVI7OzthQUdsQjtTQUNKLENBQUM7SUFDTixDQUFDO0lBQ0QsWUFBWSxDQUFDLEdBQVcsRUFBRSxLQUFhLEVBQUUsSUFBYztRQUNuRCxPQUFPLElBQUksQ0FBQTs7O2dEQUc2QixHQUFHOztxQ0FFZCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRTs7Ozs7cUNBS3BCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCO2dCQUFFLE9BQU87WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO2dCQUM3QixLQUFLO2FBQ1IsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDOzs7MEJBR0MsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Ozs7U0FJL0QsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9