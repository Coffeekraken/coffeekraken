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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxjQUFjO0FBQ2QsZ0RBQTBCO0FBRTFCLHlFQUFtRDtBQUNuRCw4RUFBd0Q7QUFDeEQsMEVBQW9EO0FBQ3BELGdGQUEwRDtBQUMxRCxzRUFBbUQ7QUFDbkQsa0VBQTJDO0FBQzNDLDZFQUF1RDtBQUV2RDs7O0dBR0c7QUFFSCxrQkFBZSxDQUFPLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUN2QyxNQUFNLElBQUksR0FBRyxtQkFBVyxDQUFDLFVBQVUsRUFBRTtRQUNuQyxVQUFVLEVBQUU7WUFDVixNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLGNBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQzthQUNqRDtZQUNELFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsVUFBVSxDQUFDO2FBQ25EO1NBQ0Y7S0FDRixDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFFOUIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxtQkFBVyxDQUNULG1FQUFtRSxDQUNwRSxDQUNGLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxNQUFNLHFCQUFhLENBQUMsR0FBRyxHQUFHLFVBQVUsRUFBRTtRQUNsRCxZQUFZLEVBQUUsa0JBQWtCO1FBQ2hDLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxDQUFDLG9CQUFvQixDQUFDO1NBQy9CO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsZ0JBQWdCO0lBQ2hCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNyQixNQUFNLFVBQVUsR0FBRyxjQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMxQixNQUFNLFFBQVEsR0FBRyxHQUFHLElBQUksSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUV6QyxNQUFNLGFBQWEsR0FBRyxvQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE1BQU0sY0FBYyxHQUFHLG9CQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsTUFBTSxhQUFhLEdBQUcsY0FBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFckUsdUJBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoQyxJQUFJO1lBQ0YsdUJBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQy9DO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtRQUNkLHVCQUFjLENBQUMsUUFBUSxDQUNyQixNQUFNLGNBQWMsYUFDbEIsYUFBYSxHQUFHLEdBQUcsR0FBRyxrQkFBYSxDQUFDLE9BQU8sQ0FDN0MsSUFBSSxrQkFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQzlCLENBQUM7UUFFRixPQUFPLENBQUMsR0FBRyxDQUNULG1CQUFXLENBQ1Qsa0RBQWtELGNBQU0sQ0FBQyxRQUFRLENBQy9ELE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDYixPQUFPLENBQ1Isd0JBQXdCLGNBQU0sQ0FBQyxRQUFRLENBQ3RDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDYixRQUFRLENBQ1QsVUFBVSxDQUNaLENBQ0YsQ0FBQztRQUVGLDhDQUE4QztRQUU5QyxvQ0FBb0M7UUFDcEMsMkJBQTJCO1FBRTNCLGtDQUFrQztRQUNsQyw2QkFBNkI7UUFDN0IsNEVBQTRFO1FBQzVFLE9BQU87UUFDUCw4RUFBOEU7UUFDOUUsSUFBSTtJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBLENBQUMifQ==