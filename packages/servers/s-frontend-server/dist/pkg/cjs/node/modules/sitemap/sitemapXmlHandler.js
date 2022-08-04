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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const grabFirstExisting_1 = __importDefault(require("@coffeekraken/sugar/node/fs/grabFirstExisting"));
const readXmlSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readXmlSync"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
function sitemapXmlHandler({ req, res, pageConfig }) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        s_bench_1.default.start('data.sitemapXmlHandler');
        s_bench_1.default.step('data.sitemapXmlHandler', 'beforeSitemapRead');
        const sitemapPath = (0, grabFirstExisting_1.default)([
            `${(0, packageRoot_1.default)()}/sitemap.xml`,
            s_sugar_config_1.default.get('sitemapBuilder.build.output'),
        ]);
        if (!sitemapPath) {
            res.status(404);
            res.type('application/json');
            res.send({});
            return resolve({});
        }
        const json = (0, readXmlSync_1.default)(sitemapPath);
        s_bench_1.default.step('data.sitemapXmlHandler', 'afterSitemapRead');
        s_bench_1.default.end('data.sitemapXmlHandler').log();
        res.status(200);
        res.type('application/json');
        res.send(json);
        resolve(json);
    }));
}
exports.default = sitemapXmlHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQsc0dBQWdGO0FBQ2hGLDBGQUFvRTtBQUNwRSw0RkFBc0U7QUFFdEUsU0FBd0IsaUJBQWlCLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtJQUM5RCxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxpQkFBUSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBRXpDLGlCQUFRLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFFN0QsTUFBTSxXQUFXLEdBQUcsSUFBQSwyQkFBbUIsRUFBQztZQUNwQyxHQUFHLElBQUEscUJBQWEsR0FBRSxjQUFjO1lBQ2hDLHdCQUFjLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDO1NBQ3BELENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDZCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEI7UUFFRCxNQUFNLElBQUksR0FBRyxJQUFBLHFCQUFhLEVBQUMsV0FBVyxDQUFDLENBQUM7UUFFeEMsaUJBQVEsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUU1RCxpQkFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTdDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUE3QkQsb0NBNkJDIn0=