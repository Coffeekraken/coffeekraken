var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Client } from 'node-ipc-store';
import __md5 from '../../shared/crypt/md5';
// import __packageTempDir from '../path/packageTmpDir';
let __client, __server;
export default function ipcCache(key, value) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        if (!__client) {
            // await new Promise((_resolve) => {
            //     __server = new Server({
            //         ipc: {
            //             id: 'sugar-ipc-store'
            //         }
            //     });
            //     _resolve(true);
            // });
            __client = new Client({
                ipc: {
                    id: 'sugar-ipc-store'
                }
            });
        }
        const cryptedKey = __md5.encrypt(key);
        if (value !== undefined) {
            __client.set(cryptedKey, value, (success, details) => {
                if (!success) {
                    throw new Error(details);
                }
                resolve(value);
            });
        }
        else {
            __client.get(cryptedKey, (success, details) => {
                resolve(details);
            });
        }
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBjQ2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpcGNDYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFVLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxLQUFLLE1BQU0sd0JBQXdCLENBQUM7QUFDM0Msd0RBQXdEO0FBRXhELElBQUksUUFBUSxFQUFFLFFBQVEsQ0FBQztBQUV2QixNQUFNLENBQUMsT0FBTyxVQUFVLFFBQVEsQ0FBQyxHQUFXLEVBQUUsS0FBVztJQUNyRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBRXpDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxvQ0FBb0M7WUFDcEMsOEJBQThCO1lBQzlCLGlCQUFpQjtZQUNqQixvQ0FBb0M7WUFDcEMsWUFBWTtZQUNaLFVBQVU7WUFDVixzQkFBc0I7WUFDdEIsTUFBTTtZQUVOLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQztnQkFDbEIsR0FBRyxFQUFFO29CQUNELEVBQUUsRUFBRSxpQkFBaUI7aUJBQ3hCO2FBQ0osQ0FBQyxDQUFDO1NBQ047UUFFRCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRDLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNyQixRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDNUI7Z0JBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFO2dCQUMxQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=