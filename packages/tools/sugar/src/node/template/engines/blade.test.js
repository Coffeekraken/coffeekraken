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
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const tmp_1 = __importDefault(require("tmp"));
const STemplate_1 = __importDefault(require("../STemplate"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    // const engine = new __SBladeTemplateEngine({
    //   cacheDir: __tmp.tmpNameSync()
    // });
    // const res = await engine.render(
    //   __path.resolve(__dirname, '__tests__/views/index.blade.php'),
    //   {
    //     title: 'Hello',
    //     body: 'World'
    //   }
    // );
    const template = new STemplate_1.default('index', {
        rootDirs: [path_1.default.resolve(__dirname, '__tests__/views')],
        defaultData: {},
        engineSettings: {
            cacheDir: tmp_1.default.tmpNameSync()
        }
    });
    // const template = new __STemplate(
    //   `
    //   <h1>{{ $hello }}</h1>
    //   <p>{{ $world }}</p>
    // `,
    //   {
    //     rootDirs: [__path.resolve(__dirname, '__tests__/views')],
    //     defaultData: {}
    //   }
    // );
    const res = yield template.render({
        // title: 'plop',
        body: 'woooooorld'
    }, {});
    process.exit();
    // const other = await template.render(
    //   {
    //     title: 'plop',
    //     body: 'woooooorld'
    //   },
    //   {}
    // );
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhZGUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJsYWRlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsZ0RBQTBCO0FBQzFCLDhDQUF3QjtBQUV4Qiw2REFBdUM7QUFFdkMsQ0FBQyxHQUFTLEVBQUU7SUFDViw4Q0FBOEM7SUFDOUMsa0NBQWtDO0lBQ2xDLE1BQU07SUFFTixtQ0FBbUM7SUFDbkMsa0VBQWtFO0lBQ2xFLE1BQU07SUFDTixzQkFBc0I7SUFDdEIsb0JBQW9CO0lBQ3BCLE1BQU07SUFDTixLQUFLO0lBRUwsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBVyxDQUFDLE9BQU8sRUFBRTtRQUN4QyxRQUFRLEVBQUUsQ0FBQyxjQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hELFdBQVcsRUFBRSxFQUFFO1FBQ2YsY0FBYyxFQUFFO1lBQ2QsUUFBUSxFQUFFLGFBQUssQ0FBQyxXQUFXLEVBQUU7U0FDOUI7S0FDRixDQUFDLENBQUM7SUFDSCxvQ0FBb0M7SUFDcEMsTUFBTTtJQUNOLDBCQUEwQjtJQUMxQix3QkFBd0I7SUFDeEIsS0FBSztJQUNMLE1BQU07SUFDTixnRUFBZ0U7SUFDaEUsc0JBQXNCO0lBQ3RCLE1BQU07SUFDTixLQUFLO0lBRUwsTUFBTSxHQUFHLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUMvQjtRQUNFLGlCQUFpQjtRQUNqQixJQUFJLEVBQUUsWUFBWTtLQUNuQixFQUNELEVBQUUsQ0FDSCxDQUFDO0lBRUYsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2YsdUNBQXVDO0lBQ3ZDLE1BQU07SUFDTixxQkFBcUI7SUFDckIseUJBQXlCO0lBQ3pCLE9BQU87SUFDUCxPQUFPO0lBQ1AsS0FBSztBQUNQLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9