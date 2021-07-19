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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const state = yield loadState();
        const docmapJson = yield loadDocmap();
        return (_a = state.version) !== null && _a !== void 0 ? _a : docmapJson.snapshots[0];
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
    return __awaiter(this, void 0, void 0, function* () {
        const state = yield loadState();
        if (_docmap)
            return _docmap;
        if (_docmapPromise)
            return (yield _docmapPromise).data;
        const request = new __SRequest({
            url: `/api/docmap?v=${state.version}`,
            method: 'GET'
        });
        const promise = request.send();
        _docmapPromise = promise;
        _docmap = (yield promise).data;
        return _docmap;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxNQUFNLFVBQWdCLFNBQVM7OztRQUMzQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsbUNBQUksSUFBSSxDQUFDLENBQUM7UUFDaEYsT0FBTyxLQUFLLENBQUM7O0NBQ2hCO0FBRUQsTUFBTSxVQUFnQixpQkFBaUI7OztRQUNuQyxNQUFNLEtBQUssR0FBRyxNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sVUFBVSxHQUFHLE1BQU0sVUFBVSxFQUFFLENBQUM7UUFDdEMsT0FBTyxNQUFBLEtBQUssQ0FBQyxPQUFPLG1DQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7O0NBQ25EO0FBRUQsTUFBTSxVQUFnQixRQUFRLENBQUMsUUFBUTs7UUFDbkMsTUFBTSxLQUFLLEdBQUcsTUFBTSxTQUFTLEVBQUUsQ0FBQztRQUNoQyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0NBQUE7QUFFRCxJQUFJLE9BQU8sRUFBRSxjQUFjLENBQUM7QUFDNUIsTUFBTSxVQUFnQixVQUFVOztRQUU1QixNQUFNLEtBQUssR0FBRyxNQUFNLFNBQVMsRUFBRSxDQUFDO1FBQ2xDLElBQUksT0FBTztZQUFFLE9BQU8sT0FBTyxDQUFDO1FBQzlCLElBQUksY0FBYztZQUFFLE9BQU8sQ0FBQyxNQUFNLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVyRCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUMzQixHQUFHLEVBQUUsaUJBQWlCLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDckMsTUFBTSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLGNBQWMsR0FBRyxPQUFPLENBQUM7UUFDekIsT0FBTyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDL0IsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUFBIn0=