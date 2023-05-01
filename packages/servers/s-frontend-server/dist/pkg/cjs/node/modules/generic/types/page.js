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
const path_1 = require("@coffeekraken/sugar/path");
const php_1 = require("@coffeekraken/sugar/php");
const path_2 = __importDefault(require("path"));
function page({ req, res, next, pageConfig, pageFile, frontendServerConfig, }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const pageFilePath = pageFile.path;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFEO0FBQ3JELCtDQUFtRDtBQUNuRCxtREFBNkU7QUFDN0UsaURBQTJFO0FBQzNFLGdEQUEwQjtBQUUxQixTQUF3QixJQUFJLENBQUMsRUFDekIsR0FBRyxFQUNILEdBQUcsRUFDSCxJQUFJLEVBQ0osVUFBVSxFQUNWLFFBQVEsRUFDUixvQkFBb0IsR0FDdkI7SUFDRyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVuQyw0QkFBNEI7UUFDNUIsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBUyxFQUNwQixjQUFNLENBQUMsT0FBTyxDQUNWLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxFQUM3Qiw2Q0FBNkMsQ0FDaEQsRUFDRDtZQUNJLFFBQVEsRUFBRSxJQUFBLHNDQUFnQyxFQUFDLEdBQUcsQ0FBQztZQUMvQyxZQUFZO1lBQ1osWUFBWSxFQUFFLElBQUEsdUJBQWdCLEdBQUU7WUFDaEMsUUFBUSxFQUFFLEdBQUcsSUFBQSxzQkFBZSxHQUFFLFFBQVE7U0FDekMsRUFDRDtZQUNJLGlCQUFpQixFQUFFLElBQUk7U0FDMUIsQ0FDSixDQUFDO1FBRUYsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPLENBQUM7Z0JBQ0osS0FBSyxFQUFFLENBQUM7YUFDWCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sU0FBUyxHQUFHLE1BQU0sTUFBTSxDQUFDO1FBRS9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUF4Q0QsdUJBd0NDIn0=