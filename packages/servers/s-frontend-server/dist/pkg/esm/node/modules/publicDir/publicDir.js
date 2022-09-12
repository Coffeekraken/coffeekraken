var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __express from 'express';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SGlob from '@coffeekraken/s-glob';
export default function rootFiles(express, settings, config) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const packageRoot = __packageRootDir(), publicDir = __SSugarConfig.get('storage.src.publicDir');
        const files = __SGlob.resolve('**/*', {
            cwd: publicDir,
        });
        emit('log', {
            value: `<yellow>[publicDir]</yellow> Exposing <magenta>${files.length}</magenta> file(s) from public directory`,
        });
        files.forEach((file) => {
            emit('log', {
                value: `<yellow>[publicDir]</yellow> Exposing file "<yellow>${file.relPath}</yellow>"`,
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRzVELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07SUFDdkQsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEMsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLEVBQUUsRUFDbEMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM1RCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQyxHQUFHLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLGtEQUFrRCxLQUFLLENBQUMsTUFBTSwwQ0FBMEM7U0FDbEgsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLHVEQUF1RCxJQUFJLENBQUMsT0FBTyxZQUFZO2FBQ3pGLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQ1AsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQ2xCLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDM0IsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ25CLENBQUMsQ0FDTCxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLEVBQ0Q7UUFDSSxLQUFLLEVBQUU7WUFDSCxFQUFFLEVBQUUsaUJBQWlCO1NBQ3hCO0tBQ0osQ0FDSixDQUFDO0FBQ04sQ0FBQyJ9