"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const path_1 = __importDefault(require("path"));
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const resolveGlob_1 = __importDefault(require("../../node/glob/resolveGlob"));
const folderPath_1 = __importDefault(require("../../node/fs/folderPath"));
const ensureDirSync_1 = __importDefault(require("../../node/fs/ensureDirSync"));
const filename_1 = __importDefault(require("../../node/fs/filename"));
const child_process_1 = __importDefault(require("child_process"));
const parseHtml_1 = __importDefault(require("../../node/console/parseHtml"));
/**
 * @status              wip
 * @todo    Enhance the process and maybe rename it...
 */
exports.default = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    const args = parseArgs_1.default(stringArgs, {
        definition: {
            source: {
                type: 'String',
                required: true,
                alias: 'a',
                default: path_1.default.resolve(process.cwd(), 'src/js')
            },
            destination: {
                type: 'String',
                required: true,
                alias: 'd',
                default: path_1.default.resolve(process.cwd(), 'src/node')
            }
        }
    });
    const src = args.source;
    const dest = args.destination;
    console.log(parseHtml_1.default(`Seaching for files with the "<yellow>@shared</yellow>" comment...`));
    const files = yield resolveGlob_1.default(`${src}/**/*.ts`, {
        contentRegex: /\/\/\s?@shared/gm,
        glob: {
            ignore: ['**/node_modules/**']
        }
    });
    // loop on files
    files.forEach((file) => {
        const relSrcPath = path_1.default.relative(src, file.path);
        const srcPath = file.path;
        const destPath = `${dest}/${relSrcPath}`;
        const srcFolderPath = folderPath_1.default(srcPath);
        const destFolderPath = folderPath_1.default(destPath);
        const relFolderPath = path_1.default.relative(destFolderPath, srcFolderPath);
        ensureDirSync_1.default(destFolderPath);
        try {
            child_process_1.default.execSync(`rm -rf ${destPath}`);
        }
        catch (e) { }
        child_process_1.default.execSync(`cd ${destFolderPath} && ln -s ${relFolderPath + '/' + filename_1.default(srcPath)} ${filename_1.default(destPath)}`);
        console.log(parseHtml_1.default(`- Symlink <green>created</green> from "<yellow>${path_1.default.relative(process.cwd(), srcPath)}</yellow>" to "<cyan>${path_1.default.relative(process.cwd(), destPath)}</cyan>"`));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvdXRpbHMvc2hhcmVkLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxnREFBMEI7QUFFMUIseUVBQW1EO0FBQ25ELDhFQUF3RDtBQUN4RCwwRUFBb0Q7QUFDcEQsZ0ZBQTBEO0FBQzFELHNFQUFtRDtBQUNuRCxrRUFBMkM7QUFDM0MsNkVBQXVEO0FBRXZEOzs7R0FHRztBQUVILGtCQUFlLENBQU8sVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sSUFBSSxHQUFHLG1CQUFXLENBQUMsVUFBVSxFQUFFO1FBQ25DLFVBQVUsRUFBRTtZQUNWLE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDO2FBQ2pEO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUM7YUFDbkQ7U0FDRjtLQUNGLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUU5QixPQUFPLENBQUMsR0FBRyxDQUNULG1CQUFXLENBQ1QsbUVBQW1FLENBQ3BFLENBQ0YsQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLE1BQU0scUJBQWEsQ0FBQyxHQUFHLEdBQUcsVUFBVSxFQUFFO1FBQ2xELFlBQVksRUFBRSxrQkFBa0I7UUFDaEMsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLENBQUMsb0JBQW9CLENBQUM7U0FDL0I7S0FDRixDQUFDLENBQUM7SUFFSCxnQkFBZ0I7SUFDaEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JCLE1BQU0sVUFBVSxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLE1BQU0sUUFBUSxHQUFHLEdBQUcsSUFBSSxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBRXpDLE1BQU0sYUFBYSxHQUFHLG9CQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsTUFBTSxjQUFjLEdBQUcsb0JBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxNQUFNLGFBQWEsR0FBRyxjQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVyRSx1QkFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hDLElBQUk7WUFDRix1QkFBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDL0M7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1FBQ2QsdUJBQWMsQ0FBQyxRQUFRLENBQ3JCLE1BQU0sY0FBYyxhQUNsQixhQUFhLEdBQUcsR0FBRyxHQUFHLGtCQUFhLENBQUMsT0FBTyxDQUM3QyxJQUFJLGtCQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FDOUIsQ0FBQztRQUVGLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQVcsQ0FDVCxrREFBa0QsY0FBTSxDQUFDLFFBQVEsQ0FDL0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiLE9BQU8sQ0FDUix3QkFBd0IsY0FBTSxDQUFDLFFBQVEsQ0FDdEMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiLFFBQVEsQ0FDVCxVQUFVLENBQ1osQ0FDRixDQUFDO1FBRUYsOENBQThDO1FBRTlDLG9DQUFvQztRQUNwQywyQkFBMkI7UUFFM0Isa0NBQWtDO1FBQ2xDLDZCQUE2QjtRQUM3Qiw0RUFBNEU7UUFDNUUsT0FBTztRQUNQLDhFQUE4RTtRQUM5RSxJQUFJO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQyJ9