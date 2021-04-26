"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhZGRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdEQUF3RDtBQUN4RCwyQ0FBMkM7QUFFM0Msa0VBQWtFO0FBQ2xFLDBCQUEwQjtBQUMxQixjQUFjO0FBQ2Qsd0JBQXdCO0FBQ3hCLHdCQUF3QjtBQUN4QixtQkFBbUI7QUFDbkIsU0FBUztBQUNULGVBQWU7QUFDZix3QkFBd0I7QUFDeEIsbUJBQW1CO0FBQ25CLFNBQVM7QUFDVCxnQkFBZ0I7QUFDaEIsd0JBQXdCO0FBQ3hCLGtDQUFrQztBQUNsQyx1QkFBdUI7QUFDdkIsUUFBUTtBQUNSLE9BQU87QUFDUCxJQUFJO0FBQ0osOERBQThEO0FBRTlELHNEQUFzRDtBQUN0RCxrQkFBa0I7QUFDbEIsNkJBQTZCO0FBQzdCLElBQUk7QUFFSiw0QkFBNEI7QUFDNUIsMkRBQTJEO0FBQzNELE1BQU07QUFDTiw0REFBNEQ7QUFDNUQsZ0JBQWdCO0FBQ2hCLHFCQUFxQjtBQUNyQixnQkFBZ0I7QUFDaEIsT0FBTztBQUVQLDJCQUEyQjtBQUMzQiwrQkFBK0I7QUFFL0Isd0NBQXdDO0FBQ3hDLGtDQUFrQztBQUNsQyxpQ0FBaUM7QUFDakMsTUFBTTtBQUVOLHdEQUF3RDtBQUV4RCxnQ0FBZ0M7QUFFaEMsU0FBUztBQUVULHdDQUF3QztBQUN4QyxpRUFBaUU7QUFDakUsYUFBYTtBQUNiLG1CQUFtQjtBQUNuQixNQUFNO0FBQ04sSUFBSSJ9