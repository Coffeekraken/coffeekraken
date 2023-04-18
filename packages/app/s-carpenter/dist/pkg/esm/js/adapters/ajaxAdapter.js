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
export default {
    load({ dotpath, values, component }) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawResponse = yield fetch(component.props.pagesLink.replace('%dotpath', dotpath), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const responseHtml = yield rawResponse.text();
            const doc = new DOMParser().parseFromString(responseHtml, 'text/html'), 
            // @ts-ignore
            $newComponent = doc.body.firstChild;
            return $newComponent;
        });
    },
    change({ dotpath, values, component, $elm }) {
        return __awaiter(this, void 0, void 0, function* () {
            // load the new component
            const $newComponent = yield this.load({
                dotpath,
                values,
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
    getData({ $elm }) {
        return __awaiter(this, void 0, void 0, function* () {
            // if ($elm._sCarpenterData) {
            //     return $elm._sCarpenterData;
            // }
            let raw = $elm.getAttribute('s-specs-data');
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
                for (let i = 0; i < $elm.children.length; i++) {
                    const $child = $elm.children[i];
                    if ($child.tagName === 'TEMPLATE' &&
                        $child.hasAttribute('s-specs-data')) {
                        try {
                            data = JSON.parse(__unescapeHtml($child.innerHTML));
                        }
                        catch (e) {
                            console.log($child.innerHTML);
                            console.error(e.message);
                        }
                        break;
                    }
                }
            }
            // save in element
            // $elm._sCarpenterData = data;
            return data;
        });
    },
    setValues({ $elm, values, dotpath, component, }) {
        return __awaiter(this, void 0, void 0, function* () {
            // load the new component
            const $newComponent = yield this.load({
                dotpath,
                values,
                component,
            });
            // keep the element id and the s-specs
            $newComponent.id = $elm.id;
            if (!$newComponent.hasAttribute('s-specs')) {
                $newComponent.setAttribute('s-specs', dotpath);
            }
            _console.log('Add', $newComponent, $elm);
            // @ts-ignore
            $elm.after($newComponent);
            // remove old element
            $elm.remove();
            // return the new component
            return $newComponent;
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUUxRCxlQUFlO0lBQ0wsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUU7O1lBQ3JDLE1BQU0sV0FBVyxHQUFHLE1BQU0sS0FBSyxDQUMzQixTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUN0RDtnQkFDSSxNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLGtCQUFrQjtvQkFDMUIsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2FBQy9CLENBQ0osQ0FBQztZQUVGLE1BQU0sWUFBWSxHQUFHLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlDLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUM7WUFDbEUsYUFBYTtZQUNiLGFBQWEsR0FBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFFckQsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFOztZQUM3Qyx5QkFBeUI7WUFDekIsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNsQyxPQUFPO2dCQUNQLE1BQU07Z0JBQ04sU0FBUzthQUNaLENBQUMsQ0FBQztZQUVILGFBQWE7WUFDYixJQUFJLElBQUksRUFBRTtnQkFDTiw4Q0FBOEM7Z0JBQzlDLElB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