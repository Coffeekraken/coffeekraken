"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@coffeekraken/sugar/object");
class SSpecsEditorWidget {
    constructor(deps) {
        this._errors = [];
        this._warnings = [];
        this.editor = deps.editor;
        this.propObj = deps.propObj;
        this.path = deps.path;
        this._values = deps.values;
    }
    get values() {
        var _a;
        if (this.propObj.responsive) {
            return (_a = this._values.media[this.editor.props.media]) !== null && _a !== void 0 ? _a : {};
        }
        return this._values;
    }
    setValue(value, settings) {
        var _a;
        const finalSettings = Object.assign({ path: '.', merge: false }, (settings !== null && settings !== void 0 ? settings : {}));
        // get the current values
        let newValues = (0, object_1.__clone)(this.values, {
            deep: true,
        });
        // set or merge new value
        if (finalSettings.merge) {
            (0, object_1.__set)(newValues, finalSettings.path, (0, object_1.__deepMerge)((0, object_1.__get)(newValues, finalSettings.path), value));
        }
        else {
            (0, object_1.__set)(newValues, finalSettings.path, value);
        }
        // validate new values
        const validateResult = (_a = this.validate(newValues)) !== null && _a !== void 0 ? _a : {};
        // error and warnings
        if (validateResult.error) {
            this._errors.push(validateResult.error);
        }
        if (validateResult.warning) {
            this._warnings.push(validateResult.warning);
        }
        // if no error, set the new value
        if (!validateResult.error) {
            this.editor.setValue(this.path, newValues);
        }
    }
    validate(values) {
        return {};
    }
    hasValuesForMedia(media) {
        var _a, _b, _c;
        return Object.keys((_c = (_b = (_a = this._values) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b[media]) !== null && _c !== void 0 ? _c : {}).length > 0;
    }
    hasErrors() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQWdGO0FBb0JoRixNQUFxQixrQkFBa0I7SUFTbkMsWUFBWSxJQUE2QjtRQUh6QyxZQUFPLEdBQWEsRUFBRSxDQUFDO1FBQ3ZCLGNBQVMsR0FBYSxFQUFFLENBQUM7UUFHckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLE1BQU07O1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUN6QixPQUFPLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztTQUM1RDtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQVUsRUFBRSxRQUE4Qzs7UUFDL0QsTUFBTSxhQUFhLG1CQUNmLElBQUksRUFBRSxHQUFHLEVBQ1QsS0FBSyxFQUFFLEtBQUssSUFDVCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYseUJBQXlCO1FBQ3pCLElBQUksU0FBUyxHQUFHLElBQUEsZ0JBQU8sRUFBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2pDLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFDO1FBRUgseUJBQXlCO1FBQ3pCLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRTtZQUNyQixJQUFBLGNBQUssRUFDRCxTQUFTLEVBQ1QsYUFBYSxDQUFDLElBQUksRUFDbEIsSUFBQSxvQkFBVyxFQUFDLElBQUEsY0FBSyxFQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQzNELENBQUM7U0FDTDthQUFNO1lBQ0gsSUFBQSxjQUFLLEVBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0M7UUFFRCxzQkFBc0I7UUFDdEIsTUFBTSxjQUFjLEdBQUcsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFFdEQscUJBQXFCO1FBQ3JCLElBQUksY0FBYyxDQUFDLEtBQUssRUFBRTtZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0M7UUFDRCxJQUFJLGNBQWMsQ0FBQyxPQUFPLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9DO1FBRUQsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDOUM7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQVc7UUFDaEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBYTs7UUFDM0IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLEtBQUssMENBQUcsS0FBSyxDQUFDLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0o7QUF0RkQscUNBc0ZDIn0=