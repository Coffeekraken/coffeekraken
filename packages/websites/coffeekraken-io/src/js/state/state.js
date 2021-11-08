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
            version = document.location.hostname
                .split('.')
                .slice(0, 3)
                .join('.')
                .replace(/^v/, '');
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
    return __awaiter(this, void 0, void 0, function* () {
        const state = getState();
        // if (_docmap) return _docmap;
        // if (_docmapPromise) return (await _docmapPromise).data;
        // // const request = new __SRequest({
        // //     url: `/api/docmap?v=${state.version ?? ''}`,
        // //     method: 'GET',
        // // });
        // const promise = request.send();
        // _docmapPromise = promise;
        // _docmap = (await promise).data;
        // return _docmap;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBR2QsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsTUFBTSxVQUFVLFFBQVE7O0lBQ3BCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ3BCLE1BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsbUNBQUksSUFBSSxDQUN4RCxDQUFDO0lBQ0YsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVELE1BQU0sVUFBZ0IsaUJBQWlCOztRQUNuQyxNQUFNLFVBQVUsR0FBRyxNQUFNLFVBQVUsRUFBRSxDQUFDO1FBRXRDLElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNuRCxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRO2lCQUMvQixLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNYLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ1QsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMxQjtRQUVELE9BQU8sT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQUE7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLFFBQVE7SUFDN0IsTUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDekIsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5QyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDNUUsQ0FBQztBQUVELElBQUksT0FBTyxFQUFFLGNBQWMsQ0FBQztBQUM1QixNQUFNLFVBQWdCLFVBQVU7O1FBQzVCLE1BQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLCtCQUErQjtRQUMvQiwwREFBMEQ7UUFFMUQsc0NBQXNDO1FBQ3RDLHNEQUFzRDtRQUN0RCx3QkFBd0I7UUFDeEIsU0FBUztRQUVULGtDQUFrQztRQUNsQyw0QkFBNEI7UUFDNUIsa0NBQWtDO1FBQ2xDLGtCQUFrQjtJQUN0QixDQUFDO0NBQUEifQ==