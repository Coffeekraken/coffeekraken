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
import { __dirname } from '@coffeekraken/sugar/fs';
export default function carpenter(express, settings, config) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        // handlers
        config.handlers.carpenterJson = {
            description: 'Serve the carpenter data in JSON',
            path: `${__dirname()}/carpenterJsonHandler`,
            ettings: {},
        };
        config.handlers.carpenter = {
            description: 'Serve the carpenter page that display a component at a time',
            path: `${__dirname()}/carpenterHandler`,
            ettings: {},
        };
        // pages
        config.pages.carpenterJson = {
            description: 'Serve the carpenter data in JSON',
            slugs: ['/carpenter.json'],
            handler: 'carpenterJson',
        };
        config.pages.carpenter = {
            description: 'Serve the carpenter page that display a component at a time',
            slugs: ['/carpenter', '/carpenter/:dotpath'],
            handler: 'carpenter',
        };
        resolve(true);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRCxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07SUFDdkQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxXQUFXO1FBQ1gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUc7WUFDNUIsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUsdUJBQXVCO1lBQzNDLE9BQU8sRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHO1lBQ3hCLFdBQVcsRUFDUCw2REFBNkQ7WUFDakUsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLG1CQUFtQjtZQUN2QyxPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFFRixRQUFRO1FBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUc7WUFDekIsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxLQUFLLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQixPQUFPLEVBQUUsZUFBZTtTQUMzQixDQUFDO1FBRUYsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUc7WUFDckIsV0FBVyxFQUNQLDZEQUE2RDtZQUNqRSxLQUFLLEVBQUUsQ0FBQyxZQUFZLEVBQUUscUJBQXFCLENBQUM7WUFDNUMsT0FBTyxFQUFFLFdBQVc7U0FDdkIsQ0FBQztRQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9