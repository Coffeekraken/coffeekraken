"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentLayoutWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        super(deps);
        // if (!this.values.url && this.propObj.default) {
        //     this.setDefault(this.propObj.default);
        // }
    }
    render() {
        const values = this.values;
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_layout-widget')}">
                ${this.renderLabel()}
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentLayoutWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBSzNCLCtFQUF5RDtBQUV6RCxNQUFxQixpQ0FBa0MsU0FBUSw0QkFBb0I7SUFDL0UsWUFBWSxJQUE2QjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixrREFBa0Q7UUFDbEQsNkNBQTZDO1FBQzdDLElBQUk7SUFDUixDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sTUFBTSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXhDLE9BQU8sSUFBQSxVQUFJLEVBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO2tCQUMvQyxJQUFJLENBQUMsV0FBVyxFQUFFOztTQUUzQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBbEJELG9EQWtCQyJ9