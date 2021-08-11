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
            method: 'GET'
        });
        const promise = request.send();
        _docmapPromise = promise;
        _docmap = (yield promise).data;
        return _docmap;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxNQUFNLFVBQVUsUUFBUTs7SUFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLG1DQUFJLElBQUksQ0FBQyxDQUFDO0lBQ2hGLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxNQUFNLFVBQWdCLGlCQUFpQjs7UUFDbkMsTUFBTSxVQUFVLEdBQUcsTUFBTSxVQUFVLEVBQUUsQ0FBQztRQUV0QyxJQUFJLE9BQU8sQ0FBQztRQUNaLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDbkQsT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pGO1FBRUQsT0FBTyxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FBQTtBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsUUFBUTtJQUM3QixNQUFNLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQztJQUN6QixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFDO0FBRUQsSUFBSSxPQUFPLEVBQUUsY0FBYyxDQUFDO0FBQzVCLE1BQU0sVUFBZ0IsVUFBVTs7O1FBRTVCLE1BQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBQzNCLElBQUksT0FBTztZQUFFLE9BQU8sT0FBTyxDQUFDO1FBQzlCLElBQUksY0FBYztZQUFFLE9BQU8sQ0FBQyxNQUFNLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVyRCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUMzQixHQUFHLEVBQUUsaUJBQWlCLE1BQUEsS0FBSyxDQUFDLE9BQU8sbUNBQUksRUFBRSxFQUFFO1lBQzNDLE1BQU0sRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixjQUFjLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQy9CLE9BQU8sT0FBTyxDQUFDOztDQUNoQiJ9