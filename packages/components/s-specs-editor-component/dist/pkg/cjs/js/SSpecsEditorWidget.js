"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@coffeekraken/sugar/object");
const datetime_1 = require("@coffeekraken/sugar/datetime");
const lit_1 = require("lit");
class SSpecsEditorWidget {
    constructor(deps, settings) {
        var _a, _b;
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
        this._values = deps.values;
        this._source = (0, object_1.__deepClean)((_b = deps.source) !== null && _b !== void 0 ? _b : {});
        // merge the values and the source together
        // Note that we do not clone the object to keep reference to the _values one
        (0, object_1.__deepMerge)(this._values, this._source, {
            clone: false,
        });
    }
    get values() {
        if (this.isResponsive()) {
            if (!this._values.media) {
                this._values.media = {};
            }
            if (!this._values.media[this.editor.props.media]) {
                this._values.media[this.editor.props.media] = {};
            }
            return this._values.media[this.editor.props.media];
        }
        return this._values;
    }
    get noneResponsiveValue() {
        var _a;
        return (_a = this._values) !== null && _a !== void 0 ? _a : {};
    }
    resetValue() {
        for (let [key, value] of Object.entries(this._values)) {
            delete this._values[key];
        }
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
        if (!Object.keys(this._source).length) {
            return false;
        }
        if (this._canBeOverride === undefined) {
            const cleanedValues = (0, object_1.__deepClean)((0, object_1.__clone)(this._values, {
                deep: true,
            }));
            this._canBeOverride =
                JSON.stringify(cleanedValues) === JSON.stringify(this._source);
        }
        return this._canBeOverride;
    }
    setDefault(value, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.setValue(value, Object.assign(Object.assign({}, (settings !== null && settings !== void 0 ? settings : {})), { validate: false }));
        });
    }
    setValue(value, settings) {
        return __awaiter(this, void 0, void 0, function* () {
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
                // reset the canBeOverride status
                this._canBeOverride = undefined;
                // ugly hack to avoid issue in repeatable display...
                yield (0, datetime_1.__wait)();
                // apply the changes in the editor
                this.editor.apply();
            }
            else {
                // update the UI to display errors
                this.editor.requestUpdate();
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsdURBTW9DO0FBSXBDLDJEQUFzRDtBQUV0RCw2QkFBMkI7QUF3QzNCLE1BQXFCLGtCQUFrQjtJQWtCbkMsWUFDSSxJQUE2QixFQUM3QixRQUFzQzs7UUFkMUMsV0FBTSxHQUE4QjtZQUNoQyxRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUFDO1FBT0YsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUN2QixjQUFTLEdBQWEsRUFBRSxDQUFDO1FBTXJCLElBQUksQ0FBQyxRQUFRLG1CQUNULEtBQUssRUFBRSxJQUFJLElBQ1IsQ0FBQyxNQUFBLElBQUksQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FBQyxDQUMzQixDQUFDO1FBRUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUEsb0JBQVcsRUFBQyxNQUFBLElBQUksQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTlDLDJDQUEyQztRQUMzQyw0RUFBNEU7UUFDNUUsSUFBQSxvQkFBVyxFQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNwQyxLQUFLLEVBQUUsS0FBSztTQUNmLENBQUMsQ0FBQztJQUNQLENBQUM7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