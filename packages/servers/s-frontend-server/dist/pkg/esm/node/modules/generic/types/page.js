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
import { __packageRootDir, __packageTmpDir } from '@coffeekraken/sugar/path';
import { __serverObjectFromExpressRequest } from '@coffeekraken/sugar/php';
import __path from 'path';
export default function page({ req, res, next, pageConfig, pageFile, frontendServerConfig, }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const pageFilePath = pageFile.path;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLENBQUMsT0FBTyxVQUFVLElBQUksQ0FBQyxFQUN6QixHQUFHLEVBQ0gsR0FBRyxFQUNILElBQUksRUFDSixVQUFVLEVBQ1YsUUFBUSxFQUNSLG9CQUFvQixHQUN2QjtJQUNHLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRW5DLDRCQUE0QjtRQUM1QixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQ3BCLE1BQU0sQ0FBQyxPQUFPLENBQ1YsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFDN0IsNkNBQTZDLENBQ2hELEVBQ0Q7WUFDSSxRQUFRLEVBQUUsZ0NBQWdDLENBQUMsR0FBRyxDQUFDO1lBQy9DLFlBQVk7WUFDWixZQUFZLEVBQUUsZ0JBQWdCLEVBQUU7WUFDaEMsUUFBUSxFQUFFLEdBQUcsZUFBZSxFQUFFLFFBQVE7U0FDekMsRUFDRDtZQUNJLGlCQUFpQixFQUFFLElBQUk7U0FDMUIsQ0FDSixDQUFDO1FBRUYsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPLENBQUM7Z0JBQ0osS0FBSyxFQUFFLENBQUM7YUFDWCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sU0FBUyxHQUFHLE1BQU0sTUFBTSxDQUFDO1FBRS9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==