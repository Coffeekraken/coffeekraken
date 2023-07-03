var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDuration from '@coffeekraken/s-duration';
import { __writeFileSync } from '@coffeekraken/sugar/fs';
export default function ({ root, sharedData, settings, cacheDir }) {
    return __awaiter(this, void 0, void 0, function* () {
        const duration = new __SDuration();
        const css = root.toString();
        const cacheMatches = [
            ...css.matchAll(/\/\*\!\sSCACHE:([a-zA-Z0-9_=-]+)\s\*\/([\s\S]*)\/\*\!\sSENDCACHE:[a-zA-Z0-9_=-]+\s\*\//g),
        ];
        cacheMatches.forEach((match) => {
            const cacheId = match[1], cacheContent = match[2], humanId = cacheId.split('=')[3];
            console.log(`<yellow>[cache]</yellow> Saving cache "<cyan>${humanId !== null && humanId !== void 0 ? humanId : cacheId}</cyan>"`);
            __writeFileSync(`${cacheDir}/${cacheId}.css`, cacheContent);
        });
        if (cacheMatches.length) {
            console.log(`<green>[cache]</green> Cache generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxXQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTs7UUFDbkUsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUVuQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFNUIsTUFBTSxZQUFZLEdBQUc7WUFDakIsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUNYLHlGQUF5RixDQUM1RjtTQUNKLENBQUM7UUFFRixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNwQixZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUN2QixPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwQyxPQUFPLENBQUMsR0FBRyxDQUNQLGdEQUNJLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLE9BQ2YsVUFBVSxDQUNiLENBQUM7WUFFRixlQUFlLENBQUMsR0FBRyxRQUFRLElBQUksT0FBTyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FDUCwrRUFDSSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ25CLFNBQVMsQ0FDWixDQUFDO1NBQ0w7SUFDTCxDQUFDO0NBQUEifQ==