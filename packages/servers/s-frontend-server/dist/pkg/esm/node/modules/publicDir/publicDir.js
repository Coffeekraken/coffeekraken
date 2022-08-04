var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __express from 'express';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SGlob from '@coffeekraken/s-glob';
export default function rootFiles(express, settings, config) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const packageRoot = __packageRoot(), publicDir = __SSugarConfig.get('storage.src.publicDir');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBR3RFLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07SUFDdkQsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEMsTUFBTSxXQUFXLEdBQUcsYUFBYSxFQUFFLEVBQy9CLFNBQVMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDNUQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDbEMsR0FBRyxFQUFFLFNBQVM7U0FDakIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssRUFBRSxrREFBa0QsS0FBSyxDQUFDLE1BQU0sMENBQTBDO1NBQ2xILENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSx1REFBdUQsSUFBSSxDQUFDLE9BQU8sWUFBWTthQUN6RixDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUNQLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUNsQixTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSTthQUNuQixDQUFDLENBQ0wsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQSxFQUNEO1FBQ0ksS0FBSyxFQUFFO1lBQ0gsRUFBRSxFQUFFLGlCQUFpQjtTQUN4QjtLQUNKLENBQ0osQ0FBQztBQUNOLENBQUMifQ==