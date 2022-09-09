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
const fs_1 = require("@coffeekraken/sugar/fs");
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
                    switch ((0, fs_1.__extension)(filePath)) {
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
                const fileHash = yield (0, fs_1.__fileHash)(filePath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBdUM7QUFDdkMsdUVBQWlEO0FBQ2pELCtDQUFpRTtBQWtEakUsU0FBOEIsZ0JBQWdCLENBQzFDLGVBQW1DLEVBQ25DLFFBQWtDOztRQUVsQyxRQUFRLG1CQUNKLFNBQVMsRUFBRSxJQUFJLElBQ1osUUFBUSxDQUNkLENBQUM7UUFFRixJQUFJLFFBQVEsR0FBRyxFQUFFLEVBQ2IsV0FBVyxHQUFhLEVBQUUsQ0FBQztRQUUvQixnQkFBZ0I7UUFDaEIsSUFBSSxlQUFlLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkQsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO2dCQUV0QixJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7b0JBQ3BCLFFBQVEsSUFBQSxnQkFBVyxFQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUMzQixLQUFLLElBQUk7NEJBQ0wsTUFBTSxhQUFhLEdBQUcsd0RBQWEsUUFBUSxHQUFDLENBQUM7NEJBQzdDLElBQUksYUFBYSxDQUFDLFlBQVksRUFBRTtnQ0FDNUIsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQztnQ0FDdEMsSUFDSSxPQUFPLGFBQWEsQ0FBQyxZQUFZLEtBQUssVUFBVSxFQUNsRDtvQ0FDRSxJQUFJLEdBQUcsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO29DQUNwQyxZQUFZLEdBQUcsTUFBTSxnQkFBZ0IsQ0FDakMsSUFBSSxFQUNKLFFBQVEsQ0FDWCxDQUFDO2lDQUNMOzZCQUNKOzRCQUNELE1BQU07cUJBQ2I7aUJBQ0o7Z0JBRUQsK0JBQStCO2dCQUMvQixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUEsZUFBVSxFQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUU1QywwQ0FBMEM7Z0JBQzFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLElBQUksWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3JFO1NBQ0o7UUFFRCxlQUFlO1FBQ2YsSUFBSSxlQUFlLENBQUMsSUFBSSxFQUFFO1lBQ3RCLFFBQVEsR0FBRyxJQUFBLHFCQUFZLEVBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsT0FBTyxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFFBQVEsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwRSxDQUFDO0NBQUE7QUFwREQsbUNBb0RDIn0=