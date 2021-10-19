var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __listNodeModulesPackages from '../listNodeModulesPackages';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
describe('sugar.node.npm.utils.listNodeModulesPackages', () => {
    it('Should list the sugar node_modules packages correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        const modules = __listNodeModulesPackages({
            monorepo: true,
        });
        expect(Object.keys(modules).length).toBeGreaterThan(0);
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdE5vZGVNb2R1bGVzUGFja2FnZXMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3ROb2RlTW9kdWxlc1BhY2thZ2VzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyx5QkFBeUIsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxRQUFRLENBQUMsOENBQThDLEVBQUUsR0FBRyxFQUFFO0lBQzFELEVBQUUsQ0FBQyx1REFBdUQsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ3ZFLE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTVCLE1BQU0sT0FBTyxHQUFHLHlCQUF5QixDQUFDO1lBQ3RDLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9