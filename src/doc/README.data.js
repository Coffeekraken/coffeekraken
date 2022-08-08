import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __pickRandom from '@coffeekraken/sugar/shared/array/pickRandom';
import __fs from 'fs';
import __glob from 'glob';

export default async function () {
  
  const packages = __glob.sync('packages/*/*/package.json', {
    cwd: __packageRoot()
  }).map(path => {
    const json = JSON.parse(__fs.readFileSync(path));
    return json;
  }).filter(json => json.private !== true);

  const nodeVersion = __fs.readFileSync(`${__packageRoot()}/.nvmrc`).toString();

  return {
    packages: __pickRandom(packages, 5),
    nodeVersion
  };
}
