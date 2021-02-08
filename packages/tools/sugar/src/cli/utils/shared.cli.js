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
// @ts-nocheck
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const resolveGlob_1 = __importDefault(require("../../node/glob/resolveGlob"));
const folderPath_1 = __importDefault(require("../../node/fs/folderPath"));
const ensureDirSync_1 = __importDefault(require("../../node/fs/ensureDirSync"));
const filename_1 = __importDefault(require("../../node/fs/filename"));
const child_process_1 = __importDefault(require("child_process"));
module.exports = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
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
    console.log(`Seaching for files with the "@shared" comment...`);
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
        const relSymlink = path_1.default.relative(destPath, srcPath);
        const destDirPath = folderPath_1.default(destPath);
        if (!fs_1.default.existsSync(destPath)) {
            console.log(destPath);
            ensureDirSync_1.default(destDirPath);
            child_process_1.default.execSync(`cd ${destDirPath} && ln -s ${relSymlink} ${filename_1.default(destPath)}`);
            console.log(`- Symlink created from "${relSrcPath}" to "${relSymlink}"`);
        }
    });
    // completed
    console.log('Completed successfully!');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxnREFBMEI7QUFDMUIsNENBQXNCO0FBQ3RCLHlFQUFtRDtBQUNuRCw4RUFBd0Q7QUFDeEQsMEVBQW9EO0FBQ3BELGdGQUEwRDtBQUMxRCxzRUFBbUQ7QUFDbkQsa0VBQTJDO0FBTzNDLGlCQUFTLENBQU8sVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLG1CQUFXLENBQUMsVUFBVSxFQUFFO1FBQ25DLFVBQVUsRUFBRTtZQUNWLE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDO2FBQ2pEO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUM7YUFDbkQ7U0FDRjtLQUNGLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUU5QixPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7SUFFaEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxxQkFBYSxDQUFDLEdBQUcsR0FBRyxVQUFVLEVBQUU7UUFDbEQsWUFBWSxFQUFFLGtCQUFrQjtRQUNoQyxJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztTQUMvQjtLQUNGLENBQUMsQ0FBQztJQUVILGdCQUFnQjtJQUNoQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDckIsTUFBTSxVQUFVLEdBQUcsY0FBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsTUFBTSxRQUFRLEdBQUcsR0FBRyxJQUFJLElBQUksVUFBVSxFQUFFLENBQUM7UUFDekMsTUFBTSxVQUFVLEdBQUcsY0FBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEQsTUFBTSxXQUFXLEdBQUcsb0JBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXRCLHVCQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0IsdUJBQWMsQ0FBQyxRQUFRLENBQ3JCLE1BQU0sV0FBVyxhQUFhLFVBQVUsSUFBSSxrQkFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQ3RFLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixVQUFVLFNBQVMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUMxRTtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsWUFBWTtJQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUEsQ0FBQyJ9