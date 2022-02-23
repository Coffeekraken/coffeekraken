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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const docmap = new __SDocmap();
        const docmapJson = yield docmap.read();
        const menu = docmapJson.menu;
        // register handler
        config.handlers.styleguide = {
            path: `${__dirname()}/styleguideHandler`
        };
        // @ts-ignore
        Object.keys((_a = menu.custom.styleguide) === null || _a === void 0 ? void 0 : _a.slug).forEach((slug) => {
            config.routes[slug] = {
                handler: 'styleguide',
            };
        });
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVndWlkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0eWxlZ3VpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUM7QUFFL0MsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTTs7O1FBQzFELE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUU3QixtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUc7WUFDekIsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLG9CQUFvQjtTQUMzQyxDQUFDO1FBRUYsYUFBYTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsMENBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRztnQkFDbEIsT0FBTyxFQUFFLFlBQVk7YUFDeEIsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUM7O0NBQ2YifQ==