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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
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
            pageFile: pageFilePath,
            page: pageConfig,
            req: {
                baseUrl: req.baseUrl,
                body: req.body,
                hostname: req.hostname,
                ip: req.ip,
                method: req.method,
                originalUrl: req.originalUrl,
                params: req.params,
                path: req.path,
                protocol: req.protocol,
                query: req.query,
                xhr: req.xhr,
            },
            nodesDir: s_sugar_config_1.default.get('storage.src.nodesDir'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELG1EQUFxRDtBQUNyRCwrQ0FBbUQ7QUFDbkQsbURBQTREO0FBQzVELGlEQUEyRTtBQUMzRSxnREFBMEI7QUFFMUIsU0FBd0IsSUFBSSxDQUFDLEVBQ3pCLEdBQUcsRUFDSCxHQUFHLEVBQ0gsSUFBSSxFQUNKLFVBQVUsRUFDVixRQUFRLEVBQ1Isb0JBQW9CLEdBQ3ZCO0lBQ0csT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFbkMsNEJBQTRCO1FBQzVCLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQVMsRUFDcEIsY0FBTSxDQUFDLE9BQU8sQ0FDVixJQUFBLHVCQUFnQixFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsRUFDN0IsNkNBQTZDLENBQ2hELEVBQ0Q7WUFDSSxRQUFRLEVBQUUsSUFBQSxzQ0FBZ0MsRUFBQyxHQUFHLENBQUM7WUFDL0MsUUFBUSxFQUFFLFlBQVk7WUFDdEIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsR0FBRyxFQUFFO2dCQUNELE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTztnQkFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2dCQUNkLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtnQkFDdEIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNWLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtnQkFDbEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO2dCQUM1QixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtnQkFDZCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7Z0JBQ3RCLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztnQkFDaEIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHO2FBQ2Y7WUFDRCxRQUFRLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7U0FDdkQsRUFDRDtZQUNJLGlCQUFpQixFQUFFLElBQUk7U0FDMUIsQ0FDSixDQUFDO1FBRUYsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPLENBQUM7Z0JBQ0osS0FBSyxFQUFFLENBQUM7YUFDWCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sU0FBUyxHQUFHLE1BQU0sTUFBTSxDQUFDO1FBRS9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFyREQsdUJBcURDIn0=