var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __objectHash from 'object-hash';
import __fileHash from '../fs/fileHash';
import __sha256 from '../../shared/crypt/sha256';
import __extension from '../fs/extension';
export default function dependenciesHash(dependenciesObj, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        settings = Object.assign({ recursive: true }, settings);
        let dataHash = '', filesHashes = [];
        // files hashing
        if (dependenciesObj.files) {
            for (let i = 0; i < dependenciesObj.files.length; i++) {
                const filePath = dependenciesObj.files[i];
                let fileDepsHash = '';
                if (settings.recursive) {
                    switch (__extension(filePath)) {
                        case 'js':
                            const jsFileExports = yield import(filePath);
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
                const fileHash = yield __fileHash(filePath);
                // add this hash to the files hashes array
                filesHashes.push(__sha256.encrypt(`${fileHash}-${fileDepsHash}`));
            }
        }
        // data hashing
        if (dependenciesObj.data) {
            dataHash = __objectHash(dependenciesObj.data);
        }
        return __sha256.encrypt(`${dataHash}-${filesHashes.join('-')}`);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jaWVzSGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlcGVuZGVuY2llc0hhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxZQUFZLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sVUFBVSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sUUFBUSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLGlCQUFpQixDQUFDO0FBb0QxQyxNQUFNLENBQUMsT0FBTyxVQUFnQixnQkFBZ0IsQ0FDMUMsZUFBbUMsRUFDbkMsUUFBa0M7O1FBRWxDLFFBQVEsbUJBQ0osU0FBUyxFQUFFLElBQUksSUFDWixRQUFRLENBQ2QsQ0FBQztRQUVGLElBQUksUUFBUSxHQUFHLEVBQUUsRUFDYixXQUFXLEdBQWEsRUFBRSxDQUFDO1FBRS9CLGdCQUFnQjtRQUNoQixJQUFJLGVBQWUsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuRCxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7Z0JBRXRCLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTtvQkFDcEIsUUFBUSxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQzNCLEtBQUssSUFBSTs0QkFDTCxNQUFNLGFBQWEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDN0MsSUFBSSxhQUFhLENBQUMsWUFBWSxFQUFFO2dDQUM1QixJQUFJLElBQUksR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDO2dDQUN0QyxJQUNJLE9BQU8sYUFBYSxDQUFDLFlBQVksS0FBSyxVQUFVLEVBQ2xEO29DQUNFLElBQUksR0FBRyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7b0NBQ3BDLFlBQVksR0FBRyxNQUFNLGdCQUFnQixDQUNqQyxJQUFJLEVBQ0osUUFBUSxDQUNYLENBQUM7aUNBQ0w7NkJBQ0o7NEJBQ0QsTUFBTTtxQkFDYjtpQkFDSjtnQkFFRCwrQkFBK0I7Z0JBQy9CLE1BQU0sUUFBUSxHQUFHLE1BQU0sVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUU1QywwQ0FBMEM7Z0JBQzFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFFBQVEsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDckU7U0FDSjtRQUVELGVBQWU7UUFDZixJQUFJLGVBQWUsQ0FBQyxJQUFJLEVBQUU7WUFDdEIsUUFBUSxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUFBIn0=