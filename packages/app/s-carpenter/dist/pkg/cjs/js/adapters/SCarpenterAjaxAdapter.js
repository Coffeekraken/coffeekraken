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
            const response = yield fetch(this.carpenter.props.endpoints.nodes
                .replace('%base', this.carpenter.props.endpoints.base)
                .replace('%uid', this.element.uid), {
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
                const response = yield fetch(this.carpenter.props.endpoints.specs
                    .replace('%base', this.carpenter.props.endpoints.base)
                    .replace('%specs', this.specs), {
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
            const rawResponse = yield fetch(this.carpenter.props.endpoints.nodes
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
            const doc = new DOMParser().parseFromString(response.html, 'text/html'), 
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTBEO0FBSzFELDZFQUF1RDtBQUV2RCxNQUFxQixxQkFBc0IsU0FBUSwyQkFBbUI7SUFDbEUsWUFBWSxJQUE0QjtRQUNwQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVLLE1BQU07O1lBQ1IsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLO2lCQUMvQixPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7aUJBQ3JELE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFDdEM7Z0JBQ0ksTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxVQUFVO2dCQUNqQixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsT0FBTyxFQUFFO29CQUNMLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ3JDO2dCQUNELGNBQWMsRUFBRSxhQUFhO2FBQ2hDLENBQ0osQ0FBQztZQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25DLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVLLE9BQU87O1lBQ1QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELElBQUksSUFBSSxDQUFDO1lBRVQsV0FBVztZQUNYLElBQUksR0FBRyxFQUFFO2dCQUNMLElBQUk7b0JBQ0EsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FB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