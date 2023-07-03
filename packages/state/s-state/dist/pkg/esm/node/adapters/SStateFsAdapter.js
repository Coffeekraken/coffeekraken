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
            const { __packageTmpDir } = yield import('@coffeekraken/sugar/path');
            this._statesDir =
                (_b = (_a = this._settings) === null || _a === void 0 ? void 0 : _a.folder) !== null && _b !== void 0 ? _b : `${__packageTmpDir()}/states`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQW9CQSxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWU7SUFNaEMsWUFBWSxFQUFVLEVBQUUsUUFBNEM7UUFMcEUsVUFBSyxHQUFHLElBQUksQ0FBQztRQU1ULElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUNLLEtBQUs7OztZQUNQLE1BQU0sRUFBRSxlQUFlLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBRXJFLElBQUksQ0FBQyxVQUFVO2dCQUNYLE1BQUEsTUFBQSxJQUFJLENBQUMsU0FBUywwQ0FBRSxNQUFNLG1DQUFJLEdBQUcsZUFBZSxFQUFFLFNBQVMsQ0FBQztZQUM1RCxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUM7O0tBQ2pFO0lBQ0QsSUFBSSxDQUFDLEtBQVU7UUFDWCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7WUFDakMsTUFBTSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFL0IsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFbkIsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDbEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbEM7WUFDRCxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNqQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNuQztZQUNELEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsSUFBSTtRQUNBLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtZQUNqQyxNQUFNLEdBQUcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUvQixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVuQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDakMsV0FBVyxHQUFHLEdBQUc7cUJBQ1osWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDO3FCQUN0QyxRQUFRLEVBQUUsQ0FBQzthQUNuQjtZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiJ9