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
import { transformAsync } from '@babel/core';
const transformer = ({ content, filename, options, map = undefined }) => __awaiter(void 0, void 0, void 0, function* () {
    const babelOptions = Object.assign(Object.assign({}, options), { inputSourceMap: typeof map === 'string' ? JSON.parse(map) : map !== null && map !== void 0 ? map : undefined, sourceType: 'module', 
        // istanbul ignore next
        sourceMaps: !!options.sourceMaps, filename, minified: false, ast: false, code: true });
    const { code, map: sourcemap } = yield transformAsync(content, babelOptions);
    return {
        code,
        map: sourcemap
    };
});
export { transformer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBR2QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUk3QyxNQUFNLFdBQVcsR0FBK0IsQ0FBTyxFQUNyRCxPQUFPLEVBQ1AsUUFBUSxFQUNSLE9BQU8sRUFDUCxHQUFHLEdBQUcsU0FBUyxFQUNoQixFQUFFLEVBQUU7SUFDSCxNQUFNLFlBQVksR0FBRyxnQ0FDaEIsT0FBTyxLQUNWLGNBQWMsRUFDWixPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBSCxHQUFHLGNBQUgsR0FBRyxHQUFJLFNBQVMsRUFDOUQsVUFBVSxFQUFFLFFBQVE7UUFDcEIsdUJBQXVCO1FBQ3ZCLFVBQVUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFDaEMsUUFBUSxFQUNSLFFBQVEsRUFBRSxLQUFLLEVBQ2YsR0FBRyxFQUFFLEtBQUssRUFDVixJQUFJLEVBQUUsSUFBSSxHQUNTLENBQUM7SUFFdEIsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsTUFBTSxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBRTdFLE9BQU87UUFDTCxJQUFJO1FBQ0osR0FBRyxFQUFFLFNBQVM7S0FDZixDQUFDO0FBQ0osQ0FBQyxDQUFBLENBQUM7QUFFRixPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUMifQ==