var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function importCssPlugin() {
    return {
        name: 'vite-import-css',
        apply: 'build',
        enforce: 'post',
        // resolveId(id) {
        //     console.log('ID', id);
        // },
        transform(src, id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!id.match(/\.(js|jsx|ts|tsx|riot|vue|svelte)$/))
                    return;
                // const matches = src.match(/import\s?\".*\.css\"/gm);
                console.log(src);
                // if (matches) {
                //     matches.forEach(match => {
                //         const path = match.replace(/import\s?\"/, '').replace('"','');
                //         const css = __fs.readFileSync(path, 'utf8').toString();
                //         console.log(css);
                //     });
                // }
                return {
                    code: src,
                    map: null
                };
            });
        },
        load(id) {
            console.log(id);
        }
    };
}
export default importCssPlugin();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0Q3NzUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW1wb3J0Q3NzUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQWtDQSxTQUFTLGVBQWU7SUFDdEIsT0FBTztRQUNMLElBQUksRUFBRSxpQkFBaUI7UUFFdkIsS0FBSyxFQUFFLE9BQU87UUFDZCxPQUFPLEVBQUUsTUFBTTtRQUVmLGtCQUFrQjtRQUNsQiw2QkFBNkI7UUFDN0IsS0FBSztRQUVDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7Z0JBRXZCLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDO29CQUFFLE9BQU87Z0JBRTVELHVEQUF1RDtnQkFFbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFckIsaUJBQWlCO2dCQUNqQixpQ0FBaUM7Z0JBQ2pDLHlFQUF5RTtnQkFDekUsa0VBQWtFO2dCQUNsRSw0QkFBNEI7Z0JBQzVCLFVBQVU7Z0JBQ1YsSUFBSTtnQkFHRixPQUFPO29CQUNMLElBQUksRUFBRSxHQUFHO29CQUNULEdBQUcsRUFBRSxJQUFJO2lCQUNWLENBQUM7WUFDSixDQUFDO1NBQUE7UUFDRCxJQUFJLENBQUMsRUFBRTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDO0FBRUQsZUFBZSxlQUFlLEVBQUUsQ0FBQyJ9