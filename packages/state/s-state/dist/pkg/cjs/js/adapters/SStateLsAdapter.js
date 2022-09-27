"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        SStateLsAdapter
 * @namespace   js.adapters
 * @type        ISStateAdapter
 * @status      beta
 * @platform    js
 *
 * This state adapter allows you to save your state in the localStorage of the browser
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
class SStateLsAdapter {
    constructor(id) {
        this._id = id;
    }
    save(state) {
        return new Promise((resolve) => {
            window.localStorage.setItem(`state-${this._id}`, JSON.stringify(state));
            resolve();
        });
    }
    load() {
        return new Promise((resolve) => {
            var _a;
            resolve(JSON.parse((_a = window.localStorage.getItem(`state-${this._id}`)) !== null && _a !== void 0 ? _a : '{}'));
        });
    }
}
exports.default = SStateLsAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFxQixlQUFlO0lBRWhDLFlBQVksRUFBVTtRQUNsQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBQ0QsSUFBSSxDQUFDLEtBQVU7UUFDWCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQ3ZCLFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUN4QixDQUFDO1lBQ0YsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxJQUFJO1FBQ0EsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOztZQUMzQixPQUFPLENBQ0gsSUFBSSxDQUFDLEtBQUssQ0FDTixNQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1DQUFJLElBQUksQ0FDM0QsQ0FDSixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUF2QkQsa0NBdUJDIn0=