'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const resolveGlob_1 = __importDefault(require('../../node/glob/resolveGlob'));
const path_1 = __importDefault(require('path'));
exports.default = (stringArgs = '') =>
  __awaiter(void 0, void 0, void 0, function* () {
    const files = yield resolveGlob_1.default('node/**/*.ts', {
      cwd: path_1.default.resolve(__dirname, '../..'),
      contentRegex: /\/\/\s?@shared/gm
    });
    files.forEach((file) => {
      // const relPath = __path.relative(
      //   __path.resolve(__dirname, '../../js'),
      //   file.path
      // );
      console.log(file.path);
      // file.unlinkSync();
      // const finalPath = `${__path.resolve(__dirname, '../../shared')}/${relPath}`;
      // const finalFolderPath = __folderPath(finalPath);
      // __ensureDirSync(finalFolderPath);
      // __fs.copyFileSync(file.path, finalPath);
    });
  });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4RUFBd0Q7QUFDeEQsZ0RBQTBCO0FBSTFCLGtCQUFlLENBQU8sVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sS0FBSyxHQUFHLE1BQU0scUJBQWEsQ0FBQyxZQUFZLEVBQUU7UUFDOUMsR0FBRyxFQUFFLGNBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztRQUN2QyxZQUFZLEVBQUUsa0JBQWtCO0tBQ2pDLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNyQixtQ0FBbUM7UUFDbkMsMkNBQTJDO1FBQzNDLGNBQWM7UUFDZCxLQUFLO1FBQ0wsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLCtFQUErRTtRQUMvRSxtREFBbUQ7UUFDbkQsb0NBQW9DO1FBQ3BDLDJDQUEyQztJQUM3QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDIn0=
