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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_hash_1 = __importDefault(require("object-hash"));
const sha256_1 = __importDefault(require("../../shared/crypt/sha256"));
const extension_1 = __importDefault(require("../fs/extension"));
const fileHash_1 = __importDefault(require("../fs/fileHash"));
function dependenciesHash(dependenciesObj, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        settings = Object.assign({ recursive: true }, settings);
        let dataHash = '', filesHashes = [];
        // files hashing
        if (dependenciesObj.files) {
            for (let i = 0; i < dependenciesObj.files.length; i++) {
                const filePath = dependenciesObj.files[i];
                let fileDepsHash = '';
                if (settings.recursive) {
                    switch ((0, extension_1.default)(filePath)) {
                        case 'js':
                            const jsFileExports = yield Promise.resolve().then(() => __importStar(require(filePath)));
                            if (jsFileExports.dependencies) {
                                let deps = jsFileExports.dependencies;
                                if (typeof jsFileExports.dependencies === 'function') {
                                    deps = jsFileExports.dependencies();
                                    fileDepsHash = yield dependenciesHash(deps, settings);
                                }
                            }
                            break;
                    }
                }
                // generate a hash for the file
                const fileHash = yield (0, fileHash_1.default)(filePath);
                // add this hash to the files hashes array
                filesHashes.push(sha256_1.default.encrypt(`${fileHash}-${fileDepsHash}`));
            }
        }
        // data hashing
        if (dependenciesObj.data) {
            dataHash = (0, object_hash_1.default)(dependenciesObj.data);
        }
        return sha256_1.default.encrypt(`${dataHash}-${filesHashes.join('-')}`);
    });
}
exports.default = dependenciesHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBdUM7QUFDdkMsdUVBQWlEO0FBQ2pELGdFQUEwQztBQUMxQyw4REFBd0M7QUFrRHhDLFNBQThCLGdCQUFnQixDQUMxQyxlQUFtQyxFQUNuQyxRQUFrQzs7UUFFbEMsUUFBUSxtQkFDSixTQUFTLEVBQUUsSUFBSSxJQUNaLFFBQVEsQ0FDZCxDQUFDO1FBRUYsSUFBSSxRQUFRLEdBQUcsRUFBRSxFQUNiLFdBQVcsR0FBYSxFQUFFLENBQUM7UUFFL0IsZ0JBQWdCO1FBQ2hCLElBQUksZUFBZSxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25ELE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztnQkFFdEIsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO29CQUNwQixRQUFRLElBQUEsbUJBQVcsRUFBQyxRQUFRLENBQUMsRUFBRTt3QkFDM0IsS0FBSyxJQUFJOzRCQUNMLE1BQU0sYUFBYSxHQUFHLHdEQUFhLFFBQVEsR0FBQyxDQUFDOzRCQUM3QyxJQUFJLGFBQWEsQ0FBQyxZQUFZLEVBQUU7Z0NBQzVCLElBQUksSUFBSSxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUM7Z0NBQ3RDLElBQ0ksT0FBTyxhQUFhLENBQUMsWUFBWSxLQUFLLFVBQVUsRUFDbEQ7b0NBQ0UsSUFBSSxHQUFHLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQ0FDcEMsWUFBWSxHQUFHLE1BQU0sZ0JBQWdCLENBQ2pDLElBQUksRUFDSixRQUFRLENBQ1gsQ0FBQztpQ0FDTDs2QkFDSjs0QkFDRCxNQUFNO3FCQUNiO2lCQUNKO2dCQUVELCtCQUErQjtnQkFDL0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFBLGtCQUFVLEVBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRTVDLDBDQUEwQztnQkFDMUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFFBQVEsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDckU7U0FDSjtRQUVELGVBQWU7UUFDZixJQUFJLGVBQWUsQ0FBQyxJQUFJLEVBQUU7WUFDdEIsUUFBUSxHQUFHLElBQUEscUJBQVksRUFBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLGdCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsUUFBUSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Q0FBQTtBQXBERCxtQ0FvREMifQ==