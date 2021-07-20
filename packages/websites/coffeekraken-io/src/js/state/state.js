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
export function loadState() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const state = JSON.parse((_a = window.localStorage.getItem('coffeekrakenio')) !== null && _a !== void 0 ? _a : '{}');
        return state;
    });
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
    return __awaiter(this, void 0, void 0, function* () {
        const state = yield loadState();
        const newState = __deepMerge(state, stateObj);
        window.localStorage.setItem('coffeekrakenio', JSON.stringify(newState));
    });
}
let _docmap, _docmapPromise;
export function loadDocmap() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const state = yield loadState();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxNQUFNLFVBQWdCLFNBQVM7OztRQUMzQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsbUNBQUksSUFBSSxDQUFDLENBQUM7UUFDaEYsT0FBTyxLQUFLLENBQUM7O0NBQ2hCO0FBRUQsTUFBTSxVQUFnQixpQkFBaUI7O1FBQ25DLE1BQU0sVUFBVSxHQUFHLE1BQU0sVUFBVSxFQUFFLENBQUM7UUFFdEMsSUFBSSxPQUFPLENBQUM7UUFDWixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ25ELE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztTQUN6RjtRQUVELE9BQU8sT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQUE7QUFFRCxNQUFNLFVBQWdCLFFBQVEsQ0FBQyxRQUFROztRQUNuQyxNQUFNLEtBQUssR0FBRyxNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FBQTtBQUVELElBQUksT0FBTyxFQUFFLGNBQWMsQ0FBQztBQUM1QixNQUFNLFVBQWdCLFVBQVU7OztRQUU1QixNQUFNLEtBQUssR0FBRyxNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ2xDLElBQUksT0FBTztZQUFFLE9BQU8sT0FBTyxDQUFDO1FBQzlCLElBQUksY0FBYztZQUFFLE9BQU8sQ0FBQyxNQUFNLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVyRCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUMzQixHQUFHLEVBQUUsaUJBQWlCLE1BQUEsS0FBSyxDQUFDLE9BQU8sbUNBQUksRUFBRSxFQUFFO1lBQzNDLE1BQU0sRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixjQUFjLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQy9CLE9BQU8sT0FBTyxDQUFDOztDQUNoQiJ9