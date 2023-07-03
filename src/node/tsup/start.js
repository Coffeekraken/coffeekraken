import __chalk from 'chalk';
import __chokidar from 'chokidar';
import __fs from 'fs';
import __path from 'path';
import __ts from 'typescript';

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
    // if (path.includes('/tools/sugar/src')) {
    //     outFilePath = path.replace(/\.ts/, format === 'cjs' ? '.cjs' : '.mjs');
    // }

    // // process package if needed
    // if (!_processedPkgs.includes(packageRoot)) {
    //     processPackage(packageRoot);
    // }

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
            moduleResolution: 'node',
            sourcemap: true,
            skipLibCheck: true,
            declaration: true,
            experimentalDecorators: true,
            forceConsistentCasingInFileNames: false,
            noImplicitAny: false,
            noStrictGenericChecks: false,
            allowSyntheticDefaultImports: false,
            lib: platform === 'node' ? ['esnext'] : ['esnext', 'DOM'],
            target: 'ES2015',
            module,
        },
    });

    // if (Object.keys(result).length > 3) {
    //     console.log(result);
    // }

    if (result.outputText) {
        if (!__fs.existsSync(outPath)) {
            __fs.mkdirSync(outPath, { recursive: true });
        }
        __fs.writeFileSync(outFilePath, result.outputText);
        if (__path.basename(outFilePath) === 'sugar.cli.js') {
            __fs.chmodSync(outFilePath, 0o755);
        }
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
    // if (!__fs.existsSync(packageJsonOutPath)) {
    __fs.writeFileSync(
        packageJsonOutPath,
        JSON.stringify({
            type: module === 'commonjs' ? 'commonjs' : 'module',
            private: true,
        }),
    );
    // }
}

// js
const chokidarJs = __chokidar.watch(
    'packages/*/*/src/(shared|js)/**/*.ts',
    // 'packages/*/*/src/js/**/vite.config.ts',
    {
        // ignoreInitial: true,
        ignored: ['**/node_modules'],
    },
);
function chokidarJsCallback(path) {
    processPath(path, 'browser');
}
chokidarJs.on('add', chokidarJsCallback);
chokidarJs.on('change', chokidarJsCallback);

// node, shared, etc...
const chokidarNode = __chokidar.watch(
    'packages/*/*/src/(node|shared|config|views|pages|cli)/**/*.ts',
    // 'packages/*/*/src/(node|shared|config|views|pages|cli)/**/vite.config.ts',
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
