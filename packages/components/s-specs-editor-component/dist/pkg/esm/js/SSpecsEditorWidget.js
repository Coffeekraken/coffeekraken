import { __clone, __deepClean, __deepMerge, __get, __set, } from '@coffeekraken/sugar/object';
import { html } from 'lit';
export default class SSpecsEditorWidget {
    constructor(deps, settings) {
        var _a, _b, _c;
        this.status = {
            pristine: true,
        };
        this._errors = [];
        this._warnings = [];
        this.settings = Object.assign({ label: true }, ((_a = deps.settings) !== null && _a !== void 0 ? _a : {}));
        this.editor = deps.editor;
        this.propObj = deps.propObj;
        this.path = deps.path;
        this.valuePath = this.path.filter((l) => l !== 'props');
        this._source = __deepClean((_b = deps.source) !== null && _b !== void 0 ? _b : {});
        this._values = __deepClean((_c = deps.values) !== null && _c !== void 0 ? _c : {});
        // merge the values and the source together
        this._values = __deepMerge(this._source, this._values);
    }
    get values() {
        var _a, _b, _c;
        if (this.isResponsive()) {
            return (_b = (_a = this._values.media) === null || _a === void 0 ? void 0 : _a[this.editor.props.media]) !== null && _b !== void 0 ? _b : {};
        }
        return (_c = this._values) !== null && _c !== void 0 ? _c : {};
    }
    get noneResponsiveValue() {
        var _a;
        return (_a = this._values) !== null && _a !== void 0 ? _a : {};
    }
    resetValue(value) {
        this.setValue(value, {
            validate: false,
        });
    }
    mergeValue(value, settings) {
        this.setValue(value, Object.assign(Object.assign({}, (settings !== null && settings !== void 0 ? settings : {})), { merge: true }));
    }
    override() {
        this._overrided = true;
    }
    canBeOverride() {
        if (this._overrided) {
            return false;
        }
        if (!this._source) {
            return false;
        }
        return JSON.stringify(this._values) === JSON.stringify(this._source);
    }
    setValue(value, settings) {
        const finalSettings = Object.assign({ media: null, path: '.', merge: false, validate: true }, (settings !== null && settings !== void 0 ? settings : {}));
        // not so much pristine...
        this.status.pristine = false;
        const sourceValues = finalSettings.noneResponsive
            ? this._values
            : this.values;
        // get the current values
        let newValues = __clone(sourceValues, {
            deep: true,
        });
        // set or merge new value
        if (finalSettings.merge) {
            __set(newValues, finalSettings.path, __deepMerge(__get(newValues, finalSettings.path), value));
        }
        else {
            __set(newValues, finalSettings.path, value);
        }
        // validate
        let validateResult = {};
        if (finalSettings.validate) {
            validateResult = this._validate(newValues);
        }
        // if no error, set the new value
        if (!validateResult.error) {
            let path = finalSettings.path;
            if (this.isResponsive() && !finalSettings.noneResponsive) {
                path =
                    `media.${this.editor.props.media}.${finalSettings.path}`.replace(/\.{2}/gm, '');
            }
            // set the new value(s)
            __set(this._values, path, newValues, {
                preferAssign: true,
            });
            // clean the values
            __deepClean(this._values);
            // apply the changes in the editor
            this.editor.apply();
        }
        else {
            // update the UI to display errors
            this.editor.requestUpdate();
        }
    }
    _validate(values) {
        var _a;
        if (!values) {
            values = __clone(this._values, {
                deep: true,
            });
        }
        // reset errors and warnings
        this._errors = [];
        this._warnings = [];
        // validate new values
        const validateResult = (_a = this.validate(values)) !== null && _a !== void 0 ? _a : {};
        // error and warnings
        if (validateResult.error) {
            this._errors.push(validateResult.error);
        }
        if (validateResult.warning) {
            this._warnings.push(validateResult.warning);
        }
        return validateResult;
    }
    renderLabel(settings) {
        if (!this.settings.label) {
            return '';
        }
        return html ` <label
            class="${this.editor.utils.cls('_label', 's-label s-label--block')}"
            @click=${(e) => e.preventDefault()}
        >
            ${this.editor.renderLabel(this.propObj, this.path, settings)}
        </label>`;
    }
    renderInlineInput(settings) {
        var _a;
        return html `
            <label class="_alt inline-input">
                <div class="_label">${settings.label}</div>
                <input
                    class="_input"
                    type="text"
                    name="alt"
                    placeholder="${settings.placeholder}"
                    value="${settings.value}"
                    @change=${(_a = settings.onChange) !== null && _a !== void 0 ? _a : function () { }}
                />
            </label>
        `;
    }
    validate(values) {
        return {};
    }
    hasValuesForMedia(media) {
        var _a, _b, _c;
        return Object.keys((_c = (_b = (_a = this._values) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b[media]) !== null && _c !== void 0 ? _c : {}).length > 0;
    }
    isResponsive() {
        return this.propObj.responsive;
    }
    hasErrors() {
        if (this.status.pristine && this.editor.status.pristine) {
            return false;
        }
        if (this.status.pristine) {
            this._validate();
        }
        return this._errors.length > 0;
    }
    get lastError() {
        return this._errors[0];
    }
    hasWarnings() {
        return this._warnings.length > 0;
    }
    get lastWarning() {
        return this._warnings[0];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxPQUFPLEVBQ1AsV0FBVyxFQUNYLFdBQVcsRUFDWCxLQUFLLEVBQ0wsS0FBSyxHQUNSLE1BQU0sNEJBQTRCLENBQUM7QUFJcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQztBQXdDM0IsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQkFBa0I7SUFpQm5DLFlBQ0ksSUFBNkIsRUFDN0IsUUFBc0M7O1FBYjFDLFdBQU0sR0FBOEI7WUFDaEMsUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQU1GLFlBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQU1yQixJQUFJLENBQUMsUUFBUSxtQkFDVCxLQUFLLEVBQUUsSUFBSSxJQUNSLENBQUMsTUFBQSxJQUFJLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUMsQ0FDM0IsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxNQUFBLElBQUksQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLE1BQUEsSUFBSSxDQUFDLE1BQU0sbUNBQUksRUFBRSxDQUFDLENBQUM7UUFFOUMsMkNBQTJDO1FBQzNDLElB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