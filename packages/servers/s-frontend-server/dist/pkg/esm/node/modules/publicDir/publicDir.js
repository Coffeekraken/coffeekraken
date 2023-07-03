var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SGlob from '@coffeekraken/s-glob';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __express from 'express';
export default function rootFiles({ express, settings, config }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const packageRoot = __packageRootDir(), publicDir = __SSugarConfig.get('storage.src.publicDir');
        const files = __SGlob.resolveSync('**/*', {
            cwd: publicDir,
        });
        (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[publicDir]</yellow> Exposing <magenta>${files.length}</magenta> file(s) from public directory`);
        files.forEach((file) => {
            var _a;
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[publicDir]</yellow> Exposing file "<yellow>${file.relPath}</yellow>"`);
            express.get(`/${file.relPath}`, __express.static(file.dirPath, {
                index: file.name,
            }));
        });
        resolve(true);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQyxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO0lBQzNELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7UUFDakMsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLEVBQUUsRUFDbEMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM1RCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxHQUFHLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQUM7UUFFSCxNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLGtEQUFrRCxLQUFLLENBQUMsTUFBTSwwQ0FBMEMsQ0FDM0csQ0FBQztRQUVGLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7WUFDbkIsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCx1REFBdUQsSUFBSSxDQUFDLE9BQU8sWUFBWSxDQUNsRixDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FDUCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFDbEIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDbkIsQ0FBQyxDQUNMLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9