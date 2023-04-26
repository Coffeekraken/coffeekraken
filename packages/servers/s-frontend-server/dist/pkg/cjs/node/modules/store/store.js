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
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
function store({ express, settings, config }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        // listen for requesting the global data like specs by sources, etc...
        express.get(`/store/:uid`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let potentialPath = `${settings.rootDir}/${req.params.uid}.json`;
            if (fs_2.default.existsSync(potentialPath)) {
                const json = fs_2.default.readFileSync(potentialPath, 'utf-8');
                res.status(200);
                res.type('application/json');
                res.send(json);
            }
        }));
        // delete
        express.delete('/store/:uid', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let potentialPath = `${settings.rootDir}/${req.params.uid}.json`;
            if (fs_2.default.existsSync(potentialPath)) {
                // __fs.unlinkSync(potentialPath);
            }
            res.status(200);
            res.type('application/json');
            res.send({});
        }));
        // register the "upload" post handler
        express.post('/store', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // ensure we have the "upload" director yin the package tmp one
            (0, fs_1.__ensureDirSync)(settings.rootDir);
            // check if it's a json payload
            if (!req.files || Object.keys(req.files).length === 0) {
                if (!req.body.id && !req.body.uid) {
                    console.error(`To save a json into the store, it MUST have a proper "(u)id"`);
                }
                fs_2.default.writeFileSync(`${settings.rootDir}/${req.body.uid || req.body.id}.json`, JSON.stringify(req.body, null, 4));
                // log
                console.log(`[SFrontendServer] File "<yellow>${(_a = req.body.uid) !== null && _a !== void 0 ? _a : req.body.id}.json</yellow>" stored <green>successfully</green> and available at url "<cyan>/store/${req.body.id}</cyan>"`);
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
exports.default = store;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQXlEO0FBRXpELDRDQUFzQjtBQUV0QixTQUF3QixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtJQUN2RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMsc0VBQXNFO1FBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzFDLElBQUksYUFBYSxHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQ2pFLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDaEMsTUFBTSxJQUFJLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQjtRQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxTQUFTO1FBQ1QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxhQUFhLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUM7WUFDakUsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNoQyxrQ0FBa0M7YUFDckM7WUFDRCxHQUFH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