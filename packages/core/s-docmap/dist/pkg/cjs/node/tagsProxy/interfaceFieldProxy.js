"use strict";
/**
 * @name            interfaceTagProxy
 * @namespace       node.tagsProxy
 * @type                Function
 * @platform        node
 * @status          beta
 *
 * This field proxy take the "interface" field and transform it to full
 * interface with props etc...
 *
 * @param       {any}           data        The interface data to process
 * @return      {ISDocmapInterfaceField}            The full interface data
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function interfaceTagProxy(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const int = (yield import(data.path)).default;
        return int.toObject();
    });
}
exports.default = interfaceTagProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7Ozs7Ozs7Ozs7O0FBSUgsU0FBOEIsaUJBQWlCLENBQzNDLElBQVM7O1FBRVQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDOUMsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUIsQ0FBQztDQUFBO0FBTEQsb0NBS0MifQ==