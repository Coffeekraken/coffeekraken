import { ISStateAdapter } from '../../shared/SState';

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
export default class SStateLsAdapter implements ISStateAdapter {
    _id;
    constructor(id: string) {
        this._id = id;
    }
    save(state: any): Promise<void> {
        return new Promise((resolve) => {
            window.localStorage.setItem(
                `state-${this._id}`,
                JSON.stringify(state),
            );
            resolve();
        });
    }
    load(): Promise<any> {
        return new Promise((resolve) => {
            resolve(
                JSON.parse(
                    window.localStorage.getItem(`state-${this._id}`) ?? '{}',
                ),
            );
        });
    }
}
