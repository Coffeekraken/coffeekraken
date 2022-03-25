import __glob from 'glob';
import __chokidar from 'chokidar';
import __childProcess from 'child_process';
import __path from 'path';

// js
const chokidarJs = __chokidar.watch('packages/*/*/src/js/**/*.ts', {
    ignoreInitial: true,
});
function chokidarJsCallback(path) {
    __childProcess.spawn(
        `tsup ${path} --outDir ${__path.dirname(
            path,
        )} --format esm,cjs --platform browser --no-splitting`,
        {
            shell: true,
            stdio: 'inherit',
        },
    );
}
chokidarJs.on('add', chokidarJsCallback);
chokidarJs.on('change', chokidarJsCallback);

// node
const chokidarNode = __chokidar.watch('packages/*/*/src/!(js)/**/*.ts', {
    ignoreInitial: true,
});
function chokidarNodeCallback(path) {
    __childProcess.spawn(
        `tsup ${path} --outDir ${__path.dirname(
            path,
        )} --format esm,cjs --platform node --no-splitting`,
        {
            shell: true,
            stdio: 'inherit',
        },
    );
}
chokidarNode.on('add', chokidarNodeCallback);
chokidarNode.on('change', chokidarNodeCallback);
