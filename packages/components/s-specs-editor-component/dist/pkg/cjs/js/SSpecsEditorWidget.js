"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
class SSpecsEditorWidget {
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
        this._source = (0, object_1.__deepClean)((_b = deps.source) !== null && _b !== void 0 ? _b : {});
        this._values = (0, object_1.__deepClean)((_c = deps.values) !== null && _c !== void 0 ? _c : {});
        // merge the values and the source together
        this._values = (0, object_1.__deepMerge)(this._source, this._values);
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
        let newValues = (0, object_1.__clone)(sourceValues, {
            deep: true,
        });
        // set or merge new value
        if (finalSettings.merge) {
            (0, object_1.__set)(newValues, finalSettings.path, (0, object_1.__deepMerge)((0, object_1.__get)(newValues, finalSettings.path), value));
        }
        else {
            (0, object_1.__set)(newValues, finalSettings.path, value);
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
            (0, object_1.__set)(this._values, path, newValues, {
                preferAssign: true,
            });
            // clean the values
            (0, object_1.__deepClean)(this._values);
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
            values = (0, object_1.__clone)(this._values, {
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
        return (0, lit_1.html) ` <label
            class="${this.editor.utils.cls('_label', 's-label s-label--block')}"
            @click=${(e) => e.preventDefault()}
        >
            ${this.editor.renderLabel(this.propObj, this.path, settings)}
        </label>`;
    }
    renderInlineInput(settings) {
        var _a;
        return (0, lit_1.html) `
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
exports.default = SSpecsEditorWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBTW9DO0FBSXBDLDZCQUEyQjtBQXdDM0IsTUFBcUIsa0JBQWtCO0lBaUJuQyxZQUNJLElBQTZCLEVBQzdCLFFBQXNDOztRQWIxQyxXQUFNLEdBQThCO1lBQ2hDLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFNRixZQUFPLEdBQWEsRUFBRSxDQUFDO1FBQ3ZCLGNBQVMsR0FBYSxFQUFFLENBQUM7UUFNckIsSUFBSSxDQUFDLFFBQVEsbUJBQ1QsS0FBSyxFQUFFLElBQUksSUFDUixDQUFDLE1BQUEsSUFBSSxDQUFDLFFBQVEsbUNBQUksRUFBRSxDQUFDLENBQzNCLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFBLG9CQUFXLEVBQUMsTUFBQSxJQUFJLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUEsb0JBQVcsRUFBQyxNQUFBLElBQUksQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTlDLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUEsb0JBQVcsRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsSUFB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