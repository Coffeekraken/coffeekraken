import __SDocmap from '@coffeekraken/s-docmap';
import { __pickRandom } from '@coffeekraken/sugar/array';

export default async function () {
  const docmap = new __SDocmap(),
    docmapJson = await docmap.read(),
    packages = docmapJson.menu.packages;

  const pickedPackages = __pickRandom(Object.keys(packages), 12);

  const packagesObj = {};
  pickedPackages.forEach((packageName) => {
    packagesObj[packageName] = packages[packageName];
    packagesObj[packageName].url =
      packagesObj[packageName].slug[
        Object.keys(packagesObj[packageName].slug)[0]
      ].slug;
  });

  return {
    packages: packagesObj,
  };
}
