import __fs from 'fs';
import __path from 'path';
import __glob from 'glob';
import __dirname from './dist/pkg/esm/node/fs/dirname.js';

const folders = __glob.sync('dist/pkg/esm/*/*/_exports.d.ts', {
    cwd: __path.resolve(__dirname())
});

const packageJson = JSON.parse(__fs.readFileSync(`${__dirname()}/package.json`));

for (let [path, value] of Object.entries(packageJson.exports)) {

    if (path.match(/\/\*$/)) {
        continue;
    }

    const namespace = path.replace(/^\.\//, '');
    const folderPath = `${__dirname()}/${namespace}`;

    if (!__fs.existsSync(folderPath)) {
        __fs.mkdirSync(folderPath);
    }

    let packageJson = {},
        exportsD = [];


    if (value.import) {
        exportsD.push(`export * from '../${value.import.replace(/^\.\//, '')}`);
    }
    if (value.require) {
        exportsD.push(`export * from '../${value.require.replace(/^\.\//, '')}'`);
    }
    if (value.node?.import) {
        exportsD.push(`export * from '../${value.node.import.replace(/^\.\//, '')}'`);
    }
    if (value.node?.require) {
        exportsD.push(`export * from '../${value.node.require.replace(/^\.\//, '')}'`);
    }

    if (value.default?.import) {
        exportsD.push(`export * from '../${value.default.import.replace(/^\.\//, '')}'`);
    }
    if (value.default?.require) {
        exportsD.push(`export * from '../${value.default.require.replace(/^\.\//, '')}'`);
    }

    __fs.writeFileSync(`${folderPath}/_exports.d.ts`, exportsD.join('\n'));

    __fs.writeFileSync(`${folderPath}/package.json`, JSON.stringify({
        name: `@coffeekraken/sugar/${namespace}`,
        type: "module",
        types: "./_exports.d.ts",
        sideEffects: false
      }, null, 4));

    // if (__fs.exi __fs.existsSync(`${folderPath}/package.json`)) {}

}


// folders.forEach(folderPath => {

//     const folderName = folderPath.split('/').slice(-2)[0];

//     console.log(folderName);

//     // const filePath = `${__dirname()}/`

// });