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
    }), {
        metas: {
            id: 'SFrontendServer',
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdEZpbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm9vdEZpbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLGFBQWEsTUFBTSx1Q0FBdUMsQ0FBQztBQUNsRSxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNO0lBQ3ZELE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sV0FBVyxHQUFHLGFBQWEsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssRUFBRSxrREFBa0QsS0FBSyxDQUFDLE1BQU0seUJBQXlCO1NBQ2pHLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN2QixNQUFNLFFBQVEsR0FBRyxHQUFHLFdBQVcsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUM5QyxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUM7Z0JBQUUsT0FBTztZQUNwQyxJQUFJLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQUUsT0FBTztZQUMvRCxnQkFBZ0I7WUFDaEIsMEZBQTBGO1lBQzFGLE1BQU07WUFDTixPQUFPLENBQUMsR0FBRyxDQUNQLElBQUksUUFBUSxFQUFFLEVBQ2QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7Z0JBQzFCLEtBQUssRUFBRSxRQUFRO2FBQ2xCLENBQUMsQ0FDTCxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLEVBQ0Q7UUFDSSxLQUFLLEVBQUU7WUFDSCxFQUFFLEVBQUUsaUJBQWlCO1NBQ3hCO0tBQ0osQ0FDSixDQUFDO0FBQ04sQ0FBQyJ9