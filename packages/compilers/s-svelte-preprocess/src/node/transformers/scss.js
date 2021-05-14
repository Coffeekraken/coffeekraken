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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { readFileSync } from 'fs';
import { join, isAbsolute } from 'path';
import { getIncludePaths, importAny, findUp } from '../modules/utils';
let sass;
function getProcessedResult(result) {
    var _a;
    // For some reason, scss includes the main 'file' in the array, we don't want that
    // Unfortunately I didn't manage to reproduce this in the test env
    // More info: https://github.com/sveltejs/svelte-preprocess/issues/346
    const absoluteEntryPath = isAbsolute(result.stats.entry)
        ? result.stats.entry
        : join(process.cwd(), result.stats.entry);
    const processed = {
        code: result.css.toString(),
        map: (_a = result.map) === null || _a === void 0 ? void 0 : _a.toString(),
        dependencies: Array.from(result.stats.includedFiles).filter((filepath) => filepath !== absoluteEntryPath)
    };
    return processed;
}
const tildeImporter = (url, prev) => {
    if (!url.startsWith('~')) {
        return null;
    }
    // not sure why this ends up here, but let's remove it
    prev = prev.replace('http://localhost', '');
    // on windows, path comes encoded
    if (process.platform === 'win32') {
        prev = decodeURIComponent(prev);
    }
    const modulePath = join('node_modules', ...url.slice(1).split(/[\\/]/g));
    const foundPath = findUp({ what: modulePath, from: prev });
    // istanbul ignore if
    if (foundPath == null) {
        return null;
    }
    const contents = readFileSync(foundPath).toString();
    return { contents };
};
const transformer = ({ content, filename, options = {} }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let implementation = (_a = options === null || options === void 0 ? void 0 : options.implementation) !== null && _a !== void 0 ? _a : sass;
    if (implementation == null) {
        const mod = yield importAny('sass', 'node-sass');
        // eslint-disable-next-line no-multi-assign
        implementation = sass = mod.default;
    }
    const _b = Object.assign(Object.assign({}, options), { includePaths: getIncludePaths(filename, options.includePaths), outFile: `${filename}.css`, omitSourceMapUrl: true // return sourcemap only in result.map
     }), { renderSync, prependData } = _b, restOptions = __rest(_b, ["renderSync", "prependData"]);
    const sassOptions = Object.assign(Object.assign({}, restOptions), { file: filename, data: content });
    if (Array.isArray(sassOptions.importer)) {
        sassOptions.importer = [tildeImporter, ...sassOptions.importer];
    }
    else if (sassOptions.importer == null) {
        sassOptions.importer = [tildeImporter];
    }
    else {
        sassOptions.importer = [sassOptions.importer, tildeImporter];
    }
    // scss errors if passed an empty string
    if (sassOptions.data.length === 0) {
        return { code: '' };
    }
    if (renderSync) {
        return getProcessedResult(implementation.renderSync(sassOptions));
    }
    return new Promise((resolve, reject) => {
        implementation.render(sassOptions, (err, result) => {
            if (err)
                return reject(err);
            resolve(getProcessedResult(result));
        });
    });
});
export { transformer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNjc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLElBQUksQ0FBQztBQUNsQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUl4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUd0RSxJQUFJLElBQW9DLENBQUM7QUFFekMsU0FBUyxrQkFBa0IsQ0FBQyxNQUFjOztJQUN4QyxrRkFBa0Y7SUFDbEYsa0VBQWtFO0lBQ2xFLHNFQUFzRTtJQUN0RSxNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN0RCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLO1FBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFNUMsTUFBTSxTQUFTLEdBQUc7UUFDaEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1FBQzNCLEdBQUcsRUFBRSxNQUFBLE1BQU0sQ0FBQyxHQUFHLDBDQUFFLFFBQVEsRUFBRTtRQUMzQixZQUFZLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FDekQsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsS0FBSyxpQkFBaUIsQ0FDN0M7S0FDRixDQUFDO0lBRUYsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUVELE1BQU0sYUFBYSxHQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzVD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