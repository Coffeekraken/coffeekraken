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
import __SPromise from '@coffeekraken/s-promise';
import __readXmlSync from '@coffeekraken/sugar/node/fs/readXmlSync';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __grabFirstExisting from '@coffeekraken/sugar/node/fs/grabFirstExisting';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default function sitemapXmlHandler({ req, res, pageConfig }) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        __SBench.start('data.sitemapXmlHandler');
        __SBench.step('data.sitemapXmlHandler', 'beforeSitemapRead');
        const sitemapPath = __grabFirstExisting([
            `${__packageRoot()}/sitemap.xml`,
            __SSugarConfig.get('sitemapBuilder.build.output'),
        ]);
        if (!sitemapPath) {
            res.status(404);
            res.type('application/json');
            res.send({});
            return resolve({});
        }
        const json = __readXmlSync(sitemapPath);
        __SBench.step('data.sitemapXmlHandler', 'afterSitemapRead');
        __SBench.end('data.sitemapXmlHandler').log();
        res.status(200);
        res.type('application/json');
        res.send(json);
        resolve(json);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3BFLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sbUJBQW1CLE1BQU0sK0NBQStDLENBQUM7QUFDaEYsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFFdEUsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0lBQzlELE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQsUUFBUSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBRXpDLFFBQVEsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUU3RCxNQUFNLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQztZQUNwQyxHQUFHLGFBQWEsRUFBRSxjQUFjO1lBQ2hDLGNBQWMsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUM7U0FDcEQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNkLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDYixPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QjtRQUVELE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV4QyxRQUFRLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFNUQsUUFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTdDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==