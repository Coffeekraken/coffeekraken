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
import __SRequest from '@coffeekraken/s-request';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export function getState() {
    var _a;
    const state = JSON.parse((_a = window.localStorage.getItem('coffeekrakenio')) !== null && _a !== void 0 ? _a : '{}');
    return state;
}
export function getCurrentVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        const docmapJson = yield loadDocmap();
        let version;
        if (document.location.hostname.split('.').length >= 4) {
            version = document.location.hostname.split('.').slice(0, 3).join('.').replace(/^v/, '');
        }
        return version !== null && version !== void 0 ? version : docmapJson.snapshots.slice(-1)[0];
    });
}
export function setState(stateObj) {
    const state = getState();
    const newState = __deepMerge(state, stateObj);
    window.localStorage.setItem('coffeekrakenio', JSON.stringify(newState));
}
let _docmap, _docmapPromise;
export function loadDocmap() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const state = getState();
        if (_docmap)
            return _docmap;
        if (_docmapPromise)
            return (yield _docmapPromise).data;
        const request = new __SRequest({
            url: `/api/docmap?v=${(_a = state.version) !== null && _a !== void 0 ? _a : ''}`,
            method: 'GET',
        });
        const promise = request.send();
        _docmapPromise = promise;
        _docmap = (yield promise).data;
        return _docmap;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsTUFBTSxVQUFVLFFBQVE7O0lBQ3BCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxtQ0FBSSxJQUFJLENBQUMsQ0FBQztJQUNoRixPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQsTUFBTSxVQUFnQixpQkFBaUI7O1FBQ25DLE1BQU0sVUFBVSxHQUFHLE1BQU0sVUFBVSxFQUFFLENBQUM7UUFFdEMsSUFBSSxPQUFPLENBQUM7UUFDWixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ25ELE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMzRjtRQUVELE9BQU8sT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQUE7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLFFBQVE7SUFDN0IsTUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDekIsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5QyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDNUUsQ0FBQztBQUVELElBQUksT0FBTyxFQUFFLGNBQWMsQ0FBQztBQUM1QixNQUFNLFVBQWdCLFVBQVU7OztRQUM1QixNQUFNLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUN6QixJQUFJLE9BQU87WUFBRSxPQUFPLE9BQU8sQ0FBQztRQUM1QixJQUFJLGNBQWM7WUFBRSxPQUFPLENBQUMsTUFBTSxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFdkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUM7WUFDM0IsR0FBRyxFQUFFLGlCQUFpQixNQUFBLEtBQUssQ0FBQyxPQUFPLG1DQUFJLEVBQUUsRUFBRTtZQUMzQyxNQUFNLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUN6QixPQUFPLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMvQixPQUFPLE9BQU8sQ0FBQzs7Q0FDbEIifQ==