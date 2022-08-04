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
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';
import __fs from 'fs';
export default function docmapStyleguideData({ req, res, pageConfig }) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        if (!req.params.path) {
            throw new Error(`[SFrontendServer.docmapStyleguideData] Missing "path" parameter from the url...`);
        }
        __SBench.start('data.docmapStyleguideData');
        __SBench.step('data.docmapStyleguideData', 'beforeDocmapRead');
        const docmap = new __SDocmap();
        const docmapJson = yield docmap.read();
        const styleguideMenu = docmapJson.menu.custom.styleguide;
        let styleguideObj = styleguideMenu.slug[`/styleguide/${req.params.path}`];
        if (!styleguideObj) {
            styleguideObj =
                (_c = (_b = (_a = docmapJson.menu.packages) === null || _a === void 0 ? void 0 : _a[`${req.params.organisation}/${req.params.package}`]) === null || _b === void 0 ? void 0 : _b.slug) === null || _c === void 0 ? void 0 : _c[`/package/${req.params.organisation}/${req.params.package}/styleguide/${req.params.path}`];
        }
        __SBench.step('data.docmapStyleguideData', 'afterDocmapRead');
        if (!styleguideObj || !__fs.existsSync(styleguideObj.docmap.path)) {
            return reject(`The styleguide "${req.path}" you requested does not exists...`);
        }
        const finalReqPath = `/styleguide/${req.params.path}`;
        __SBench.step('data.docmapStyleguideData', 'beforeDocblockParsing');
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
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[og]</yellow> Scraping opengraph from url "<cyan>${docblocks[0].see[i].url}</cyan>"`,
                    });
                    docblocks[0].see[i].og = yield __scrapeUrl(docblocks[0].see[i].url);
                }
            }
        }
        __SBench.step('data.docmapStyleguideData', 'afterDocblockParsing');
        resolve({
            docblocks,
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixNQUFNLENBQUMsT0FBTyxVQUFVLG9CQUFvQixDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7SUFDakUsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7UUFDNUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQ1gsaUZBQWlGLENBQ3BGLENBQUM7U0FDTDtRQUVELFFBQVEsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUU1QyxRQUFRLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFL0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDekQsSUFBSSxhQUFhLEdBQ2IsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxNQUFNLENB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