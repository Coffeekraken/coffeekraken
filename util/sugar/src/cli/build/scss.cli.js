const __childProcess = require('child_process');
const __parseArgs = require('../../node/cli/parseArgs');
const __appPath = require('app-root-path');
const __path = require('path');
const __parseHtml = require('../../node/terminal/parseHtml');
const __sass = require('sass');
const __chokidar = require('chokidar');
const __writeFileSync = require('../../node/fs/writeFileSync');

module.exports = (stringArgs) => {
  const args = __parseArgs(stringArgs, {
    input: {
      type: 'String',
      alias: 'i',
      default: `${__appPath.path}/src/scss`
    },
    output: {
      type: 'String',
      alias: 'o',
      default: `${__appPath.path}/src/css`
    },
    watch: {
      type: 'Boolean',
      alias: 'w',
      default: false
    },
    recursive: {
      type: 'Boolean',
      alias: 'r',
      default: true
    },
    style: {
      type: 'String',
      alias: 's',
      default: 'expanded'
    },
    map: {
      type: 'Boolean',
      alias: 'm',
      default: true
    }
  });

  let inputPath = args.input;
  let outputPath = args.output;

  // check if the input and output path are relative or not
  if (inputPath.slice(0, 1) === '.') {
    inputPath = __path.resolve(process.cwd(), inputPath);
  } else if (inputPath.slice(0, 1) !== '/') {
    inputPath = __path.resolve(__appPath.path, inputPath);
  }
  if (outputPath.slice(0, 1) === '.') {
    outputPath = __path.resolve(process.cwd(), outputPath);
  } else if (outputPath.slice(0, 1) !== '/') {
    outputPath = __path.resolve(__appPath.path, outputPath);
  }

  const commandArray = [`node-sass`];
  commandArray.push(`${inputPath}`);
  commandArray.push(`--output`);
  commandArray.push(`${outputPath}`);
  if (args.watch) commandArray.push('-w');
  if (args.recursive) commandArray.push('-r');
  commandArray.push(`--output-style ${args.style}`);
  // if (args.map) commandArray.push('--source-map true');
  if (args.map) commandArray.push(`--source-map-root ${outputPath}`);
  if (args.map) commandArray.push(`--source-map-embed true`);
  commandArray.push('--follow');

  if (args.watch) {
    console.log(
      __parseHtml(
        `<green>Start watching your files at "<yellow>${inputPath.replace(
          __appPath.path,
          '<rootDir>'
        )}</yellow>"...</green>`
      )
    );
  } else {
    console.log(
      `Start building your files at "${inputPath.replace(
        __appPath.path,
        '<rootDir>'
      )}"...`
    );
  }

  const watcher = __chokidar.watch(`${inputPath}/**/*.scss`, {
    persistent: true
  });
  watcher.on('add', renderScss);
  watcher.on('change', renderScss);
  watcher.on('unlink', renderScss);

  function renderScss(path) {
    console.log(path);

    const writingPath =
      outputPath +
      path
        .replace(inputPath, '')
        .replace('.scss', '.css')
        .replace('.sass', '.css');
    const writingMapPath = writingPath.replace('.css', '.css.map');

    __sass.render(
      {
        file: path,
        sourceMap: args.map,
        outFile: args.map ? writingPath : null
      },
      function (err, result) {
        if (err) {
          console.error(err);
          return;
        }

        __writeFileSync(writingPath, result.css.toString());
        if (result.map) {
          __writeFileSync(writingMapPath, result.map.toString());
        }
      }
    );
  }

  // const cp = __childProcess.spawn('npx', commandArray);
  // cp.stdout.on('data', (msg) => {
  //   console.log(msg.toString().replace(__appPath.path, '<rootDir>'));
  // });
  // cp.stderr.on('data', (msg) => {
  //   console.error(msg.toString().replace(__appPath.path, '<rootDir>'));
  // });
};
