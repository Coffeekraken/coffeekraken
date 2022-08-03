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
import __sha256 from '../../shared/crypt/sha256';
import __extension from '../fs/extension';
import __fileHash from '../fs/fileHash';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLFFBQVEsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxPQUFPLFVBQVUsTUFBTSxnQkFBZ0IsQ0FBQztBQWtEeEMsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsZ0JBQWdCLENBQzFDLGVBQW1DLEVBQ25DLFFBQWtDOztRQUVsQyxRQUFRLG1CQUNKLFNBQVMsRUFBRSxJQUFJLElBQ1osUUFBUSxDQUNkLENBQUM7UUFFRixJQUFJLFFBQVEsR0FBRyxFQUFFLEVBQ2IsV0FBVyxHQUFhLEVBQUUsQ0FBQztRQUUvQixnQkFBZ0I7UUFDaEIsSUFBSSxlQUFlLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkQsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO2dCQUV0QixJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7b0JBQ3BCLFFBQVEsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUMzQixLQUFLLElBQUk7NEJBQ0wsTUFBTSxhQUFhLEdBQUcsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQzdDLElBQUksYUFBYSxDQUFDLFlBQVksRUFBRTtnQ0FDNUIsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQztnQ0FDdEMsSUFDSSxPQUFPLGFBQWEsQ0FBQyxZQUFZLEtBQUssVUFBVSxFQUNsRDtvQ0FDRSxJQUFJLEdBQUcsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO29DQUNwQyxZQUFZLEdBQUcsTUFBTSxnQkFBZ0IsQ0FDakMsSUFBSSxFQUNKLFFBQVEsQ0FDWCxDQUFDO2lDQUNMOzZCQUNKOzRCQUNELE1BQU07cUJBQ2I7aUJBQ0o7Z0JBRUQsK0JBQStCO2dCQUMvQixNQUFNLFFBQVEsR0FBRyxNQUFNLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFNUMsMENBQTBDO2dCQUMxQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLElBQUksWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3JFO1NBQ0o7UUFFRCxlQUFlO1FBQ2YsSUFBSSxlQUFlLENBQUMsSUFBSSxFQUFFO1lBQ3RCLFFBQVEsR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsUUFBUSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Q0FBQSJ9