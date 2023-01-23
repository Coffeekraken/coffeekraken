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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
function sitemapXmlHandler({ req, res, pageConfig }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const bench = new s_bench_1.default('data.sitemapXmlHandler');
        bench.step('beforeSitemapRead');
        const sitemapPath = (0, fs_1.__grabFirstExisting)([
            `${(0, path_1.__packageRootDir)()}/sitemap.xml`,
            s_sugar_config_1.default.get('sitemapBuilder.build.output'),
        ]);
        if (!sitemapPath) {
            res.status(404);
            res.type('application/json');
            res.send({});
            return resolve({});
        }
        const json = (0, fs_1.__readXmlSync)(sitemapPath);
        bench.step('afterSitemapRead');
        bench.end();
        res.status(200);
        res.type('application/json');
        res.send(json);
        resolve(json);
    }));
}
exports.default = sitemapXmlHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCwrQ0FBNEU7QUFDNUUsbURBQTREO0FBRTVELFNBQXdCLGlCQUFpQixDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7SUFDOUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBRXJELEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVoQyxNQUFNLFdBQVcsR0FBRyxJQUFBLHdCQUFtQixFQUFDO1lBQ3BDLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxjQUFjO1lBQ25DLHdCQUFjLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDO1NBQ3BELENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDZCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEI7UUFFRCxNQUFNLElBQUksR0FBRyxJQUFBLGtCQUFhLEVBQUMsV0FBVyxDQUFDLENBQUM7UUFFeEMsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRS9CLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVaLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUE3QkQsb0NBNkJDIn0=