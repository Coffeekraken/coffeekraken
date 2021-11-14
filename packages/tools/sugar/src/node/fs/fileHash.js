import __crypto from 'crypto';
import __fs from 'fs';
import { Buffer } from 'buffer';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export default function fileHash(filePath, settings = {}) {
    var _a;
    settings = __deepMerge({
        algo: 'sha256',
        digest: 'base64',
        include: {
            ctime: false,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZUhhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlSGFzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQWtDLE1BQU0sUUFBUSxDQUFDO0FBQ3hELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2hDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBdUN0RSxNQUFNLENBQUMsT0FBTyxVQUFVLFFBQVEsQ0FDNUIsUUFBZ0IsRUFDaEIsV0FBdUMsRUFBRTs7SUFFekMsUUFBUSxHQUFzQixXQUFXLENBQ3JDO1FBQ0ksSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsUUFBUTtRQUNoQixPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUUsS0FBSztTQUNmO0tBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFDRixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTdDLElBQUksTUFBQSxRQUFRLENBQUMsT0FBTywwQ0FBRSxLQUFLLEVBQUU7UUFDekIsSUFBSTtZQUNBLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzVDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNwRDtRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7S0FDakI7SUFFRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFTLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBdUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pFLENBQUMifQ==