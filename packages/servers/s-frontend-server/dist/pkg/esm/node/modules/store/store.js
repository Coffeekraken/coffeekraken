var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __ensureDirSync } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
export default function store({ express, settings, config }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        // listen for requesting the global data like specs by sources, etc...
        express.get(`/store/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let potentialPath = `${settings.rootDir}/${req.params.id}.json`;
            if (__fs.existsSync(potentialPath)) {
                const json = __fs.readFileSync(potentialPath, 'utf-8');
                res.status(200);
                res.type('application/json');
                res.send(json);
            }
        }));
        // register the "upload" post handler
        express.post('/store', (req, res) => __awaiter(this, void 0, void 0, function* () {
            // ensure we have the "upload" director yin the package tmp one
            __ensureDirSync(settings.rootDir);
            // check if it's a json payload
            if (!req.files || Object.keys(req.files).length === 0) {
                if (!req.body.id) {
                    console.error(`To save a json into the store, it MUST have a proper "id"`);
                }
                __fs.writeFileSync(`${settings.rootDir}/${req.body.id}.json`, JSON.stringify(req.body, null, 4));
                // log
                console.log(`[SFrontendServer] File "<yellow>${req.body.id}.json</yellow>" stored <green>successfully</green> and available at url "<cyan>/store/${req.body.id}</cyan>"`);
                res.status(200);
                res.type('application/json');
                return res.send(JSON.stringify({}));
            }
            const uploadResult = [];
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            for (let [fileId, file] of Object.entries(req.files)) {
                const file = req.files[fileId], id = `${file.name.split('.')[0]}-${Math.round(Math.random() * 9999)}`, extension = file.name.split('.').pop(), filePath = `${settings.rootDir}/${id}.${extension}`;
                // move the file
                file.mv(filePath);
                // log
                console.log(`[SFrontendServer] File "<yellow>${file.name}</yellow>" stored <green>successfully</green> and available at url "<cyan>/store/${id}.${extension}</cyan>"`);
                uploadResult.push({
                    url: `/tmp/upload/${id}.${extension}`,
                });
            }
            res.status(200);
            res.type('application/json');
            res.send(JSON.stringify(uploadResult));
        }));
        resolve(true);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV6RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtJQUN2RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMsc0VBQXNFO1FBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3pDLElBQUksYUFBYSxHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDO1lBQ2hFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDaEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQjtRQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxxQ0FBcUM7UUFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDdEMsK0RBQStEO1lBQy9ELGVBQWUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFbEMsK0JBQStCO1lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsS0FB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