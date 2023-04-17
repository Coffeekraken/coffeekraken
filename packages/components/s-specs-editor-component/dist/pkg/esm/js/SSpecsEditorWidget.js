var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __clone, __deepClean, __deepMerge, __get, __set, } from '@coffeekraken/sugar/object';
import { __wait } from '@coffeekraken/sugar/datetime';
import { html } from 'lit';
export default class SSpecsEditorWidget {
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
        this._source = __deepClean((_b = deps.source) !== null && _b !== void 0 ? _b : {});
        // merge the values and the source together
        // Note that we do not clone the object to keep reference to the _values one
        __deepMerge(this._values, this._source, {
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
            const cleanedValues = __deepClean(__clone(this._values, {
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
                // reset the canBeOverride status
                this._canBeOverride = undefined;
                // ugly hack to avoid issue in repeatable display...
                yield __wait();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDSCxPQUFPLEVBQ1AsV0FBVyxFQUNYLFdBQVcsRUFDWCxLQUFLLEVBQ0wsS0FBSyxHQUNSLE1BQU0sNEJBQTRCLENBQUM7QUFJcEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXRELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUF3QzNCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQWtCO0lBa0JuQyxZQUNJLElBQTZCLEVBQzdCLFFBQXNDOztRQWQxQyxXQUFNLEdBQThCO1lBQ2hDLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFPRixZQUFPLEdBQWEsRUFBRSxDQUFDO1FBQ3ZCLGNBQVMsR0FBYSxFQUFFLENBQUM7UUFNckIsSUFBSSxDQUFDLFFBQVEsbUJBQ1QsS0FBSyxFQUFFLElBQUksSUFDUixDQUFDLE1BQUEsSUFBSSxDQUFDLFFBQVEsbUNBQUksRUFBRSxDQUFDLENBQzNCLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLE1BQUEsSUFBSSxDQUFDLE1BQU0sbUNBQUksRUFBRSxDQUFDLENBQUM7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