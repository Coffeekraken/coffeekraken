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
export default class SStateLsAdapter {
    constructor(id) {
        this.async = false;
        this._id = id;
    }
    save(state) {
        window.localStorage.setItem(`state-${this._id}`, JSON.stringify(state));
    }
    load() {
        var _a;
        return JSON.parse((_a = window.localStorage.getItem(`state-${this._id}`)) !== null && _a !== void 0 ? _a : '{}');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFlO0lBR2hDLFlBQVksRUFBVTtRQUZ0QixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBR1YsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUNELElBQUksQ0FBQyxLQUFVO1FBQ1gsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFDRCxJQUFJOztRQUNBLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FDYixNQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1DQUFJLElBQUksQ0FDM0QsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9