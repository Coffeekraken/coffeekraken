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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
function upload({ express, settings, config }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        // register the "upload" post handler
        express.post('/upload', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                console.log(`[SFrontendServer] File "<yellow>${file.name}</yellow>" uploaded <green>successfully</green> and available at url "<cyan>/tmp/upload/${file.name}</cyan>"`);
                uploadResult.push({
                    url: `/tmp/upload/${file.name}`,
                });
            }
            res.status(200);
            res.type('expresslication/json');
            res.send(JSON.stringify(uploadResult));
        }));
        resolve(true);
    }));
}
exports.default = upload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0NBQXlEO0FBQ3pELG1EQUEyRDtBQUUzRCxTQUF3QixNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtJQUN4RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMscUNBQXFDO1FBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ25ELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUMxRDtZQUVELE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUV4QiwrREFBK0Q7WUFDL0QsSUFBQSxvQkFBZSxFQUFDLEdBQUcsSUFBQSxzQkFBZSxHQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRS9DLHdGQUF3RjtZQUN4RixLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2xELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQzFCLFFBQVEsR0FBRyxHQUFHLElBQUEsc0JBQWUsR0FBRSxXQUFXLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFMUQsZ0JBQWdCO2dCQUNoQixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVsQixNQUFNO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQ1AsbUNBQW1DLElBQUksQ0FBQyxJQUFJLDJGQUEyRixJQUFJLENBQUMsSUFBSSxVQUFVLENBQzdKLENBQUM7Z0JBRUYsWUFBWSxDQUFDLElBQUksQ0FBQztvQkFDZCxHQUFHLEVBQUUsZUFBZSxJQUFJLENBQUMsSUFBSSxFQUFFO2lCQUNsQyxDQUFDLENBQUM7YUFDTjtZQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUF0Q0QseUJBc0NDIn0=