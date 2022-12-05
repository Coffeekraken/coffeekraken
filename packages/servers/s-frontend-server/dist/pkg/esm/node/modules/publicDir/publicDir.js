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
import __SGlob from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __express from 'express';
export default function rootFiles(express, settings, config) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const packageRoot = __packageRootDir(), publicDir = __SSugarConfig.get('storage.src.publicDir');
        const files = __SGlob.resolve('**/*', {
            cwd: publicDir,
        });
        if (__SEnv.is('verbose')) {
            emit('log', {
                value: `<yellow>[publicDir]</yellow> Exposing <magenta>${files.length}</magenta> file(s) from public directory`,
            });
        }
        files.forEach((file) => {
            if (__SEnv.is('verbose')) {
                emit('log', {
                    value: `<yellow>[publicDir]</yellow> Exposing file "<yellow>${file.relPath}</yellow>"`,
                });
            }
            express.get(`/${file.relPath}`, __express.static(file.dirPath, {
                index: file.name,
            }));
        });
        resolve(true);
    }), {
        metas: {
            id: 'SFrontendServer',
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQyxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07SUFDdkQsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEMsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLEVBQUUsRUFDbEMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM1RCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQyxHQUFHLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQUM7UUFFSCxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsa0RBQWtELEtBQUssQ0FBQyxNQUFNLDBDQUEwQzthQUNsSCxDQUFDLENBQUM7U0FDTjtRQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNuQixJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLHVEQUF1RCxJQUFJLENBQUMsT0FBTyxZQUFZO2lCQUN6RixDQUFDLENBQUM7YUFDTjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQ1AsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQ2xCLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDM0IsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ25CLENBQUMsQ0FDTCxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLEVBQ0Q7UUFDSSxLQUFLLEVBQUU7WUFDSCxFQUFFLEVBQUUsaUJBQWlCO1NBQ3hCO0tBQ0osQ0FDSixDQUFDO0FBQ04sQ0FBQyJ9