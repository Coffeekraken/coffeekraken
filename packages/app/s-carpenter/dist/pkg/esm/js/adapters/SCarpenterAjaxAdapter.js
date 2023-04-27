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
import __SCarpenterAdapter from '../SCarpenterAdapter';
export default class SCarpenterAjaxAdapter extends __SCarpenterAdapter {
    constructor(deps) {
        super(deps);
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.carpenter.props.deleteComponentUrl.replace('%uid', this.element.uid), {
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
            let raw = this.element.$elm.getAttribute('s-node');
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
                    data = JSON.parse(__unescapeHtml(this.element.$node.innerHTML));
                }
                catch (e) {
                    console.log(this.element.$node.innerHTML);
                    console.error(e.message);
                }
            }
            // specs object
            if (!data.specsObj) {
                const response = yield fetch(this.carpenter.props.specsObjUrl.replace(':specs', this.specs), {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    referrerPolicy: 'no-referrer',
                });
                const specsObj = yield response.json();
                data.specsObj = specsObj;
            }
            return data;
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.carpenter.props.saveComponentUrl, {
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
            const rawResponse = yield fetch(this.carpenter.props.pagesUrl.replace('%specs', this.specs), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseHtml = yield rawResponse.text();
            const doc = new DOMParser().parseFromString(responseHtml, 'text/html'), 
            // @ts-ignore
            $newComponent = doc.body.firstChild, $newNode = $newComponent.querySelector('[s-node]');
            // keep the element id and the s-specs
            $newComponent.id = this.element.$elm.id;
            // @ts-ignore
            this.element.$elm.after($newComponent);
            // remove old element
            this.element.$elm.remove();
            // return the new node
            return $newNode;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUsxRCxPQUFPLG1CQUFtQixNQUFNLHNCQUFzQixDQUFDO0FBRXZELE1BQU0sQ0FBQyxPQUFPLE9BQU8scUJBQXNCLFNBQVEsbUJBQW1CO0lBQ2xFLFlBQVksSUFBNEI7UUFDcEMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFSyxNQUFNOztZQUNSLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQzNDLE1BQU0sRUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDbkIsRUFDRDtnQkFDSSxNQUFNLEVBQUUsUUFBUTtnQkFDaEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsY0FBYyxFQUFFLGFBQWE7YUFDaEMsQ0FDSixDQUFDO1lBRUYsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkMsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0lBRUssT0FBTzs7WUFDVCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkQsSUFBSSxJQUFJLENBQUM7WUFFVCxXQUFXO1lBQ1gsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsSUFBSTtvQkFDQSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDMUI7Z0JBQUMs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