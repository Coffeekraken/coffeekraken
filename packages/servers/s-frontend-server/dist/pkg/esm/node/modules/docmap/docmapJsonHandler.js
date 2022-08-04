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
import __SDocMap from '@coffeekraken/s-docmap';
import __SPromise from '@coffeekraken/s-promise';
export default function docmapJsonHandler({ req, res, pageConfig }) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        __SBench.start('data.docmapJsonData');
        __SBench.step('data.docmapJsonData', 'beforeDocmapRead');
        const docmap = new __SDocMap();
        const docmapJson = yield docmap.read();
        __SBench.step('data.docmapJsonData', 'afterDocmapRead');
        res.status(200);
        res.type('application/json');
        res.send(docmapJson);
        resolve(docmapJson);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE1BQU0sQ0FBQyxPQUFPLFVBQVUsaUJBQWlCLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtJQUM5RCxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELFFBQVEsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUV0QyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFekQsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV2QyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFeEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQixPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==