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
            console.log('new', $newComponent, $elm);
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
    setProps({ $elm, props, component }) {
        return __awaiter(this, void 0, void 0, function* () {
            // load the new component
            const $newComponent = yield this.load({
                dotpath: component.state.currentSpecs.metas.dotpath,
                props,
                component,
            });
            // @ts-ignore
            $elm.after($newComponent);
            // remove old element
            $elm.remove();
            // return the new component
            return $newComponent;
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWU7SUFDTCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTs7WUFDcEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxLQUFLLENBQzNCLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQ3REO2dCQUNJLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRTtvQkFDTCxNQUFNLEVBQUUsa0JBQWtCO29CQUMxQixjQUFjLEVBQUUsa0JBQWtCO2lCQUNyQztnQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7YUFDOUIsQ0FDSixDQUFDO1lBRUYsTUFBTSxZQUFZLEdBQUcsTUFBTSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztZQUNsRSxhQUFhO1lBQ2IsYUFBYSxHQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUVyRCxPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFFSyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUU7O1lBQzVDLHlCQUF5QjtZQUN6QixNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ2xDLE9BQU87Z0JBQ1AsS0FBSztnQkFDTCxTQUFTO2FBQ1osQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRXhDLGFBQWE7WUFDYixJQUFJLElBQUksRUFBRTtnQkFDTiw4Q0FBOEM7Z0JBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBRTFCLHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2pCO1lBRUQsMkJBQTJCO1lBQzNCLE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7S0FBQTtJQUVLLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFOztZQUNyQyx5QkFBeUI7WUFDekIsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNsQyxPQUFPLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU87Z0JBQ25ELEtBQUs7Z0JBQ0wsU0FBUzthQUNaLENBQUMsQ0FBQztZQUVILGFBQWE7WUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTFCLHFCQUFxQjtZQUNyQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFZCwyQkFBMkI7WUFDM0IsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztLQUFBO0NBQ0osQ0FBQyJ9