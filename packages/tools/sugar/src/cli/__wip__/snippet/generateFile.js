"use strict";
import __fs from 'fs';
import __find from 'find-in-files';
import __path from 'path';
import __writeJsonSync from '../../node/fs/writeJsonSync';
import __writeFileSync from '../../node/fs/writeFileSync';
import __set from '../../node/object/set';
import __parse from '../../node/docblock/parse';
import __deepMerge from '../../node/object/deepMerge';
import __upperFirst from '../../node/string/upperFirst';
import __appRootPath from 'app-root-path';
import __findPkgJson from 'find-package-json';
import __parseArgs from '../../node/cli/parseArgs';

export default async (stringArgs = '') => {
    const f = __findPkgJson(__dirname);
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
    const args = __parseArgs(stringArgs, {
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
    const files = await __find.find('@namespace', `${__dirname}/../../${args.language}`, '.js$');
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
        let fileContent = __fs.readFileSync(filepath).toString();
        let fileNamespace;
        let docObjs = __parse(fileContent);
        const folderPath = __path
            .relative(__dirname, filepath)
            .split('/')
            .slice(0, -1);
        if (docObjs && docObjs.length) {
            fileNamespace = docObjs[0].namespace;
        }
        // check if the file has a @src tag in the forst block
        const firstBlock = docObjs[0];
        if (firstBlock.src) {
            const relativeSrcPath = __path.resolve(__dirname, firstBlock.src.replace('../'.repeat(folderPath.length), ''));
            // read the source path
            let srcContent = __fs.readFileSync(relativeSrcPath).toString();
            // if we have a content, parse it
            if (srcContent) {
                const srcDocObjs = __parse(srcContent);
                srcDocObjs.forEach((srcDocObj, i) => {
                    if (i === 0) {
                        docObjs[0] = __deepMerge(srcDocObj, firstBlock);
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
                    body = `new ${__upperFirst(namespace)}.${docObj.name}(`;
                }
                else if (docObj.type === 'Function') {
                    body = `${__upperFirst(namespace)}.${docObj.name}(`;
                }
                else {
                    body = `${__upperFirst(namespace)}.${docObj.name}`;
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
                prefix: `${__upperFirst(namespace)}.${docObj.name}`,
                body,
                description
            };
            // add this snippet to the snippets object
            snippetsObj[`${__upperFirst(namespace)}.${docObj.name}`] = snippet;
        });
    }
    // write the file
    if (args.destination) {
        try {
            __writeFileSync(args.destination, JSON.stringify(snippetsObj, null, 4));
        }
        catch (e) {
            console.log(e);
        }
    }
};
