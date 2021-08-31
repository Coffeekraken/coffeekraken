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
import __SPostcssBuilder from '../node/SPostcssBuilder';
import __SPostcssBuilderBuildParamsInterface from '../node/interface/SPostcssBuilderBuildParamsInterface';
export default function build(stringArgs = '') {
    return new __SPromise(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const builder = new __SPostcssBuilder({
            builder: {
                interface: __SPostcssBuilderBuildParamsInterface,
            },
        });
        resolve(yield pipe(builder.build(stringArgs)));
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8saUJBQWlCLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxxQ0FBcUMsTUFBTSx1REFBdUQsQ0FBQztBQUUxRyxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUN6QyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQztZQUNsQyxPQUFPLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLHFDQUFxQzthQUNuRDtTQUNKLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9