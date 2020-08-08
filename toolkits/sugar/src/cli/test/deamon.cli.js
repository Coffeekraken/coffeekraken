const __sugarConfig = require('../../node/config/sugar');
const __chokidar = require('chokidar');
const __getFilename = require('../../node/fs/filename');
const __extension = require('../../node/fs/extension');
const __fs = require('fs');
const __path = require('path');
const __argsToString = require('../../node/cli/argsToString');
const __childProcess = require('child_process');
const __packageRoot = require('../../node/path/packageRoot');

module.exports = function (stringArgs = '') {
  const deamons = __sugarConfig('test.deamons');

  const runningTests = {};

  // loop on every deamons available
  const deamonStacks = Object.keys(deamons);
  deamonStacks.forEach((deamonName) => {
    const deamonObj = deamons[deamonName];

    console.log(`Init deamon for <yellow>${deamonName}</yellow> stack...`);

    __chokidar
      .watch(deamonObj.input, {
        persistent: true,
        followSymlinks: true
      })
      .on('change', (filepath) => {
        if (runningTests[filepath]) return;
        runningTests[filepath] = true;

        const filename = __getFilename(filepath);
        const path = filepath.replace(`/${filename}`, '');
        const name = filename.replace(`.${__extension(filename)}`, '');

        // reading the file content
        const content = __fs.readFileSync(filepath, 'utf8');
        const testReg = /\*\s?@test\s+(.*)/g;
        const testMatches = content.match(testReg);
        let testfile;
        if (testMatches && testMatches[0]) {
          testfile = __path.resolve(
            path,
            testMatches[0].replace(/\s?\*\s?@test\s+/, '').trim()
          );
        } else {
          testfile = deamonObj.testfile;
          testfile = testfile.replace('%name', name).replace('%path', path);
        }

        // preparing the command to run
        const runtime = deamonObj.command.split(' ')[0];
        const config = __sugarConfig(runtime);
        const args = __argsToString(config.cli || config);
        let command = deamonObj.command
          .replace('%path', path)
          .replace('%name', name)
          .replace('%testfile', testfile)
          .replace('%arguments', args);

        console.log(
          `Running the test "<yellow>${testfile.replace(
            `${__packageRoot(path)}/`,
            ''
          )}</yellow>"...`
        );

        __childProcess
          .spawn(command, null, {
            stdio: 'inherit',
            shell: true
          })
          .on('close', () => {
            delete runningTests[filepath];
          });
      });
  });

  process.stdin.resume();
};
