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
const php_1 = require("@coffeekraken/sugar/php");
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
        const resPro = (0, exec_1.__execPhp)(path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/node/modules/generic/php/renderPage.php'), {
            $_SERVER: (0, php_1.__serverObjectFromExpressRequest)(req),
            pageFilePath,
            documentRoot: (0, path_1.__packageRootDir)(),
            storeDir: `${(0, path_1.__packageTmpDir)()}/store`,
        }, {
            paramsThroughFile: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFEO0FBQ3JELCtDQUFtRDtBQUNuRCxtREFBMEQ7QUFDMUQsbURBQTZFO0FBQzdFLGlEQUEyRTtBQUMzRSw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBRTFCLFNBQXdCLElBQUksQ0FBQyxFQUN6QixHQUFHLEVBQ0gsR0FBRyxFQUNILElBQUksRUFDSixVQUFVLEVBQ1YsUUFBUSxFQUNSLG9CQUFvQixHQUN2QjtJQUNHLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxJQUFJLFlBQVksQ0FBQztRQUVqQiw2Q0FBNkM7UUFDN0MsSUFBSSxhQUFhLEdBQUcsR0FBRyxJQUFBLHNCQUFlLEdBQUUsVUFDcEMsVUFBVSxDQUFDLElBQ2YsT0FBTyxDQUFDO1FBQ1IsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ2hDLFlBQVksR0FBRyxhQUFhLENBQUM7U0FDaEM7UUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2YsSUFBSSxVQUFVLENBQUMsSUFBSSxJQUFJLE9BQU8sVUFBVSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3hELE1BQU0sTUFBTSxHQUFHLElBQUEscUJBQWMsRUFBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLGFBQWEsR0FBRyxHQUFHLElBQUEsc0JBQWUsR0FBRSxpQkFBaUIsTUFBTSxPQUFPLENBQUM7Z0JBQ25FLFlBQUksQ0FBQyxhQUFhLENBQ2QsYUFBYSxFQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUNsQyxDQUFDO2dCQUNGLFlBQVksR0FBRyxhQUFhLENBQUM7YUFDaEM7U0FDSjtRQUVELDRCQUE0QjtRQUM1QixNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFTLEVBQ3BCLGNBQU0sQ0FBQyxPQUFPLENBQ1YsSUFBQSx1QkFBZ0IsRUFBQyxJQUFBLGNBQVMsR0FBRSxDQUFDLEVBQzdCLDZDQUE2QyxDQUNoRCxFQUNEO1lBQ0ksUUFBUSxFQUFFLElBQUEsc0NBQWdDLEVBQUMsR0FBRyxDQUFDO1lBQy9DLFlBQVk7WUFDWixZQUFZLEVBQUUsSUFBQSx1QkFBZ0IsR0FBRTtZQUNoQyxRQUFRLEVBQUUsR0FBRyxJQUFBLHNCQUFlLEdBQUUsUUFBUTtTQUN6QyxFQUNEO1lBQ0ksaUJBQWlCLEVBQUUsSUFBSTtTQUMxQixDQUNKLENBQUM7UUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQztnQkFDSixLQUFLLEVBQUUsQ0FBQzthQUNYLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxTQUFTLEdBQUcsTUFBTSxNQUFNLENBQUM7UUFFL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTNERCx1QkEyREMifQ==