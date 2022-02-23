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
export default function view(express, settings, config) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const docmap = new __SDocmap();
        const docmapJson = yield docmap.read();
        const menu = docmapJson.menu;
        // register handler
        config.handlers.view = {
            path: `${__dirname()}/viewHandler`
        };
        // @ts-ignore
        config.routes[(_a = settings.slug) !== null && _a !== void 0 ? _a : '/view/*'] = {
            handler: 'view',
        };
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUM7QUFFL0MsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTTs7O1FBQ3hELE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUU3QixtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUc7WUFDbkIsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLGNBQWM7U0FDckMsQ0FBQztRQUVGLGFBQWE7UUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksU0FBUyxDQUFDLEdBQUc7WUFDeEMsT0FBTyxFQUFFLE1BQU07U0FDbEIsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDOztDQUNmIn0=