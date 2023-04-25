var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __execPhp } from '@coffeekraken/sugar/exec';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __hashFromSync } from '@coffeekraken/sugar/hash';
import { __packageRootDir, __packageTmpDir } from '@coffeekraken/sugar/path';
import { __serverObjectFromExpressRequest } from '@coffeekraken/sugar/php';
import __fs from 'fs';
import __path from 'path';
export default function page({ req, res, next, pageConfig, pageFile, frontendServerConfig, }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        let pageFilePath;
        // try to get the page from different sources
        let potentialPath = `${__packageTmpDir()}/store/${pageConfig.page}.json`;
        if (__fs.existsSync(potentialPath)) {
            pageFilePath = potentialPath;
        }
        if (!pageFilePath) {
            if (pageConfig.page && typeof pageConfig.page !== 'string') {
                const pageId = __hashFromSync(pageConfig.page);
                potentialPath = `${__packageTmpDir()}/viewRenderer/${pageId}.json`;
                __fs.writeFileSync(potentialPath, JSON.stringify(pageConfig.page));
                pageFilePath = potentialPath;
            }
        }
        // rendering view using data
        const resPro = __execPhp(__path.resolve(__packageRootDir(__dirname()), 'src/node/modules/generic/php/renderPage.php'), {
            $_SERVER: __serverObjectFromExpressRequest(req),
            pageFilePath,
            documentRoot: __packageRootDir(),
            storeDir: `${__packageTmpDir()}/store`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsSUFBSSxDQUFDLEVBQ3pCLEdBQUcsRUFDSCxHQUFHLEVBQ0gsSUFBSSxFQUNKLFVBQVUsRUFDVixRQUFRLEVBQ1Isb0JBQW9CLEdBQ3ZCO0lBQ0csT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLElBQUksWUFBWSxDQUFDO1FBRWpCLDZDQUE2QztRQUM3QyxJQUFJLGFBQWEsR0FBRyxHQUFHLGVBQWUsRUFBRSxVQUNwQyxVQUFVLENBQUMsSUFDZixPQUFPLENBQUM7UUFDUixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDaEMsWUFBWSxHQUFHLGFBQWEsQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDZixJQUFJLFVBQVUsQ0FBQyxJQUFJLElBQUksT0FBTyxVQUFVLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDeEQsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0MsYUFBYSxHQUFHLEdBQUcsZUFBZSxFQUFFLGlCQUFpQixNQUFNLE9BQU8sQ0FBQztnQkFDbkUsSUFBSSxDQUFDLGFBQWEsQ0FDZCxhQUFhLEVBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQ2xDLENBQUM7Z0JBQ0YsWUFBWSxHQUFHLGFBQWEsQ0FBQzthQUNoQztTQUNKO1FBRUQsNEJBQTRCO1FBQzVCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FDcEIsTUFBTSxDQUFDLE9BQU8sQ0FDVixnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUM3Qiw2Q0FBNkMsQ0FDaEQsRUFDRDtZQUNJLFFBQVEsRUFBRSxnQ0FBZ0MsQ0FBQyxHQUFHLENBQUM7WUFDL0MsWUFBWTtZQUNaLFlBQVksRUFBRSxnQkFBZ0IsRUFBRTtZQUNoQyxRQUFRLEVBQUUsR0FBRyxlQUFlLEVBQUUsUUFBUTtTQUN6QyxFQUNEO1lBQ0ksaUJBQWlCLEVBQUUsSUFBSTtTQUMxQixDQUNKLENBQUM7UUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQztnQkFDSixLQUFLLEVBQUUsQ0FBQzthQUNYLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxTQUFTLEdBQUcsTUFBTSxNQUFNLENBQUM7UUFFL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9