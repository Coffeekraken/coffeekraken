import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { __i18n } from '@coffeekraken/s-i18n';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentVideoWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
    }
    validate(newValues) {
        var _a;
        if (this.propObj.required &&
            !Object.keys((_a = newValues === null || newValues === void 0 ? void 0 : newValues.sources) !== null && _a !== void 0 ? _a : {}).length) {
            return {
                error: __i18n(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
    }
    render() {
        const values = this.values;
        return html `
            <div class="${this.editor.utils.cls('_video-widget')}">
                ${this.renderLabel()}
                <div class="_drop">
                    <s-dropzone
                        accept="video/webm,video/mp4,video/ogg"
                        upload
                        max-files="3"
                        multiple
                        class="s-bare"
                        @s-dropzone.file=${(e) => {
            var _a;
            const newValue = {
                sources: {},
            };
            for (let [i, video] of e.detail.entries()) {
                const url = (_a = video.url) !== null && _a !== void 0 ? _a : '', format = url.split('.').pop();
                newValue.sources[format] = {
                    url,
                };
            }
            this.setValue(newValue, {});
        }}
                    ></s-dropzone>
                </div>

                ${this._renderVideos(this.values, this.path)}
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
                    ${this.editor.renderCopyButton(`${document.location.origin}/${url}`, this.editor.props.i18n.video.copyUrl)}
                    <button
                        class="_delete"
                        @pointerup=${(e) => {
            if (e.currentTarget.needConfirmation)
                return;
            const values = this.editor.getValue(path);
            delete values.sources[format];
            this.editor.setValue([...path, 'sources'], values.sources);
            this.editor.apply();
        }}
                        confirm="Confirm?"
                    >
                        ${unsafeHTML(this.editor.props.icons.delete)}
                    </button>
                </div>
            </li>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUs5QyxPQUFPLG9CQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0NBQWlDLFNBQVEsb0JBQW9CO0lBQzlFLFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxRQUFRLENBQUMsU0FBUzs7UUFDZCxJQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUNyQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsT0FBTyxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQy9DO1lBQ0UsT0FBTztnQkFDSCxLQUFLLEVBQUUsTUFBTSxDQUFDLDJCQUEyQixFQUFFO29CQUN2QyxFQUFFLEVBQUUsZ0NBQWdDO2lCQUN2QyxDQUFDO2FBQ0wsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLE1BQU0sR0FBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUV4QyxPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2tCQUM5QyxJQUFJLENBQUMsV0FBVyxFQUFFOzs7Ozs7OzsyQ0FRTyxDQUFDLENBQUMsRUFBRSxFQUFFOztZQUNyQixNQUFNLFFBQVEsR0FBRztnQkFDYixPQUFPLEVBQUUsRUFBRTthQUNkLENBQUM7WUFDRixLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDdkMsTUFBTSxHQUFHLEdBQUcsTUFBQSxLQUFLLENBQUMsR0FBRyxtQ0FBSSxFQUFFLEVBQ3ZCLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUVsQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHO29CQUN2QixHQUFHO2lCQUNOLENBQUM7YUFDTDtZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7Ozs7a0JBSVAsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7O1NBRW5ELENBQUM7SUFDTixDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQW1CLEVBQUUsSUFBYzs7UUFDN0MsT0FBTyxJQUFJLENBQUE7O2tCQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxNQUFNLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQ25DLENBQUMsTUFBTSxFQUFFLEVBQUU7O1lBQUMsT0FBQSxJQUFJLENBQUE7MEJBQ1YsSUFBSSxDQUFDLFlBQVksQ0FDZixNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFHLE1BQU0sRUFBRSxHQUFHLEVBQzVCLE1BQU0sRUFDTixJQUFJLENBQ1A7cUJBQ0osQ0FBQTtTQUFBLENBQ0o7O1NBRVIsQ0FBQztJQUNOLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBVyxFQUFFLE1BQXFCLEVBQUUsSUFBYztRQUMzRCxPQUFPLElBQUksQ0FBQTs7Ozt1Q0FJb0IsR0FBRyxpQkFBaUIsTUFBTTs7O3VDQUcxQixNQUFNOzs7c0JBR3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQzFCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLEVBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUN2Qzs7O3FDQUdnQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLGdCQUFnQjtnQkFBRSxPQUFPO1lBQzdDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDaEIsQ0FBQyxHQUFHLElBQUksRUFBRSxTQUFTLENBQUMsRUFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FDakIsQ0FBQztZQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7OzBCQUdDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7O1NBSTNELENBQUM7SUFDTixDQUFDO0NBQ0oifQ==