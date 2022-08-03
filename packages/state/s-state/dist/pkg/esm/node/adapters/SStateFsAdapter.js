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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQW1CQSxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWU7SUFLaEMsWUFBWSxFQUFVLEVBQUUsUUFBNEM7UUFDaEUsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBQ0ssS0FBSzs7O1lBQ1AsTUFBTSxjQUFjLEdBQUcsQ0FDbkIsTUFBTSxNQUFNLENBQUMsNkNBQTZDLENBQUMsQ0FDOUQsQ0FBQyxPQUFPLENBQUM7WUFFVixJQUFJLENBQUMsVUFBVTtnQkFDWCxNQUFBLE1BQUEsSUFBSSxDQUFDLFNBQVMsMENBQUUsTUFBTSxtQ0FBSSxHQUFHLGNBQWMsRUFBRSxTQUFTLENBQUM7WUFDM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDOztLQUNqRTtJQUNELElBQUksQ0FBQyxLQUFVO1FBQ1gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRS9CLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRW5CLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ2xDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDakMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbkM7WUFDRCxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkUsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELElBQUk7UUFDQSxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7WUFDakMsTUFBTSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFL0IsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFbkIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ2pDLFdBQVcsR0FBRyxHQUFHO3FCQUNaLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQztxQkFDdEMsUUFBUSxFQUFFLENBQUM7YUFDbkI7WUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0oifQ==