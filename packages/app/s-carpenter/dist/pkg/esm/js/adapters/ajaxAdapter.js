var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default {
    apply($elm, props) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Set', $elm, props);
            const rawResponse = yield fetch(document.location.href, {
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
            // @ts-ignore
            $elm.after($newComponent);
            $elm.remove();
            return $newComponent;
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGVBQWU7SUFDTCxLQUFLLENBQUMsSUFBaUIsRUFBRSxLQUFVOztZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFaEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BELE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRTtvQkFDTCxNQUFNLEVBQUUsa0JBQWtCO29CQUMxQixjQUFjLEVBQUUsa0JBQWtCO2lCQUNyQztnQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7YUFDOUIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxZQUFZLEdBQUcsTUFBTSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFOUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztZQUNsRSxhQUFhO1lBQ2IsYUFBYSxHQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUVyRCxhQUFhO1lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUUxQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFZCxPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO0tBQUE7Q0FDSixDQUFDIn0=