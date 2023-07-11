import { Buffer } from 'buffer';
import __crypto from 'crypto';
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge.js';
export default function __fileHashSync(filePath, settings = {}) {
    var _a;
    settings = __deepMerge({
        algo: 'sha256',
        digest: 'base64',
        include: {
            ctime: true,
        },
    }, settings !== null && settings !== void 0 ? settings : {});
    let fileBuffer = __fs.readFileSync(filePath);
    if ((_a = settings.include) === null || _a === void 0 ? void 0 : _a.ctime) {
        try {
            const ctime = __fs.statSync(filePath).ctime;
            const buffer = Buffer.from(ctime);
            fileBuffer = Buffer.concat([fileBuffer, buffer]);
        }
        catch (e) { }
    }
    const hashSum = __crypto.createHash(settings.algo);
    hashSum.update(fileBuffer);
    return hashSum.digest(settings.digest);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDaEMsT0FBTyxRQUFrQyxNQUFNLFFBQVEsQ0FBQztBQUN4RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxXQUFXLE1BQU0sa0NBQWtDLENBQUM7QUF5QzNELE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxDQUNsQyxRQUFnQixFQUNoQixXQUF1QyxFQUFFOztJQUV6QyxRQUFRLEdBQXNCLFdBQVcsQ0FDckM7UUFDSSxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRTtZQUNMLEtBQUssRUFBRSxJQUFJO1NBQ2Q7S0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUNGLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFN0MsSUFBSSxNQUFBLFFBQVEsQ0FBQyxPQUFPLDBDQUFFLEtBQUssRUFBRTtRQUN6QixJQUFJO1lBQ0EsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDNUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtLQUNqQjtJQUVELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQVMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNELE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0IsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUF1QixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDakUsQ0FBQyJ9