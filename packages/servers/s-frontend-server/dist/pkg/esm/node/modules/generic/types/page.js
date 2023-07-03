var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SEnv from '@coffeekraken/s-env';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __execPhp } from '@coffeekraken/sugar/exec';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __serverObjectFromExpressRequest } from '@coffeekraken/sugar/php';
import __path from 'path';
export default function page({ req, res, next, pageConfig, pageFile, frontendServerConfig, }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const pageFilePath = pageFile.path;
        // rendering view using data
        const resPro = __execPhp(__path.resolve(__packageRootDir(__dirname()), 'src/node/modules/generic/php/renderPage.php'), {
            $_ENV: {
                S_FRONTEND_DIR: __packageRootDir(),
                ENV: __SEnv.get('env'),
            },
            $_SERVER: __serverObjectFromExpressRequest(req),
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
            nodesDir: __SSugarConfig.get('storage.src.nodesDir'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0UsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsSUFBSSxDQUFDLEVBQ3pCLEdBQUcsRUFDSCxHQUFHLEVBQ0gsSUFBSSxFQUNKLFVBQVUsRUFDVixRQUFRLEVBQ1Isb0JBQW9CLEdBQ3ZCO0lBQ0csT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFbkMsNEJBQTRCO1FBQzVCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FDcEIsTUFBTSxDQUFDLE9BQU8sQ0FDVixnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUM3Qiw2Q0FBNkMsQ0FDaEQsRUFDRDtZQUNJLEtBQUssRUFBRTtnQkFDSCxjQUFjLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBQ2xDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzthQUN6QjtZQUNELFFBQVEsRUFBRSxnQ0FBZ0MsQ0FBQyxHQUFHLENBQUM7WUFDL0MsUUFBUSxFQUFFLFlBQVk7WUFDdEIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsR0FBRyxFQUFFO2dCQUNELE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTztnQkFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2dCQUNkLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtnQkFDdEIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNWLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtnQkFDbEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO2dCQUM1QixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtnQkFDZCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7Z0JBQ3RCLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztnQkFDaEIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHO2FBQ2Y7WUFDRCxRQUFRLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztTQUN2RCxFQUNEO1lBQ0ksaUJBQWlCLEVBQUUsSUFBSTtTQUMxQixDQUNKLENBQUM7UUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQztnQkFDSixLQUFLLEVBQUUsQ0FBQzthQUNYLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxTQUFTLEdBQUcsTUFBTSxNQUFNLENBQUM7UUFFL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9