import __SInterface from '@coffeekraken/s-interface';
import __fs from 'fs';
import __path from 'path';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __base64 from '@coffeekraken/sugar/shared/crypt/base64';

class postcssSugarPluginIconFsMixinInterface extends __SInterface {
  static definition = {
      path: {
          type: 'String',
          required: true
      }
  };
}

export interface IPostcssSugarPluginIconFsMixinParams {
    path: string;
}

export { postcssSugarPluginIconFsMixinInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginIconFsMixinParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginIconFsMixinParams = {
    path: '',
    ...params
  };

  const dirName =
    typeof atRule.source.input.file === 'string'
      ? __path.dirname(atRule.source.input.file)
      : __dirname;

  // reading the icon file
  const potentialFilePathFromRoot = __path.resolve(__packageRoot(), finalParams.path);
  const potentialFilePathFromFile = __path.resolve(dirName, finalParams.path);

  let svgStr;

  if (__fs.existsSync(potentialFilePathFromFile)) {
    svgStr = __fs.readFileSync(potentialFilePathFromFile, 'utf8');
  } else if (__fs.existsSync(potentialFilePathFromRoot)) {
    svgStr = __fs.readFileSync(potentialFilePathFromRoot, 'utf8');
  } else {
      throw new Error(`<red>[sugar.css.mixins.icon.fs]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" does not exists on the filesystem`);
  }
  
//   svgStr = svgStr.replace('</svg>', `<style> path { fill: currentColor; }</style></svg>`)

//   console.log(svgStr);

  const vars: string[] = [];

//   vars.push(`
//     background-image: url("data:image/svg+xml;base64,${__base64.encrypt(svgStr)}");
//     background-size: contain;
//     background-position: center;
//     width: 1em; height: 1em;
//     display: inline-block;
//     -webkit-filter: invert(100%) brightness(50%) sepia(1) hue-rotate(132deg) saturate(103.2%) brightness(91.2%);
//     filter: invert(100%) brightness(50%) sepia(1) hue-rotate(132deg) saturate(103.2%) brightness(91.2%);
//   `)

  const pathD = svgStr.match(/\sd=".*"/);

  if (!pathD) {
    throw new Error(`<red>[sugar.css.mixins.icon.fs]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" is not compatible with the icon system. It MUST be a file with a unique <path d="..." /> inside`);
  }

  const path = pathD[0].replace(/\sd=/, '');


  vars.push(`
    clip-path: path(${path});
    display: inline-block;
    background: currentColor;
    width: 1em; height: 1em;
  `);


  replaceWith(vars);
}
