"use strict";
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
exports.default = async (stringArgs = '') => {
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
        definitionObj: {
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
    const files = await find_in_files_1.default.find('@namespace', `${__dirname}/../../${args.language}`, '.js$');
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
};
