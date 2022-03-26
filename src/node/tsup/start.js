import __glob from 'glob';
import __chokidar from 'chokidar';
import __childProcess from 'child_process';
import __path from 'path';
import __fs from 'fs';
import __chalk from 'chalk';

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

function processPath(path, platform = 'browser') {
    const packageRoot = path.split('/').slice(0, 3).join('/');
    const pathRelToPackageRoot = path.split('/').slice(4).join('/');
    const outPath = __path.dirname(
        `${packageRoot}/dist/pkg/%format/${pathRelToPackageRoot}`,
    );
    const packageJsonOutPath = `${packageRoot}/dist/pkg/%format/package.json`,
        packageJsonEsmOutPath = packageJsonOutPath.replace('%format', 'esm'),
        packageJsonCjsOutPath = packageJsonOutPath.replace('%format', 'cjs');
    const outTsFilePath = `${outPath}/${__path.basename(path)}`,
        outTsEsmFilePath = outTsFilePath.replace('%format', 'esm'),
        outTsCjsFilePath = outTsFilePath.replace('%format', 'cjs');

    // process package if needed
    if (!_processedPkgs.includes(packageRoot)) {
        processPackage(packageRoot);
    }

    console.log(`Compiling ${__chalk.cyan(path)}...`);

    // esm
    const esm = __childProcess.spawn(
        `tsup ${path} --outDir ${outPath.replace(
            '%format',
            'esm',
        )} --format esm --platform ${platform} --no-splitting`,
        {
            shell: true,
            stdio: 'pipe',
        },
    );
    esm.stderr.on('data', (data) => {
        console.error(
            `${__chalk.red('Error')} while compiling ${__chalk.cyan(path)}`,
        );
        console.log(data.toString());
    });
    // package.json
    const packageJsonEsmOutFolderPath = __path.dirname(packageJsonEsmOutPath);
    if (!__fs.existsSync(packageJsonEsmOutFolderPath)) {
        __fs.mkdirSync(packageJsonEsmOutFolderPath, { recursive: true });
    }
    if (!__fs.existsSync(packageJsonEsmOutPath)) {
        __fs.writeFileSync(
            packageJsonEsmOutPath,
            JSON.stringify({
                type: 'module',
            }),
        );
    }

    // cjs
    const cjs = __childProcess.spawn(
        `tsup ${path} --outDir ${outPath.replace(
            '%format',
            'cjs',
        )} --format cjs --platform ${platform} --no-splitting`,
        {
            shell: true,
            stdio: 'pipe',
        },
    );
    cjs.stderr.on('data', (data) => {
        console.error(
            `${__chalk.red('Error')} while compiling ${__chalk.cyan(path)}`,
        );
        console.log(data.toString());
    });
    cjs.on('close', () => {
        try {
            const toRename = outTsCjsFilePath.replace(/\.ts$/, '.cjs'),
                toRenameTo = toRename.replace(/\.cjs$/, '.js');
            __fs.renameSync(toRename, toRenameTo);
            console.log(
                `${__chalk.green('✓')} ${__chalk.cyan(
                    path,
                )} compiled ${__chalk.green('successfully...')}`,
            );
        } catch (e) {
            // console.log(e.toString());
        }
    });
    // package.json
    const packageJsonCjsOutFolderPath = __path.dirname(packageJsonCjsOutPath);
    if (!__fs.existsSync(packageJsonCjsOutFolderPath)) {
        __fs.mkdirSync(packageJsonCjsOutFolderPath, { recursive: true });
    }
    if (!__fs.existsSync(packageJsonCjsOutPath)) {
        __fs.writeFileSync(
            packageJsonCjsOutPath,
            JSON.stringify({
                type: 'commonjs',
            }),
        );
    }
}

// js
const chokidarJs = __chokidar.watch('packages/*/*/src/js/**/*.ts', {
    ignoreInitial: true,
    ignored: ['**/node_modules'],
});
function chokidarJsCallback(path) {
    processPath(path, 'browser');
}
chokidarJs.on('add', chokidarJsCallback);
chokidarJs.on('change', chokidarJsCallback);

// node, shared, etc...
const chokidarNode = __chokidar.watch(
    'packages/*/*/src/(node|shared|config|views|cli)/**/*.ts',
    {
        ignoreInitial: true,
        ignored: ['**/node_modules'],
    },
);
function chokidarNodeCallback(path) {
    processPath(path, 'node');
}
chokidarNode.on('add', chokidarNodeCallback);
chokidarNode.on('change', chokidarNodeCallback);
