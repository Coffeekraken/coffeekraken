"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const minimatch_1 = __importDefault(require("minimatch"));
const flatten_1 = __importDefault(require("./flatten"));
const deepize_1 = __importDefault(require("./deepize"));
module.exports = function getGlob(obj, glob, settings = {}) {
    settings = Object.assign({ deepize: true }, settings);
    const flat = flatten_1.default(obj);
    const resultObj = {};
    Object.keys(flat).forEach((path) => {
        if (minimatch_1.default(path, glob)) {
            resultObj[path] = flat[path];
        }
    });
    // if (glob === 'watch') {
    //   console.log('GLOB', resultObj);
    // }
    if (settings.deepize === true)
        return deepize_1.default(resultObj);
    return resultObj;
};
// console.log(
//   getGlob(
//     {
//       someting: {
//         cool: 'hello'
//       },
//       coco: ['hello', 'world'],
//       world: {
//         'coco.plop': {
//           yep: 'dsojiofj'
//         }
//       }
//     },
//     'world.*'
//   )
// );
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0R2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEdsb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7O0FBRVYsMERBQW9DO0FBQ3BDLHdEQUFrQztBQUNsQyx3REFBa0M7QUFnQ2xDLGlCQUFTLFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDaEQsUUFBUSxtQkFDTixPQUFPLEVBQUUsSUFBSSxJQUNWLFFBQVEsQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsaUJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU1QixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFckIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNqQyxJQUFJLG1CQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQzNCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILDBCQUEwQjtJQUMxQixvQ0FBb0M7SUFDcEMsSUFBSTtJQUVKLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJO1FBQUUsT0FBTyxpQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQztBQUVGLGVBQWU7QUFDZixhQUFhO0FBQ2IsUUFBUTtBQUNSLG9CQUFvQjtBQUNwQix3QkFBd0I7QUFDeEIsV0FBVztBQUNYLGtDQUFrQztBQUNsQyxpQkFBaUI7QUFDakIseUJBQXlCO0FBQ3pCLDRCQUE0QjtBQUM1QixZQUFZO0FBQ1osVUFBVTtBQUNWLFNBQVM7QUFDVCxnQkFBZ0I7QUFDaEIsTUFBTTtBQUNOLEtBQUsifQ==