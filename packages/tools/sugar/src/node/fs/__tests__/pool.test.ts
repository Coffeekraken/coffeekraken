import __path from 'path';
import __pool from '../pool';
import __SFile from '@coffeekraken/s-file';
import __removeSync from '../removeSync';

describe('sugar.node.fs.pool', () => {
  it('Should correctly start a pool and listen for updates, deletion, etc...', (done) => {
    __removeSync('%tmpDir/poolTests');

    const initialFile = new __SFile(`%tmpDir/poolTests/new.txt`, {
      file: {
        checkExistence: false
      }
    });
    initialFile.writeSync('Hello world');

    const newFile = new __SFile(`%tmpDir/poolTests/coco/other.txt`, {
      file: {
        checkExistence: false
      }
    });

    const pool = __pool('%tmpDir/poolTests/**/*');

    let deletedCount = 0;

    pool.on('unlink', (path) => {
      deletedCount++;
      if (deletedCount === 2) done();
    });
    pool.on('add', (file) => {
      setTimeout(() => {
        initialFile.unlinkSync();
        newFile.unlinkSync();
      }, 500);
    });
    pool.on('files', (files) => {
      expect(files.length).toBe(1);
      newFile.writeSync('Hello world');
    });
  });
});
