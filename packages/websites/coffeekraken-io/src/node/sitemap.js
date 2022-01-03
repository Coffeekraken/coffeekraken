var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDocmap from '@coffeekraken/s-docmap';
import __fileHash from '@coffeekraken/sugar/node/fs/fileHash';
export default function sitemap() {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const items = [
            {
                loc: '/config/explorer',
            },
        ];
        const hashesByPath = {};
        const docmapInstance = new __SDocmap();
        const docmapJson = yield docmapInstance.read();
        for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
            // @ts-ignore
            let hash = hashesByPath[docmapObj.path];
            if (!hash) {
                // @ts-ignore
                hash = __fileHash(docmapObj.path);
                // save in stack
                // @ts-ignore
                hashesByPath[docmapObj.path] = hash;
            }
            items.push({
                loc: `/api/${namespace}`,
                // @ts-ignore
                integrity: hash,
            });
        }
        resolve(items);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZW1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpdGVtYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxVQUFVLE1BQU0sc0NBQXNDLENBQUM7QUFFOUQsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPO0lBQzNCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDekMsTUFBTSxLQUFLLEdBQUc7WUFDVjtnQkFDSSxHQUFHLEVBQUUsa0JBQWtCO2FBQzFCO1NBQ0osQ0FBQztRQUVGLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV4QixNQUFNLGNBQWMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRS9DLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMvRCxhQUFhO1lBQ2IsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLGFBQWE7Z0JBQ2IsSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xDLGdCQUFnQjtnQkFDaEIsYUFBYTtnQkFDYixZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQzthQUN2QztZQUVELEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsR0FBRyxFQUFFLFFBQVEsU0FBUyxFQUFFO2dCQUN4QixhQUFhO2dCQUNiLFNBQVMsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=