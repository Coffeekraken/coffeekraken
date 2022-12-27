var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class SStateFsAdapter {
    constructor(id, settings) {
        this.async = true;
        this._id = id;
        this._settings = settings;
    }
    _init() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const _packageTmpDir = (yield import('@coffeekraken/sugar/node/path/packageTmpDir')).default;
            this._statesDir =
                (_b = (_a = this._settings) === null || _a === void 0 ? void 0 : _a.folder) !== null && _b !== void 0 ? _b : `${_packageTmpDir()}/states`;
            this._stateFile = `${this._statesDir}/${this._id}.state.json`;
        });
    }
    save(state) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const _fs = yield import('fs');
            yield this._init();
            // write the new state file
            if (!_fs.existsSync(this._statesDir)) {
                _fs.mkdirSync(this._statesDir);
            }
            if (_fs.existsSync(this._stateFile)) {
                _fs.unlinkSync(this._stateFile);
            }
            _fs.writeFileSync(this._stateFile, JSON.stringify(state, null, 4));
            resolve();
        }));
    }
    load() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const _fs = yield import('fs');
            yield this._init();
            let fileContent = '{}';
            if (_fs.existsSync(this._stateFile)) {
                fileContent = _fs
                    .readFileSync(this._stateFile, 'utf-8')
                    .toString();
            }
            resolve(JSON.parse(fileContent));
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQW1CQSxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWU7SUFNaEMsWUFBWSxFQUFVLEVBQUUsUUFBNEM7UUFMcEUsVUFBSyxHQUFHLElBQUksQ0FBQztRQU1ULElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUNLLEtBQUs7OztZQUNQLE1BQU0sY0FBYyxHQUFHLENBQ25CLE1BQU0sTUFBTSxDQUFDLDZDQUE2QyxDQUFDLENBQzlELENBQUMsT0FBTyxDQUFDO1lBRVYsSUFBSSxDQUFDLFVBQVU7Z0JBQ1gsTUFBQSxNQUFBLElBQUksQ0FBQyxTQUFTLDBDQUFFLE1BQU0sbUNBQUksR0FBRyxjQUFjLEVBQUUsU0FBUyxDQUFDO1lBQzNELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQzs7S0FDakU7SUFDRCxJQUFJLENBQUMsS0FBVTtRQUNYLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtZQUNqQyxNQUFNLEdBQUcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUvQixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVuQiwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNsQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNsQztZQUNELElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ2pDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ25DO1lBQ0QsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxJQUFJO1FBQ0EsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRS9CLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRW5CLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNqQyxXQUFXLEdBQUcsR0FBRztxQkFDWixZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7cUJBQ3RDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1lBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKIn0=