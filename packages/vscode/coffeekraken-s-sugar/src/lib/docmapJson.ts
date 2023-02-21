import * as vscode from 'vscode';
import * as __fs from 'fs';

export default function docmapJson(): any {
    const rootDir = vscode.workspace.workspaceFolders[0].uri.fsPath;

    let docmapJson = {},
        docmapJsonMap = {};
    if (__fs.existsSync(`${rootDir}/docmap.json`)) {
        docmapJson = JSON.parse(
            __fs.readFileSync(`${rootDir}/docmap.json`).toString(),
        );
        if (docmapJson.generated?.map) {
            docmapJsonMap = docmapJson.generated.map;
        }
    }

    const parts = rootDir.split('/');
    let monoRootDir;
    while (parts.length >= 1) {
        parts.pop();
        if (__fs.existsSync(`${parts.join('/')}/node_modules`)) {
            monoRootDir = parts.join('/');
            break;
        }
    }

    if (docmapJson.generated?.extends?.length) {
        for (let pkg of docmapJson.generated.extends) {
            // const pkgDocmapJsonPath = await import(`${pkg}/docmap.json`);
            const packagePath = `${rootDir}/node_modules/${pkg}/docmap.json`,
                monoPackagePath = `${
                    monoRootDir ?? ''
                }/node_modules/${pkg}/docmap.json`;

            let packageDocmapJsonPath;

            if (__fs.existsSync(packagePath)) {
                packageDocmapJsonPath = packagePath;
            } else if (__fs.existsSync(monoPackagePath)) {
                packageDocmapJsonPath = monoPackagePath;
            }

            const packageDocmapJson = JSON.parse(
                __fs.readFileSync(packageDocmapJsonPath).toString(),
            );

            if (packageDocmapJson.generated?.map) {
                docmapJsonMap = {
                    ...docmapJsonMap,
                    ...packageDocmapJson.generated.map,
                };
            }
        }
    }

    return docmapJsonMap;
}
