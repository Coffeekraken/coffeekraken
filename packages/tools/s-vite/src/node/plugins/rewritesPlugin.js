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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV3cml0ZXNQbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXdyaXRlc1BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFpQ0EsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQUMsUUFBa0M7SUFDdkUsT0FBTztRQUNMLElBQUksRUFBRSxpQkFBaUI7UUFDakIsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFOztnQkFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3hDLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFN0IsaUJBQWlCO29CQUNqQixJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTt3QkFDbEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDakQsVUFBVSxHQUFHLEVBQUUsQ0FBQztxQkFDakI7b0JBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQzt3QkFBRSxTQUFTO29CQUMzQyxPQUFPO3dCQUNMLElBQUksRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7d0JBQ2pDLEdBQUcsRUFBRSxJQUFJO3FCQUNWLENBQUM7aUJBQ0g7Z0JBRUQsT0FBTztvQkFDTCxJQUFJLEVBQUUsR0FBRztvQkFDVCxHQUFHLEVBQUUsSUFBSTtpQkFDVixDQUFDO1lBQ0osQ0FBQztTQUFBO0tBQ0YsQ0FBQztBQUNKLENBQUMifQ==