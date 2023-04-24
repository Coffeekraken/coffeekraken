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
const exec_1 = require("@coffeekraken/sugar/exec");
const fs_1 = require("@coffeekraken/sugar/fs");
const hash_1 = require("@coffeekraken/sugar/hash");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
function page({ req, res, next, pageConfig, pageFile, frontendServerConfig, }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        let pageFilePath;
        // try to get the page from different sources
        let potentialPath = `${(0, path_1.__packageTmpDir)()}/store/${pageConfig.page}.json`;
        if (fs_2.default.existsSync(potentialPath)) {
            pageFilePath = potentialPath;
        }
        if (!pageFilePath) {
            if (pageConfig.page && typeof pageConfig.page !== 'string') {
                const pageId = (0, hash_1.__hashFromSync)(pageConfig.page);
                potentialPath = `${(0, path_1.__packageTmpDir)()}/viewRenderer/${pageId}.json`;
                fs_2.default.writeFileSync(potentialPath, JSON.stringify(pageConfig.page));
                pageFilePath = potentialPath;
            }
        }
        // rendering view using data
        const resPro = (0, exec_1.__execPhp)(path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/node/modules/generic/php/renderPage.php'), JSON.stringify({
            pageFilePath,
            documentRoot: (0, path_1.__packageRootDir)(),
            storeDir: `${(0, path_1.__packageTmpDir)()}/store`,
        }), {
        // paramsThroughFile: true,
        });
        resPro.catch((e) => {
            console.error(e);
            resolve({
                error: e,
            });
        });
        const renderRes = yield resPro;
        res.status(200);
        res.type('text/html');
        return res.send(renderRes);
    }));
}
exports.default = page;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFEO0FBQ3JELCtDQUFtRDtBQUNuRCxtREFBMEQ7QUFDMUQsbURBQTZFO0FBQzdFLDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUIsU0FBd0IsSUFBSSxDQUFDLEVBQ3pCLEdBQUcsRUFDSCxHQUFHLEVBQ0gsSUFBSSxFQUNKLFVBQVUsRUFDVixRQUFRLEVBQ1Isb0JBQW9CLEdBQ3ZCO0lBQ0csT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLElBQUksWUFBWSxDQUFDO1FBRWpCLDZDQUE2QztRQUM3QyxJQUFJLGFBQWEsR0FBRyxHQUFHLElBQUEsc0JBQWUsR0FBRSxVQUNwQyxVQUFVLENBQUMsSUFDZixPQUFPLENBQUM7UUFDUixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDaEMsWUFBWSxHQUFHLGFBQWEsQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDZixJQUFJLFVBQVUsQ0FBQyxJQUFJLElBQUksT0FBTyxVQUFVLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDeEQsTUFBTSxNQUFNLEdBQUcsSUFBQSxxQkFBYyxFQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0MsYUFBYSxHQUFHLEdBQUcsSUFBQSxzQkFBZSxHQUFFLGlCQUFpQixNQUFNLE9BQU8sQ0FBQztnQkFDbkUsWUFBSSxDQUFDLGFBQWEsQ0FDZCxhQUFhLEVBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQ2xDLENBQUM7Z0JBQ0YsWUFBWSxHQUFHLGFBQWEsQ0FBQzthQUNoQztTQUNKO1FBRUQsNEJBQTRCO1FBQzVCLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQVMsRUFDcEIsY0FBTSxDQUFDLE9BQU8sQ0FDVixJQUFBLHVCQUFnQixFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsRUFDN0IsNkNBQTZDLENBQ2hELEVBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNYLFlBQVk7WUFDWixZQUFZLEVBQUUsSUFBQSx1QkFBZ0IsR0FBRTtZQUNoQyxRQUFRLEVBQUUsR0FBRyxJQUFBLHNCQUFlLEdBQUUsUUFBUTtTQUN6QyxDQUFDLEVBQ0Y7UUFDSSwyQkFBMkI7U0FDOUIsQ0FDSixDQUFDO1FBRUYsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPLENBQUM7Z0JBQ0osS0FBSyxFQUFFLENBQUM7YUFDWCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sU0FBUyxHQUFHLE1BQU0sTUFBTSxDQUFDO1FBRS9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUExREQsdUJBMERDIn0=