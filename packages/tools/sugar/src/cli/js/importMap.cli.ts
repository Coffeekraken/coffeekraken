const {
  getImportMapFromNodeModules,
  generateImportMapForProject
} = require('@jsenv/node-module-import-map');
const __packageRootDir = require('../../node/path/packageRootDir').default;

export default async () => {
  const projectDirectoryUrl = __packageRootDir();

  await generateImportMapForProject(
    [
      getImportMapFromNodeModules({
        projectDirectoryUrl,
        projectPackageDevDependenciesIncluded: true
      })
    ],
    {
      projectDirectoryUrl,
      importMapFileRelativeUrl: './dist/importmap.json'
    }
  );
};
