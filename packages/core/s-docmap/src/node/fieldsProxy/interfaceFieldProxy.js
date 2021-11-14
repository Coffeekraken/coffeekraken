/**
 * @name            interfaceFieldProxy
 * @namespace       node.fieldsProxy
 * @type                Function
 * @platform        node
 * @status          beta
 *
 * This field proxy take the "interface" field and transform it to full
 * interface with props etc...
 *
 * @param       {any}           data        The interface data to process
 * @return      {ISDocMapInterfaceField}            The full interface data
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
export default function interfaceFieldProxy(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const int = (yield import(data.path)).default;
        return int.toObject();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlRmllbGRQcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVyZmFjZUZpZWxkUHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHOzs7Ozs7Ozs7O0FBSUgsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsbUJBQW1CLENBQzdDLElBQVM7O1FBRVQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDOUMsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUIsQ0FBQztDQUFBIn0=