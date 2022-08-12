import __SPromise from '@coffeekraken/s-promise';
import __childProcess from 'child_process';
import __fkill from 'fkill';

export default function kill(params) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
        if (params.id) {
            await __fkill(params.id);
            emit('log', {
                value: `<green>[process.kill]</green> The process with id <yellow>${params.id}</yellow> has been <green>successfully</green> killed`,
            });
        } else if (params.port) {
            try {
                __childProcess.execSync(`kill -9 $(lsof -ti:${params.port})`);
                emit('log', {
                    value: `<green>[process.kill]</green> The process running on the port <yellow>${params.port}</yellow> has been <green>successfully</green> killed`,
                });
                return resolve();
            } catch (e) {}

            try {
                await __fkill(`:${params.port}`);
                emit('log', {
                    value: `<green>[process.kill]</green> The process running on the port <yellow>${params.port}</yellow> has been <green>successfully</green> killed`,
                });
                return resolve();
            } catch (e) {}

            emit('log', {
                value: `<yellow>[process.kill]</yellow> It seems that no process are running on port <yellow>${params.port}</yellow>`,
            });
        }
        resolve();
    });
}
