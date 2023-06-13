"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class SStateFsAdapter {
    constructor(id, settings) {
        this.async = true;
        this._id = id;
        this._settings = settings;
    }
    _init() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { __packageTmpDir } = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/sugar/path')));
            this._statesDir =
                (_b = (_a = this._settings) === null || _a === void 0 ? void 0 : _a.folder) !== null && _b !== void 0 ? _b : `${__packageTmpDir()}/states`;
            this._stateFile = `${this._statesDir}/${this._id}.state.json`;
        });
    }
    save(state) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const _fs = yield Promise.resolve().then(() => __importStar(require('fs')));
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
            const _fs = yield Promise.resolve().then(() => __importStar(require('fs')));
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
exports.default = SStateFsAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsTUFBcUIsZUFBZTtJQU1oQyxZQUFZLEVBQVUsRUFBRSxRQUE0QztRQUxwRSxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBTVQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBQ0ssS0FBSzs7O1lBQ1AsTUFBTSxFQUFFLGVBQWUsRUFBRSxHQUFHLHdEQUFhLDBCQUEwQixHQUFDLENBQUM7WUFFckUsSUFBSSxDQUFDLFVBQVU7Z0JBQ1gsTUFBQSxNQUFBLElBQUksQ0FBQyxTQUFTLDBDQUFFLE1BQU0sbUNBQUksR0FBRyxlQUFlLEVBQUUsU0FBUyxDQUFDO1lBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQzs7S0FDakU7SUFDRCxJQUFJLENBQUMsS0FBVTtRQUNYLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtZQUNqQyxNQUFNLEdBQUcsR0FBRyx3REFBYSxJQUFJLEdBQUMsQ0FBQztZQUUvQixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVuQiwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNsQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNsQztZQUNELElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ2pDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ25DO1lBQ0QsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxJQUFJO1FBQ0EsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sR0FBRyxHQUFHLHdEQUFhLElBQUksR0FBQyxDQUFDO1lBRS9CLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRW5CLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNqQyxXQUFXLEdBQUcsR0FBRztxQkFDWixZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7cUJBQ3RDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1lBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBakRELGtDQWlEQyJ9