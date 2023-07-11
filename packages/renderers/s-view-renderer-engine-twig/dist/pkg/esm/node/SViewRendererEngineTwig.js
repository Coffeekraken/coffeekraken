var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __unique } from '@coffeekraken/sugar/array';
import { __execPhp } from '@coffeekraken/sugar/exec';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __path from 'path';
import __SViewRendererTwigEngineSettingsInterface from './interface/SViewRendererEngineTwigSettingsInterface.js';
export default class SViewRendererEngineTwig {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render({ viewDotPath, viewRelPath, viewPath, data, sharedDataFilePath, viewRendererSettings, }) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            if (!__fs.existsSync(viewRendererSettings.cacheDir)) {
                __fs.mkdirSync(viewRendererSettings.cacheDir, {
                    recursive: true,
                });
            }
            if (!viewRelPath.includes('/')) {
                viewRelPath = viewRelPath.replace(/\.(?!md|twig)/gm, '/');
            }
            if (!viewRelPath.match(/\.twig$/)) {
                viewRelPath += '.twig';
            }
            // pass the shared data file path through the data
            data._sharedDataFilePath = sharedDataFilePath;
            const resPro = __execPhp(__path.resolve(__packageRootDir(__dirname()), 'src/php/compile.php'), {
                rootDirs: __unique([...viewRendererSettings.rootDirs]),
                viewRelPath,
                data,
                cacheDir: viewRendererSettings.cacheDir,
            }, {
                paramsThroughFile: true,
            });
            resPro.catch((e) => {
                console.error(e);
                resolve({
                    error: e,
                });
            });
            const res = yield resPro;
            if (res.match(/^Twig\\Error\\[a-zA-Z]+Error/)) {
                resolve({
                    error: res,
                });
            }
            else {
                resolve({
                    value: res,
                });
            }
        }));
    }
}
SViewRendererEngineTwig.id = 'twig';
SViewRendererEngineTwig.extensions = ['twig'];
SViewRendererEngineTwig.settingsInterface = __SViewRendererTwigEngineSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTywwQ0FBMEMsTUFBTSx5REFBeUQsQ0FBQztBQW1CakgsTUFBTSxDQUFDLE9BQU8sT0FBTyx1QkFBdUI7SUFNeEMsWUFBWSxRQUFvRDtRQUZoRSxhQUFRLEdBQXFDLEVBQUUsQ0FBQztRQUc1QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQ0gsV0FBVyxFQUNYLFdBQVcsRUFDWCxRQUFRLEVBQ1IsSUFBSSxFQUNKLGtCQUFrQixFQUNsQixvQkFBb0IsR0FDdkI7UUFDRyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7WUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFO29CQUMxQyxTQUFTLEVBQUUsSUFBSTtpQkFDbEIsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDNUIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDN0Q7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDL0IsV0FBVyxJQUFJLE9BQU8sQ0FBQzthQUMxQjtZQUVELGtEQUFrRDtZQUNsRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7WUFFOUMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUNwQixNQUFNLENBQUMsT0FBTyxDQUNWLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQzdCLHFCQUFxQixDQUN4QixFQUNEO2dCQUNJLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxXQUFXO2dCQUNYLElBQUk7Z0JBQ0osUUFBUSxFQUFFLG9CQUFvQixDQUFDLFFBQVE7YUFDMUMsRUFDRDtnQkFDSSxpQkFBaUIsRUFBRSxJQUFJO2FBQzFCLENBQ0osQ0FBQztZQUVGLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDZixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVqQixPQUFPLENBQUM7b0JBQ0osS0FBSyxFQUFFLENBQUM7aUJBQ1gsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLE1BQU0sQ0FBQztZQUV6QixJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsRUFBRTtnQkFDM0MsT0FBTyxDQUFDO29CQUNKLEtBQUssRUFBRSxHQUFHO2lCQUNiLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILE9BQU8sQ0FBQztvQkFDSixLQUFLLEVBQUUsR0FBRztpQkFDYixDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDOztBQXJFTSwwQkFBRSxHQUFHLE1BQU0sQ0FBQztBQUNaLGtDQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0Qix5Q0FBaUIsR0FBRywwQ0FBMEMsQ0FBQyJ9