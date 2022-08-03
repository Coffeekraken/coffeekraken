"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const SCliPackageRenameParamsInterface_1 = __importDefault(require("../../node/package/interface/SCliPackageRenameParamsInterface"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const renamePackage_1 = __importDefault(require("@coffeekraken/sugar/node/package/renamePackage"));
const fs_1 = __importDefault(require("fs"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = SCliPackageRenameParamsInterface_1.default.apply(stringArgs);
        if (!finalParams.name) {
            finalParams.name = yield emit('ask', {
                type: 'input',
                message: 'Please enter the new name for your package',
                pattern: '^[a-zA-Z0-9_@/-]+$',
            });
        }
        if (finalParams.folder === undefined) {
            finalParams.folder = yield emit('ask', {
                type: 'confirm',
                message: 'Do you want to rename the folder as well ?',
                default: true,
            });
        }
        // rename package
        emit('log', {
            value: `<yellow>[rename]</yellow> Renaming the package with "<cyan>${finalParams.name}</cyan>"`,
        });
        (0, renamePackage_1.default)(finalParams.name);
        if (finalParams.folder) {
            const folderName = finalParams.name.split('/').pop();
            emit('log', {
                value: `<yellow>[rename]</yellow> Renaming the folder with "<cyan>${folderName}</cyan>"`,
            });
            const newPath = `${process
                .cwd()
                .split('/')
                .slice(0, -1)
                .join('/')}/${folderName}`;
            fs_1.default.renameSync(process.cwd(), newPath);
            process.chdir(newPath);
            emit('chdir', newPath);
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLHFJQUErRztBQUMvRyx3RUFBaUQ7QUFDakQsbUdBQTZFO0FBQzdFLDRDQUFzQjtBQUV0QixrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMvQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxNQUFNLFdBQVcsR0FBRywwQ0FBa0MsQ0FBQyxLQUFLLENBQ3hELFVBQVUsQ0FDYixDQUFDO1FBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDbkIsV0FBVyxDQUFDLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pDLElBQUksRUFBRSxPQUFPO2dCQUNiLE9BQU8sRUFBRSw0Q0FBNEM7Z0JBQ3JELE9BQU8sRUFBRSxvQkFBb0I7YUFDaEMsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ2xDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNuQyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsNENBQTRDO2dCQUNyRCxPQUFPLEVBQUUsSUFBSTthQUNoQixDQUFDLENBQUM7U0FDTjtRQUVELGlCQUFpQjtRQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLDhEQUE4RCxXQUFXLENBQUMsSUFBSSxVQUFVO1NBQ2xHLENBQUMsQ0FBQztRQUNILElBQUEsdUJBQWUsRUFBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEMsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ3BCLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3JELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLDZEQUE2RCxVQUFVLFVBQVU7YUFDM0YsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxPQUFPLEdBQUcsR0FBRyxPQUFPO2lCQUNyQixHQUFHLEVBQUU7aUJBQ0wsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUMvQixZQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN4QyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDMUI7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==