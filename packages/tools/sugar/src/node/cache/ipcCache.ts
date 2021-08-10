import __uniqid from '../../shared/string/uniqid';
import { Client, Server } from 'node-ipc-store';
import __md5 from '../../shared/crypt/md5';
// import __packageTempDir from '../path/packageTmpDir';

let __client, __server;

export default function ipcCache(key: string, value?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {

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
        } else {
            __client.get(cryptedKey, (success, details) => {
                resolve(details);
            });
        }
    });
}