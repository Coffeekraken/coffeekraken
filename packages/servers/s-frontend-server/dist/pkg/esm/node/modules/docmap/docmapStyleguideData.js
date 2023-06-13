var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SBench from '@coffeekraken/s-bench';
import __SDocblock from '@coffeekraken/s-docblock';
import __SDocmap from '@coffeekraken/s-docmap';
import { __scrapeUrl } from '@coffeekraken/sugar/og';
import __fs from 'fs';
export default function docmapStyleguideData({ req, res, pageConfig }) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        if (!req.params.path) {
            throw new Error(`[SFrontendServer.docmapStyleguideData] Missing "path" parameter from the url...`);
        }
        const bench = new __SBench('data.docmapStyleguideData');
        bench.step('beforeDocmapRead');
        const docmap = new __SDocmap();
        const docmapJson = yield docmap.read();
        const styleguideMenu = docmapJson.menu.custom.styleguide;
        let styleguideObj = styleguideMenu.slug[`/styleguide/${req.params.path}`];
        if (!styleguideObj) {
            styleguideObj =
                (_c = (_b = (_a = docmapJson.menu.packages) === null || _a === void 0 ? void 0 : _a[`${req.params.organisation}/${req.params.package}`]) === null || _b === void 0 ? void 0 : _b.slug) === null || _c === void 0 ? void 0 : _c[`/package/${req.params.organisation}/${req.params.package}/styleguide/${req.params.path}`];
        }
        bench.step('afterDocmapRead');
        if (!styleguideObj || !__fs.existsSync(styleguideObj.docmap.path)) {
            return reject(`The styleguide "${req.path}" you requested does not exists...`);
        }
        const finalReqPath = `/styleguide/${req.params.path}`;
        bench.step('beforeDocblockParsing');
        const slugsStack = [];
        const docblocksInstance = new __SDocblock(styleguideObj.docmap.path, {
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
                    console.log(`<yellow>[og]</yellow> Scraping opengraph from url "<cyan>${docblocks[0].see[i].url}</cyan>"`);
                    try {
                        docblocks[0].see[i].og = yield __scrapeUrl(docblocks[0].see[i].url);
                    }
                    catch (e) { }
                }
            }
        }
        bench.step('afterDocblockParsing');
        bench.end();
        resolve({
            docblocks,
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0lBQ2pFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1FBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNsQixNQUFNLElBQUksS0FBSyxDQUNYLGlGQUFpRixDQUNwRixDQUFDO1NBQ0w7UUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBRXhELEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUUvQixNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN6RCxJQUFJLGFBQWEsR0FDYixjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTFELElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDaEIsYUFBYTtnQkFDVCxNQUFBLE1BQUEsTUFBQSxVQUFVLENB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