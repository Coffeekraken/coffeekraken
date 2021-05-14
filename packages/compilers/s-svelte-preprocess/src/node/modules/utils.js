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
import { existsSync } from 'fs';
import { dirname, join, parse } from 'path';
export function importAny(...modules) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mod = yield modules.reduce((acc, moduleName) => acc.catch(() => import(moduleName)), Promise.reject());
            return mod;
        }
        catch (e) {
            throw new Error(`Cannot find any of modules: ${modules}\n\n${e}`);
        }
    });
}
export function concat(...arrs) {
    return arrs.reduce((acc, a) => {
        if (a) {
            return acc.concat(a);
        }
        return acc;
    }, []);
}
/** Paths used by preprocessors to resolve @imports */
export function getIncludePaths(fromFilename, base = []) {
    return [
        ...new Set([...base, 'node_modules', process.cwd(), dirname(fromFilename)])
    ];
}
const cachedResult = {};
/**
 * Checks if a package is installed.
 *
 * @export
 * @param {string} dep
 * @returns boolean
 */
export function hasDepInstalled(dep) {
    return __awaiter(this, void 0, void 0, function* () {
        if (cachedResult[dep] != null) {
            return cachedResult[dep];
        }
        let result = false;
        try {
            yield import(dep);
            result = true;
        }
        catch (e) {
            result = false;
        }
        return (cachedResult[dep] = result);
    });
}
const REMOTE_SRC_PATTERN = /^(https?:)?\/\//;
export function isValidLocalPath(path) {
    return (path.match(REMOTE_SRC_PATTERN) == null &&
        // only literal strings allowed
        !path.startsWith('{') &&
        !path.endsWith('}'));
}
// finds a existing path up the tree
export function findUp({ what, from }) {
    const { root, dir } = parse(from);
    let cur = dir;
    try {
        while (cur !== root) {
            const possiblePath = join(cur, what);
            if (existsSync(possiblePath)) {
                return possiblePath;
            }
            cur = dirname(cur);
        }
    }
    catch (e) {
        console.error(e);
    }
    return null;
}
// set deep property in object
export function setProp(obj, keyList, val) {
    let i = 0;
    for (; i < keyList.length - 1; i++) {
        const key = keyList[i];
        if (typeof obj[key] !== 'object') {
            obj[key] = {};
        }
        obj = obj[key];
    }
    obj[keyList[i]] = val;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLElBQUksQ0FBQztBQUNoQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFNUMsTUFBTSxVQUFnQixTQUFTLENBQUMsR0FBRyxPQUFpQjs7UUFDbEQsSUFBSTtZQUNGLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FDOUIsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUN4RCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQ2pCLENBQUM7WUFFRixPQUFPLEdBQUcsQ0FBQztTQUNaO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuRTtJQUNILENBQUM7Q0FBQTtBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsR0FBRyxJQUFXO0lBQ25DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxJQUFJLENBQUMsRUFBRTtZQUNMLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1QsQ0FBQztBQUVELHNEQUFzRDtBQUN0RCxNQUFNLFVBQVUsZUFBZSxDQUFDLFlBQW9CLEVBQUUsT0FBaUIsRUFBRTtJQUN2RSxPQUFPO1FBQ0wsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdB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