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
const SPromise_1 = __importDefault(require("../../../promise/SPromise"));
const SDocMap_1 = __importDefault(require("../../../doc/SDocMap"));
module.exports = function docMap(req, res, settings = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const promise = new SPromise_1.default();
        (() => __awaiter(this, void 0, void 0, function* () {
            const docMap = new SDocMap_1.default();
            const docMapPromise = docMap.read();
            SPromise_1.default.pipe(docMapPromise, promise);
            docMapPromise.on('reject', (e) => {
                res.status(500);
                res.type('text/html');
                res.send(e);
                promise.reject(e);
            });
            const docMapJson = yield docMapPromise;
            res.status(200);
            res.type('application/json');
            res.send(docMapJson);
            promise.resolve(docMapJson);
        }))();
        return promise;
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jTWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7O0FBRWQseUVBQW1EO0FBQ25ELG1FQUE2QztBQXFCN0MsaUJBQVMsU0FBZSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTs7UUFDcEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVSxFQUFFLENBQUM7UUFFakMsQ0FBQyxHQUFTLEVBQUU7WUFDVixNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFTLEVBQUUsQ0FBQztZQUMvQixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEMsa0JBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sVUFBVSxHQUFHLE1BQU0sYUFBYSxDQUFDO1lBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7UUFFTCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBQUEsQ0FBQyJ9