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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const path_1 = require("@coffeekraken/sugar/path");
const SImagesBuilder_js_1 = __importDefault(require("../SImagesBuilder.js"));
describe('@coffeekraken.s-images-builder.SImagesBuilder', () => {
    it('Should compress simple jpg files correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield s_sugar_config_1.default.load();
        const outDir = `${(0, path_1.__packageTmpDir)()}/SImagesBuilder/tests`;
        const builder = new SImagesBuilder_js_1.default({
            resolveGlob: {
                defaultExcludes: false,
            },
        });
        const promise = builder.build({
            glob: '**/*.jpg',
            inDir: `${__dirname}/__data__/`,
            outDir,
            quality: 20,
            width: 100,
            webp: false,
        });
        promise.on('log', (log) => {
            console.log(log.value);
        });
        yield promise;
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELG1EQUEyRDtBQUMzRCw2RUFBb0Q7QUFFcEQsUUFBUSxDQUFDLCtDQUErQyxFQUFFLEdBQUcsRUFBRTtJQUMzRCxFQUFFLENBQUMsNENBQTRDLEVBQUUsR0FBUyxFQUFFO1FBQ3hELE1BQU0sd0JBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixNQUFNLE1BQU0sR0FBRyxHQUFHLElBQUEsc0JBQWUsR0FBRSx1QkFBdUIsQ0FBQztRQUUzRCxNQUFNLE9BQU8sR0FBRyxJQUFJLDJCQUFnQixDQUFDO1lBQ2pDLFdBQVcsRUFBRTtnQkFDVCxlQUFlLEVBQUUsS0FBSzthQUN6QjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDMUIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsS0FBSyxFQUFFLEdBQUcsU0FBUyxZQUFZO1lBQy9CLE1BQU07WUFDTixPQUFPLEVBQUUsRUFBRTtZQUNYLEtBQUssRUFBRSxHQUFHO1lBQ1YsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxPQUFPLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=