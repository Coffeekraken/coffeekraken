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
import __fs from 'fs';
import __isDirectory from '@coffeekraken/sugar/node/is/directory';
import __express from 'express';
import __SPromise from '@coffeekraken/s-promise';
export default function rootFiles(express, settings, config) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const packageRoot = __packageRoot();
        const files = __fs.readdirSync(packageRoot);
        emit('log', {
            value: `<yellow>[rootFiles]</yellow> Exposing <magenta>${files.length}</magenta> root file(s)`,
        });
        files.forEach((fileName) => {
            const filePath = `${packageRoot}/${fileName}`;
            if (__isDirectory(filePath))
                return;
            if (['docmap.json', 'package.json'].includes(fileName))
                return;
            // emit('log', {
            //     value: `<yellow>[rootFiles]</yellow> Exposing file "<yellow>${fileName}</yellow>"`,
            // });
            express.get(`/${fileName}`, __express.static(packageRoot, {
                index: fileName,
            }));
        });
        resolve(true);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdEZpbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm9vdEZpbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLGFBQWEsTUFBTSx1Q0FBdUMsQ0FBQztBQUNsRSxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNO0lBQ3ZELE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQsTUFBTSxXQUFXLEdBQUcsYUFBYSxFQUFFLENBQUM7UUFDcEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLGtEQUFrRCxLQUFLLENBQUMsTUFBTSx5QkFBeUI7U0FDakcsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3ZCLE1BQU0sUUFBUSxHQUFHLEdBQUcsV0FBVyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQzlDLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQztnQkFBRSxPQUFPO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFBRSxPQUFPO1lBQy9ELGdCQUFnQjtZQUNoQiwwRkFBMEY7WUFDMUYsTUFBTTtZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQ1AsSUFBSSxRQUFRLEVBQUUsRUFDZCxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtnQkFDMUIsS0FBSyxFQUFFLFFBQVE7YUFDbEIsQ0FBQyxDQUNMLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9