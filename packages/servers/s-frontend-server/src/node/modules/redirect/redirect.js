var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function redirect(express, settings, config) {
    return __awaiter(this, void 0, void 0, function* () {
        // register handler
        config.handlers.redirect = {
            path: `${__dirname()}/redirectHandler`
        };
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWRpcmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxVQUFnQixRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNOztRQUU1RCxtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUc7WUFDdkIsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLGtCQUFrQjtTQUN6QyxDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUFBIn0=