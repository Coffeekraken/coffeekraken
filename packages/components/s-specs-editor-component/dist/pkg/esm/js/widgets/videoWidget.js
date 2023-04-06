import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
export default class SSpecsEditorComponentVideoWidget {
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
        values = values;
        return html `
            <div class="${this._component.utils.cls('_video-widget')}">
                <label
                    class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                    @click=${(e) => e.preventDefault()}
                >
                    ${this._component.renderLabel(propObj, path)}
                </label>

                <div class="_drop">
                    <s-dropzone
                        accept="video/webm,video/mp4,video/ogg"
                        upload
                        max-files="3"
                        multiple
                        class="s-bare"
                        @s-dropzone.file=${(e) => {
            var _a, _b;
            const newSources = (_a = values.sources) !== null && _a !== void 0 ? _a : {};
            for (let [i, video] of e.detail.entries()) {
                const url = (_b = video.url) !== null && _b !== void 0 ? _b : '', format = url.split('.').pop();
                newSources[format] = {
                    url,
                };
            }
            this._component.setValue([...path, 'sources'], newSources);
            this._component.apply();
        }}
                    ></s-dropzone>
                </div>

                ${this._renderVideos(values, path)}
            </div>
        `;
    }
    _renderVideos(values, path) {
        var _a;
        return html `
            <ul class="_videos">
                ${Object.keys((_a = values.sources) !== null && _a !== void 0 ? _a : {}).map((format) => {
            var _a;
            return html `
                        ${this._renderVideo((_a = values.sources) === null || _a === void 0 ? void 0 : _a[format].url, format, path)}
                    `;
        })}
            </li>
        `;
    }
    _renderVideo(url, format, path) {
        return html `
            <li class="_video">
                <figure class="_preview s-media-container">
                    <video class="s-media">
                        <source src="${url}" type="video/${format}" />
                    </video>
                </figure>
                <div class="_format">${format}</div>
                <div class="_spacer"></div>
                <div class="_actions">
                    ${this._component.renderCopyButton(`${document.location.origin}/${url}`, this._component.props.i18n.video.copyUrl)}
                    <button
                        class="_delete"
                        @pointerup=${(e) => {
            if (e.currentTarget.needConfirmation)
                return;
            const values = this._component.getValue(path);
            delete values.sources[format];
            this._component.setValue([...path, 'sources'], values.sources);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBSTNELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0NBQWdDO0lBS2pELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBRyxFQUFFLENBQUM7U0FDZjtRQUNELE1BQU0sR0FBZ0IsTUFBTSxDQUFDO1FBRTdCLE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7OzZCQUV2QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7NkJBQ1EsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUU7O3NCQUVoQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7Ozs7Ozs7OzJDQVVyQixDQUFDLENBQUMsRUFBRSxFQUFFOztZQUNyQixNQUFNLFVBQVUsR0FBRyxNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQztZQUV4QyxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDdkMsTUFBTSxHQUFHLEdBQUcsTUFBQSxLQUFLLENBQUMsR0FBRyxtQ0FBSSxFQUFFLEVBQ3ZCLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUVsQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUc7b0JBQ2pCLEdBQUc7aUJBQ04sQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQ3BCLENBQUMsR0FBRyxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQ3BCLFVBQVUsQ0FDYixDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDOzs7O2tCQUlQLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzs7U0FFekMsQ0FBQztJQUNOLENBQUM7SUFFRCxhQUFhLENBQUMsTUFBbUIsRUFBRSxJQUFjOztRQUM3QyxPQUFPLElBQUksQ0FBQTs7a0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDbkMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7WUFBQyxPQUFBLElBQUksQ0FBQTswQkFDVixJQUFJLENBQUMsWUFBWSxDQUNmLE1BQUEsTUFBTSxDQUFDLE9BQU8sMENBQUcsTUFBTSxFQUFFLEdBQUcsRUFDNUIsTUFBTSxFQUNOLElBQUksQ0FDUDtxQkFDSixDQUFBO1NBQUEsQ0FDSjs7U0FFUixDQUFDO0lBQ04sQ0FBQztJQUVELFlBQVksQ0FBQyxHQUFXLEVBQUUsTUFBcUIsRUFBRSxJQUFjO1FBQzNELE9BQU8sSUFBSSxDQUFBOzs7O3VDQUlvQixHQUFHLGlCQUFpQixNQUFNOzs7dUNBRzFCLE1BQU07OztzQkFHdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FDOUIsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUUsRUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzNDOzs7cUNBR2dCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCO2dCQUFFLE9BQU87WUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUNwQixDQUFDLEdBQUcsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUNwQixNQUFNLENBQUMsT0FBTyxDQUNqQixDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDOzs7MEJBR0MsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Ozs7U0FJL0QsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9