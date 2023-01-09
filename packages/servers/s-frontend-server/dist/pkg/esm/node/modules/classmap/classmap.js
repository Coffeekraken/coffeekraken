var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __dirname } from '@coffeekraken/sugar/fs';
export default function classmap(express, settings, config) {
    return __awaiter(this, void 0, void 0, function* () {
        // handlers
        config.handlers.classmapJson = {
            description: 'Load and serve the classmap.json file',
            path: `${__dirname()}/classmapJsonHandler`,
            ettings: {},
        };
        // pages
        config.pages.classmapJson = {
            description: 'Serve the classmap.json',
            slugs: ['/classmap.json'],
            handler: 'classmapJson',
        };
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRCxNQUFNLENBQUMsT0FBTyxVQUFnQixRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNOztRQUM1RCxXQUFXO1FBQ1gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUc7WUFDM0IsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUsc0JBQXNCO1lBQzFDLE9BQU8sRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUVGLFFBQVE7UUFDUixNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRztZQUN4QixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLEtBQUssRUFBRSxDQUFDLGdCQUFnQixDQUFDO1lBQ3pCLE9BQU8sRUFBRSxjQUFjO1NBQzFCLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQUEifQ==