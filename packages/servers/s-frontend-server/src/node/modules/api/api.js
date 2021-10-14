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
import __set from '@coffeekraken/sugar/shared/object/set';
export default function api(express, config) {
    return __awaiter(this, void 0, void 0, function* () {
        // register handler
        config.handlers['api'] = `${__dirname()}/apiHandler`;
        const docmap = new __SDocmap();
        const docmapJson = yield docmap.read();
        const apiMenu = {};
        Object.keys(docmapJson.map).forEach((namespace) => {
            const docmapObj = docmapJson.map[namespace];
            const url = `/api/${namespace}`;
            __set(apiMenu, namespace, {
                type: docmapObj.type,
                name: docmapObj.name,
                namespace,
                url,
                path: docmapObj.path,
                relPath: docmapObj.relPath,
            });
            config.routes[url] = {
                handler: 'api',
            };
        });
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBRS9DLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFVBQWdCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTTs7UUFDN0MsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxTQUFTLEVBQUUsYUFBYSxDQUFDO1FBRXJELE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdkMsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRW5CLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzlDLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFNUMsTUFBTSxHQUFHLEdBQUcsUUFBUSxTQUFTLEVBQUUsQ0FBQztZQUVoQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtnQkFDdEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUNwQixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3BCLFNBQVM7Z0JBQ1QsR0FBRztnQkFDSCxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3BCLE9BQU8sRUFBRSxTQUFTLENBQUMsT0FBTzthQUM3QixDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHO2dCQUNqQixPQUFPLEVBQUUsS0FBSzthQUNqQixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQUEifQ==