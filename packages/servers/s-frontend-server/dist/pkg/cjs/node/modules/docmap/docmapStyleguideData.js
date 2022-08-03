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
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_docblock_1 = __importDefault(require("@coffeekraken/s-docblock"));
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const scrapeUrl_1 = __importDefault(require("@coffeekraken/sugar/node/og/scrapeUrl"));
const fs_1 = __importDefault(require("fs"));
function docmapStyleguideData({ req, res, pageConfig }) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        if (!req.params.path) {
            throw new Error(`[SFrontendServer.docmapStyleguideData] Missing "path" parameter from the url...`);
        }
        s_bench_1.default.start('data.docmapStyleguideData');
        s_bench_1.default.step('data.docmapStyleguideData', 'beforeDocmapRead');
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        const styleguideMenu = docmapJson.menu.custom.styleguide;
        let styleguideObj = styleguideMenu.slug[`/styleguide/${req.params.path}`];
        if (!styleguideObj) {
            styleguideObj =
                (_c = (_b = (_a = docmapJson.menu.packages) === null || _a === void 0 ? void 0 : _a[`${req.params.organisation}/${req.params.package}`]) === null || _b === void 0 ? void 0 : _b.slug) === null || _c === void 0 ? void 0 : _c[`/package/${req.params.organisation}/${req.params.package}/styleguide/${req.params.path}`];
        }
        s_bench_1.default.step('data.docmapStyleguideData', 'afterDocmapRead');
        if (!styleguideObj || !fs_1.default.existsSync(styleguideObj.docmap.path)) {
            return reject(`The styleguide "${req.path}" you requested does not exists...`);
        }
        const finalReqPath = `/styleguide/${req.params.path}`;
        s_bench_1.default.step('data.docmapStyleguideData', 'beforeDocblockParsing');
        const slugsStack = [];
        const docblocksInstance = new s_docblock_1.default(styleguideObj.docmap.path, {
            renderMarkdown: false,
            filterByTag: {
                menu: (value) => {
                    if (!value || typeof value !== 'string')
                        return false;
                    const parts = value.split(/\s{2,99999999}/);
                    if (parts.length >= 2 && parts[1] === finalReqPath) {
                        if (slugsStack.includes(parts[1]))
                            return false;
                        slugsStack.push(parts[1]);
                        return true;
                    }
                    return false;
                },
            },
        });
        yield docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();
        if (docblocks.length) {
            if (docblocks[0].see) {
                for (let i = 0; i < docblocks[0].see.length; i++) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>[og]</yellow> Scraping opengraph from url "<cyan>${docblocks[0].see[i].url}</cyan>"`,
                    });
                    docblocks[0].see[i].og = yield (0, scrapeUrl_1.default)(docblocks[0].see[i].url);
                }
            }
        }
        s_bench_1.default.step('data.docmapStyleguideData', 'afterDocblockParsing');
        resolve({
            docblocks,
        });
    }));
}
exports.default = docmapStyleguideData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUNuRCxzRUFBK0M7QUFDL0MsZ0VBQXlDO0FBQ3pDLHdFQUFpRDtBQUNqRCxzRkFBZ0U7QUFDaEUsNENBQXNCO0FBRXRCLFNBQXdCLG9CQUFvQixDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7SUFDakUsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1FBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNsQixNQUFNLElBQUksS0FBSyxDQUNYLGlGQUFpRixDQUNwRixDQUFDO1NBQ0w7UUFFRCxpQkFBUSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBRTVDLGlCQUFRLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFL0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3pELElBQUksYUFBYSxHQUNiLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNoQixhQUFhO2dCQUNULE1BQUEsTUFBQSxNQUFBLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSwwQ0FDcEIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVks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