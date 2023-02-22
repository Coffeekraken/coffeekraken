// @ts-nocheck

import * as vscode from 'vscode';
import * as __fs from 'fs';

export default function docmapJson(): any {
    const rootDir = vscode.workspace.workspaceFolders[0].uri.fsPath;

    let docmapJson = {},
        docmapJsonMap = {};

    // if (__fs.existsSync(`${rootDir}/docmap.json`)) {
    //     docmapJson = JSON.parse(
    //         __fs.readFileSync(`${rootDir}/docmap.json`).toString(),
    //     );
    //     if (docmapJson.generated?.map) {
    //         docmapJsonMap = docmapJson.generated.map;
    //     }
    // }

    const packageJsonPath = `${rootDir}/package.json`;
    if (!__fs.existsSync(packageJsonPath)) {
        return {};
    }

    const packageJson = JSON.parse(
        __fs.readFileSync(packageJsonPath).toString(),
    );
    const deps = {
        ...(packageJson.devDependencies ?? {}),
        ...(packageJson.dependencies ?? {}),
    };

    const parts = rootDir.split('/');
    let monoRootDir: string;
    while (parts.length >= 1) {
        parts.pop();
        if (__fs.existsSync(`${parts.join('/')}/node_modules`)) {
            monoRootDir = parts.join('/');
            break;
        }
    }

    Object.keys(deps).forEach((packageName) => {
        // const pkgDocmapJsonPath = await import(`${pkg}/docmap.json`);
        const packagePath = `${rootDir}/node_modules/${packageName}/docmap.json`,
            monoPackagePath = `${
                monoRootDir ?? ''
            }/node_modules/${packageName}/docmap.json`;

        let packageDocmapJsonPath;

        if (__fs.existsSync(packagePath)) {
            packageDocmapJsonPath = __fs.realpathSync(packagePath);
        } else if (__fs.existsSync(monoPackagePath)) {
            packageDocmapJsonPath = __fs.realpathSync(monoPackagePath);
        } else {
            return;
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
    });

    // filter docmap with only what we want for this extension
    for (let [key, docmapObj] of Object.entries(docmapJsonMap)) {
        let isValid = true;
        const type = docmapObj.type?.raw?.toLowerCase?.();

        if (
            ![
                'class',
                'function',
                'postcssmixin',
                'postcssfunction',
                'twigfunction',
                'twigfilter',
            ].includes(type)
        ) {
            delete docmapJsonMap[key];
            continue;
        }

        // only beta and stable items
        if (!docmapObj.status) {
            console.log(
                `[Coffeekraken] The namespace ${docmapObj.id} does not have any status defined...`,
            );
        }
        if (docmapObj.status !== 'beta' && docmapObj.status !== 'stable') {
            isValid = false;
        }

        if (!docmapObj.author?.name) {
            console.log(
                `[Coffeekraken] The namespace ${docmapObj.id} does not have any author defined...`,
            );
            isValid = false;
        }

        if (!docmapObj.platform) {
            console.log(
                `[Coffeekraken] The namespace ${docmapObj.id} does not have any platform defined...`,
            );
            isValid = false;
        }

        if (!isValid) {
            delete docmapJsonMap[key];
        }
    }

    return docmapJsonMap;
}
