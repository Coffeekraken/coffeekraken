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
import __SRequest from "@coffeekraken/s-request";
import { SStateManager } from "@coffeekraken/s-state";
const state = new SStateManager({
    id: "ck-state",
    save: true,
});
export default state;
let _docmap, _docmapPromise;
export function loadDocmap() {
    return __awaiter(this, void 0, void 0, function* () {
        if (_docmap)
            return _docmap;
        if (_docmapPromise)
            return (yield _docmapPromise).data;
        const request = new __SRequest({
            url: `/docmap.json`,
            method: "GET",
        });
        const promise = request.send();
        _docmapPromise = promise;
        _docmap = (yield promise).data;
        return _docmap;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxhQUFhLENBQUM7SUFDOUIsRUFBRSxFQUFFLFVBQVU7SUFDZCxJQUFJLEVBQUUsSUFBSTtDQUNYLENBQUMsQ0FBQztBQUVILGVBQWUsS0FBSyxDQUFDO0FBRXJCLElBQUksT0FBTyxFQUFFLGNBQWMsQ0FBQztBQUM1QixNQUFNLFVBQWdCLFVBQVU7O1FBQzlCLElBQUksT0FBTztZQUFFLE9BQU8sT0FBTyxDQUFDO1FBQzVCLElBQUksY0FBYztZQUFFLE9BQU8sQ0FBQyxNQUFNLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUV2RCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUM3QixHQUFHLEVBQUUsY0FBYztZQUNuQixNQUFNLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixjQUFjLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRS9CLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FBQSJ9