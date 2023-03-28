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
            console.log('LOA', dotpath, props, component.props);
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
            _console.log('new', $newComponent, $elm);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbURBQTBEO0FBRTFELGtCQUFlO0lBQ0wsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7O1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXBELE1BQU0sV0FBVyxHQUFHLE1BQU0sS0FBSyxDQUMzQixTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUN0RDtnQkFDSSxNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLGtCQUFrQjtvQkFDMUIsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzlCLENBQ0osQ0FBQztZQUVGLE1BQU0sWUFBWSxHQUFHLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlDLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUM7WUFDbEUsYUFBYTtZQUNiLGFBQWEsR0FBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFFckQsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFOztZQUM1Qyx5QkFBeUI7WUFDekIsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNsQyxPQUFPO2dCQUNQLEtBQUs7Z0JBQ0wsU0FBUzthQUNaLENBQUMsQ0FB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