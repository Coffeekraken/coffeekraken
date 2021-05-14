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
/* eslint-disable node/prefer-promises/fs */
import { readFile, access } from 'fs';
import { resolve, dirname } from 'path';
import { getLanguage } from './language';
import { isValidLocalPath } from './utils';
const resolveSrc = (importerFile, srcPath) => resolve(dirname(importerFile), srcPath);
const getSrcContent = (file) => {
    return new Promise((resolve, reject) => {
        readFile(file, (error, data) => {
            // istanbul ignore if
            if (error)
                reject(error);
            else
                resolve(data.toString());
        });
    });
};
function doesFileExist(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => access(file, 0, (err) => resolve(!err)));
    });
}
export const getTagInfo = ({ attributes, filename, content }) => __awaiter(void 0, void 0, void 0, function* () {
    const dependencies = [];
    // catches empty content and self-closing tags
    const isEmptyContent = content == null || content.trim().length === 0;
    /** only include src file if content of tag is empty */
    if (attributes.src && isEmptyContent) {
        // istanbul ignore if
        if (typeof attributes.src !== 'string') {
            throw new Error('src attribute must be string');
        }
        let path = attributes.src;
        /** Only try to get local files (path starts with ./ or ../) */
        if (isValidLocalPath(path)) {
            path = resolveSrc(filename, path);
            if (yield doesFileExist(path)) {
                content = yield getSrcContent(path);
                dependencies.push(path);
            }
            else {
                console.warn(`[svelte-preprocess] The file  "${path}" was not found.`);
            }
        }
    }
    const { lang, alias } = getLanguage(attributes);
    return {
        filename,
        attributes,
        content,
        lang,
        alias,
        dependencies
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnSW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhZ0luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLDRDQUE0QztBQUM1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLElBQUksQ0FBQztBQUN0QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUUzQyxNQUFNLFVBQVUsR0FBRyxDQUFDLFlBQW9CLEVBQUUsT0FBZSxFQUFFLEVBQUUsQ0FDM0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUUxQyxNQUFNLGFBQWEsR0FBRyxDQUFDLElBQVksRUFBbUIsRUFBRTtJQUN0RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFZLEVBQUUsSUFBYSxFQUFFLEVBQUU7WUFDN0MscUJBQXFCO1lBQ3JCLElBQUksS0FBSztnQkFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O2dCQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLFNBQWUsYUFBYSxDQUFDLElBQVk7O1FBQ3ZDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLENBQU8sRUFDL0IsVUFBVSxFQUNWLFFBQVEsRUFDUixPQUFPLEVBQ1UsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUN4Qiw4Q0FBOEM7SUFDOUMsTUFBTSxjQUFjLEdBQUcsT0FBTyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUV0RSx1REFBdUQ7SUFDdkQsSUFBSSxVQUFVLENBQUMsR0FBRyxJQUFJLGNBQWMsRUFBRTtRQUNwQyxxQkFBcUI7UUFDckIsSUFBSSxPQUFPLFVBQVUsQ0FBQyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUM7UUFFMUIsK0RBQStEO1FBQy9ELElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDN0IsT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLElBQUksa0JBQWtCLENBQUMsQ0FBQzthQUN4RTtTQUNGO0tBQ0Y7SUFFRCxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVoRCxPQUFPO1FBQ0wsUUFBUTtRQUNSLFVBQVU7UUFDVixPQUFPO1FBQ1AsSUFBSTtRQUNKLEtBQUs7UUFDTCxZQUFZO0tBQ2IsQ0FBQztBQUNKLENBQUMsQ0FBQSxDQUFDIn0=