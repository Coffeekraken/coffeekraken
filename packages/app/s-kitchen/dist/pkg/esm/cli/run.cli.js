var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SKitchen from '../node/SKitchen.js';
export default function run(stringArgs = '') {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const kitchen = new __SKitchen();
        const result = kitchen.run(stringArgs);
        resolve(result);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBRTdDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQ3ZDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=