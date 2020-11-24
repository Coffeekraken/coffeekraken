const glob = require('glob');
const childProcess = require('child_process');
const chokidar = require('chokidar');

const cli =
  process.argv && process.argv[2] ? process.argv[2].split(' ')[0] : '';

if (cli.includes('--watch')) {
  // chokidar
  //   .watch('packages/tools/sugar/src/node/**/*.ts')
  //   .on('change', (path) => {
  //     console.log('Compiling ' + path + '...');
  //     const outPath = path.replace(/\.ts$/, '.js');
  //     childProcess.execSync(
  //       //  `tsc --incremental --tsBuildInfoFile .tsbuildinfo ${path}`,
  //       `tsc`,
  //       {
  //         stdio: 'inherit'
  //       }
  //     );
  //     console.log(`File compiled successfully`);
  //   });

  childProcess.execSync(`tsc --watch`, {
    stdio: 'inherit'
  });
} else {
  console.log('Searching for files to compile...');
  const files = glob.sync('packages/**/src/node/**/*.ts', {
    cwd: __dirname,
    ignore: ['**/node_modules/**', '**/__tests__/**'],
    nodir: true
  });

  console.log(`Compiling ${files.length} file(s)...`);
  let command = `tsc ${files.join(' ')}`;
  childProcess.execSync(command, {
    stdio: 'inherit'
  });
}
