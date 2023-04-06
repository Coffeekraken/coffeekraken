"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
class SSpecsEditorComponentVideoWidget {
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
        return (0, lit_1.html) `
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
        return (0, lit_1.html) `
            <ul class="_videos">
                ${Object.keys((_a = values.sources) !== null && _a !== void 0 ? _a : {}).map((format) => {
            var _a;
            return (0, lit_1.html) `
                        ${this._renderVideo((_a = values.sources) === null || _a === void 0 ? void 0 : _a[format].url, format, path)}
                    `;
        })}
            </li>
        `;
    }
    _renderVideo(url, format, path) {
        return (0, lit_1.html) `
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
                        ${(0, unsafe_html_js_1.unsafeHTML)(this._component.props.icons.delete)}
                    </button>
                </div>
            </li>
        `;
    }
}
exports.default = SSpecsEditorComponentVideoWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBQzNCLGtFQUEyRDtBQUkzRCxNQUFxQixnQ0FBZ0M7SUFLakQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtRQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNmO1FBQ0QsTUFBTSxHQUFnQixNQUFNLENBQUM7UUFFN0IsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDOzs2QkFFdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzZCQUNRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFOztzQkFFaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7Ozs7Ozs7OzsyQ0FVckIsQ0FBQyxDQUFDLEVBQUUsRUFBRTs7WUFDckIsTUFBTSxVQUFVLEdBQUcsTUFBQSxNQUFNLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUM7WUFFeEMsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3ZDLE1BQU0sR0FBRyxHQUFHLE1BQUEsS0FBSyxDQUFDLEdBQUcsbUNBQUksRUFBRSxFQUN2QixNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFFbEMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHO29CQUNqQixHQUFHO2lCQUNOLENBQUM7YUFDTDtZQUVELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUNwQixDQUFDLEdBQUcsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUNwQixVQUFVLENBQ2IsQ0FBQztZQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsQ0FBQzs7OztrQkFJUCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7O1NBRXpDLENBQUM7SUFDTixDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQW1CLEVBQUUsSUFBYzs7UUFDN0MsT0FBTyxJQUFBLFVBQUksRUFBQTs7a0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDbkMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7WUFBQyxPQUFBLElBQUEsVUFBSSxFQUFBOzBCQUNWLElBQUksQ0FBQyxZQUFZLENBQ2YsTUFBQSxNQUFNLENBQUMsT0FBTywwQ0FBRyxNQUFNLEVBQUUsR0FBRyxFQUM1QixNQUFNLEVBQ04sSUFBSSxDQUNQO3FCQUNKLENBQUE7U0FBQSxDQUNKOztTQUVSLENBQUM7SUFDTixDQUFDO0lBRUQsWUFBWSxDQUFDLEdBQVcsRUFBRSxNQUFxQixFQUFFLElBQWM7UUFDM0QsT0FBTyxJQUFBLFVBQUksRUFBQTs7Ozt1Q0FJb0IsR0FBRyxpQkFBaUIsTUFBTTs7O3VDQUcxQixNQUFNOzs7c0JBR3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQzlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLEVBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUMzQzs7O3FDQUdnQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLGdCQUFnQjtnQkFBRSxPQUFPO1lBQzdDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FDcEIsQ0FBQyxHQUFHLElBQUksRUFBRSxTQUFTLENBQUMsRUFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FDakIsQ0FBQztZQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsQ0FBQzs7OzBCQUdDLElBQUEsMkJBQVUsRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7O1NBSS9ELENBQUM7SUFDTixDQUFDO0NBQ0o7QUFySEQsbURBcUhDIn0=