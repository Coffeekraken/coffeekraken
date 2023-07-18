/**
 * @name        SStoreLsAdapter
 * @namespace   js.adapters
 * @type        ISStateAdapter
 * @platform    js
 * @status      beta
 * @private
 *
 * This state adapter allows you to save your state in the localStorage of the browser
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default class SStoreLsAdapter {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZTtJQUdoQyxZQUFZLEVBQVU7UUFGdEIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUdWLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxJQUFJLENBQUMsS0FBVTtRQUNYLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBQ0QsSUFBSTs7UUFDQSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQ2IsTUFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQ0FBSSxJQUFJLENBQzNELENBQUM7SUFDTixDQUFDO0NBQ0oifQ==