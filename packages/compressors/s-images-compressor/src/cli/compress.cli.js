var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SProcess from '@coffeekraken/s-process';
import __SImagesCompressorCompressParamsInterface from '../node/interface/SImagesCompressorCompressParamsInterface';
import __SImagesCompressor from '../node/SImagesCompressor';
export default function build(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const compressor = new __SImagesCompressor();
        const pro = __SProcess.from(compressor.compress.bind(compressor), {
            process: {
                interface: __SImagesCompressorCompressParamsInterface
            }
        });
        const res = yield pro.run(stringArgs);
        console.log(res);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHJlc3MuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcHJlc3MuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sMENBQTBDLE1BQU0sNERBQTRELENBQUM7QUFDcEgsT0FBTyxtQkFBbUIsTUFBTSwyQkFBMkIsQ0FBQztBQUc1RCxNQUFNLENBQUMsT0FBTyxVQUFnQixLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7O1FBRS9DLE1BQU0sVUFBVSxHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUU3QyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUN2QixVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDdEM7WUFDRSxPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFLDBDQUEwQzthQUN0RDtTQUNKLENBQUMsQ0FBQztRQUNILE1BQU0sR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7Q0FBQSJ9