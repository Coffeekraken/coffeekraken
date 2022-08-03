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
export default {
    save(id, state) {
        return new Promise((resolve) => {
            window.localStorage.set(`state-${id}`, JSON.stringify(state));
            resolve();
        });
    },
    load(id) {
        return new Promise((resolve) => {
            var _a;
            resolve(JSON.parse((_a = window.localStorage.get(`state-${id}`)) !== null && _a !== void 0 ? _a : '{}'));
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsZUFBK0I7SUFDM0IsSUFBSSxDQUFDLEVBQVUsRUFBRSxLQUFVO1FBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM5RCxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELElBQUksQ0FBQyxFQUFVO1FBQ1gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOztZQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsbUNBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFDIn0=