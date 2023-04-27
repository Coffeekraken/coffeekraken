"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const html_1 = require("@coffeekraken/sugar/html");
const SCarpenterAdapter_1 = __importDefault(require("../SCarpenterAdapter"));
class SCarpenterAjaxAdapter extends SCarpenterAdapter_1.default {
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
                    data = JSON.parse((0, html_1.__unescapeHtml)(this.element.$node.innerHTML));
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
exports.default = SCarpenterAjaxAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTBEO0FBSzFELDZFQUF1RDtBQUV2RCxNQUFxQixxQkFBc0IsU0FBUSwyQkFBbUI7SUFDbEUsWUFBWSxJQUE0QjtRQUNwQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVLLE1BQU07O1lBQ1IsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FDM0MsTUFBTSxFQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNuQixFQUNEO2dCQUNJLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsVUFBVTtnQkFDakIsV0FBVyxFQUFFLGFBQWE7Z0JBQzFCLE9BQU8sRUFBRTtvQkFDTCxjQUFjLEVBQUUsa0JBQWtCO2lCQUNyQztnQkFDRCxjQUFjLEVBQUUsYUFBYTthQUNoQyxDQUNKLENBQUM7WUFFRixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFSyxPQUFPOztZQUNULElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuRCxJQUFJLElBQUksQ0FBQztZQUVULFdBQVc7WUFDWCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxJQUFJO29CQUNBLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUMxQjtnQkFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO2FBQ2pCO1lBRUQsWUFBWTtZQUNaLElBQUksQ0FBQyxJQUFJLEtBQUks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