"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentVideoWidget extends SSpecsEditorWidget_1.default {
    static isActive() {
        return true;
    }
    constructor(deps) {
        super(deps);
    }
    render() {
        const values = this.values;
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_video-widget')}">
                <label
                    class="${this.editor.utils.cls('_label', 's-label s-label--block')}"
                    @click=${(e) => e.preventDefault()}
                >
                    ${this.editor.renderLabel(this.propObj, this.path)}
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
            this.setValue(newSources, {
                path: 'sources',
            });
            this.editor.apply();
        }}
                    ></s-dropzone>
                </div>

                ${this._renderVideos(this.values, this.path)}
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
                        ${(0, unsafe_html_js_1.unsafeHTML)(this.editor.props.icons.delete)}
                    </button>
                </div>
            </li>
        `;
    }
}
exports.default = SSpecsEditorComponentVideoWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBQzNCLGtFQUEyRDtBQUszRCwrRUFBeUQ7QUFFekQsTUFBcUIsZ0NBQWlDLFNBQVEsNEJBQW9CO0lBQzlFLE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFDRCxNQUFNO1FBQ0YsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFeEMsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDOzs2QkFFbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUMxQixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzZCQUNRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFOztzQkFFaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OzJDQVUzQixDQUFDLENBQUMsRUFBRSxFQUFFOztZQUNyQixNQUFNLFVBQVUsR0FBRyxNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQztZQUV4QyxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDdkMsTUFBTSxHQUFHLEdBQUcsTUFBQSxLQUFLLENBQUMsR0FBRyxtQ0FBSSxFQUFFLEVBQ3ZCLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUVsQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUc7b0JBQ2pCLEdBQUc7aUJBQ04sQ0FBQzthQUNMO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RCLElBQUksRUFBRSxTQUFTO2FBQ2xCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7OztrQkFJUCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7U0FFbkQsQ0FBQztJQUNOLENBQUM7SUFFRCxhQUFhLENBQUMsTUFBbUIsRUFBRSxJQUFjOztRQUM3QyxPQUFPLElBQUEsVUFBSSxFQUFBOztrQkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUEsTUFBTSxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUNuQyxDQUFDLE1BQU0sRUFBRSxFQUFFOztZQUFDLE9BQUEsSUFBQSxVQUFJLEVBQUE7MEJBQ1YsSUFBSSxDQUFDLFlBQVksQ0FDZixNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFHLE1BQU0sRUFBRSxHQUFHLEVBQzVCLE1BQU0sRUFDTixJQUFJLENBQ1A7cUJBQ0osQ0FBQTtTQUFBLENBQ0o7O1NBRVIsQ0FBQztJQUNOLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBVyxFQUFFLE1BQXFCLEVBQUUsSUFBYztRQUMzRCxPQUFPLElBQUEsVUFBSSxFQUFBOzs7O3VDQUlvQixHQUFHLGlCQUFpQixNQUFNOzs7dUNBRzFCLE1BQU07OztzQkFHdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDMUIsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUUsRUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ3ZDOzs7cUNBR2dCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCO2dCQUFFLE9BQU87WUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUNoQixDQUFDLEdBQUcsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUNwQixNQUFNLENBQUMsT0FBTyxDQUNqQixDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7MEJBR0MsSUFBQSwyQkFBVSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Ozs7U0FJM0QsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXpHRCxtREF5R0MifQ==