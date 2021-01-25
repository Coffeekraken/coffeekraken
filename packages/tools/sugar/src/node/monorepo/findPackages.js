"use strict";
// @ts-nocheck
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
const glob_1 = __importDefault(require("glob"));
const folderPath_1 = __importDefault(require("../fs/folderPath"));
module.exports = function findPackages(rootDir = process.cwd()) {
    return __awaiter(this, void 0, void 0, function* () {
        const packagesObj = {};
        const packagesPaths = glob_1.default
            .sync('**/package.json', {
            cwd: rootDir,
            ignore: '**/node_modules/**'
        })
            .filter((path) => path !== 'package.json');
        packagesPaths.forEach((path) => {
            packagesObj[folderPath_1.default(path)] = require(`${rootDir}/${path}`);
        });
        return packagesObj;
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFBhY2thZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmluZFBhY2thZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7O0FBRWQsZ0RBQXlCO0FBQ3pCLGtFQUEyQztBQTJCM0MsaUJBQVMsU0FBZSxZQUFZLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7O1FBSTFELE1BQU0sV0FBVyxHQUFpQixFQUFFLENBQUM7UUFDckMsTUFBTSxhQUFhLEdBQUcsY0FBSzthQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDdkIsR0FBRyxFQUFFLE9BQU87WUFDWixNQUFNLEVBQUUsb0JBQW9CO1NBQzdCLENBQUM7YUFDRCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsQ0FBQztRQUM3QyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDN0IsV0FBVyxDQUFDLG9CQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Q0FBQSxDQUFDIn0=