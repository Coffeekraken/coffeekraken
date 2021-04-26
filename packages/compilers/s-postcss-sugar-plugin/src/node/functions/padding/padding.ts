// import __SInterface from '@coffeekraken/s-interface';
// import __theme from '../../utils/theme';

// class postcssSugarPluginPaddingInterface extends __SInterface {
//   static definition = {
//     name: {
//       type: 'String',
//       required: true,
//       alias: 'n'
//     },
//     ratio: {
//       type: 'Number',
//       alias: 'r'
//     },
//     return: {
//       type: 'String',
//       values: ['var', 'value'],
//       default: 'var'
//     }
//   };
// }
// export { postcssSugarPluginPaddingInterface as interface };

// export interface IPostcssSugarPluginPaddingParams {
//   name: string;
//   return: 'var' | 'value';
// }

// export default function (
//   params: Partial<IPostcssSugarPluginPaddingParams> = {}
// ) {
//   const finalParams: IPostcssSugarPluginPaddingParams = {
//     name: '',
//     return: 'var',
//     ...params
//   };

//   let theme = 'default',
//     name = finalParams.name;

//   if (name.split('.').length === 2) {
//     theme = name.split('.')[0];
//     name = name.split('.')[1];
//   }

//   const size = themeConfig(`padding.${name}`, theme);

//   // if (finalParams.ratio) {

//   // }

//   if (finalParams.return === 'var') {
//     return `var(--s-theme-${theme}-padding-${name}, ${size})`;
//   } else {
//     return size;
//   }
// }
