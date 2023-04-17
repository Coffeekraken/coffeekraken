"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
const s_i18n_1 = require("@coffeekraken/s-i18n");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentVideoWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        super(deps);
    }
    validate(newValues) {
        var _a;
        if (this.propObj.required &&
            !Object.keys((_a = newValues === null || newValues === void 0 ? void 0 : newValues.sources) !== null && _a !== void 0 ? _a : {}).length) {
            return {
                error: (0, s_i18n_1.__i18n)(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
    }
    render() {
        return (0, lit_1.html) `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBQzNCLGtFQUEyRDtBQUUzRCxpREFBOEM7QUFLOUMsK0VBQXlEO0FBRXpELE1BQXFCLGdDQUFpQyxTQUFRLDRCQUFvQjtJQUM5RSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQVM7O1FBQ2QsSUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7WUFDckIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUEsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLE9BQU8sbUNBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxFQUMvQztZQUNFLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLDJCQUEyQixFQUFFO29CQUN2QyxFQUFFLEVBQUUsZ0NBQWdDO2lCQUN2QyxDQUFDO2FBQ0wsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7a0JBQzlDLElBQUksQ0FBQyxXQUFXLEVBQUU7Ozs7Ozs7OzJDQVFPLENBQUMsQ0FBQyxFQUFFLEVBQUU7O1lBQ3JCLE1BQU0sUUFBUSxHQUFHO2dCQUNiLE9BQU8sRUFBRSxFQUFFO2FBQ2QsQ0FBQztZQUNGLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUN2QyxNQUFNLEdBQUcsR0FBRyxNQUFBLEtBQUssQ0FBQyxHQUFHLG1DQUFJLEVBQUUsRUFDdkIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBRWxDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUc7b0JBQ3ZCLEdBQUc7aUJBQ04sQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEMsQ0FBQzs7OztrQkFJUCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7U0FFbkQsQ0FBQztJQUNOLENBQUM7SUFFRCxhQUFhLENBQUMsTUFBbUIsRUFBRSxJQUFjOztRQUM3QyxPQUFPLElBQUEsVUFBSSxFQUFBOztrQkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUEsTUFBTSxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUNuQyxDQUFDLE1BQU0sRUFBRSxFQUFFOztZQUFDLE9BQUEsSUFBQSxVQUFJLEVBQUE7MEJBQ1YsSUFBSSxDQUFDLFlBQVksQ0FDZixNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFHLE1BQU0sRUFBRSxHQUFHLEVBQzVCLE1BQU0sRUFDTixJQUFJLENBQ1A7cUJBQ0osQ0FBQTtTQUFBLENBQ0o7O1NBRVIsQ0FBQztJQUNOLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBVyxFQUFFLE1BQXFCLEVBQUUsSUFBYztRQUMzRCxPQUFPLElBQUEsVUFBSSxFQUFBOzs7O3VDQUlvQixHQUFHLGlCQUFpQixNQUFNOzs7dUNBRzFCLE1BQU07OztzQkFHdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDMUIsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUUsRUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ3ZDOzs7cUNBR2dCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCO2dCQUFFLE9BQU87WUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUNoQixDQUFDLEdBQUcsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUNwQixNQUFNLENBQUMsT0FBTyxDQUNqQixDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7MEJBR0MsSUFBQSwyQkFBVSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Ozs7U0FJM0QsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXZHRCxtREF1R0MifQ==