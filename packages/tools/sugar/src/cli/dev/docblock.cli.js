var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDocblock from '@coffeekraken/s-docblock';
import { SDocblockHtmlRenderer } from '@coffeekraken/s-docblock-renderer';
import __fs from 'fs';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    const content = __fs.readFileSync(`${__dirname()}/../../js/class/SInterface.ts`, 'utf8');
    const blocks = new __SDocblock(content);
    const renderer = new SDocblockHtmlRenderer(blocks);
    const res = yield renderer.render();
    console.log(res);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jYmxvY2suY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jYmxvY2suY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RCxlQUFlLENBQU8sVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQy9CLEdBQUcsU0FBUyxFQUFFLCtCQUErQixFQUM3QyxNQUFNLENBQ1AsQ0FBQztJQUNGLE1BQU0sTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sUUFBUSxHQUFHLElBQUkscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFbkQsTUFBTSxHQUFHLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuQixDQUFDLENBQUEsQ0FBQyJ9