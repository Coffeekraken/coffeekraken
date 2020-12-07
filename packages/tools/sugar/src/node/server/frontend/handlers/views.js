"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
const STemplate_1 = __importDefault(require("../../../template/STemplate"));
const fs_1 = __importDefault(require("fs"));
const SDuration_1 = __importDefault(require("../../../time/SDuration"));
module.exports = function views(req, res, settings = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let params = req.params[0].split('/');
        const duration = new SDuration_1.default();
        let rootDirs = STemplate_1.default.getRootDirs(settings.rootDir || []);
        for (let i = 0; i < rootDirs.length; i++) {
            const rootDir = rootDirs[i];
            for (let j = 0; j < Object.keys(STemplate_1.default.engines).length; j++) {
                const engineExt = Object.keys(STemplate_1.default.engines)[j];
                const viewPath = path_1.default.resolve(rootDir, params.join('/')) + `.${engineExt}`;
                if (fs_1.default.existsSync(viewPath)) {
                    const relativeViewPath = path_1.default.relative(rootDir, viewPath);
                    const templateInstance = new STemplate_1.default(relativeViewPath, {
                        rootDirs
                    });
                    const resultObj = yield templateInstance.render(Object.assign({}, (res.templateData || {})));
                    if (settings.log) {
                        console.log(`<bgGreen><black> views </black></bgGreen> View "<yellow>${req.path}</yellow> served in <cyan>${duration.end()}s</cyan>"`);
                    }
                    res.status(200);
                    res.type('text/html');
                    return res.send(resultObj.content);
                }
            }
        }
        // view not found
        const notFoundTemplateInstance = new STemplate_1.default('pages.404', {
            rootDir: rootDirs
        });
        const notFoundObj = yield notFoundTemplateInstance.render(Object.assign(Object.assign({}, (res.templateData || {})), { title: `View not found...`, error: `The requested view "${req.path}" does not exists in any of these directories:
    <ol>  
    ${notFoundTemplateInstance._settings.rootDir.map((dir) => {
                return `<li>${dir}</li>`;
            })}
    </ol>
    ` }));
        res.status(404);
        res.type('text/html');
        res.send(notFoundObj.content);
    });
};
//# sourceMappingURL=views.js.map