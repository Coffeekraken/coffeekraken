import __glob from 'glob';
import __chokidar from 'chokidar';
import __childProcess from 'child_process';
import __path from 'path';
import __fs from 'fs';
import __chalk from 'chalk';
import __ts from 'typescript';

const _processedPkgs = [];

function processPackage(packageRoot) {
    console.log(`Processing package ${__chalk.yellow(packageRoot)}...`);
    _processedPkgs.push(packageRoot);

    let hasShared = false,
        hasNode = false,
        hasJs = false,
        hasCli = false;
    if (__fs.existsSync(`${packageRoot}/src/shared/exports.ts`)) {
        console.log(
            `${__chalk.yellow(packageRoot)} has a ${__chalk.magenta(
                'shared',
            )} folder`,
        );
        hasShared = true;
    }
    if (__fs.existsSync(`${packageRoot}/src/node/exports.ts`)) {
        console.log(
            `${__chalk.yellow(packageRoot)} has a ${__chalk.magenta(
                'node',
            )} folder`,
        );
        hasNode = true;
    }
    if (__fs.existsSync(`${packageRoot}/src/js/exports.ts`)) {
        console.log(
            `${__chalk.yellow(packageRoot)} has a ${__chalk.magenta(
                'js',
            )} folder`,
        );
        hasJs = true;
    }
    if (__fs.existsSync(`${packageRoot}/src/cli/exports.ts`)) {
        console.log(
            `${__chalk.yellow(packageRoot)} has a ${__chalk.magenta(
                'cli',
            )} folder`,
        );
        hasCli = true;
    }

    let json;
    if (hasJs && hasNode) {
        json = {
            main: 'dist/pkg/cjs/js/exports.js',
            module: 'dist/pkg/esm/js/exports.js',
            exports: {
                node: {
                    require: './dist/pkg/cjs/node/exports.js',
                    import: './dist/pkg/esm/node/exports.js',
                },
                default: {
                    require: './dist/pkg/cjs/js/exports.js',
                    import: './dist/pkg/esm/js/exports.js',
                },
            },
        };
    } else if (hasJs && !hasNode) {
        json = {
            main: 'dist/pkg/cjs/js/exports.js',
            module: 'dist/pkg/esm/js/exports.js',
            exports: {
                '.': {
                    require: './dist/pkg/cjs/js/exports.js',
                    import: './dist/pkg/esm/js/exports.js',
                },
            },
        };
    } else if (hasNode && !hasJs) {
        json = {
            main: 'dist/pkg/cjs/node/exports.js',
            module: 'dist/pkg/esm/node/exports.js',
            exports: {
                '.': {
                    require: './dist/pkg/cjs/node/exports.js',
                    import: './dist/pkg/esm/node/exports.js',
                },
            },
        };
    } else if (hasShared) {
        json = {
            main: 'dist/pkg/cjs/shared/exports.js',
            module: 'dist/pkg/esm/shared/exports.js',
            exports: {
                '.': {
                    require: './dist/pkg/cjs/shared/exports.js',
                    import: './dist/pkg/esm/shared/exports.js',
                },
            },
        };
    } else if (hasCli) {
        json = {
            main: 'dist/pkg/cjs/cli/exports.js',
            module: 'dist/pkg/esm/cli/exports.js',
            exports: {
                '.': {
                    require: './dist/pkg/cjs/cli/exports.js',
                    import: './dist/pkg/esm/cli/exports.js',
                },
            },
        };
    }

    // if no json, stop here
    if (!json) {
        console.log(
            `Package ${__chalk.yellow(packageRoot)} processed ${__chalk.green(
                'successfully',
            )}`,
        );
        return;
    }

    // otherwise, update the package json file
    const currentJson = JSON.parse(
        __fs.readFileSync(`${packageRoot}/package.json`).toString(),
    );
    delete currentJson.main;
    delete currentJson.module;
    delete currentJson.exports;
    delete currentJson.type;

    // merge the json
    const newJson = { ...currentJson, ...json };

    // write the new json
    console.log(
        `Writing new package.json for ${__chalk.yellow(packageRoot)}...`,
    );
    __fs.writeFileSync(
        `${packageRoot}/package.json`,
        JSON.stringify(newJson, null, 2),
    );

    console.log(
        `Package ${__chalk.yellow(packageRoot)} processed ${__chalk.green(
            'successfully',
        )}`,
    );
}

