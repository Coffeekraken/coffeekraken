var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import { __dirname, __readJsonSync } from '@coffeekraken/sugar/fs';
export default function changelogSitemap() {
    return new __SPromise(({ resolve, emit }) => __awaiter(this, void 0, void 0, function* () {
        const items = [];
        const versions = __readJsonSync(`${__dirname()}/../../../versions.json`);
        for (let i = 0; i < Object.keys(versions).length; i++) {
            const version = Object.keys(versions)[i];
            items.push({
                title: `Coffeekraken ${version} changelog`,
                log: i === 0 ? '/changelog' : `/changelog/${version}`,
            });
        }
        resolve(items);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBR2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbkUsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQkFBZ0I7SUFDcEMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDOUMsTUFBTSxLQUFLLEdBQWlDLEVBQUUsQ0FBQztRQUUvQyxNQUFNLFFBQVEsR0FBRyxjQUFjLENBQzNCLEdBQUcsU0FBUyxFQUFFLHlCQUF5QixDQUMxQyxDQUFDO1FBRUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25ELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDUCxLQUFLLEVBQUUsZ0JBQWdCLE9BQU8sWUFBWTtnQkFDMUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsY0FBYyxPQUFPLEVBQUU7YUFDeEQsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==