// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SRequest from '@coffeekraken/s-request';
export function getState() {
    var _a;
    const state = JSON.parse((_a = window.localStorage.getItem('coffeekrakenio')) !== null && _a !== void 0 ? _a : '{}');
    return state;
}
// export async function getCurrentVersion(): string {
//     const docmapJson = await loadDocmap();
//     let version;
//     if (document.location.hostname.split('.').length >= 4) {
//         version = document.location.hostname
//             .split('.')
//             .slice(0, 3)
//             .join('.')
//             .replace(/^v/, '');
//     }
//     return version ?? docmapJson.snapshots.slice(-1)[0];
// }
export function setState(stateObj) {
    const state = getState();
    const newState = __deepMerge(state, stateObj);
    window.localStorage.setItem('coffeekrakenio', JSON.stringify(newState));
}
let _docmap, _docmapPromise;
export function loadDocmap() {
    return __awaiter(this, void 0, void 0, function* () {
        const state = getState();
        if (_docmap)
            return _docmap;
        if (_docmapPromise)
            return (yield _docmapPromise).data;
        const request = new __SRequest({
            url: `/docmap.json`,
            method: 'GET',
        });
        const promise = request.send();
        _docmapPromise = promise;
        _docmap = (yield promise).data;
        return _docmap;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQsTUFBTSxVQUFVLFFBQVE7O0lBQ3BCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ3BCLE1BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsbUNBQUksSUFBSSxDQUN4RCxDQUFDO0lBQ0YsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVELHNEQUFzRDtBQUN0RCw2Q0FBNkM7QUFFN0MsbUJBQW1CO0FBQ25CLCtEQUErRDtBQUMvRCwrQ0FBK0M7QUFDL0MsMEJBQTBCO0FBQzFCLDJCQUEyQjtBQUMzQix5QkFBeUI7QUFDekIsa0NBQWtDO0FBQ2xDLFFBQVE7QUFFUiwyREFBMkQ7QUFDM0QsSUFBSTtBQUVKLE1BQU0sVUFBVSxRQUFRLENBQUMsUUFBUTtJQUM3QixNQUFNLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQztJQUN6QixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFDO0FBRUQsSUFBSSxPQUFPLEVBQUUsY0FBYyxDQUFDO0FBQzVCLE1BQU0sVUFBZ0IsVUFBVTs7UUFDNUIsTUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDekIsSUFBSSxPQUFPO1lBQUUsT0FBTyxPQUFPLENBQUM7UUFDNUIsSUFBSSxjQUFjO1lBQUUsT0FBTyxDQUFDLE1BQU0sY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRXZELE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDO1lBQzNCLEdBQUcsRUFBRSxjQUFjO1lBQ25CLE1BQU0sRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixjQUFjLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQy9CLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7Q0FBQSJ9