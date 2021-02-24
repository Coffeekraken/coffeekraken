const {
  getImportMapFromNodeModules,
  generateImportMapForProject
} = require('@jsenv/node-module-import-map');
const __packageRoot = require('../../node/path/packageRoot').default;

export default async () => {
  const projectDirectoryUrl = __packageRoot();

  await generateImportMapForProject(
    [
      getImportMapFromNodeModules({
        projectDirectoryUrl
      })
    ],
    {
      projectDirectoryUrl,
      importMapFileRelativeUrl: './dist/package.importmap'
    }
  );
};
