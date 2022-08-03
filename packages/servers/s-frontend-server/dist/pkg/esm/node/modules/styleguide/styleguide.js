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
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function docmap(express, settings, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const docmap = new __SDocmap();
        const docmapJson = yield docmap.read();
        const menu = docmapJson.menu;
        // register handler
        config.handlers.styleguide = {
            path: `${__dirname()}/styleguideHandler`,
        };
        // @ts-ignore
        // Object.keys(menu.custom.styleguide?.slug).forEach((slug) => {
        //     config.routes[slug] = {
        //         handler: 'styleguide',
        //     };
        // });
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBRS9DLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFVBQWdCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07O1FBQzFELE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUU3QixtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUc7WUFDekIsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLG9CQUFvQjtTQUMzQyxDQUFDO1FBRUYsYUFBYTtRQUNiLGdFQUFnRTtRQUNoRSw4QkFBOEI7UUFDOUIsaUNBQWlDO1FBQ2pDLFNBQVM7UUFDVCxNQUFNO1FBRU4sT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUFBIn0=