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
            ensureDirSync_1.default(destDirPath);
            child_process_1.default.execSync(`cd ${destDirPath} && ln -s ${relSymlink} ${filename_1.default(destPath)}`);
            console.log(`- Symlink created from "${relSrcPath}" to "${relSymlink}"`);
        }
    });
    // completed
    console.log('Completed successfully!');
});
