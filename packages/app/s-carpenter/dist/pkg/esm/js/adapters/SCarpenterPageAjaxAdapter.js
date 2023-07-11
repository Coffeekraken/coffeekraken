var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __unescapeHtml } from '@coffeekraken/sugar/html';
import __SCarpenterPageAdapter from '../SCarpenterPageAdapter.js';
export default class SCarpenterPageAjaxAdapter extends __SCarpenterPageAdapter {
    constructor(deps) {
        super(deps);
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.carpenter.props.endpoints.nodes
                .replace('%base', this.carpenter.props.endpoints.base)
                .replace('%uid', this.page.uid), {
                method: 'DELETE',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'no-referrer',
            });
            const json = yield response.json();
            return json;
        });
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            let raw = this.page.$elm.getAttribute('s-page');
            let data;
            // try json
            if (raw) {
                try {
                    data = JSON.parse(raw);
                }
                catch (e) { }
            }
            // ajax call
            if (!data && (raw === null || raw === void 0 ? void 0 : raw.match(/^(https?\:\/\/|\/)/))) {
                const rawResponse = yield fetch(raw, {
                    method: 'GET',
                });
                data = yield rawResponse.json();
            }
            // template in the dom
            if (!data) {
                try {
                    data = JSON.parse(__unescapeHtml(this.page.$page.innerHTML));
                }
                catch (e) {
                    console.log(this.page.$page.innerHTML);
                    console.error(e.message);
                }
            }
            return data;
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.carpenter.props.endpoints.nodes
                .replace('%base', this.carpenter.props.endpoints.base)
                .replace('%uid', data.uid), {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data),
            });
        });
    }
    setData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawResponse = yield fetch(this.carpenter.props.endpoints.pages
                .replace('%base', this.carpenter.props.endpoints.base)
                .replace('%uid', data.uid), {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const response = yield rawResponse.json();
            const $newPage = document.createElement('template');
            $newPage.setAttribute('s-page', response.uid);
            $newPage.innerHTML = JSON.stringify(Object.assign({}, response), null, 4);
            this.page.$page.after($newPage);
            this.page.$page.remove();
            // return the new page
            return $newPage;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUcxRCxPQUFPLHVCQUF1QixNQUFNLDZCQUE2QixDQUFDO0FBRWxFLE1BQU0sQ0FBQyxPQUFPLE9BQU8seUJBQTBCLFNBQVEsdUJBQXVCO0lBQzFFLFlBQVksSUFBZ0M7UUFDeEMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFSyxNQUFNOztZQUNSLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSztpQkFDL0IsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2lCQUNyRCxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ25DO2dCQUNJLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsVUFBVTtnQkFDakIsV0FBVyxFQUFFLGFBQWE7Z0JBQzFCLE9BQU8sRUFBRTtvQkFDTCxjQUFjLEVBQUUsa0JBQWtCO2lCQUNyQztnQkFDRCxjQUFjLEVBQUUsYUFBYTthQUNoQyxDQUNKLENBQUM7WUFFRixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFSyxPQUFPOztZQUNULElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxJQUFJLElBQUksQ0FBQztZQUVULFdBQVc7WUFDWCxJQUFJ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