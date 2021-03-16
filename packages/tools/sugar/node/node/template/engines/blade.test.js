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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhZGUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL3RlbXBsYXRlL2VuZ2luZXMvYmxhZGUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxnREFBMEI7QUFDMUIsOENBQXdCO0FBRXhCLDZEQUF1QztBQUV2QyxDQUFDLEdBQVMsRUFBRTtJQUNWLDhDQUE4QztJQUM5QyxrQ0FBa0M7SUFDbEMsTUFBTTtJQUVOLG1DQUFtQztJQUNuQyxrRUFBa0U7SUFDbEUsTUFBTTtJQUNOLHNCQUFzQjtJQUN0QixvQkFBb0I7SUFDcEIsTUFBTTtJQUNOLEtBQUs7SUFFTCxNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFXLENBQUMsT0FBTyxFQUFFO1FBQ3hDLFFBQVEsRUFBRSxDQUFDLGNBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDeEQsV0FBVyxFQUFFLEVBQUU7UUFDZixjQUFjLEVBQUU7WUFDZCxRQUFRLEVBQUUsYUFBSyxDQUFDLFdBQVcsRUFBRTtTQUM5QjtLQUNGLENBQUMsQ0FBQztJQUNILG9DQUFvQztJQUNwQyxNQUFNO0lBQ04sMEJBQTBCO0lBQzFCLHdCQUF3QjtJQUN4QixLQUFLO0lBQ0wsTUFBTTtJQUNOLGdFQUFnRTtJQUNoRSxzQkFBc0I7SUFDdEIsTUFBTTtJQUNOLEtBQUs7SUFFTCxNQUFNLEdBQUcsR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQy9CO1FBQ0UsaUJBQWlCO1FBQ2pCLElBQUksRUFBRSxZQUFZO0tBQ25CLEVBQ0QsRUFBRSxDQUNILENBQUM7SUFFRixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZix1Q0FBdUM7SUFDdkMsTUFBTTtJQUNOLHFCQUFxQjtJQUNyQix5QkFBeUI7SUFDekIsT0FBTztJQUNQLE9BQU87SUFDUCxLQUFLO0FBQ1AsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDIn0=