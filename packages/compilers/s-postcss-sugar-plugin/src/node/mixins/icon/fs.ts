import __SInterface from '@coffeekraken/s-interface';
import __fs from 'fs';
import __path from 'path';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __base64 from '@coffeekraken/sugar/shared/crypt/base64';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';

class postcssSugarPluginIconFsMixinInterface extends __SInterface {
  static definition = {
      path: {
          type: 'String',
          required: true
      },
      as: {
          type: 'String',
          required: true
      }
  };
}

export interface IPostcssSugarPluginIconFsMixinParams {
    path: string;
    as: string;
}

export { postcssSugarPluginIconFsMixinInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith,
  sourcePath,
  sharedData
}: {
  params: Partial<IPostcssSugarPluginIconFsMixinParams>;
  atRule: any;
  replaceWith: Function;
  sourcePath: string;
  sharedData: any;
}) {
  const finalParams: IPostcssSugarPluginIconFsMixinParams = {
    path: '',
    as: '',
    ...params
  };

  const tmpDirPath = `${__packageTmpDir()}/postcss/icons`;

  if (!sharedData.iconsSourcePaths) {
    sharedData.iconsSourcePaths = [];
  }

  if (!sharedData.iconsInputDir) {
    sharedData.iconsInputDir = tmpDirPath;
    try {
      __fs.rmSync(tmpDirPath, { recursive: true });
    } catch (e) {}
  }

  // const dirName =
  //   typeof atRule.source.input.file === 'string'
  //     ? __path.dirname(atRule.source.input.file)
  //     : __dirname;

  if (sharedData.iconsSourcePaths.indexOf(sourcePath) === -1) {
    sharedData.iconsSourcePaths.push(sourcePath);
  }

  // reading the icon file
  const potentialFilePathFromRoot = __path.resolve(__packageRootDir(), finalParams.path);
  const potentialFilePathFromFile = __path.resolve(sourcePath, finalParams.path);

  let svgStr;

  if (__fs.existsSync(potentialFilePathFromFile)) {
    svgStr = __fs.readFileSync(potentialFilePathFromFile, 'utf8');
  } else if (__fs.existsSync(potentialFilePathFromRoot)) {
    svgStr = __fs.readFileSync(potentialFilePathFromRoot, 'utf8');
  } else {
      throw new Error(`<red>[sugar.css.mixins.icon.fs]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" does not exists on the filesystem`);
  }

  const tmpFilePath = `${tmpDirPath}/${finalParams.as}.svg`;

  // write the svg into the temp postcss icons folder
  // that will be handled by the "fonticon" postProcessor
  __writeFileSync(tmpFilePath, svgStr);

  replaceWith([]);
}
