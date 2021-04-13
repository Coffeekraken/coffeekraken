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
const extractImport_1 = __importDefault(require("../../module/extractImport"));
const resolve_1 = __importDefault(require("../../module/resolve"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const sugar_1 = __importDefault(require("../../../shared/config/sugar"));
const folderPath_1 = __importDefault(require("../../fs/folderPath"));
function esbuildAggregateLibsPlugin(params) {
    const p = deepMerge_1.default({
        outputDir: sugar_1.default('js.compile.outputDir'),
        rootDir: sugar_1.default('js.compile.rootDir'),
        folderName: '.libs',
        esbuild: {}
    }, params);
    return {
        name: 'aggregateLibs',
        setup(build) {
            build.onResolve({ filter: /.*\.[jt]s$/ }, function (args) {
                const content = fs_1.default.readFileSync(args.path, 'utf8').toString();
                console.log('CCC');
                const imports = extractImport_1.default(content);
                const importedFiles = [];
                const esbuildParams = Object.assign({ charset: 'utf8', format: 'esm', logLevel: 'info', bundle: false, write: false, errorLimit: 100 }, p.esbuild);
                const dirs = [
                    `${packageRoot_1.default()}/node_modules`,
                    `${packageRoot_1.default(process.cwd(), true)}/node_modules`
                ];
                imports.forEach((importObj) => __awaiter(this, void 0, void 0, function* () {
                    const path = resolve_1.default(importObj.path, {
                        dirs
                    });
                    const file = s_file_1.default.new(path);
                    const moduleRootPath = packageRoot_1.default(path);
                    const moduleRelPath = path_1.default.relative(moduleRootPath, path);
                    const srcRelPath = path_1.default.relative(folderPath_1.default(args.path), p.rootDir);
                    const relPath = `${srcRelPath.trim() !== '' ? srcRelPath + '/' : './'}${p.folderName}/${moduleRootPath.split('/').pop()}/${moduleRelPath}`;
                    // replace the import statement
                    const newImport = importObj.raw.replace(importObj.path, `${relPath}`);
                    const newContent = content.replace(importObj.raw, newImport);
                    const savePath = path_1.default.resolve(p.outputDir, p.folderName, moduleRelPath);
                    console.log(savePath);
                    // passing the lib through esbuild
                    //   const resultObj = await __esbuild.build({
                    //     ...esbuildParams,
                    //     entryPoints: [path]
                    //   });
                    //   _console.log(resultObj);
                    // write the new file
                    //   __ensureDirSync(__folderPath(savePath));
                    //   __fs.writeFileSync(savePath, newContent);
                    importedFiles.push(file);
                }));
                return { path: args.path };
            });
        }
    };
}
exports.default = esbuildAggregateLibsPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRlTGlicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFnZ3JlZ2F0ZUxpYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrRUFBeUQ7QUFDekQsbUVBQTZDO0FBQzdDLDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIseUVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyxpRkFBMkQ7QUFDM0QseUVBQXlEO0FBQ3pELHFFQUErQztBQVcvQyxTQUF3QiwwQkFBMEIsQ0FDaEQsTUFBNkM7SUFFN0MsTUFBTSxDQUFDLEdBQWdDLG1CQUFXLENBQ2hEO1FBQ0UsU0FBUyxFQUFFLGVBQWEsQ0FBQyxzQkFBc0IsQ0FBQztRQUNoRCxPQUFPLEVBQUUsZUFBYSxDQUFDLG9CQUFvQixDQUFDO1FBQzVDLFVBQVUsRUFBRSxPQUFPO1FBQ25CLE9BQU8sRUFBRSxFQUFFO0tBQ1osRUFDRCxNQUFNLENBQ1AsQ0FBQztJQUVGLE9BQU87UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLENBQUMsS0FBSztZQUNULEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsVUFBVSxJQUFJO2dCQUN0RCxNQUFNLE9BQU8sR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBRWhFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRW5CLE1BQU0sT0FBTyxHQUFHLHVCQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sYUFBYSxHQUFjLEVBQUUsQ0FBQztnQkFFcEMsTUFBTSxhQUFhLG1CQUNqQixPQUFPLEVBQUUsTUFBTSxFQUNmLE1BQU0sRUFBRSxLQUFLLEVBQ2IsUUFBUSxFQUFFLE1BQU0sRUFDaEIsTUFBTSxFQUFFLEtBQUssRUFDYixLQUFLLEVBQUUsS0FBSyxFQUNaLFVBQVUsRUFBRSxHQUFHLElBQ1osQ0FBQyxDQUFDLE9BQU8sQ0FDYixDQUFDO2dCQUVGLE1BQU0sSUFBSSxHQUFHO29CQUNYLEdBQUcscUJBQWEsRUFBRSxlQUFlO29CQUNqQyxHQUFHLHFCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlO2lCQUNyRCxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBTyxTQUFTLEVBQUUsRUFBRTtvQkFDbEMsTUFBTSxJQUFJLEdBQUcsaUJBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFO3dCQUNyQyxJQUFJO3FCQUNMLENBQUMsQ0FBQztvQkFFSCxNQUFNLElBQUksR0FBRyxnQkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFL0IsTUFBTSxjQUFjLEdBQUcscUJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDM0MsTUFBTSxhQUFhLEdBQUcsY0FBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBRTVELE1BQU0sVUFBVSxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQ2hDLG9CQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUN2QixDQUFDLENBQUMsT0FBTyxDQUNWLENBQUM7b0JBRUYsTUFBTSxPQUFPLEdBQUcsR0FDZCxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUNoRCxHQUFHLENBQUMsQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxhQUFhLEVBQUUsQ0FBQztvQkFFdEUsK0JBQStCO29CQUMvQixNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFFdEUsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUU3RCxNQUFNLFFBQVEsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUM3QixDQUFDLENBQUMsU0FBUyxFQUNYLENBQUMsQ0FBQyxVQUFVLEVBQ1osYUFBYSxDQUNkLENBQUM7b0JBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFdEIsa0NBQWtDO29CQUNsQyw4Q0FBOEM7b0JBQzlDLHdCQUF3QjtvQkFDeEIsMEJBQTBCO29CQUMxQixRQUFRO29CQUVSLDZCQUE2QjtvQkFFN0IscUJBQXFCO29CQUNyQiw2Q0FBNkM7b0JBQzdDLDhDQUE4QztvQkFFOUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztnQkFFSCxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQXpGRCw2Q0F5RkMifQ==