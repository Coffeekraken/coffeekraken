"use strict";
// @ts-nocheck
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
const fs_1 = __importDefault(require("fs"));
const find_in_files_1 = __importDefault(require("find-in-files"));
const path_1 = __importDefault(require("path"));
const writeFileSync_1 = __importDefault(require("../../node/fs/writeFileSync"));
const parse_1 = __importDefault(require("../../node/docblock/parse"));
const deepMerge_1 = __importDefault(require("../../node/object/deepMerge"));
const upperFirst_1 = __importDefault(require("../../node/string/upperFirst"));
const find_package_json_1 = __importDefault(require("find-package-json"));
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
exports.default = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    const f = find_package_json_1.default(__dirname);
    let file = f.next();
    let finalFile, rootPath;
    while (!file.done) {
        if (file.done)
            break;
        finalFile = file;
        file = f.next();
    }
    if (finalFile.filename) {
        rootPath = finalFile.filename.split('/').slice(0, -1).join('/');
    }
    const args = parseArgs_1.default(stringArgs, {
        definition: {
            language: {
                type: 'String',
                alias: 'l',
                default: 'js'
            },
            destination: {
                type: 'String',
                alias: 'd',
                default: `[rootDir]/.vscode/sugar.[language].code-snippets`
            }
        }
    });
    args.destination = args.destination.replace('[language]', args.language);
    args.destination = args.destination.replace('[rootDir]', rootPath);
    const snippetScope = args.language === 'js' ? 'javascript' : args.language;
    const snippetsObj = {};
    const filepathesProcessed = [];
    const files = yield find_in_files_1.default.find('@namespace', `${__dirname}/../../${args.language}`, '.js$');
    for (let i = 0; i < Object.keys(files).length; i++) {
        const filepath = Object.keys(files)[i];
        if (filepath.includes('__wip__'))
            continue;
        if (filepath.includes('__tests__'))
            continue;
        if (filepath.includes('generateEasyStack'))
            continue;
        if (filepath.includes('generateSnippetsFile'))
            continue;
        filepathesProcessed.push(filepath);
        let fileContent = fs_1.default.readFileSync(filepath).toString();
        let fileNamespace;
        let docObjs = parse_1.default(fileContent);
        const folderPath = path_1.default
            .relative(__dirname, filepath)
            .split('/')
            .slice(0, -1);
        if (docObjs && docObjs.length) {
            fileNamespace = docObjs[0].namespace;
        }
        // check if the file has a @src tag in the forst block
        const firstBlock = docObjs[0];
        if (firstBlock.src) {
            const relativeSrcPath = path_1.default.resolve(__dirname, firstBlock.src.replace('../'.repeat(folderPath.length), ''));
            // read the source path
            let srcContent = fs_1.default.readFileSync(relativeSrcPath).toString();
            // if we have a content, parse it
            if (srcContent) {
                const srcDocObjs = parse_1.default(srcContent);
                srcDocObjs.forEach((srcDocObj, i) => {
                    if (i === 0) {
                        docObjs[0] = deepMerge_1.default(srcDocObj, firstBlock);
                        delete docObjs[0].src;
                    }
                    else {
                        // docObjs.push(srcDocObj);
                    }
                });
            }
        }
        docObjs.forEach((docObj) => {
            const namespace = docObj.namespace || fileNamespace;
            if (!namespace || !docObj.description || !docObj.name) {
                return;
            }
            if (docObj.private || (docObj.name && docObj.name.substr(0, 1) === '_')) {
                return;
            }
            // generate the body if not specified through the @snippet doc tag
            let body;
            if (!docObj.snippet) {
                if (docObj.type === 'Class') {
                    body = `new ${upperFirst_1.default(namespace)}.${docObj.name}(`;
                }
                else if (docObj.type === 'Function') {
                    body = `${upperFirst_1.default(namespace)}.${docObj.name}(`;
                }
                else {
                    body = `${upperFirst_1.default(namespace)}.${docObj.name}`;
                }
                if (docObj.param) {
                    const paramsStringArray = [];
                    Object.keys(docObj.param).forEach((name, i) => {
                        const pObj = docObj.param[name];
                        paramsStringArray.push('${' + (i + 1) + ':' + pObj.name + '}');
                    });
                    body += paramsStringArray.join(', ');
                }
                if (docObj.type === 'Class' || docObj.type === 'Function') {
                    body += ')';
                }
            }
            else {
                body = docObj.snippet.code;
            }
            // compute the description
            let description = docObj.description;
            if (docObj.example) {
                description += '\n\nExample:\n\n';
                description += docObj.example.code;
            }
            if (docObj.author) {
                description += `\n\nAuthor: ${docObj.author.name} ${docObj.author.email} ${docObj.author.website}`;
            }
            // build the snippet object
            const snippet = {
                scope: snippetScope,
                prefix: `${upperFirst_1.default(namespace)}.${docObj.name}`,
                body,
                description
            };
            // add this snippet to the snippets object
            snippetsObj[`${upperFirst_1.default(namespace)}.${docObj.name}`] = snippet;
        });
    }
    // write the file
    if (args.destination) {
        try {
            writeFileSync_1.default(args.destination, JSON.stringify(snippetsObj, null, 4));
        }
        catch (e) {
            console.log(e);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2VuZXJhdGVGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDRDQUFzQjtBQUN0QixrRUFBbUM7QUFDbkMsZ0RBQTBCO0FBRTFCLGdGQUEwRDtBQUUxRCxzRUFBZ0Q7QUFDaEQsNEVBQXNEO0FBQ3RELDhFQUF3RDtBQUV4RCwwRUFBOEM7QUFDOUMseUVBQW1EO0FBRW5ELGtCQUFlLENBQU8sVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sQ0FBQyxHQUFHLDJCQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BCLElBQUksU0FBUyxFQUFFLFFBQVEsQ0FBQztJQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNqQixJQUFJLElBQUksQ0FBQyxJQUFJO1lBQUUsTUFBTTtRQUNyQixTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDakI7SUFDRCxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7UUFDdEIsUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakU7SUFFRCxNQUFNLElBQUksR0FBRyxtQkFBVyxDQUFDLFVBQVUsRUFBRTtRQUNuQyxVQUFVLEVBQUU7WUFDVixRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUNELFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsUUFBUTtnQkFD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