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
const SCarpenterNodeAdapter_1 = __importDefault(require("../SCarpenterNodeAdapter"));
class SCarpenterNodeAjaxAdapter extends SCarpenterNodeAdapter_1.default {
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
    status(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.carpenter.props.endpoints.nodes
                .replace('%base', this.carpenter.props.endpoints.base)
                .replace('%uid', uid)}/status`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'no-referrer',
            });
            return yield response.json();
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
        var _a;
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
            // get all the containers
            const containers = Array.from((_a = this.element.$elm.querySelectorAll('[s-container]')) !== null && _a !== void 0 ? _a : [])
                .filter(($container) => {
                return $container.querySelector('[s-container]') === null;
            })
                .map(($container) => {
                return {
                    containerId: $container.getAttribute('s-container'),
                    html: $container.innerHTML,
                    $elm: $container,
                };
            });
            // @ts-ignore
            this.element.$elm.after($newComponent);
            // remove old element
            this.element.$elm.remove();
            // restore "containers"
            let lastContainer;
            containers.forEach((container) => {
                _console.log('id0', container.containerId);
                const $container = $newComponent.querySelector(`[s-container="${container.containerId}"]`);
                _console.log('con', $container);
                if (!$container && lastContainer) {
                    // put the content of the container inside the last one
                    lastContainer.$elm.innerHTML += container.html;
                    return;
                }
                $container.after(container.$elm);
                $container.remove();
                // update the lastContainer
                lastContainer = container;
            });
            // return the new node
            return $newNode;
        });
    }
}
exports.default = SCarpenterNodeAjaxAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTBEO0FBRzFELHFGQUErRDtBQUkvRCxNQUFxQix5QkFBMEIsU0FBUSwrQkFBdUI7SUFDMUUsWUFBWSxJQUFnQztRQUN4QyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVLLE1BQU07O1lBQ1IsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLO2lCQUMvQixPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7aUJBQ3JELE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFDdEM7Z0JBQ0ksTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxVQUFVO2dCQUNqQixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsT0FBTyxFQUFFO29CQUNMLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ3JDO2dCQUNELGNBQWMsRUFBRSxhQUFhO2FBQ2hDLENBQ0osQ0FBQztZQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25DLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVLLE9BQU87O1lBQ1QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELElBQUksSUFBSSxDQUFDO1lBRVQsV0FBVztZQUNYLElBQUksR0FBRyxFQUFFO2dCQUNMLElBQUk7b0JBQ0EsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FB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