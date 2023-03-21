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
Object.defineProperty(exports, "__esModule", { value: true });
const html_1 = require("@coffeekraken/sugar/html");
exports.default = {
    load({ dotpath, props, component }) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawResponse = yield fetch(component.props.pagesLink.replace('%dotpath', dotpath), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(props),
            });
            const responseHtml = yield rawResponse.text();
            const doc = new DOMParser().parseFromString(responseHtml, 'text/html'), 
            // @ts-ignore
            $newComponent = doc.body.firstChild;
            return $newComponent;
        });
    },
    change({ dotpath, props, component, $elm }) {
        return __awaiter(this, void 0, void 0, function* () {
            // load the new component
            const $newComponent = yield this.load({
                dotpath,
                props,
                component,
            });
            // @ts-ignore
            if ($elm) {
                // add the new component after the current one
                $elm.after($newComponent);
                // remove old element
                $elm.remove();
            }
            // return the new component
            return $newComponent;
        });
    },
    getProps({ $elm }) {
        return __awaiter(this, void 0, void 0, function* () {
            let raw = $elm.getAttribute('s-specs-values');
            let props;
            // try json
            if (raw) {
                try {
                    props = JSON.parse(raw);
                }
                catch (e) { }
            }
            // ajax call
            if (!props && (raw === null || raw === void 0 ? void 0 : raw.match(/^(https?\:\/\/|\/)/))) {
                const rawResponse = yield fetch(raw, {
                    method: 'GET',
                });
                props = yield rawResponse.json();
            }
            // template in the dom
            if (!props) {
                for (let i = 0; i < $elm.children.length; i++) {
                    const $child = $elm.children[i];
                    if ($child.tagName === 'TEMPLATE' &&
                        $child.hasAttribute('s-specs-values')) {
                        try {
                            props = JSON.parse((0, html_1.__unescapeHtml)($child.innerHTML));
                        }
                        catch (e) {
                            console.log($child.innerHTML);
                            console.error(e.message);
                        }
                        break;
                    }
                }
            }
            return props;
        });
    },
    setProps({ $elm, props, component }) {
        return __awaiter(this, void 0, void 0, function* () {
            // load the new component
            const $newComponent = yield this.load({
                dotpath: component.currentSpecs.metas.dotpath,
                props,
                component,
            });
            // keep the element id
            $newComponent.id = $elm.id;
            // @ts-ignore
            $elm.after($newComponent);
            // remove old element
            $elm.remove();
            // return the new component
            return $newComponent;
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbURBQTBEO0FBRTFELGtCQUFlO0lBQ0wsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7O1lBQ3BDLE1BQU0sV0FBVyxHQUFHLE1BQU0sS0FBSyxDQUMzQixTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUN0RDtnQkFDSSxNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLGtCQUFrQjtvQkFDMUIsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzlCLENBQ0osQ0FBQztZQUVGLE1BQU0sWUFBWSxHQUFHLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlDLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUM7WUFDbEUsYUFBYTtZQUNiLGFBQWEsR0FBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFFckQsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFOztZQUM1Qyx5QkFBeUI7WUFDekIsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNsQyxPQUFPO2dCQUNQLEtBQUs7Z0JBQ0wsU0FBUzthQUNaLENBQUMsQ0FBQztZQUVILGFBQWE7WUFDYixJQUFJLElBQUksRUFBRTtnQkFDTiw4Q0FBOEM7Z0JBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFD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