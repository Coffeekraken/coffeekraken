var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import { __ensureDirSync } from '@coffeekraken/sugar/fs';
import { __packageTmpDir } from '@coffeekraken/sugar/path';
export default function upload(app, settings, config) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        // register the "upload" post handler
        app.post('/upload', (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }
            const uploadResult = [];
            // ensure we have the "upload" director yin the package tmp one
            __ensureDirSync(`${__packageTmpDir()}/upload`);
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            for (let [fileId, file] of Object.entries(req.files)) {
                const file = req.files[fileId], filePath = `${__packageTmpDir()}/upload/${file.name}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFM0QsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNO0lBQ2hELE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQscUNBQXFDO1FBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ25ELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUMxRDtZQUVELE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUV4QiwrREFBK0Q7WUFDL0QsZUFBZSxDQUFDLEdBQUcsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRS9DLHdGQUF3RjtZQUN4RixLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2xELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQzFCLFFBQVEsR0FBRyxHQUFHLGVBQWUsRUFBRSxXQUFXLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFMUQsZ0JBQWdCO2dCQUNoQixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVsQixNQUFNO2dCQUNOLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLG1DQUFtQyxJQUFJLENBQUMsSUFBSSwyRkFBMkYsSUFBSSxDQUFDLElBQUksVUFBVTtpQkFDcEssQ0FBQyxDQUFDO2dCQUVILFlBQVksQ0FBQyxJQUFJLENBQUM7b0JBQ2QsR0FBRyxFQUFFLGVBQWUsSUFBSSxDQUFDLElBQUksRUFBRTtpQkFDbEMsQ0FBQyxDQUFDO2FBQ047WUFFRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=