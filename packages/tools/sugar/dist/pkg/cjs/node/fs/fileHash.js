"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@coffeekraken/sugar/object");
const buffer_1 = require("buffer");
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
function __fileHash(filePath, settings = {}) {
    var _a;
    settings = (0, object_1.__deepMerge)({
        algo: 'sha256',
        digest: 'base64',
        include: {
            ctime: false,
        },
    }, settings !== null && settings !== void 0 ? settings : {});
    let fileBuffer = fs_1.default.readFileSync(filePath);
    if ((_a = settings.include) === null || _a === void 0 ? void 0 : _a.ctime) {
        try {
            const ctime = fs_1.default.statSync(filePath).ctime;
            const buffer = buffer_1.Buffer.from(ctime);
            fileBuffer = buffer_1.Buffer.concat([fileBuffer, buffer]);
        }
        catch (e) { }
    }
    const hashSum = crypto_1.default.createHash(settings.algo);
    hashSum.update(fileBuffer);
    return hashSum.digest(settings.digest);
}
exports.default = __fileHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdURBQXlEO0FBQ3pELG1DQUFnQztBQUNoQyxvREFBd0Q7QUFDeEQsNENBQXNCO0FBdUN0QixTQUF3QixVQUFVLENBQzlCLFFBQWdCLEVBQ2hCLFdBQXVDLEVBQUU7O0lBRXpDLFFBQVEsR0FBc0IsSUFBQSxvQkFBVyxFQUNyQztRQUNJLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLFFBQVE7UUFDaEIsT0FBTyxFQUFFO1lBQ0wsS0FBSyxFQUFFLEtBQUs7U0FDZjtLQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBQ0YsSUFBSSxVQUFVLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU3QyxJQUFJLE1BQUEsUUFBUSxDQUFDLE9BQU8sMENBQUUsS0FBSyxFQUFFO1FBQ3pCLElBQUk7WUFDQSxNQUFNLEtBQUssR0FBRyxZQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUM1QyxNQUFNLE1BQU0sR0FBRyxlQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLFVBQVUsR0FBRyxlQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDcEQ7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0tBQ2pCO0lBRUQsTUFBTSxPQUFPLEdBQUcsZ0JBQVEsQ0FBQyxVQUFVLENBQVMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNELE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0IsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUF1QixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDakUsQ0FBQztBQTNCRCw2QkEyQkMifQ==