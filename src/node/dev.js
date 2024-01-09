import __chalk from 'chalk';
import __chokidar from 'chokidar';
import __fs from 'fs';
import __path from 'path';
import __ts from 'typescript';

import __childProcess from 'child_process';

function processPath(path, platform = 'node') {
    const packageRoot = path.split('/').slice(0, 3).join('/');
    const pathRelToPackageRoot = path.split('/').slice(4).join('/');
    const format = platform === 'node' ? 'cjs' : 'esm';
    const module = platform === 'node' ? 'commonjs' : 'ES2020';
    const outPath = __path.dirname(
        `${packageRoot}/dist/pkg/%moduleSystem/${pathRelToPackageRoot}`.replace(
            '%moduleSystem',
            format,
        ),
    );
    const packageJsonOutPath = `${packageRoot}/dist/pkg/${format}/package.json`;

    // output file
    let outFilePath = `${outPath}/${__path.basename(path)}`
        .replace('%moduleSystem', format)
        .replace(/\.ts$/, '.js');

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
            moduleResolution: 'nodenext',
            sourcemap: true,
            skipLibCheck: true,
            declaration: true,
            experimentalDecorators: true,
            forceConsistentCasingInFileNames: true,
            noImplicitAny: false,
            noStrictGenericChecks: false,
            allowSyntheticDefaultImports: false,
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

        console.log(
            `File written ${__chalk.green(
                'successfully',
            )} to disk ${__chalk.cyan(outFilePath)}`,
        );

        try {
            __childProcess.exec(
                `npx tsc ${path} --declaration --noResolve --emitDeclarationOnly --allowJs --outFile --esModuleInterop ${outFilePath.replace(
                    /\.js$/,
                    '.d.ts',
                )}`,
                {
                    cwd: process.cwd(),
                },
                () => {
                    console.log(
                        `Declaration file written ${__chalk.green(
                            'successfully',
                        )} to disk ${__chalk.cyan(
                            outFilePath.replace(/\.js$/, '.d.ts'),
                        )}`,
                    );
                },
            );
        } catch (e) {
            // console.log(
            //     `Declaration file generation ${__chalk.red(
            //         'failed',
            //     )} for ${__chalk.cyan(outFilePath)}`,
            // );
        }

        if (__path.basename(outFilePath) === 'sugar.cli.js') {
            __fs.chmodSync(outFilePath, 0o755);
        }
    }

    // package.json
    const packageJsonOutFolderPath = __path.dirname(packageJsonOutPath);
    if (!__fs.existsSync(packageJsonOutFolderPath)) {
        __fs.mkdirSync(packageJsonOutFolderPath, { recursive: true });
    }
    __fs.writeFileSync(
        packageJsonOutPath,
        JSON.stringify({
            type: module === 'commonjs' ? 'commonjs' : 'module',
            private: true,
        }),
    );
}

// js
const chokidarJs = __chokidar.watch('packages/*/*/src/(js)/**/*.ts', {
    ignoreInitial: true,
    ignored: ['**/node_modules'],
});
function chokidarJsCallback(path) {
    processPath(path, 'browser');
}
chokidarJs.on('add', chokidarJsCallback);
chokidarJs.on('change', chokidarJsCallback);

// shared
const chokidarShared = __chokidar.watch('packages/*/*/src/(shared)/**/*.ts', {
    ignoreInitial: true,
    ignored: ['**/node_modules'],
});
function chokidarSharedCallback(path) {
    processPath(path, 'node');
    processPath(path, 'browser');
}
chokidarShared.on('add', chokidarSharedCallback);
chokidarShared.on('change', chokidarSharedCallback);

// node
const chokidarNode = __chokidar.watch(
    'packages/*/*/src/(node|config|views|pages|cli)/**/*.ts',
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
