import __SFile from '@coffeekraken/s-file';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __wait from '../../../shared/time/wait.js';
import __packageTmpDir from '../../path/packageTmpDir.js';
import __pool from '../pool.js';
import __removeSync from '../removeSync.js';

jest.setTimeout(20000);

describe('sugar.node.fs.pool', () => {
    it('Should correctly start a pool and listen for updates, deletion, etc...', () => {
        return new Promise(async (resolve) => {
            await __SSugarConfig.load();

            const poolTestFolderPath = `${__packageTmpDir()}/tests/pool`;

            __removeSync(poolTestFolderPath);

            const initialFile = new __SFile(
                `${poolTestFolderPath}/initial.txt`,
                {
                    file: {
                        checkExistence: false,
                    },
                },
            );
            initialFile.writeSync('Hello world');

            const newFile = new __SFile(`${poolTestFolderPath}/coco/new.txt`, {
                file: {
                    checkExistence: false,
                },
            });

            const pool = __pool(`${poolTestFolderPath}/**/*`, {
                watch: true,
            });

            let events = {
                ready: false,
                file: false,
                files: false,
                change: false,
                update: false,
                unlink: false,
                add: false,
            };

            pool.on('ready', async (path) => {
                events.ready = true;

                // add
                await newFile.write('hello world');

                await __wait(500);

                // update / change
                await newFile.write('plop');

                await __wait(500);

                // unlink
                await newFile.unlink();

                await __wait(500);

                expect(events).toEqual({
                    ready: true,
                    file: true,
                    files: true,
                    change: true,
                    update: true,
                    unlink: true,
                    add: true,
                });

                resolve(true);
            });
            pool.on('file', (file) => {
                events.file = true;
            });
            pool.on('files', (files) => {
                events.files = true;
            });
            pool.on('change', (file) => {
                events.change = true;
            });
            pool.on('update', (file) => {
                events.update = true;
            });
            pool.on('unlink', (file) => {
                events.unlink = true;
            });
            pool.on('add', (file) => {
                events.add = true;
            });
        });
    });
});