function processPath(path, platform = 'node') {
    const packageRoot = path.split('/').slice(0, 3).join('/');
    const pathRelToPackageRoot = path.split('/').slice(4).join('/');
    const format = platform === 'node' ? 'cjs' : 'esm';
    const module = platform === 'node' ? 'commonjs' : 'ES2020';
    const outPath = __path.dirname(
        `${packageRoot}/dist/pkg/%format/${pathRelToPackageRoot}`.replace(
            '%format',
            format,
        ),
    );
    const packageJsonOutPath = `${packageRoot}/dist/pkg/${format}/package.json`;
    const outFilePath = `${outPath}/${__path.basename(path)}`
        .replace('%format', format)
        .replace(/\.ts$/, '.js');

    // process package if needed
    if (!_processedPkgs.includes(packageRoot)) {
        processPackage(packageRoot);
    }

    console.log(
        `Compiling ${__chalk.cyan(path)} to ${__chalk.magenta(
            module,
        )} module system...`,
    );

    const source = __fs.readFileSync(path).toString();

    let result = __ts.transpileModule(source, {
        compilerOptions: {
            incremental: false,
            allowJs: true,
            strict: true,
            inlineSourceMap: true,
            traceResolution: false,
            esModuleInterop: true,
            skipLibCheck: true,
            experimentalDecorators: true,
            forceConsistentCasingInFileNames: false,
            noImplicitAny: false,
            noStrictGenericChecks: false,
            allowSyntheticDefaultImports: true,
            lib: platform === 'node' ? ['esnext'] : ['esnext', 'DOM'],
            target: 'ES2015',
            module,
        },
    });

    if (result.outputText) {
        if (!__fs.existsSync(outPath)) {
            __fs.mkdirSync(outPath, { recursive: true });
        }

        __fs.writeFileSync(outFilePath, result.outputText);
    }

    // // esm
    // const esm = __childProcess.spawn(
    //     `tsup ${[
    //         path,
    //         `--outDir ${outPath}`,
    //         `--format ${format}`,
    //         `--platform ${platform}`,
    //         `--no-splitting`,
    //         '--injectStyle',
    //     ].join(' ')}`,
    //     // `tsc ${path} ${[
    //     //     '--allowJs',
    //     //     '--strict',
    //     //     '--esModuleInterop',
    //     //     '--skipLibCheck',
    //     //     '--experimentalDecorators',
    //     //     '--inlineSourceMap',
    //     //     `--lib ${module === 'commonjs' ? 'es2020' : 'es2020,DOM'}`,
    //     //     `--module ${module}`,
    //     //     '--moduleResolution node',
    //     //     '--target es6',
    //     //     '--noImplicitAny',
    //     //     '--noStrictGenericChecks',
    //     //     '--allowSyntheticDefaultImports',
    //     // ].join(' ')} --outFile ${outFilePath}`,
    //     {
    //         shell: true,
    //         stdio: 'pipe',
    //     },
    // );

    // esm.on('close', () => {
    //     // if (format === 'esm') {
    //     //     let content = __fs.readFileSync(outFilePath).toString();
    //     //     content = content.replace(
    //     //         /__toESM\(require\((.*)\)\)/gm,
    //     //         'import($1)',
    //     //     );
    //     //     __fs.writeFileSync(outFilePath, content);
    //     // }

    //     console.log(
    //         `Compiled ${__chalk.cyan(path)} to ${__chalk.magenta(
    //             module,
    //         )} and saved under ${__chalk.cyan(outFilePath)}`,
    //     );
    // });
    // esm.stderr.on('data', (data) => {
    //     console.error(
    //         `${__chalk.red('Error')} while compiling ${__chalk.cyan(path)}`,
    //     );
    //     console.log(data.toString());
    //     // throw new Error(data.toString());

    //     // sometimes an unlink error occurs, so we try again
    //     if (data.toString().includes('no such file or directory, unlink')) {
    //         processPath(path, module, platform);
    //     }
    // });

    // package.json
    const packageJsonOutFolderPath = __path.dirname(packageJsonOutPath);
    if (!__fs.existsSync(packageJsonOutFolderPath)) {
        __fs.mkdirSync(packageJsonOutFolderPath, { recursive: true });
    }
    if (!__fs.existsSync(packageJsonOutPath)) {
        __fs.writeFileSync(
            packageJsonOutPath,
            JSON.stringify({
                type: module === 'commonjs' ? 'commonjs' : 'module',
            }),
        );
    }
}

// js
const chokidarJs = __chokidar.watch('packages/*/*/src/js/**/*.ts', {
    // ignoreInitial: true,
    ignored: ['**/node_modules'],
});
function chokidarJsCallback(path) {
    // processPath(path, 'node');
    processPath(path, 'browser');
}
chokidarJs.on('add', chokidarJsCallback);
chokidarJs.on('change', chokidarJsCallback);

// node, shared, etc...
const chokidarNode = __chokidar.watch(
    'packages/*/*/src/(node|shared|config|views|cli)/**/*.ts',
    {
        // ignoreInitial: true,
        ignored: ['**/node_modules'],
    },
);
function chokidarNodeCallback(path) {
    processPath(path, 'node');
    processPath(path, 'browser');
}
chokidarNode.on('add', chokidarNodeCallback);
chokidarNode.on('change', chokidarNodeCallback);
