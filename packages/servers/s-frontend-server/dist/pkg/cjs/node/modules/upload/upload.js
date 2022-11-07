"use strict";
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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
function upload(app, settings, config) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        // register the "upload" post handler
        app.post('/upload', (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }
            const uploadResult = [];
            // ensure we have the "upload" director yin the package tmp one
            (0, fs_1.__ensureDirSync)(`${(0, path_1.__packageTmpDir)()}/upload`);
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            for (let [fileId, file] of Object.entries(req.files)) {
                const file = req.files[fileId], filePath = `${(0, path_1.__packageTmpDir)()}/upload/${file.name}`;
                // move the file
                file.mv(filePath);
                // log
                emit('log', {
                    value: `[SFrontendServer] File "<yellow>${file.name}</yellow>" uploaded <green>successfully</green> and available at url "<cyan>/tmp/upload/${file.name}</cyan>"`,
                });
                uploadResult.push({
                    url: `/tmp/upload/${file.name}`,
                });
            }
            res.status(200);
            res.type('application/json');
            res.send(JSON.stringify(uploadResult));
        }));
        resolve(true);
    }));
}
exports.default = upload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELCtDQUF5RDtBQUN6RCxtREFBMkQ7QUFFM0QsU0FBd0IsTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTTtJQUNoRCxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxxQ0FBcUM7UUFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDbkQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2FBQzFEO1lBRUQsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBRXhCLCtEQUErRDtZQUMvRCxJQUFBLG9CQUFlLEVBQUMsR0FBRyxJQUFBLHNCQUFlLEdBQUUsU0FBUyxDQUFDLENBQUM7WUFFL0Msd0ZBQXdGO1lBQ3hGLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDbEQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDMUIsUUFBUSxHQUFHLEdBQUcsSUFBQSxzQkFBZSxHQUFFLFdBQVcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUUxRCxnQkFBZ0I7Z0JBQ2hCLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRWxCLE1BQU07Z0JBQ04sSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsbUNBQW1DLElBQUksQ0FBQyxJQUFJLDJGQUEyRixJQUFJLENBQUMsSUFBSSxVQUFVO2lCQUNwSyxDQUFDLENBQUM7Z0JBRUgsWUFBWSxDQUFDLElBQUksQ0FBQztvQkFDZCxHQUFHLEVBQUUsZUFBZSxJQUFJLENBQUMsSUFBSSxFQUFFO2lCQUNsQyxDQUFDLENBQUM7YUFDTjtZQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUF0Q0QseUJBc0NDIn0=