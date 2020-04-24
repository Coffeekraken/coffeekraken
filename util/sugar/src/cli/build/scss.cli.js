const __parseArgs = require('../../node/cli/parseArgs');
const __appPath = require('app-root-path');
const __path = require('path');
const __parseHtml = require('../../node/terminal/parseHtml');
const __sass = require('sass');
const __chokidar = require('chokidar');
const __writeFileSync = require('../../node/fs/writeFileSync');
const __fs = require('fs');
const __postcss = require('postcss');
const __autoprefixer = require('autoprefixer');
const __precss = require('precss');
const __postcssPresetEnv = require('postcss-preset-env');
const __cssnano = require('cssnano');

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
    },
    prod: {
      type: 'Boolean',
      alias: 'p',
      default: false
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

        if (args.prod) {
          console.log(
            __parseHtml(
              `Start building the production version that will be saved to: <yellow>${outputPath
                .replace(__appPath.path, '<rootDir>')
                .replace('.css', '.prod.css')}</yellow>`
            )
          );

          __fs.readFile(writingPath, (err, css) => {
            __postcss([__precss, __autoprefixer, __postcssPresetEnv, __cssnano])
              .process(css, {
                from: writingPath,
                to: writingPath.replace('.css', '.prod.css')
              })
              .then((result) => {
                __fs.writeFileSync(
                  writingPath.replace('.css', '.prod.css'),
                  result.css
                );
                if (result.map) {
                  __fs.writeFileSync(
                    writingPath.replace('.css', '.prod.css.map'),
                    result.map
                  );
                }
              });
          });
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
