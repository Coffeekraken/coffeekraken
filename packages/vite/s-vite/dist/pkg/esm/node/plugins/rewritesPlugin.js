var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function rewritesPlugin(rewrites) {
    return {
        name: 'rewrites-plugin',
        transform(src, id) {
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < rewrites.length; i++) {
                    let rewriteObj = rewrites[i];
                    // resolve pathes
                    if (typeof rewriteObj === 'string') {
                        const { default: re } = yield import(rewriteObj);
                        rewriteObj = re;
                    }
                    if (!src.match(rewriteObj.match))
                        continue;
                    return {
                        code: rewriteObj.rewrite(src, id),
                        map: null
                    };
                }
                return {
                    code: src,
                    map: null
                };
            });
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQW9DQSxNQUFNLENBQUMsT0FBTyxVQUFVLGNBQWMsQ0FBQyxRQUFrQztJQUN2RSxPQUFPO1FBQ0wsSUFBSSxFQUFFLGlCQUFpQjtRQUNqQixTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUU7O2dCQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDeEMsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUU3QixpQkFBaUI7b0JBQ2pCLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO3dCQUNsQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUNqRCxVQUFVLEdBQUcsRUFBRSxDQUFDO3FCQUNqQjtvQkFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO3dCQUFFLFNBQVM7b0JBQzNDLE9BQU87d0JBQ0wsSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQzt3QkFDakMsR0FBRyxFQUFFLElBQUk7cUJBQ1YsQ0FBQztpQkFDSDtnQkFFRCxPQUFPO29CQUNMLElBQUksRUFBRSxHQUFHO29CQUNULEdBQUcsRUFBRSxJQUFJO2lCQUNWLENBQUM7WUFDSixDQUFDO1NBQUE7S0FDRixDQUFDO0FBQ0osQ0FBQyJ9