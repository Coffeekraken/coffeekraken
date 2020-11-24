const glob = require('glob');
const childProcess = require('child_process');

console.log('Searching for files to compile...');
const files = glob.sync('packages/tools/sugar/src/js/**/*.ts', {
  cwd: __dirname,
  ignore: ['**/node_modules/**', '**/__tests__/**'],
  nodir: true
});

console.log(`Compiling ${files.length} file(s)...`);
const result = childProcess.execSync(`tsc ${files.join(' ')}`, {
  stdio: 'inherit'
});
