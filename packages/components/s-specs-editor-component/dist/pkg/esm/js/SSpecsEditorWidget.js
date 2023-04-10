import { __clone, __deepMerge, __get, __set } from '@coffeekraken/sugar/object';
import { html } from 'lit';
export default class SSpecsEditorWidget {
    constructor(deps, settings) {
        var _a;
        this.status = {
            pristine: true,
        };
        this._errors = [];
        this._warnings = [];
        this.editor = deps.editor;
        this.propObj = deps.propObj;
        this.path = deps.path;
        this.valuePath = this.path.filter((l) => l !== 'props');
        this._values = deps.values;
        this.settings = Object.assign({ label: true }, ((_a = deps.settings) !== null && _a !== void 0 ? _a : {}));
        // if (this._values === undefined) {
        //     if (this.propObj.type?.match(/\[\]$/)) {
        //         this._values = [];
        //     } else {
        //         this._values = {};
        //     }
        // }
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
    resetValue(value) {
        this.setValue(value, {
            validate: false,
        });
    }
    setValue(value, settings) {
        const finalSettings = Object.assign({ media: null, path: '.', merge: true, validate: true }, (settings !== null && settings !== void 0 ? settings : {}));
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
            if (this.isResponsive()) {
                path =
                    `media.${this.editor.props.media}.${finalSettings.path}`.replace(/\.{2}/gm, '');
            }
            __set(this._values, path, newValues, {
                preferAssign: true,
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUloRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBK0IzQixNQUFNLENBQUMsT0FBTyxPQUFPLGtCQUFrQjtJQWNuQyxZQUNJLElBQTZCLEVBQzdCLFFBQXNDOztRQVYxQyxXQUFNLEdBQThCO1lBQ2hDLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFHRixZQUFPLEdBQWEsRUFBRSxDQUFDO1FBQ3ZCLGNBQVMsR0FBYSxFQUFFLENBQUM7UUFNckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUUzQixJQUFJLENBQUMsUUFBUSxtQkFDVCxLQUFLLEVBQUUsSUFBSSxJQUNSLENBQUMsTUFBQSxJQUFJLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUMsQ0FDM0IsQ0FBQztRQUVGLG9DQUFvQztRQUNwQywrQ0FBK0M7UUFDL0MsNkJBQTZCO1FBQzdCLGVBQWU7UUFDZiw2QkFBNkI7UUFDN0IsUUFBUTtRQUNSLElBQUk7SUFDUixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEVB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