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
const fs_1 = __importDefault(require("fs"));
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const resolveGlob_1 = __importDefault(require("../../node/glob/resolveGlob"));
const folderPath_1 = __importDefault(require("../../node/fs/folderPath"));
const ensureDirSync_1 = __importDefault(require("../../node/fs/ensureDirSync"));
const filename_1 = __importDefault(require("../../node/fs/filename"));
const child_process_1 = __importDefault(require("child_process"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxjQUFjO0FBQ2QsZ0RBQTBCO0FBQzFCLDRDQUFzQjtBQUN0Qix5RUFBbUQ7QUFDbkQsOEVBQXdEO0FBQ3hELDBFQUFvRDtBQUNwRCxnRkFBMEQ7QUFDMUQsc0VBQW1EO0FBQ25ELGtFQUEyQztBQUUzQzs7O0dBR0c7QUFFSCxrQkFBZSxDQUFPLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUN2QyxNQUFNLElBQUksR0FBRyxtQkFBVyxDQUFDLFVBQVUsRUFBRTtRQUNuQyxVQUFVLEVBQUU7WUFDVixNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLGNBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQzthQUNqRDtZQUNELFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsVUFBVSxDQUFDO2FBQ25EO1NBQ0Y7S0FDRixDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFFOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0lBRWhFLE1BQU0sS0FBSyxHQUFHLE1BQU0scUJBQWEsQ0FBQyxHQUFHLEdBQUcsVUFBVSxFQUFFO1FBQ2xELFlBQVksRUFBRSxrQkFBa0I7UUFDaEMsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLENBQUMsb0JBQW9CLENBQUM7U0FDL0I7S0FDRixDQUFDLENBQUM7SUFFSCxnQkFBZ0I7SUFDaEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JCLE1BQU0sVUFBVSxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLE1BQU0sUUFBUSxHQUFHLEdBQUcsSUFBSSxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sVUFBVSxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELE1BQU0sV0FBVyxHQUFHLG9CQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV0Qix1QkFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdCLHVCQUFjLENBQUMsUUFBUSxDQUNyQixNQUFNLFdBQVcsYUFBYSxVQUFVLElBQUksa0JBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUN0RSxDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsVUFBVSxTQUFTLFVBQVUsR0FBRyxDQUFDLENBQUM7U0FDMUU7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILFlBQVk7SUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFBLENBQUMifQ==