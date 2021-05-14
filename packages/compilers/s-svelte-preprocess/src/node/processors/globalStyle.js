// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default () => {
    return {
        style({ content, attributes, filename }) {
            return __awaiter(this, void 0, void 0, function* () {
                const { transformer } = yield import('../transformers/globalStyle');
                if (!attributes.global) {
                    return { code: content };
                }
                return transformer({ content, filename, attributes });
            });
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsU3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnbG9iYWxTdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBSWQsZUFBZSxHQUFzQixFQUFFO0lBQ3JDLE9BQU87UUFDQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTs7Z0JBQzNDLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2dCQUVwRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtvQkFDdEIsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztpQkFDMUI7Z0JBRUQsT0FBTyxXQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDeEQsQ0FBQztTQUFBO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9