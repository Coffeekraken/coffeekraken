import __glob from 'glob';
import __packageRoot from '../../node/path/packageRoot';
import __fs from 'fs';

export default function (stringArgs = '') {
  const packageJsonExports = {
    // node: {},
    // default: {}
  };

  const packageJson = require(`${__packageRoot()}/package.json`);

  __glob
    .sync('src/js/**/*.js', {
      cwd: __packageRoot(),
      ignore: [
        '__wip__',
        '**/__wip__/**',
        '__tests__',
        '**/__tests__/**',
        '__tests__.wip',
        '**/__tests__.wip/**'
      ]
    })
    .forEach((path) => {
      return;
      //   packageJsonExports.default[
      //     path.replace('src/js/', './').replace(/\.js$/, '')
      //   ] = `./${path}`;
      // packageJsonExports.default[path.replace('src/js/', './')] = `./${path}`;
    });

  __glob
    .sync('src/node/**/*.js', {
      cwd: __packageRoot(),
      ignore: [
        '__wip__',
        '**/__wip__/**',
        '__tests__',
        '**/__tests__/**',
        '__tests__.wip',
        '**/__tests__.wip/**'
      ]
    })
    .forEach((path) => {
      packageJsonExports[
        path.replace('src/node/', './').replace(/\.js$/, '')
      ] = `./${path}`;
      // packageJsonExports.default[path.replace('src/js/', './')] = `./${path}`;
    });

  packageJson.exports = {
    ...packageJsonExports,
    ...(packageJson._exports || {})
  };

  __fs.writeFileSync(
    `${__packageRoot()}/package.json`,
    JSON.stringify(packageJson, null, 4)
  );

  console.log(packageJson);
}
