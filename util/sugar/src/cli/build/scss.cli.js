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
const __Bundler = require('scss-bundle').Bundler;
const __sugarConfig = require('../../node/config/sugar');
const __packageRoot = require('../../node/path/packageRoot');
const __tmpDir = require('../../node/fs/tmpDir');
const __child_process = require('child_process');

module.exports = async (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {
    input: {
      type: 'String',
      alias: 'i',
      default:
        (await __sugarConfig('cli.build.scss.input')) ||
        `${__appPath.path}/src/scss/*.scss`
    },
    output: {
      type: 'String',
      alias: 'o',
      default:
        (await __sugarConfig('cli.build.scss.output')) ||
        `${__appPath.path}/dist/css`
    },
    watch: {
      type: 'Boolean',
      alias: 'w',
      default: (await __sugarConfig('cli.build.scss.watch')) || false
    },
    style: {
      type: 'String',
      alias: 's',
      default: (await __sugarConfig('cli.build.scss.style')) || 'expanded'
    },
    map: {
      type: 'Boolean',
      alias: 'm',
      default: await __sugarConfig('cli.build.scss.map')
    },
    prod: {
      type: 'Boolean',
      alias: 'p',
      default: await __sugarConfig('cli.build.scss.prod')
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

  let scssConfigString;
  const scssConfig = await __sugarConfig('scss');
  if (scssConfig) {
    __writeFileSync(
      __tmpDir() + '/sugar.build.scss.config.json',
      JSON.stringify(scssConfig, null, 4)
    );

    const command = `npx json-to-scss ${__tmpDir()}/sugar.build.scss.config.json ${__tmpDir()}/sugar.build.scss.config.scss --mo`;
    __child_process.execSync(command);
    scssConfigString = __fs
      .readFileSync(`${__tmpDir()}/sugar.build.scss.config.scss`, 'ascii')
      .replace('$sugar:', '$sugarUserSettings:')
      .trim();
    scssConfigString = scssConfigString.slice(0, -1) + ' !global;';

    __fs.unlinkSync(`${__tmpDir()}/sugar.build.scss.config.json`);
    __fs.unlinkSync(`${__tmpDir()}/sugar.build.scss.config.scss`);
  }

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
  const watcher = __chokidar.watch(inputPath, {
    persistent: true
  });
  watcher.on('add', renderScss);
  watcher.on('change', renderScss);
  watcher.on('unlink', renderScss);
  watcher.on('ready', () => {
    if (!args.watch) watcher.close();
  });

  async function renderScss(path) {
    const writingPath =
      outputPath +
      path
        .replace(inputPath, '')
        .replace('.scss', '.css')
        .replace('.sass', '.css');
    const writingMapPath = writingPath.replace('.css', '.css.map');

    const bundler = new __Bundler(undefined, inputPath);
    // Relative file path to project directory path.
    let bundledScssString = await (await bundler.bundle(path)).bundledContent;
    // prepend the scssConfigString if exists
    if (scssConfigString) {
      bundledScssString = `
        ${scssConfigString}
        ${bundledScssString}
      `;
    }
    // console.log(result.bundledContent);

    const inputFolderPath = inputPath
      .split('/')
      .filter((path) => {
        if (path.includes('**') || path.includes('*') || path.includes('.'))
          return false;
        return true;
      })
      .join('/');

    __sass.render(
      {
        data: bundledScssString,
        includePaths: [
          inputFolderPath,
          `${__packageRoot(process.cwd())}/node_modules`
        ],
        // file: path,
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
