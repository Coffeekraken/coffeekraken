var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import __path from 'path';
import __parseArgs from '../../node/cli/parseArgs';
import __resolveGlob from '../../node/glob/resolveGlob';
import __folderPath from '../../node/fs/folderPath';
import __ensureDirSync from '../../node/fs/ensureDirSync';
import __getFilename from '../../node/fs/filename';
import __childProcess from 'child_process';
import __parseHtml from '../../node/console/parseHtml';
/**
 * @status              wip
 * @todo    Enhance the process and maybe rename it...
 */
export default (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    const args = __parseArgs(stringArgs, {
        definition: {
            source: {
                type: 'String',
                required: true,
                alias: 'a',
                default: __path.resolve(process.cwd(), 'src/js')
            },
            destination: {
                type: 'String',
                required: true,
                alias: 'd',
                default: __path.resolve(process.cwd(), 'src/node')
            }
        }
    });
    const src = args.source;
    const dest = args.destination;
    console.log(__parseHtml(`Seaching for files with the "<yellow>@shared</yellow>" comment...`));
    const files = __resolveGlob(`${src}/**/*.ts`, {
        contentRegex: /\/\/\s?@shared/gm,
        glob: {
            ignore: ['**/node_modules/**']
        }
    });
    // loop on files
    files.forEach((file) => {
        const relSrcPath = __path.relative(src, file.path);
        const srcPath = file.path;
        const destPath = `${dest}/${relSrcPath}`;
        const srcFolderPath = __folderPath(srcPath);
        const destFolderPath = __folderPath(destPath);
        const relFolderPath = __path.relative(destFolderPath, srcFolderPath);
        __ensureDirSync(destFolderPath);
        try {
            __childProcess.execSync(`rm -rf ${destPath}`);
        }
        catch (e) { }
        __childProcess.execSync(`cd ${destFolderPath} && ln -s ${relFolderPath + '/' + __getFilename(srcPath)} ${__getFilename(destPath)}`);
        console.log(__parseHtml(`- Symlink <green>created</green> from "<yellow>${__path.relative(process.cwd(), srcPath)}</yellow>" to "<cyan>${__path.relative(process.cwd(), destPath)}</cyan>"`));
        // const destDirPath = __folderPath(destPath);
        // if (!__fs.existsSync(destPath)) {
        //   console.log(destPath);
        //   __ensureDirSync(destDirPath);
        //   __childProcess.execSync(
        //     `cd ${destDirPath} && ln -s ${relSymlink} ${__getFilename(destPath)}`
        //   );
        //   console.log(`- Symlink created from "${relSrcPath}" to "${relSymlink}"`);
        // }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLGFBQWEsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLFlBQVksTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLGVBQWUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLGFBQWEsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxXQUFXLE1BQU0sOEJBQThCLENBQUM7QUFFdkQ7OztHQUdHO0FBRUgsZUFBZSxDQUFPLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUN2QyxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFO1FBQ25DLFVBQVUsRUFBRTtZQUNWLE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDO2FBQ2pEO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUM7YUFDbkQ7U0FDRjtLQUNGLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUU5QixPQUFPLENBQUMsR0FBRyxDQUNULFdBQVcsQ0FDVCxtRUFBbUUsQ0FDcEUsQ0FDRixDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLEdBQUcsR0FBRyxVQUFVLEVBQUU7UUFDNUMsWUFBWSxFQUFFLGtCQUFrQjtRQUNoQyxJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztTQUMvQjtLQUNGLENBQUMsQ0FBQztJQUVILGdCQUFnQjtJQUNoQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDckIsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsTUFBTSxRQUFRLEdBQUcsR0FBRyxJQUFJLElBQUksVUFBVSxFQUFFLENBQUM7UUFFekMsTUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE1BQU0sY0FBYyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVyRSxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEMsSUFBSTtZQUNGLGNBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQy9DO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtRQUNkLGNBQWMsQ0FBQyxRQUFRLENBQ3JCLE1BQU0sY0FBYyxhQUNsQixhQUFhLEdBQUcsR0FBRyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQzdDLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQzlCLENBQUM7UUFFRixPQUFPLENBQUMsR0FBRyxDQUNULFdBQVcsQ0FDVCxrREFBa0QsTUFBTSxDQUFDLFFBQVEsQ0FDL0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiLE9BQU8sQ0FDUix3QkFBd0IsTUFBTSxDQUFDLFFBQVEsQ0FDdEMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiLFFBQVEsQ0FDVCxVQUFVLENBQ1osQ0FDRixDQUFDO1FBRUYsOENBQThDO1FBRTlDLG9DQUFvQztRQUNwQywyQkFBMkI7UUFFM0Isa0NBQWtDO1FBQ2xDLDZCQUE2QjtRQUM3Qiw0RUFBNEU7UUFDNUUsT0FBTztRQUNQLDhFQUE4RTtRQUM5RSxJQUFJO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQyJ9