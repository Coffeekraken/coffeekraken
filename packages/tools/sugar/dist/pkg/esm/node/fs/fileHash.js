import { __deepMerge } from '@coffeekraken/sugar/object';
import { Buffer } from 'buffer';
import __crypto from 'crypto';
import __fs from 'fs';
export default function __fileHash(filePath, settings = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2hDLE9BQU8sUUFBa0MsTUFBTSxRQUFRLENBQUM7QUFDeEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBdUN0QixNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVUsQ0FDOUIsUUFBZ0IsRUFDaEIsV0FBdUMsRUFBRTs7SUFFekMsUUFBUSxHQUFzQixXQUFXLENBQ3JDO1FBQ0ksSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsUUFBUTtRQUNoQixPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUUsSUFBSTtTQUNkO0tBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFDRixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTdDLElBQUksTUFBQSxRQUFRLENBQUMsT0FBTywwQ0FBRSxLQUFLLEVBQUU7UUFDekIsSUFBSTtZQUNBLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzVDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNwRDtRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7S0FDakI7SUFFRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFTLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBdUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pFLENBQUMifQ==